import { getCurrentHost } from "@/lib/session";
import { Scanner } from "./scanner";

export default async function ScanPage() {
  await getCurrentHost(); // auth gate

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Door scanner</h1>
      <p className="mt-1 text-slate-600">
        Scan attendee tickets to check them in. Each ticket can only be used once.
      </p>
      <div className="mt-8">
        <Scanner />
      </div>
    </div>
  );
}
