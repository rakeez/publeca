import { randomUUID } from "crypto";
import { prisma } from "@publeca/db";
import { signTicketToken } from "@publeca/tickets";
import { sendTicketEmail } from "./email";
import { sendMetaPurchase } from "./meta-capi";

/**
 * Issue tickets for a paid order. Safe to call multiple times (PayHere can resend
 * the notify callback): the conditional PENDING -> PAID flip gates issuance, so
 * tickets are created exactly once.
 */
export async function issueTicketsForOrder(orderId: string, providerRef: string) {
  // Atomic gate: only the call that flips PENDING -> PAID proceeds.
  const flip = await prisma.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "PAID", providerRef },
  });
  if (flip.count === 0) return { issued: false, reason: "already-processed" as const };

  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: { event: { include: { landingPage: true } }, tickets: true },
  });

  // Convert this order's holds and mint a ticket per held seat.
  const reservations = await prisma.reservation.findMany({
    where: { orderId, status: "HELD" },
  });

  const created = [];
  for (const res of reservations) {
    await prisma.reservation.update({
      where: { id: res.id },
      data: { status: "CONVERTED" },
    });

    for (let i = 0; i < res.quantity; i++) {
      const id = randomUUID();
      const qrToken = signTicketToken({ tid: id, eid: order.eventId, v: 1 });
      const ticket = await prisma.ticket.create({
        data: {
          id,
          orderId: order.id,
          ticketTypeId: res.ticketTypeId,
          attendeeName: order.buyerName,
          attendeeEmail: order.buyerEmail,
          qrToken,
        },
      });
      created.push(ticket);
    }
  }

  // Best-effort email (won't fail the webhook if email is down / unconfigured).
  try {
    await sendTicketEmail(order, created, order.event);
  } catch (e) {
    console.error("Ticket email failed:", (e as Error).message);
  }

  // Best-effort server-side Meta conversion (deduped with the browser pixel by order id).
  const lp = order.event.landingPage;
  if (lp?.metaPixelId && lp?.metaCapiToken) {
    try {
      await sendMetaPurchase({
        pixelId: lp.metaPixelId,
        token: lp.metaCapiToken,
        orderId: order.id,
        value: Number(order.amount),
        currency: order.currency,
        email: order.buyerEmail,
      });
    } catch (e) {
      console.error("Meta CAPI failed:", (e as Error).message);
    }
  }

  return { issued: true, count: created.length };
}
