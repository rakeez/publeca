import { NextResponse } from "next/server";
import { prisma } from "@publeca/db";
import { sendReminderEmail } from "@/lib/email";

// Daily cron (see vercel.json). Vercel includes `Authorization: Bearer <CRON_SECRET>`
// automatically when CRON_SECRET is set. We send reminders for live events starting in
// the next ~48h that haven't been reminded yet, then mark them so we never double-send.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return new NextResponse("unauthorized", { status: 401 });
    }
  }

  const now = new Date();
  const horizon = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const events = await prisma.event.findMany({
    where: {
      status: "LIVE",
      reminderSentAt: null,
      startsAt: { gt: now, lte: horizon },
    },
  });

  let emailed = 0;
  for (const event of events) {
    const tickets = await prisma.ticket.findMany({
      where: { status: "VALID", order: { eventId: event.id, status: "PAID" } },
      select: { attendeeName: true, attendeeEmail: true, qrToken: true },
    });

    for (const t of tickets) {
      try {
        await sendReminderEmail(t, event);
        emailed++;
      } catch (e) {
        console.error("Reminder send failed:", (e as Error).message);
      }
    }

    await prisma.event.update({
      where: { id: event.id },
      data: { reminderSentAt: new Date() },
    });
  }

  return NextResponse.json({ ok: true, events: events.length, emailed });
}
