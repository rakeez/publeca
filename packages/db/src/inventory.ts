import { prisma } from "./index";

/**
 * Oversell prevention.
 *
 * The only safe way to reserve inventory under concurrency is an atomic,
 * conditional write enforced by the database — never read-then-write in app code.
 *
 * `holdSeats` does two things in a single transaction:
 *   1. Atomically increments quantitySold ONLY if enough capacity remains, after
 *      accounting for live (unexpired) holds. The conditional UPDATE returns 0 rows
 *      when sold out, so two simultaneous buyers can never both win the last seat.
 *   2. Creates a time-boxed Reservation that expires if the buyer abandons checkout.
 *
 * A CHECK (quantitySold <= quantityTotal) constraint (added in migration SQL) is the
 * hard backstop: even a logic bug elsewhere physically cannot oversell.
 */

const HOLD_TTL_MINUTES = 10;

export class SoldOutError extends Error {
  constructor() {
    super("Not enough tickets available");
    this.name = "SoldOutError";
  }
}

export async function holdSeats(ticketTypeId: string, quantity: number) {
  if (quantity < 1) throw new Error("quantity must be >= 1");

  return prisma.$transaction(async (tx) => {
    // Atomic conditional decrement. `quantitySold` already includes confirmed
    // sales; live holds are added on top via the correlated subquery so two
    // pending checkouts can't both consume the last seat.
    const updated = await tx.$executeRaw`
      UPDATE "TicketType" t
      SET "quantitySold" = "quantitySold" + ${quantity}
      WHERE t.id = ${ticketTypeId}
        AND "quantitySold"
            + ${quantity}
            + COALESCE((
                SELECT SUM(r.quantity)
                FROM "Reservation" r
                WHERE r."ticketTypeId" = t.id
                  AND r.status = 'HELD'
                  AND r."expiresAt" > now()
              ), 0)
            <= "quantityTotal"
    `;

    if (updated === 0) throw new SoldOutError();

    const expiresAt = new Date(Date.now() + HOLD_TTL_MINUTES * 60_000);
    return tx.reservation.create({
      data: { ticketTypeId, quantity, status: "HELD", expiresAt },
    });
  });
}

/** Convert a hold to confirmed once payment is verified. Idempotent-friendly. */
export async function convertReservation(reservationId: string, orderId: string) {
  return prisma.reservation.updateMany({
    where: { id: reservationId, status: "HELD" },
    data: { status: "CONVERTED", orderId },
  });
}

/** Release a single hold back to the pool (abandoned checkout / failed payment). */
export async function releaseReservation(reservationId: string) {
  return prisma.$transaction(async (tx) => {
    const res = await tx.reservation.findUnique({ where: { id: reservationId } });
    if (!res || res.status !== "HELD") return;
    await tx.reservation.update({
      where: { id: reservationId },
      data: { status: "EXPIRED" },
    });
    await tx.ticketType.update({
      where: { id: res.ticketTypeId },
      data: { quantitySold: { decrement: res.quantity } },
    });
  });
}

/** Cron sweep: expire stale holds and return their seats. Run every minute. */
export async function sweepExpiredHolds() {
  const expired = await prisma.reservation.findMany({
    where: { status: "HELD", expiresAt: { lt: new Date() } },
  });
  for (const res of expired) {
    await releaseReservation(res.id);
  }
  return expired.length;
}
