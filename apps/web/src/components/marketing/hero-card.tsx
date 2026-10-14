"use client";

/**
 * The home hero card: who we serve, what each gets, and how it's delivered, in one product
 * window (user direction, 2026-10-14; playbook P1; docs/design-system.md).
 *
 *   01 Who it's for     three readers as pills; their need in their own words
 *   02 What you get     the value for that reader
 *   03 How it's done    the forward-deployed growth executive, the in-house teams involved,
 *                       and the package it starts with
 *
 * Every 4.5 s the featured reader rotates: a dot runs down the 01 → 03 rail, the value line
 * swaps word by word, and that reader's teams light up in turn. Clicking or hovering a reader
 * (fine pointers) features it and pauses the rotation. The card sits in the page's one
 * rotating conic border.
 *
 * All text is real HTML. The server renders the first reader, which is also what reduced
 * motion shows (no auto-rotation); the pills still switch readers on click.
 */

import { useEffect, useRef, useState } from "react";
import type { Department, HeroAudience } from "@/lib/content/types";
import { hasFinePointer, usePlayable } from "./motion";

const DEPT_DOTS = ["bg-brand-500", "bg-accent-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500"];
const ROTATE_MS = 4500;
const PAUSE_MS = 7000;
/** Top of the 01 marker inside the card body (its pt-5). Marker centers sit 12px lower. */
const FIRST_MARKER_TOP = 20;

export function HeroCard({ audiences, departments }: { audiences: HeroAudience[]; departments: Department[] }) {
  const { ref, playing } = usePlayable<HTMLDivElement>(0.3);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // bumps on every change, to replay the rail dot
  const pausedUntil = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastMarker = useRef<HTMLSpanElement>(null);
  const [railH, setRailH] = useState(0);

  // Distance from the 01 marker to the 03 marker, for the dot that runs down the rail.
  useEffect(() => {
    const body = bodyRef.current;
    const last = lastMarker.current;
    if (!body || !last) return;
    const measure = () => setRailH(last.getBoundingClientRect().top - body.getBoundingClientRect().top - FIRST_MARKER_TOP);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(body);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setActive((a) => (a + 1) % audiences.length);
      setCycle((c) => c + 1);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [playing, audiences.length]);

  const choose = (i: number) => {
    pausedUntil.current = Date.now() + PAUSE_MS;
    if (i !== active) {
      setActive(i);
      setCycle((c) => c + 1);
    }
  };

  const a = audiences[active]!;
  const lit = departments.map((d) => a.teams.includes(d.title));
  const litOrder = departments.filter((d) => a.teams.includes(d.title)).map((d) => d.title);

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

        <div ref={bodyRef} className="relative px-5 pb-5 pt-5">
          {/* The dot that runs down the 01 → 03 rail on each change */}
          {playing && cycle > 0 && railH > 0 && (
            <span aria-hidden className="pointer-events-none absolute left-[32px] z-10 w-px" style={{ top: FIRST_MARKER_TOP + 12, height: railH }}>
              <span
                key={cycle}
                className="absolute -left-[3px] -mt-[3px] h-[7px] w-[7px] animate-rail-flow rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(255,0,102,0.15)]"
              />
            </span>
          )}

          {/* 01 Who it's for */}
          <Step n="01" label="Who it's for">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Who it's for">
              {audiences.map((x, i) => {
                const on = i === active;
                return (
                  <button
                    key={x.segment}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(i)}
                    onPointerEnter={() => hasFinePointer() && choose(i)}
                    className={`rounded-full px-3 py-1.5 text-[13px] font-bold transition-colors duration-200 ${
                      on ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {x.label}
                  </button>
                );
              })}
            </div>
            <p key={`need-${active}`} className="mt-2.5 animate-fade-up text-[13.5px] leading-snug text-slate-500">
              {a.need}
            </p>
          </Step>

          {/* 02 What you get */}
          <Step n="02" label="What you get">
            <p key={`gets-${active}`} className="min-h-[3.9rem] text-[15px] font-semibold leading-snug text-slate-900">
              {a.gets.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <span className="inline-block animate-word-in" style={{ animationDelay: `${i * 28}ms` }}>
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </p>
          </Step>

          {/* 03 How it's done */}
          <Step n="03" label="How it's done" last markerRef={lastMarker}>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
              <p className="mono-label text-slate-400">Leads it, inside your business</p>
              <p className="font-display mt-0.5 text-base font-bold">Forward-deployed growth executive</p>
            </div>
            <p className="mono-label mt-3 text-slate-400">Directs our own teams</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {departments.map((d, i) => {
                const on = lit[i];
                const order = litOrder.indexOf(d.title);
                return (
                  <li
                    key={d.title}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-500 ${
                      on ? "bg-white text-slate-900 ring-1 ring-slate-900" : "bg-slate-100 text-slate-400"
                    }`}
                    style={{ transitionDelay: on ? `${200 + order * 160}ms` : "0ms" }}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${on ? DEPT_DOTS[i % DEPT_DOTS.length] : "bg-slate-300"}`} aria-hidden />
                    {d.title}
                  </li>
                );
              })}
            </ul>
            <p key={`start-${active}`} className="mt-3.5 flex animate-fade-up flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-200 pt-3.5 text-[13px]">
              <span className="rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-brand-700">
                Starts with
              </span>
              <span className="font-bold text-slate-900">{a.start}</span>
              <span className="text-slate-500">{a.shape}</span>
            </p>
          </Step>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  label,
  last = false,
  markerRef,
  children,
}: {
  n: string;
  label: string;
  last?: boolean;
  markerRef?: React.Ref<HTMLSpanElement>;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative pl-11 ${last ? "" : "pb-5"}`}>
      {/* Rail segment down to the next step's marker */}
      {!last && <span aria-hidden className="absolute bottom-0 left-3 top-6 w-px bg-slate-200" />}
      <span ref={markerRef} className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-[10px] font-medium text-slate-500 ring-1 ring-slate-300">
        {n}
      </span>
      <p className="mono-label flex h-6 items-center text-slate-400">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
