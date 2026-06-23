import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

const nav = [
  { href: "/app", label: "Overview" },
  { href: "/app/events", label: "Events" },
  { href: "/app/attendees", label: "Attendees" },
  { href: "/app/payments", label: "Payments" },
  { href: "/app/settings", label: "Settings" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-5 md:block">
        <Link href="/app" className="text-lg font-bold tracking-tight">
          Publeca
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <span className="text-sm text-slate-500">{session.user?.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign out
            </button>
          </form>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
