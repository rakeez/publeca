"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { manageableHostIds } from "@/lib/access";

/**
 * Refund an order: mark it REFUNDED, void its tickets (so they can't be scanned), and
 * release the seats back to inventory. This records the refund and frees capacity;
 * the actual money movement is done in the gateway (or via a future refund API call).
 */
export async function refundOrder(eventId: string, orderId: string): Promise<void> {
  const host = await getCurrentHost();
  const allowed = await manageableHostIds(host.id);

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { event: true, tickets: true },
  });
  if (!order || order.eventId !== eventId) return;
  if (!allowed.includes(order.event.hostId)) return;
  if (order.status !== "PAID") return;

  await prisma.$transaction(async (tx) => {
    await tx.order.update({ where: { id: orderId }, data: { status: "REFUNDED" } });

    for (const ticket of order.tickets) {
      if (ticket.status === "VOID") continue;
      await tx.ticket.update({ where: { id: ticket.id }, data: { status: "VOID" } });
      // Return the seat to the pool.
      await tx.ticketType.update({
        where: { id: ticket.ticketTypeId },
        data: { quantitySold: { decrement: 1 } },
      });
    }
  });

  revalidatePath(`/app/events/${eventId}/orders`);
}
