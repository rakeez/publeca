"use client";

/**
 * Reader tabs (playbook P2 / R4). A real ARIA tablist: arrow keys, Home and End move between
 * tabs with a roving tabindex. Hover switches tabs on fine pointers only. Every panel is in
 * the server HTML (inactive ones carry `hidden`), so all of the text is indexed.
 */

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { hasFinePointer } from "./motion";

export interface ReaderTab {
  key: string;
  label: string;
  /** Who this panel is for. */
  name: string;
  /** The reader's value line, shown first in the panel. */
  value: string;
  /** Three or four deliverables. */
  points: { title: string; body: string }[];
  href: string;
  linkLabel: string;
}

export function ReaderTabs({ tabs }: { tabs: ReaderTab[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      focusTab(map[e.key]!);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Who we help"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onPointerEnter={() => hasFinePointer() && setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                on ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
            <div className="animate-fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{t.name}</p>
              <p className="font-display mt-3 text-2xl font-bold leading-snug tracking-tight text-slate-900 md:text-3xl">{t.value}</p>
              <div className="mt-6">
                <Link href={t.href} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition hover:text-brand-600">
                  {t.linkLabel} <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.points.map((p, j) => (
                <li
                  key={p.title}
                  className="animate-fade-up rounded-2xl bg-slate-50 p-5"
                  style={{ animationDelay: `${80 + j * 60}ms` }}
                >
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
