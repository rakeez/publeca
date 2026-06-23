import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center text-2xl font-bold tracking-tight">
          Publeca
        </Link>
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
