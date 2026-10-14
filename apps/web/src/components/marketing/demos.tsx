"use client";

/**
 * Deliverable micro-demos (playbook P3 / R5). Each is a short scripted loop of something a
 * client actually receives, or the ticketing platform's real behavior.
 *
 * - Every value comes from lib/content/demos.ts (sample data, no figures).
 * - The server renders the LAST step (the finished state); the loop starts from step 0
 *   only once the card is ≥25% visible, pauses off-screen and on a hidden tab, and never
 *   runs under reduced motion.
 * - Layout is plain responsive CSS rather than a fixed-size scaled stage: the choreography is
 *   rows, chips and bars, which reflow cleanly, and it keeps the finished state correct
 *   before any script runs.
 */

import type { DemoId } from "@/lib/content/types";
import {
  CAMPAIGNS,
  OPPORTUNITIES,
  READOUT,
  SALE_FLOW,
  SALE_FLOW_TECHNICAL,
  SEAT_MAP,
  TICKET_FLOW,
  opportunityScore,
} from "@/lib/content/demos";
import { usePlayable, useSequence } from "./motion";

const EASE = "ease-out-expo duration-700";

export function Demo({ id }: { id: DemoId }) {
  switch (id) {
    case "opportunity-map":
      return <OpportunityMap />;
    case "weekly-readout":
      return <WeeklyReadout />;
    case "verified-sale":
      return <VerifiedSale />;
    case "verified-sale-technical":
      return <VerifiedSaleTechnical />;
    case "verified-ticket":
      return <VerifiedTicket />;
    case "cost-per-sale":
      return <CostPerSale />;
    case "seat-hold":
      return <SeatHold />;
  }
}

// ─────────────────────────── Shared bits ───────────────────────────

