"use client";

import { useActionState, useRef, useState } from "react";
import { saveSeating, type SeatingState } from "./actions";

type Block = { id: string; name: string; rows: number; seats: number; x: number; y: number; ticketTypeId?: string };
type TicketType = { id: string; name: string; price: string };

export function SeatingBuilder({
  action,
  ticketTypes,
  initial,
}: {
  action: (prev: SeatingState, fd: FormData) => Promise<SeatingState>;
  ticketTypes: TicketType[];
  initial: Block[];
}) {
  const [blocks, setBlocks] = useState<Block[]>(initial);
  const [state, formAction, pending] = useActionState(action, { error: null } as SeatingState);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragId = useRef<string | null>(null);

  function addBlock() {
    const id = Math.random().toString(36).slice(2, 9);
    setBlocks((b) => [
      ...b,
      { id, name: `Block ${b.length + 1}`, rows: 5, seats: 10, x: 50, y: 55, ticketTypeId: ticketTypes[0]?.id },
    ]);
  }
  function update(id: string, patch: Partial<Block>) {
    setBlocks((b) => b.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function remove(id: string) {
    setBlocks((b) => b.filter((x) => x.id !== id));
  }

  function onPointerDown(e: React.PointerEvent, id: string) {
    dragId.current = id;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragId.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(92, Math.max(14, ((e.clientY - rect.top) / rect.height) * 100));
    update(dragId.current, { x, y });
  }
  function onPointerUp() {
    dragId.current = null;
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="seating" value={JSON.stringify(blocks)} />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addBlock}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          + Add block
        </button>
        <div className="flex items-center gap-3">
          {state?.ok && <span className="text-sm text-emerald-600">Saved ✓</span>}
          {state?.error && <span className="text-sm text-red-600">{state.error}</span>}
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save layout"}
          </button>
        </div>
      </div>

      {/* canvas */}
      <div
        ref={canvasRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative mt-4 h-80 select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
      >
        <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-slate-800 px-4 py-1 text-xs font-semibold text-white">
          STAGE
        </div>
        {blocks.map((b) => (
          <div
            key={b.id}
            onPointerDown={(e) => onPointerDown(e, b.id)}
            className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none flex-col items-center rounded-lg border-2 border-brand-400 bg-white px-2 py-1 text-center text-xs shadow-sm active:cursor-grabbing"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <span className="font-semibold text-slate-900">{b.name}</span>
            <span className="text-slate-500">{b.rows}×{b.seats}</span>
          </div>
        ))}
        {blocks.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Add a block, then drag it into place.
          </p>
        )}
      </div>

      {/* block editors */}
      <div className="mt-5 space-y-3">
        {blocks.map((b) => (
          <div key={b.id} className="flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <L label="Name">
              <input
                value={b.name}
                onChange={(e) => update(b.id, { name: e.target.value })}
                className="w-32 rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-brand-400"
              />
            </L>
            <L label="Rows">
              <input
                type="number"
                min={1}
                value={b.rows}
                onChange={(e) => update(b.id, { rows: Number(e.target.value) })}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-brand-400"
              />
            </L>
            <L label="Seats/row">
              <input
                type="number"
                min={1}
                value={b.seats}
                onChange={(e) => update(b.id, { seats: Number(e.target.value) })}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-brand-400"
              />
            </L>
            <L label="Ticket type">
              <select
                value={b.ticketTypeId ?? ""}
                onChange={(e) => update(b.id, { ticketTypeId: e.target.value || undefined })}
                className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-brand-400"
              >
                <option value="">— none —</option>
                {ticketTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </L>
            <span className="text-xs text-slate-400">= {b.rows * b.seats} seats</span>
            <button
              type="button"
              onClick={() => remove(b.id)}
              className="ml-auto text-sm font-medium text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
