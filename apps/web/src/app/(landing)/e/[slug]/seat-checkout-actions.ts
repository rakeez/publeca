"use server";

import { z } from "zod";
import { prisma } from "@publeca/db";
import { getProvider } from "@publeca/payments";
import { accountsForEvent, resolveAccountCreds } from "@/lib/payment-config";

export type SeatCheckoutState = {
  error: string | null;
  redirect?: { method: "POST" | "GET"; actionUrl: string; fields: Record<string, string> };
};

const schema = z.object({
  seatIds: z.string().min(1),
  accountId: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

export async function startSeatedCheckout(
  _prev: SeatCheckoutState,
  formData: FormData
): Promise<SeatCheckoutState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { firstName, lastName, email, phone } = parsed.data;
  let seatIds: string[];
  try {
    seatIds = JSON.parse(parsed.data.seatIds);
  } catch {
    return { error: "Invalid seat selection" };
  }
  if (!Array.isArray(seatIds) || seatIds.length === 0) return { error: "Pick at least one seat." };
  if (seatIds.length > 10) return { error: "You can book up to 10 seats at once." };

  const seats = await prisma.seat.findMany({
    where: { id: { in: seatIds } },
    include: { ticketType: true, event: true },
  });
  if (seats.length !== seatIds.length) return { error: "Some seats are no longer available." };

  const event = seats[0]!.event;
  if (!event || event.status !== "LIVE") return { error: "This event is not on sale." };
  if (seats.some((s) => s.eventId !== event.id)) return { error: "Invalid seat selection." };
  if (seats.some((s) => !s.ticketType)) return { error: "These seats aren't priced yet." };

  const accounts = await accountsForEvent(event);
  if (accounts.length === 0) return { error: "Payments aren't set up for this event yet." };
  const account = accounts.find((a) => a.id === parsed.data.accountId) ?? accounts[0]!;
  const creds = await resolveAccountCreds(account.id, event.hostId);
  if (!creds) return { error: "This payment method isn't available right now." };

  const amount = seats.reduce((sum, s) => sum + Number(s.ticketType!.price), 0);

  const order = await prisma.order.create({
    data: {
      eventId: event.id,
      buyerName: `${firstName} ${lastName}`.trim(),
      buyerEmail: email,
      amount: amount.toFixed(2),
      currency: event.currency,
      status: "PENDING",
      provider: account.provider,
      paymentAccountId: account.id,
    },
  });

  // Atomically claim each seat that is free (or whose hold has expired).
  const held = await prisma.seat.updateMany({
    where: {
      id: { in: seatIds },
      OR: [{ status: "AVAILABLE" }, { status: "HELD", holdExpiresAt: { lt: new Date() } }],
    },
    data: { status: "HELD", holdExpiresAt: new Date(Date.now() + 12 * 60_000), orderId: order.id },
  });

  if (held.count !== seatIds.length) {
    // Someone grabbed one of these seats first — roll back.
    await prisma.seat.updateMany({
      where: { orderId: order.id },
      data: { status: "AVAILABLE", holdExpiresAt: null, orderId: null },
    });
    await prisma.order.delete({ where: { id: order.id } });
    return { error: "Sorry — one of those seats was just taken. Please pick again." };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const checkout = getProvider(account.provider).createCheckout(
    {
      orderId: order.id,
      amount,
      currency: event.currency,
      itemsDescription: `${event.title} — ${seats.length} seat(s)`,
      customer: { firstName, lastName, email, phone: phone ?? "" },
      returnUrl: `${appUrl}/pay/return?order=${order.id}`,
      cancelUrl: `${appUrl}/e/${event.slug}`,
      notifyUrl: `${appUrl}/api/payments/${account.provider}/notify`,
    },
    creds
  );

  return { error: null, redirect: checkout };
}
