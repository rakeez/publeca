"use client";

import { useEffect, useRef, useState } from "react";

type Outcome =
  | { result: "ok"; attendee: string; ticketType: string; event: string }
  | { result: "already_used"; attendee: string; ticketType: string; checkedInAt: string }
  | { result: "invalid" }
  | { result: "forbidden" };

const styles: Record<string, { bg: string; label: string; icon: string }> = {
  ok: { bg: "bg-emerald-500", label: "Checked in", icon: "✅" },
  already_used: { bg: "bg-amber-500", label: "Already checked in", icon: "⚠️" },
  invalid: { bg: "bg-red-600", label: "Invalid ticket", icon: "❌" },
  forbidden: { bg: "bg-red-600", label: "Not your event", icon: "🚫" },
};

export function Scanner() {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const lastRef = useRef<{ token: string; at: number }>({ token: "", at: 0 });
  const busyRef = useRef(false);

  useEffect(() => {
    let scanner: { stop: () => Promise<void>; clear: () => void } | null = null;
    let cancelled = false;

    (async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;
        const instance = new Html5Qrcode("reader");
        scanner = instance as unknown as { stop: () => Promise<void>; clear: () => void };
        await instance.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decoded: string) => handleScan(decoded),
          () => {}
        );
        setScanning(true);
      } catch {
        setError("Could not access the camera. Grant permission and use HTTPS.");
      }
    })();

    return () => {
      cancelled = true;
      if (scanner) scanner.stop().then(() => scanner?.clear()).catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleScan(token: string) {
    const now = Date.now();
    // Ignore the same code re-read within 3s, and don't overlap requests.
    if (busyRef.current) return;
    if (token === lastRef.current.token && now - lastRef.current.at < 3000) return;
    lastRef.current = { token, at: now };
    busyRef.current = true;

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as Outcome;
      setOutcome(data);
      if (navigator.vibrate) navigator.vibrate(data.result === "ok" ? 80 : [60, 40, 60]);
    } catch {
      setOutcome({ result: "invalid" });
    } finally {
      setTimeout(() => {
        busyRef.current = false;
      }, 1200);
    }
  }

  const s = outcome ? styles[outcome.result] : null;

  return (
    <div className="mx-auto max-w-md">
      <div id="reader" className="overflow-hidden rounded-2xl border border-slate-700 bg-black" />

      {!scanning && !error && (
        <p className="mt-4 text-center text-sm text-slate-400">Starting camera…</p>
      )}
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {outcome && s && (
        <div className={`mt-5 rounded-2xl p-6 text-center text-white ${s.bg}`}>
          <div className="text-5xl">{s.icon}</div>
          <p className="mt-2 text-lg font-bold">{s.label}</p>
          {"attendee" in outcome && (
            <p className="mt-1 text-white/90">
              {outcome.attendee} · {outcome.ticketType}
            </p>
          )}
          {outcome.result === "already_used" && outcome.checkedInAt && (
            <p className="mt-1 text-sm text-white/80">
              at {new Date(outcome.checkedInAt).toLocaleTimeString("en-GB")}
            </p>
          )}
        </div>
      )}

      <p className="mt-4 text-center text-xs text-slate-400">
        Point the camera at an attendee's ticket QR. Scanning is continuous.
      </p>
    </div>
  );
}
