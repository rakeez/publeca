import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { accessibleHostIds } from "@/lib/access";

// CSV export of an event's attendees. Auth is enforced by middleware (/app/*);
// access to the specific event is checked here.
export async function GET(req: Request) {
  const host = await getCurrentHost();
  const eventId = new URL(req.url).searchParams.get("event");
  if (!eventId) return new Response("missing event", { status: 400 });

  const hostIds = await accessibleHostIds(host.id);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || !hostIds.includes(event.hostId)) {
    return new Response("not found", { status: 404 });
  }

  const tickets = await prisma.ticket.findMany({
    where: { order: { eventId } },
    include: { ticketType: true, order: true },
    orderBy: { createdAt: "asc" },
  });

  const headers = [
    "Attendee Name",
    "Email",
    "Ticket Type",
    "Status",
    "Checked In At",
    "Order Ref",
    "Purchased At",
  ];

  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = tickets.map((t) =>
    [
      t.attendeeName,
      t.attendeeEmail,
      t.ticketType.name,
      t.status,
      t.checkedInAt ? t.checkedInAt.toISOString() : "",
      t.order.providerRef ?? t.orderId,
      t.createdAt.toISOString(),
    ]
      .map(esc)
      .join(",")
  );

  const csv = [headers.map(esc).join(","), ...rows].join("\r\n");
  const filename = `attendees-${event.slug}.csv`;

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
    },
  });
}
