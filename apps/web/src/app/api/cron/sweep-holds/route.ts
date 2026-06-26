import { NextResponse } from "next/server";
import { sweepExpiredHolds, sweepExpiredSeatHolds } from "@publeca/db";

// Retire aged-out checkout holds (general-admission reservations + assigned seats).
// Availability already ignores expired holds, so this is housekeeping.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const [reservations, seats] = await Promise.all([sweepExpiredHolds(), sweepExpiredSeatHolds()]);
  return NextResponse.json({ ok: true, reservations, seats });
}
