import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@publeca/db";
import { verifyTicketToken } from "@publeca/tickets";
import { getCurrentHost } from "@/lib/session";
import { accessibleHostIds } from "@/lib/access";

type ScanOutcome =
  | { result: "ok"; attendee: string; ticketType: string; event: string }
  | { result: "already_used"; attendee: string; ticketType: string; checkedInAt: string }
  | { result: "invalid" }
  | { result: "forbidden" };

const body = z.object({ token: z.string().min(1) });

// Door check-in. Auth-gated to the host; a ticket can only be marked used once,
// enforced by an atomic conditional update so two scanners can't both "first-scan" it.
export async function POST(req: Request) {
  const host = await getCurrentHost();

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ result: "invalid" } satisfies ScanOutcome);

  const token = parsed.data.token;
  const payload = verifyTicketToken(token);
  if (!payload) {
    await logScan(null, host.id, "INVALID");
    return NextResponse.json({ result: "invalid" } satisfies ScanOutcome);
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: payload.tid },
    include: { order: { include: { event: true } }, ticketType: true },
  });

  if (!ticket || ticket.qrToken !== token) {
    await logScan(null, host.id, "INVALID");
    return NextResponse.json({ result: "invalid" } satisfies ScanOutcome);
  }

  // Only the event's owner or a teammate may check its attendees in.
  const hostIds = await accessibleHostIds(host.id);
  if (!hostIds.includes(ticket.order.event.hostId)) {
    return NextResponse.json({ result: "forbidden" } satisfies ScanOutcome);
  }

  // Atomic first-scan: flips VALID -> USED exactly once.
  const flip = await prisma.ticket.updateMany({
    where: { id: ticket.id, status: "VALID" },
    data: { status: "USED", checkedInAt: new Date(), checkedInBy: host.id },
  });

  if (flip.count === 0) {
    await logScan(ticket.id, host.id, "ALREADY_USED");
    const current = await prisma.ticket.findUnique({ where: { id: ticket.id } });
    return NextResponse.json({
      result: "already_used",
      attendee: ticket.attendeeName,
      ticketType: ticket.ticketType.name,
      checkedInAt: current?.checkedInAt?.toISOString() ?? "",
    } satisfies ScanOutcome);
  }

  await logScan(ticket.id, host.id, "OK");
  return NextResponse.json({
    result: "ok",
    attendee: ticket.attendeeName,
    ticketType: ticket.ticketType.name,
    event: ticket.order.event.title,
  } satisfies ScanOutcome);
}

function logScan(ticketId: string | null, scannedBy: string, result: "OK" | "ALREADY_USED" | "INVALID") {
  return prisma.scanLog.create({ data: { ticketId, scannedBy, result } });
}
