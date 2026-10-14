"use client";

/**
 * The home hero's diagram of the thesis (playbook P1 / R3): five departments converge on one
 * forward-deployed growth executive, and work runs through the five stages.
 *
 * Every 3 s the featured department rotates: its connector brightens, a pulse runs up the
 * spine to the executive, its one-line outcome swaps in word by word, and the stages it works
 * in light in turn. Hovering a department (fine pointers) features it and pauses rotation.
 *
 * HTML + CSS rather than canvas, so every label is real, indexable text. The server renders a
 * static frame (the first department featured), which is also what reduced motion shows.
 * Departments and stages come from home.ts, the same list the "Built like a firm" bento reads.
 */

import { useEffect, useRef, useState } from "react";
import type { Department } from "@/lib/content/types";
import { hasFinePointer, usePlayable } from "./motion";

export const DEPT_DOTS = ["bg-brand-500", "bg-accent-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500"];

const ROTATE_MS = 3000;
const HOVER_PAUSE_MS = 2500;
// Geometry (px) shared by the rows and the pulse: label block, row height, row gap.
const LIST_TOP = 52;
const ROW_H = 44;
const ROW_GAP = 8;

export function GrowthDiagram({ departments, stages }: { departments: Department[]; stages: string[] }) {
  const { ref, playing } = usePlayable<HTMLDivElement>(0.3);
  const [featured, setFeatured] = useState(0);
  const pausedUntil = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setFeatured((f) => (f + 1) % departments.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [playing, departments.length]);

  const feature = (i: number) => {
    if (!hasFinePointer()) return;
    pausedUntil.current = Date.now() + HOVER_PAUSE_MS;
    setFeatured(i);
  };

  const current = departments[featured]!;
  const pulseTop = LIST_TOP + featured * (ROW_H + ROW_GAP) + ROW_H / 2;

  return (
    <div ref={ref} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-300/40">
      <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Leads your growth</p>
        <p className="font-display mt-1 text-xl font-bold">Forward-deployed growth executive</p>
      </div>

      <div className="relative">
        {/* The spine every department reports up */}
        <span aria-hidden className="absolute left-[11px] top-0 w-px bg-slate-300" style={{ height: pulseTopFor(departments.length - 1) }} />
        {playing && (
          <span
            key={featured}
            aria-hidden
            className="absolute left-[8px] h-[7px] w-[7px] animate-spine-pulse rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(255,0,102,0.15)]"
            style={{ top: pulseTop - 3, ["--dist" as string]: `${pulseTop}px` }}
          />
        )}

        <p className="flex h-[52px] items-end pb-3 pl-8 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Directs our own teams
        </p>
        <ul className="space-y-2 pl-8">
          {departments.map((d, i) => {
            const on = i === featured;
            return (
              <li
                key={d.title}
                onPointerEnter={() => feature(i)}
                className={`relative flex h-11 items-center gap-3 rounded-xl border px-4 transition-all duration-500 ease-out-expo ${
                  on ? "border-brand-200 bg-brand-50/60" : "border-slate-100 opacity-70"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-[21px] top-1/2 h-px w-[21px] transition-colors duration-500 ${on ? "bg-brand-300" : "bg-slate-200"}`}
                />
                <span
                  aria-hidden
                  className={`absolute -left-[26px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-4 ring-white ${DEPT_DOTS[i % DEPT_DOTS.length]}`}
                />
                <span className="text-sm font-semibold text-slate-800">{d.title}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The featured department's outcome, swapped word by word */}
      <p className="mt-5 min-h-[2.75rem] text-sm leading-snug text-slate-600" aria-live="off">
        <span key={featured}>
          {current.outcome.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="inline-block animate-word-in" style={{ animationDelay: `${i * 35}ms` }}>
                {w}&nbsp;
              </span>
            </span>
          ))}
        </span>
      </p>

      <ol className="mt-4 flex flex-wrap items-center gap-1 text-xs font-medium">
        {stages.map((s, i) => {
          const lit = current.stages.includes(s);
          return (
            <li key={s} className="inline-flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-300" aria-hidden>→</span>}
              <span
                className={`rounded-full px-2 py-1 transition-colors duration-500 ${
                  lit ? "bg-accent-500 text-white" : "bg-slate-100 text-slate-500"
                }`}
                style={{ transitionDelay: lit ? `${i * 140}ms` : "0ms" }}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function pulseTopFor(i: number) {
  return LIST_TOP + i * (ROW_H + ROW_GAP) + ROW_H / 2;
}
