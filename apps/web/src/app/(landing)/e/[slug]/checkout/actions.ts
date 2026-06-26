"use server";

import { z } from "zod";
import { prisma, holdSeats, releaseReservation, SoldOutError } from "@publeca/db";
import { getProvider, type ProviderId } from "@publeca/payments";
import { enabledProvidersForEvent, resolveCreds } from "@/lib/payment-config";

const buyerSchema = z.object({
  ticketTypeId: z.string().min(1),
  provider: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

export type CheckoutState = {
  error: string | null;
  redirect?: { method: "POST" | "GET"; actionUrl: string; fields: Record<string, string> };
};

export async function startCheckout(
  _prev: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const parsed = buyerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { ticketTypeId, firstName, lastName, email, phone } = parsed.data;

  const tt = await prisma.ticketType.findUnique({
    where: { id: ticketTypeId },
    include: { event: true },
  });
  if (!tt || tt.event.status !== "LIVE") return { error: "This ticket is not on sale." };
  if (tt.salesEnd && tt.salesEnd < new Date()) return { error: "Sales have closed." };

  const available = await enabledProvidersForEvent(tt.event);
  if (available.length === 0) return { error: "Payments aren't set up for this event yet." };
  const provider: ProviderId =
    parsed.data.provider && available.includes(parsed.data.provider as ProviderId)
      ? (parsed.data.provider as ProviderId)
      : available[0]!;

  const creds = await resolveCreds(tt.event.hostId, provider);
  if (!creds) return { error: "This payment method isn't available right now." };

  // Reserve the seat (atomic; throws if sold out), then create the pending order and
  // build the gateway checkout in one shot so the client can redirect immediately.
  let reservationId: string | null = null;
  try {
    const reservation = await holdSeats(ticketTypeId, 1);
    reservationId = reservation.id;

    const order = await prisma.order.create({
      data: {
        eventId: tt.eventId,
        buyerName: `${firstName} ${lastName}`.trim(),
        buyerEmail: email,
        amount: tt.price,
        currency: tt.event.currency,
        status: "PENDING",
        provider,
      },
    });
    await prisma.reservation.update({
      where: { id: reservation.id },
      data: { orderId: order.id },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const checkout = getProvider(provider).createCheckout(
      {
        orderId: order.id,
        amount: Number(order.amount),
        currency: order.currency,
        itemsDescription: `${tt.event.title} — ${tt.name}`,
        customer: { firstName, lastName, email, phone: phone ?? "" },
        returnUrl: `${appUrl}/pay/return?order=${order.id}`,
        cancelUrl: `${appUrl}/e/${tt.event.slug}`,
        notifyUrl: `${appUrl}/api/payments/${provider}/notify`,
      },
      creds
    );

    return { error: null, redirect: checkout };
  } catch (e) {
    if (e instanceof SoldOutError) {
      if (reservationId) await releaseReservation(reservationId);
      return { error: "Sorry — that ticket just sold out." };
    }
    throw e;
  }
}
