import { notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { verifyTicketToken, qrDataUrl } from "@publeca/tickets";

const statusLabel: Record<string, { text: string; cls: string }> = {
  VALID: { text: "Valid — not yet scanned", cls: "bg-emerald-100 text-emerald-700" },
  USED: { text: "Already checked in", cls: "bg-slate-200 text-slate-600" },
  VOID: { text: "Voided", cls: "bg-red-100 text-red-700" },
};

export default async function TicketPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const payload = verifyTicketToken(token);
  if (!payload) notFound();

  const ticket = await prisma.ticket.findUnique({
    where: { id: payload.tid },
    include: { order: { include: { event: true } }, ticketType: true },
  });
  if (!ticket || ticket.qrToken !== token) notFound();

  const event = ticket.order.event;
  const qr = await qrDataUrl(token);
  const status = statusLabel[ticket.status] ?? statusLabel.VALID;
  const when = new Date(event.startsAt).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-brand-500 to-emerald-500 p-6 text-white">
          <p className="text-sm opacity-80">{ticket.ticketType.name}</p>
          <h1 className="text-xl font-bold">{event.title}</h1>
        </div>

        <div className="flex flex-col items-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="Ticket QR code" className="h-56 w-56" />
          <span className={`mt-4 rounded-full px-3 py-1 text-xs font-medium ${status?.cls}`}>
            {status?.text}
          </span>
        </div>

        <div className="border-t border-slate-100 p-6 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-900">Attendee:</span> {ticket.attendeeName}
          </p>
          {ticket.seatLabel && (
            <p className="mt-1">
              <span className="font-medium text-slate-900">Seat:</span> {ticket.seatLabel}
            </p>
          )}
          <p className="mt-1">
            <span className="font-medium text-slate-900">When:</span> {when}
          </p>
          {event.venue && (
            <p className="mt-1">
              <span className="font-medium text-slate-900">Where:</span> {event.venue}
            </p>
          )}
          {ticket.checkedInAt && (
            <p className="mt-1 text-slate-400">
              Scanned {new Date(ticket.checkedInAt).toLocaleString("en-GB")}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
