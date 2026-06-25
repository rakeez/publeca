import { NextResponse } from "next/server";
import { sweepExpiredHolds } from "@publeca/db";

// Retire aged-out checkout holds. Availability already ignores expired holds, so this
// is housekeeping. Secured by CRON_SECRET (Vercel sends it as a bearer token).
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const swept = await sweepExpiredHolds();
  return NextResponse.json({ ok: true, swept });
}
