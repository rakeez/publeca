"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { startSeatedCheckout, type SeatCheckoutState } from "./seat-checkout-actions";

type Seat = { id: string; row: number; num: number; taken: boolean };
type Block = { name: string; price: number; seats: Seat[] };
type Method = { id: string; label: string; kind: "card" | "bnpl" };

export function SeatPicker({
  blocks,
  currency,
  accent,
  methods,
}: {
  blocks: Block[];
  currency: string;
  accent: string;
  methods: Method[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [state, action, pending] = useActionState(startSeatedCheckout, {
    error: null,
  } as SeatCheckoutState);
  const redirectRef = useRef<HTMLFormElement>(null);

  // price + label lookups
  const meta = useMemo(() => {
    const m = new Map<string, { price: number; label: string }>();
    for (const b of blocks)
      for (const s of b.seats)
        m.set(s.id, { price: b.price, label: `${b.name} · Row ${s.row} · Seat ${s.num}` });
    return m;
  }, [blocks]);

  const total = [...selected].reduce((sum, id) => sum + (meta.get(id)?.price ?? 0), 0);

  useEffect(() => {
    if (state?.redirect && redirectRef.current) redirectRef.current.submit();
  }, [state]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 10) next.add(id);
      return next;
    });
  }

  if (state?.redirect) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200" style={{ borderTopColor: accent }} />
        <p className="text-sm text-slate-600">Redirecting to secure payment…</p>
        <form ref={redirectRef} method={state.redirect.method} action={state.redirect.actionUrl} className="hidden">
          {Object.entries(state.redirect.fields).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
        </form>
      </div>
    );
  }

  return (
    <div>
      {/* legend */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <Legend swatch={<span className="h-3.5 w-3.5 rounded border border-slate-300 bg-white" />} label="Available" />
        <Legend swatch={<span className="h-3.5 w-3.5 rounded" style={{ background: accent }} />} label="Selected" />
        <Legend swatch={<span className="h-3.5 w-3.5 rounded bg-slate-300" />} label="Taken" />
      </div>

      <div className="mt-5 space-y-6">
        {blocks.map((b) => {
          const rows = [...new Set(b.seats.map((s) => s.row))].sort((a, z) => a - z);
          return (
            <div key={b.name}>
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-slate-900">{b.name}</p>
                <p className="text-sm text-slate-500">
                  {currency} {b.price.toLocaleString()}
                </p>
              </div>
              <div className="mt-3 overflow-x-auto">
                <div className="inline-flex flex-col gap-1.5">
                  {rows.map((r) => (
                    <div key={r} className="flex items-center gap-1.5">
                      <span className="w-6 shrink-0 text-right text-[11px] text-slate-400">R{r}</span>
                      {b.seats
                        .filter((s) => s.row === r)
                        .sort((a, z) => a.num - z.num)
                        .map((s) => {
                          const isSel = selected.has(s.id);
                          return (
                            <button
                              key={s.id}
                              type="button"
                              disabled={s.taken}
                              onClick={() => toggle(s.id)}
                              title={`Row ${s.row}, Seat ${s.num}`}
                              className="h-7 w-7 rounded text-[10px] font-medium transition disabled:cursor-not-allowed"
                              style={
                                s.taken
                                  ? { background: "#cbd5e1", color: "#fff" }
                                  : isSel
                                    ? { background: accent, color: "#fff" }
                                    : { background: "#fff", border: "1px solid #cbd5e1", color: "#475569" }
                              }
                            >
                              {s.num}
                            </button>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* checkout */}
      <form action={action} className="mt-8 rounded-2xl border border-slate-200 p-5">
        <input type="hidden" name="seatIds" value={JSON.stringify([...selected])} />

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {selected.size === 0
              ? "Pick your seats above"
              : `${selected.size} seat${selected.size > 1 ? "s" : ""} selected`}
          </p>
          <p className="font-semibold text-slate-900">
            {currency} {total.toLocaleString()}
          </p>
        </div>

        {selected.size > 0 && (
          <div className="mt-4 space-y-3">
            {methods.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {methods.map((m, i) => (
                  <label key={m.id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm has-[:checked]:border-slate-400">
                    <input type="radio" name="accountId" value={m.id} defaultChecked={i === 0} />
                    {m.label}
                  </label>
                ))}
              </div>
            )}
            {methods.length === 1 && <input type="hidden" name="accountId" value={methods[0]!.id} />}

            <div className="grid grid-cols-2 gap-3">
              <Input name="firstName" placeholder="First name" autoComplete="given-name" />
              <Input name="lastName" placeholder="Last name" autoComplete="family-name" />
            </div>
            <Input name="email" type="email" placeholder="Email" autoComplete="email" />
            <Input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" required={false} />

            {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: accent }}
            >
              {pending ? "Reserving your seats…" : `Pay ${currency} ${total.toLocaleString()}`}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {swatch}
      {label}
    </span>
  );
}

function Input({
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: {
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
    />
  );
}
