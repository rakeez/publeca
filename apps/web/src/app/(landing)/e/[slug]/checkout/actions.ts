"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma, holdSeats, releaseReservation, SoldOutError } from "@publeca/db";
import type { ProviderId } from "@publeca/payments";
import { enabledProvidersForHost } from "@/lib/payment-config";

const buyerSchema = z.object({
  ticketTypeId: z.string().min(1),
  provider: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

export type CheckoutState = { error: string | null };

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

  // Validate the chosen payment method against what this host actually offers.
  const available = await enabledProvidersForHost(tt.event.hostId);
  if (available.length === 0) return { error: "Payments aren't set up for this event yet." };
  const provider: ProviderId =
    parsed.data.provider && available.includes(parsed.data.provider as ProviderId)
      ? (parsed.data.provider as ProviderId)
      : available[0]!;

  // Reserve the seat (atomic; throws if sold out), then create the pending order.
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

    // Stash phone on the order via a side table later; for now redirect to pay.
    redirect(`/pay/${order.id}?phone=${encodeURIComponent(phone ?? "")}`);
  } catch (e) {
    if (e instanceof SoldOutError) {
      if (reservationId) await releaseReservation(reservationId);
      return { error: "Sorry — that ticket just sold out." };
    }
    // redirect() throws a control-flow signal; re-throw so Next handles it.
    throw e;
  }
}
