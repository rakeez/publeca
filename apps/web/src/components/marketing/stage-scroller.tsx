"use client";

/**
 * The five stages, scroll-linked (home only). On large screens the stage list sticks on the
 * left with a rail that fills as you scroll; the stage nearest the middle of the screen is
 * active, and its card on the right comes into full ink. Clicking a stage in the list scrolls
 * to it. On phones it's a plain list. All cards are server-rendered, and without JavaScript
 * every card shows at full strength.
 */

import { useEffect, useRef, useState } from "react";

type Step = { title: string; body: string; deliverable?: string };

export function StageScroller({ steps, heading }: { steps: Step[]; heading: React.ReactNode }) {
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    setActive((a) => (a < 0 ? 0 : a));
    return () => io.disconnect();
  }, []);

  const fill = active < 0 ? 0 : (active + 1) / steps.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[400px_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {heading}
        <ol className="relative mt-10 hidden space-y-1 lg:block">
          <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-slate-200" />
          <span
            aria-hidden
            className="absolute left-[11px] top-3 w-px origin-top bg-brand-500 transition-transform duration-500 ease-out-expo"
            style={{ height: "calc(100% - 1.5rem)", transform: `scaleY(${fill})` }}
          />
          {steps.map((s, i) => {
            const on = i === active;
            const done = i <= active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className="relative flex w-full items-center gap-4 rounded-full py-2 pr-3 text-left"
                >
                  <span
                    className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] transition-colors duration-300 ${
                      done ? "bg-brand-500 text-white" : "bg-white text-slate-400 ring-1 ring-slate-300"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-display text-lg font-bold transition-colors duration-300 ${on ? "text-onyx" : "text-slate-400"}`}>{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <ol className="space-y-4">
        {steps.map((s, i) => {
          const on = active < 0 || i === active;
          return (
            <li
              key={s.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className={`rounded-3xl border bg-white p-7 transition-all duration-500 ease-out-expo md:p-9 lg:min-h-[15rem] ${
                on ? "border-slate-900 lg:opacity-100" : "border-slate-200 lg:opacity-45"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs ${on ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-bold text-onyx">{s.title}</span>
                </span>
                {s.deliverable && (
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">You get: {s.deliverable}</span>
                )}
              </div>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-600">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
