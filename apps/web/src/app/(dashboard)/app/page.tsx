import { auth } from "@/auth";

export default async function DashboardHome() {
  const session = await auth();
  const name = session?.user?.name ?? "there";

  const stats = [
    { label: "Live events", value: "0" },
    { label: "Tickets sold", value: "0" },
    { label: "Revenue (LKR)", value: "0" },
    { label: "Checked in", value: "0" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Welcome, {name} 👋</h1>
      <p className="mt-1 text-slate-600">Here's what's happening with your events.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-slate-600">No events yet.</p>
        <p className="mt-1 text-sm text-slate-500">
          Event creation lands in Phase 1 — this dashboard will fill up fast.
        </p>
      </div>
    </div>
  );
}
