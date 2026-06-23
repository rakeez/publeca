import Link from "next/link";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";

export default async function DashboardHome() {
  const host = await getCurrentHost();

  const events = await prisma.event.findMany({
    where: { hostId: host.id },
    include: { ticketTypes: true },
  });

  const liveEvents = events.filter((e) => e.status === "LIVE").length;
  const ticketsSold = events.reduce(
    (n, e) => n + e.ticketTypes.reduce((s, t) => s + t.quantitySold, 0),
    0
  );

  const paid = await prisma.order.aggregate({
    where: { event: { hostId: host.id }, status: "PAID" },
    _sum: { amount: true },
  });
  const checkedIn = await prisma.ticket.count({
    where: { order: { event: { hostId: host.id } }, status: "USED" },
  });

  const stats = [
    { label: "Live events", value: String(liveEvents) },
    { label: "Tickets sold", value: String(ticketsSold) },
    { label: "Revenue (LKR)", value: (paid._sum.amount ?? 0).toLocaleString() },
    { label: "Checked in", value: String(checkedIn) },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {host.name || "there"} 👋</h1>
          <p className="mt-1 text-slate-600">Here's what's happening with your events.</p>
        </div>
        <Link
          href="/app/events/new"
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          New event
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">No events yet.</p>
          <Link
            href="/app/events/new"
            className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            Create your first event →
          </Link>
        </div>
      )}
    </div>
  );
}
