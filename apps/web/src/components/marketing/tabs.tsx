"use client";

/**
 * Tabs (playbook P2 / R4). A real ARIA tablist: arrow keys, Home and End move between tabs
 * with a roving tabindex; hover switches tabs on fine pointers only. Every panel is
 * server-rendered and passed in as a node (inactive ones carry `hidden`), so all of the text
 * is in the HTML and indexed.
 *
 * Layout: a vertical list beside the panel from lg up, a scrolling pill row above it below lg.
 */

import { useId, useRef, useState } from "react";
import { hasFinePointer } from "./motion";

export function PanelTabs({
  label,
  tabs,
  panels,
}: {
  /** Accessible name of the tab list. */
  label: string;
  tabs: { key: string; label: string; hint?: string }[];
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      focusTab(map[e.key]!);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr] lg:gap-8">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
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
              className={`group flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm font-bold transition-colors duration-150 lg:rounded-2xl lg:px-4 lg:py-3.5 ${
                on ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 lg:bg-transparent lg:ring-0 lg:hover:bg-slate-100"
              }`}
            >
              <span className={`hidden font-mono text-[11px] font-medium lg:inline ${on ? "text-brand-300" : "text-slate-400"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal">{t.label}</span>
            </button>
          );
        })}
      </div>

      {panels.map((panel, i) => (
        <div
          key={tabs[i]?.key ?? i}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-6 md:p-8"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
