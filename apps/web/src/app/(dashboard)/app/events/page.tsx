import Link from "next/link";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { accessibleHostIds } from "@/lib/access";

const statusStyles: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  LIVE: "bg-emerald-100 text-emerald-700",
  ENDED: "bg-slate-200 text-slate-500",
};

export default async function EventsPage() {
  const host = await getCurrentHost();
  const hostIds = await accessibleHostIds(host.id);
  const events = await prisma.event.findMany({
    where: { hostId: { in: hostIds } },
    orderBy: { createdAt: "desc" },
    include: { ticketTypes: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        <Link
          href="/app/events/new"
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          New event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">No events yet.</p>
          <Link href="/app/events/new" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline">
            Create your first event →
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Tickets</th>
                <th className="px-4 py-3 font-medium">Sold</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((e) => {
                const sold = e.ticketTypes.reduce((n, t) => n + t.quantitySold, 0);
                const cap = e.ticketTypes.reduce((n, t) => n + t.quantityTotal, 0);
                return (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link href={`/app/events/${e.id}`} className="font-medium text-slate-900 hover:text-brand-600">
                        {e.title}
                      </Link>
                      <p className="text-xs text-slate-400">/e/{e.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {new Date(e.startsAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{e.ticketTypes.length} type(s)</td>
                    <td className="px-4 py-3 text-slate-600">
                      {sold}/{cap}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
