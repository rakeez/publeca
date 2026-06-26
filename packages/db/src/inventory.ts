import { prisma } from "./index";

/**
 * Oversell prevention — corrected accounting.
 *
 *   quantitySold  = CONFIRMED (paid) seats only.
 *   active holds  = HELD reservations whose expiry is in the future.
 *   availability  = quantityTotal - quantitySold - activeHolds.
 *
 * A hold no longer touches quantitySold, so an abandoned/expired checkout never
 * leaves a seat marked as sold — the hold simply ages out of `activeHolds`.
 *
 * Concurrency safety: holdSeats locks the TicketType row (SELECT ... FOR UPDATE)
 * for the duration of the transaction, so two simultaneous buyers can't both pass
 * the availability check for the last seat. The CHECK (quantitySold <= quantityTotal)
 * constraint is the final backstop on confirmed sales.
 */

const HOLD_TTL_MINUTES = 12;

export class SoldOutError extends Error {
  constructor() {
    super("Not enough tickets available");
    this.name = "SoldOutError";
  }
}

export async function holdSeats(ticketTypeId: string, quantity: number) {
  if (quantity < 1) throw new Error("quantity must be >= 1");

  return prisma.$transaction(async (tx) => {
    // Lock the ticket type row so concurrent holds are serialized.
    const locked = await tx.$queryRaw<{ quantityTotal: number; quantitySold: number }[]>`
      SELECT "quantityTotal", "quantitySold"
      FROM "TicketType"
      WHERE id = ${ticketTypeId}
      FOR UPDATE
    `;
    const tt = locked[0];
    if (!tt) throw new Error("Unknown ticket type");

    const held = await tx.reservation.aggregate({
      where: { ticketTypeId, status: "HELD", expiresAt: { gt: new Date() } },
      _sum: { quantity: true },
    });
    const activeHolds = held._sum.quantity ?? 0;

    if (tt.quantitySold + activeHolds + quantity > tt.quantityTotal) {
      throw new SoldOutError();
    }

    const expiresAt = new Date(Date.now() + HOLD_TTL_MINUTES * 60_000);
    return tx.reservation.create({
      data: { ticketTypeId, quantity, status: "HELD", expiresAt },
    });
  });
}

/** On verified payment: mark the hold CONVERTED and add its seats to confirmed sales. */
export async function confirmReservation(reservationId: string) {
  return prisma.$transaction(async (tx) => {
    const r = await tx.reservation.findUnique({ where: { id: reservationId } });
    if (!r || r.status !== "HELD") return;
    await tx.reservation.update({ where: { id: r.id }, data: { status: "CONVERTED" } });
    await tx.ticketType.update({
      where: { id: r.ticketTypeId },
      data: { quantitySold: { increment: r.quantity } },
    });
  });
}

/** Abandoned/failed checkout — just retire the hold (quantitySold was never touched). */
export async function releaseReservation(reservationId: string) {
  await prisma.reservation.updateMany({
    where: { id: reservationId, status: "HELD" },
    data: { status: "EXPIRED" },
  });
}

/** Housekeeping: flip aged-out holds to EXPIRED. Availability already ignores them. */
export async function sweepExpiredHolds() {
  const res = await prisma.reservation.updateMany({
    where: { status: "HELD", expiresAt: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });
  return res.count;
}

/** Release aged-out assigned-seat holds back to AVAILABLE. */
export async function sweepExpiredSeatHolds() {
  const res = await prisma.seat.updateMany({
    where: { status: "HELD", holdExpiresAt: { lt: new Date() } },
    data: { status: "AVAILABLE", holdExpiresAt: null, orderId: null },
  });
  return res.count;
}

/** Seats currently available for sale (confirmed + active holds subtracted). */
export async function availableSeats(ticketTypeId: string): Promise<number> {
  const tt = await prisma.ticketType.findUnique({ where: { id: ticketTypeId } });
  if (!tt) return 0;
  const held = await prisma.reservation.aggregate({
    where: { ticketTypeId, status: "HELD", expiresAt: { gt: new Date() } },
    _sum: { quantity: true },
  });
  return tt.quantityTotal - tt.quantitySold - (held._sum.quantity ?? 0);
}
