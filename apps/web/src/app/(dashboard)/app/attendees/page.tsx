import Link from "next/link";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { manualCheckIn, undoCheckIn } from "./actions";

export default async function AttendeesPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const host = await getCurrentHost();
  const { event: selectedId } = await searchParams;

  const events = await prisma.event.findMany({
    where: { hostId: host.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true },
  });

  const eventId = selectedId ?? events[0]?.id;

  const tickets = eventId
    ? await prisma.ticket.findMany({
        where: { order: { eventId, event: { hostId: host.id } } },
        include: { ticketType: true },
        orderBy: { createdAt: "asc" },
      })
    : [];

  const checkedIn = tickets.filter((t) => t.status === "USED").length;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Attendees</h1>

      {events.length === 0 ? (
        <p className="mt-4 text-slate-600">
          No events yet.{" "}
          <Link href="/app/events/new" className="text-brand-600 hover:underline">
            Create one
          </Link>
          .
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {events.map((e) => (
              <Link
                key={e.id}
                href={`/app/attendees?event=${e.id}`}
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                  e.id === eventId
                    ? "bg-brand-500 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {e.title}
              </Link>
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {checkedIn} / {tickets.length} checked in
          </p>

          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Attendee</th>
                  <th className="px-4 py-3 font-medium">Ticket</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{t.attendeeName}</p>
                      <p className="text-xs text-slate-400">{t.attendeeEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.ticketType.name}</td>
                    <td className="px-4 py-3">
                      {t.status === "USED" ? (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          Checked in
                          {t.checkedInAt
                            ? ` · ${new Date(t.checkedInAt).toLocaleTimeString("en-GB")}`
                            : ""}
                        </span>
                      ) : t.status === "VALID" ? (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          Not arrived
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                          Void
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {t.status === "VALID" && (
                        <form action={manualCheckIn.bind(null, t.id)}>
                          <button className="text-sm font-medium text-brand-600 hover:underline">
                            Check in
                          </button>
                        </form>
                      )}
                      {t.status === "USED" && (
                        <form action={undoCheckIn.bind(null, t.id)}>
                          <button className="text-sm font-medium text-slate-400 hover:underline">
                            Undo
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                      No tickets sold yet for this event.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
