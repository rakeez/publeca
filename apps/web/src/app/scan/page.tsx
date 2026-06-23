// Door scanner (PWA) — camera-based QR check-in, wired in Phase 4.
// Hosts open this on their phone; scans validate the signed ticket token
// server-side and atomically mark attendees as checked in.
export default function ScanPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
        <h1 className="text-2xl font-bold">Publeca Door Scanner</h1>
        <p className="mt-3 max-w-sm text-sm text-slate-300">
          Sign in as a host to scan tickets and check in attendees. Camera scanning lands
          in Phase 4.
        </p>
        <div className="mx-auto mt-8 flex h-56 w-56 items-center justify-center rounded-xl border-2 border-dashed border-white/20 text-slate-500">
          Camera preview
        </div>
      </div>
    </main>
  );
}
