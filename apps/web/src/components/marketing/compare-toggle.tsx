"use client";

/**
 * "Three vendors vs one firm": the problem section's thesis as something the reader can flip.
 * Before: three separate vendors with broken handovers between them. After: the same three
 * pieces of work slide together inside one firm, joined by one plan.
 *
 * It flips to "One firm" once on its own, shortly after it scrolls into view (motion allowed),
 * then it's the reader's to toggle. The server renders the "before" state with all text from
 * both states in the HTML.
 */

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/lib/content/types";
import { prefersReducedMotion } from "./motion";

type Compare = HomeContent["problem"]["compare"];

export function CompareToggle({ compare }: { compare: Compare }) {
  const [merged, setMerged] = useState(false);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && !touched.current) {
          timer = setTimeout(() => {
            if (!touched.current) setMerged(true);
          }, 1400);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const set = (v: boolean) => {
    touched.current = true;
    setMerged(v);
  };

  return (
    <div ref={ref}>
      <div className="flex justify-center">
        <div className="relative inline-flex rounded-full bg-slate-100 p-1" role="group" aria-label="Compare">
          <span
            aria-hidden
            className={`absolute top-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full transition-all duration-500 ease-out-expo ${
              merged ? "left-[50%] bg-brand-500" : "left-1 bg-slate-900"
            }`}
          />
          {[compare.beforeLabel, compare.afterLabel].map((label, i) => {
            const on = (i === 1) === merged;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => set(i === 1)}
                className={`relative z-10 min-w-[8.5rem] rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  on ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`mt-10 rounded-3xl transition-all duration-700 ease-out-expo ${
          merged ? "bg-slate-900 p-3 md:p-4" : "bg-transparent p-0"
        }`}
      >
        <div
          className={`flex items-center justify-between px-3 pb-3 pt-1 transition-all duration-500 ${
            merged ? "max-h-12 opacity-100" : "max-h-0 overflow-hidden pb-0 pt-0 opacity-0"
          }`}
          aria-hidden={!merged}
        >
          <span className="mono-label text-slate-400">Publeca · one growth plan</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-emerald-300">One owner</span>
        </div>

        <div className={`grid transition-all duration-700 ease-out-expo md:grid-cols-3 ${merged ? "gap-2" : "gap-4 md:gap-12"}`}>
          {compare.pieces.map((p, i) => (
            <div key={p.who} className="relative">
              {/* The handover between pieces: broken when bought separately, joined when owned */}
              {i > 0 && (
                <span
                  aria-hidden
                  className={`absolute top-1/2 hidden -translate-y-1/2 items-center justify-center transition-all duration-700 md:flex ${
                    merged ? "-left-2 w-2" : "-left-12 w-12"
                  }`}
                >
                  <span
                    className={`h-px w-full transition-all duration-700 ${merged ? "bg-brand-500" : "border-t-2 border-dashed border-slate-300 bg-transparent"}`}
                  />
                  {!merged && (
                    <span className="absolute rounded-full border border-slate-200 bg-white px-1.5 font-mono text-[10px] text-slate-400">✕</span>
                  )}
                </span>
              )}
              <div
                className={`h-full rounded-2xl border p-6 transition-colors duration-500 ${
                  merged ? "border-white/10 bg-white text-slate-900" : "border-slate-200 bg-white"
                }`}
              >
                <p className="mono-label text-slate-400">{merged ? `Our ${p.does.toLowerCase()} team` : p.who}</p>
                <p className="font-display mt-2 text-xl font-bold text-onyx">{p.does}</p>
                <p className={`mt-3 flex items-start gap-2 text-sm leading-relaxed ${merged ? "text-emerald-700" : "text-slate-500"}`}>
                  <span aria-hidden className="mt-0.5">{merged ? "✓" : "✕"}</span>
                  <span>
                    <span className={merged ? "hidden" : ""}>{p.before}</span>
                    <span className={merged ? "" : "hidden"}>{p.after}</span>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p key={String(merged)} className="mx-auto mt-8 max-w-2xl animate-fade-up text-center text-lg font-semibold text-onyx">
        {merged ? compare.afterResult : compare.beforeResult}
      </p>
    </div>
  );
}
