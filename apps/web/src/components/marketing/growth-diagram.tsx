"use client";

/**
 * The home hero's product card (playbook P1 / R3; docs/design-system.md "product screenshot"):
 * a growth-plan window where five departments report up to one forward-deployed growth
 * executive, and work runs through the five stages.
 *
 * Every 3 s the featured department rotates: its row goes active, a pulse runs up the spine to
 * the executive, its one-line outcome swaps in word by word, and the stages it works in light
 * in turn. Hovering a department (fine pointers) features it and pauses rotation. The card sits
 * in the page's one rotating conic border.
 *
 * HTML + CSS, so every label is real, indexable text. The server renders a static frame (the
 * first department featured), which is also what reduced motion shows.
 */

import { useEffect, useRef, useState } from "react";
import type { Department } from "@/lib/content/types";
import { hasFinePointer, usePlayable } from "./motion";

const DEPT_DOTS = ["bg-brand-500", "bg-accent-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500"];

const ROTATE_MS = 3000;
const HOVER_PAUSE_MS = 2500;
// Geometry (px) shared by the rows and the pulse: label block, row height, row gap.
const LIST_TOP = 48;
const ROW_H = 44;
const ROW_GAP = 6;
const rowCenter = (i: number) => LIST_TOP + i * (ROW_H + ROW_GAP) + ROW_H / 2;

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
  const pulseTop = rowCenter(featured);

  return (
    <div ref={ref} className="conic-frame rounded-[22px]">
      <div className="rounded-[20px] bg-white">
        {/* Window chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </span>
          <span className="mono-label text-slate-500">Your growth plan</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-emerald-700">
            Live
          </span>
        </div>

        <div className="p-5">
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <p className="mono-label text-slate-400">Leads your growth</p>
            <p className="font-display mt-1 text-lg font-bold">Forward-deployed growth executive</p>
          </div>

          <div className="relative">
            {/* The spine every department reports up */}
            <span aria-hidden className="absolute left-[11px] top-0 w-px bg-slate-300" style={{ height: rowCenter(departments.length - 1) }} />
            {playing && (
              <span
                key={featured}
                aria-hidden
                className="absolute left-[8px] h-[7px] w-[7px] animate-spine-pulse rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(255,0,102,0.15)]"
                style={{ top: pulseTop - 3, ["--dist" as string]: `${pulseTop}px` }}
              />
            )}

            <p className="mono-label flex h-[48px] items-end pb-2.5 pl-8 text-slate-400">Directs our own teams</p>
            <ul className="space-y-1.5 pl-8">
              {departments.map((d, i) => {
                const on = i === featured;
                return (
                  <li
                    key={d.title}
                    onPointerEnter={() => feature(i)}
                    className={`relative flex h-11 items-center justify-between gap-3 rounded-xl border px-3.5 transition-colors duration-300 ${
                      on ? "border-slate-900 bg-white" : "border-slate-200 bg-white"
                    }`}
                  >
                    <span aria-hidden className={`absolute -left-[21px] top-1/2 h-px w-[21px] ${on ? "bg-brand-400" : "bg-slate-300"}`} />
                    <span
                      aria-hidden
                      className={`absolute -left-[26px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-4 ring-white ${DEPT_DOTS[i % DEPT_DOTS.length]}`}
                    />
                    <span className={`text-sm font-semibold ${on ? "text-slate-900" : "text-slate-600"}`}>{d.title}</span>
                    <span
                      className={`rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-brand-700 transition-opacity duration-300 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!on}
                    >
                      Active
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The featured department's outcome, swapped word by word */}
          <p className="mt-4 min-h-[2.75rem] text-sm leading-snug text-slate-600" aria-live="off">
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

          <ol className="mt-3 flex flex-wrap items-center gap-1 border-t border-slate-200 pt-4 text-xs font-semibold">
            {stages.map((s, i) => {
              const lit = current.stages.includes(s);
              return (
                <li key={s} className="inline-flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-slate-300" aria-hidden>
                      →
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-1 transition-colors duration-500 ${lit ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}
                    style={{ transitionDelay: lit ? `${i * 140}ms` : "0ms" }}
                  >
                    {s}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