function Dots({ n, tone }: { n: number; tone: "brand" | "accent" | "slate" }) {
  const on = tone === "brand" ? "bg-brand-500" : tone === "accent" ? "bg-accent-500" : "bg-slate-500";
  return (
    <span className="flex gap-[2px]" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-[5px] w-[5px] rounded-full ${i <= n ? on : "bg-slate-200"}`} />
      ))}
    </span>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${className}`} aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────── Opportunity map ───────────────────────────

const OPP_STEPS = [1400, 1600, 2800, 2600] as const; // unsorted → sorted → labelled → hold
const ROW_H = 74;

function Meter({ label, n, tone }: { label: string; n: number; tone: "brand" | "slate" }) {
  return (
    <span className="inline-flex items-center gap-1">
      {label}
      <Dots n={n} tone={tone} />
    </span>
  );
}

function OpportunityMap() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(OPP_STEPS, playing);

  const ranked = [...OPPORTUNITIES]
    .map((o, i) => ({ ...o, i }))
    .sort((a, b) => opportunityScore(b) - opportunityScore(a));
  const rankOf = new Map(ranked.map((o, r) => [o.i, r]));
  const sorted = step >= 1;
  const labelled = step >= 2;

  return (
    <div ref={ref}>
      <ol className="relative" style={{ height: OPPORTUNITIES.length * ROW_H }}>
        {OPPORTUNITIES.map((o, i) => {
          const rank = rankOf.get(i)!;
          const pos = sorted ? rank : i;
          const inPlan = labelled && rank < 3;
          const dropped = labelled && rank >= 3;
          return (
            <li
              key={o.name}
              className={`absolute inset-x-0 flex flex-col justify-center gap-1 rounded-xl border bg-white px-3 transition-all ${EASE} ${
                inPlan ? "border-slate-900" : "border-slate-200"
              } ${dropped ? "opacity-50" : "opacity-100"}`}
              style={{ top: pos * ROW_H, height: ROW_H - 6 }}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-semibold text-slate-900">{o.name}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.06em] transition-opacity duration-500 ${
                    labelled ? "opacity-100" : "opacity-0"
                  } ${inPlan ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-500"}`}
                >
                  {inPlan ? "In plan" : "Dropped"}
                </span>
              </span>
              <span className="flex items-center gap-x-2.5 whitespace-nowrap text-[10px] font-medium text-slate-400">
                <Meter label="Impact" n={o.impact} tone="brand" />
                <Meter label="Effort" n={o.effort} tone="slate" />
                <Meter label="Risk" n={o.risk} tone="slate" />
              </span>
              <span
                className={`truncate text-[11px] transition-opacity duration-500 ${labelled ? "opacity-100" : "opacity-0"} ${
                  inPlan ? "text-slate-600" : "text-slate-500"
                }`}
              >
                {inPlan ? `Owner: ${o.owner}` : "dropReason" in o ? `Why: ${o.dropReason}` : ""}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ─────────────────────────── Weekly read-out ───────────────────────────

const READOUT_STEPS = [700, 1500, 1500, 1500, 1500, 3200] as const;

function WeeklyReadout() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(READOUT_STEPS, playing);
  const shown = (n: number) => step >= n;

  return (
    <div ref={ref} className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <p className="text-[13px] font-semibold text-slate-900">Weekly read-out</p>
        <p className="text-[11px] font-medium text-slate-400">{READOUT.week}</p>
      </div>
      <ul className="mt-3 space-y-3">
        {READOUT.lines.map((l, i) => (
          <li
            key={l.label}
            className={`transition-all ${EASE} ${shown(i + 1) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-600">{l.label}</p>
            <p className="mt-0.5 text-[13px] leading-snug text-slate-700">
              {l.text}
              {step === i + 1 && <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-slate-400 align-middle" />}
            </p>
          </li>
        ))}
      </ul>
      <p
        className={`mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] leading-snug text-amber-800 transition-all ${EASE} ${
          shown(4) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span aria-hidden className="font-bold">!</span>
        {READOUT.flag}
      </p>
    </div>
  );
}

// ─────────────────────────── Click → verified sale ───────────────────────────

const SALE_STEPS = [700, 900, 900, 1100, 1500, 1600, 2600] as const;

function VerifiedSale() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(SALE_STEPS, playing);
  const lit = (n: number) => step >= n + 1;

  return (
    <div ref={ref} className="space-y-3">
      <ol className="space-y-2">
        {SALE_FLOW.steps.map((s, i) => {
          const isVerify = i === 2;
          const isSale = i === 3;
          return (
            <li
              key={s}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all ${EASE} ${
                lit(i)
                  ? isSale
                    ? "border-brand-200 bg-brand-50"
                    : "border-slate-200 bg-white"
                  : "border-slate-200 bg-white/60"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-500 ${
                  lit(i) ? (isSale ? "bg-brand-500 text-white" : isVerify ? "bg-emerald-500 text-white" : "bg-accent-500 text-white") : "bg-slate-100 text-slate-400"
                }`}
              >
                {isVerify && lit(i) ? <Tick /> : i + 1}
              </span>
              <span className={`text-[13px] font-semibold transition-colors duration-500 ${lit(i) ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
              {isSale && (
                <span
                  className={`ml-auto rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-brand-700 ring-1 ring-brand-100 transition-all ${EASE} ${
                    lit(i) ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Counted
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className={`text-[12px] font-medium text-slate-600 transition-opacity duration-500 ${step >= 4 ? "opacity-100" : "opacity-0"}`}>
        → {SALE_FLOW.sentTo}
      </p>
      <div
        className={`flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-slate-200 px-3 py-2.5 text-[12px] text-slate-500 transition-all ${EASE} ${
          step >= 5 ? "opacity-100" : "opacity-0"
        }`}
      >
        {SALE_FLOW.abandoned.steps.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-2">
            {i > 0 && <span className="text-slate-300">→</span>}
            <span className={i === SALE_FLOW.abandoned.steps.length - 1 ? "line-through decoration-slate-300" : ""}>{s}</span>
          </span>
        ))}
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600">
          {SALE_FLOW.abandoned.result}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────── Technical: one event, counted once ───────────────────────────

const TECH_STEPS = [700, 1000, 1100, 1100, 1100, 1500, 1600, 2600] as const;

function VerifiedSaleTechnical() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(TECH_STEPS, playing);

  return (
    <div ref={ref} className="rounded-xl bg-slate-950 p-4 font-mono text-[11.5px] leading-relaxed text-slate-300">
      <ol className="space-y-1.5">
        {SALE_FLOW_TECHNICAL.steps.map((s, i) => (
          <li
            key={s.event + s.where}
            className={`flex gap-2 transition-all ${EASE} ${step >= i + 1 ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
          >
            <span className={s.where === "server" ? "text-accent-300" : "text-brand-300"}>[{s.where}]</span>
            <span className="text-slate-100">{s.event}</span>
          </li>
        ))}
      </ol>
      <p
        className={`mt-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 px-2 py-1 text-emerald-300 transition-opacity duration-500 ${
          step >= 5 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Tick /> {SALE_FLOW_TECHNICAL.result}
      </p>
      <p className={`mt-3 border-t border-white/10 pt-3 text-slate-500 transition-opacity duration-500 ${step >= 6 ? "opacity-100" : "opacity-0"}`}>
        <span className="text-brand-300">[browser]</span> {SALE_FLOW_TECHNICAL.abandoned.event}{" "}
        <span className="text-slate-400">→ {SALE_FLOW_TECHNICAL.abandoned.result}</span>
      </p>
    </div>
  );
}

// ─────────────────────────── Events: ticket purchase teaches the ads ───────────────────────────

const TICKET_STEPS = [900, 800, 1000, 1200, 1000, 1600, 2800] as const;

function VerifiedTicket() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(TICKET_STEPS, playing);
  const pressed = step === 1;
  const checkout = step >= 2;
  const verifying = step === 3;
  const verified = step >= 4;
  const sent = step >= 5;

  return (
    <div ref={ref} className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="relative flex h-16 items-end overflow-hidden rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 p-2.5">
          <span className="absolute right-2 top-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">Live</span>
          <p className="text-[13px] font-bold text-white">{TICKET_FLOW.event}</p>
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-lg border border-slate-200 p-2.5">
          <div>
            <p className="text-[12px] font-semibold text-slate-900">{TICKET_FLOW.tier}</p>
            <p className="text-[11px] text-slate-500">Card or pay later</p>
          </div>
          <span
            className={`rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold text-white transition-transform duration-150 ${
              pressed ? "scale-[0.94]" : "scale-100"
            }`}
          >
            Buy
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all ${EASE} ${checkout ? "mt-2.5 max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2 text-[12px]">
            <span className="font-medium text-slate-700">Checkout</span>
            <span className="inline-flex items-center gap-1.5 font-semibold">
              {verifying && (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-accent-500" aria-hidden />
              )}
              {verified ? (
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <Tick /> Payment verified
                </span>
              ) : (
                <span className="text-slate-500">{verifying ? "Verifying payment" : "Paying"}</span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={`flex flex-wrap gap-2 transition-all ${EASE} ${sent ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
        {TICKET_FLOW.platforms.map((p) => (
          <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-semibold text-accent-700 ring-1 ring-accent-100">
            Purchase + ticket value → {p}
          </span>
        ))}
      </div>
      <p className={`text-[11.5px] text-slate-500 transition-opacity duration-500 ${step >= 6 ? "opacity-100" : "opacity-0"}`}>
        {TICKET_FLOW.abandoned}
      </p>
    </div>
  );
}

// ─────────────────────────── Cost per click → cost per sale ───────────────────────────

const CPS_STEPS = [1800, 900, 2000, 2800] as const; // by clicks → connect → re-rank → hold
const CPS_ROW = 54;

function CostPerSale() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(CPS_STEPS, playing);
  const connected = step >= 1;
  const byCost = step >= 2;

  const order = [...CAMPAIGNS]
    .map((c, i) => ({ ...c, i }))
    .sort((a, b) => (byCost ? a.costPerSale - b.costPerSale : b.clicks - a.clicks));
  const pos = new Map(order.map((c, r) => [c.i, r]));
  const worst = CAMPAIGNS.reduce((w, c, i) => (c.costPerSale > CAMPAIGNS[w]!.costPerSale ? i : w), 0);

  return (
    <div ref={ref}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="relative h-5 overflow-hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          <span className={`block transition-transform ${EASE} ${byCost ? "-translate-y-full" : "translate-y-0"}`}>
            <span className="block h-5 leading-5">Ranked by clicks</span>
            <span className="block h-5 leading-5 text-brand-600">Ranked by cost per sale</span>
          </span>
        </span>
        <span className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-600">
          Sales data
          <span className={`relative h-4 w-7 rounded-full transition-colors duration-300 ${connected ? "bg-emerald-500" : "bg-slate-300"}`} aria-hidden>
            <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all duration-300 ${connected ? "left-3.5" : "left-0.5"}`} />
          </span>
        </span>
      </div>
      <ol className="relative" style={{ height: CAMPAIGNS.length * CPS_ROW }}>
        {CAMPAIGNS.map((c, i) => {
          const value = byCost ? c.costPerSale : c.clicks;
          const flagged = step >= 3 && i === worst;
          return (
            <li
              key={c.name}
              className={`absolute inset-x-0 rounded-xl border bg-white px-3 py-2 transition-all ${EASE} ${
                flagged ? "border-brand-200" : "border-slate-200"
              }`}
              style={{ top: pos.get(i)! * CPS_ROW, height: CPS_ROW - 6 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[12.5px] font-semibold text-slate-900">{c.name}</span>
                {flagged && <span className="shrink-0 text-[10.5px] font-semibold text-brand-600">Most clicks, fewest sales</span>}
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                <div
                  className={`h-1.5 rounded-full transition-all ${EASE} ${byCost ? "bg-brand-400" : "bg-accent-400"}`}
                  style={{ width: `${Math.round(value * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-1 text-[11px] text-slate-400">{byCost ? "Shorter bar = cheaper sale" : "Longer bar = more clicks"}</p>
    </div>
  );
}

// ─────────────────────────── Seat holds ───────────────────────────

const SEAT_STEPS = [1200, 1800, 1500, 1500, 2600] as const; // base → held → paid → expired → hold

function SeatHold() {
  const { ref, playing } = usePlayable<HTMLDivElement>();
  const step = useSequence(SEAT_STEPS, playing);
  const sold = new Set<number>(SEAT_MAP.sold);
  const held = new Set<number>();
  if (step >= 1) SEAT_MAP.held.forEach((s) => held.add(s));
  if (step >= 2) SEAT_MAP.paid.forEach((s) => (held.delete(s), sold.add(s)));
  if (step >= 3) SEAT_MAP.expired.forEach((s) => held.delete(s));

  const caption =
    step === 1 ? "Held while buyers pay" : step === 2 ? "Paid: now sold" : step >= 3 ? "Abandoned hold released" : "On sale";

  return (
    <div ref={ref}>
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="mx-auto mb-3 h-1.5 w-full max-w-[190px] rounded-full bg-slate-200" title="Stage" />
        <div className="mx-auto grid max-w-[280px] gap-1.5" style={{ gridTemplateColumns: `repeat(${SEAT_MAP.cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: SEAT_MAP.rows * SEAT_MAP.cols }, (_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-[4px] transition-colors duration-500 ${
                held.has(i) ? "bg-amber-400" : sold.has(i) ? "bg-brand-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="flex gap-3">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-slate-200" /> Available</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-amber-400" /> Held</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-brand-500" /> Sold</span>
        </span>
        <span className="font-semibold text-slate-700">{caption}</span>
      </div>
    </div>
  );
}
