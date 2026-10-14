"use client";

/**
 * The home hero (user direction 2026-10-14; playbook §4.4 / P1 / R3, modeled on Surge's hero).
 * One full-width section in stacked horizontal blocks:
 *
 *   1. the headline block (server-rendered, passed in as children)
 *   2. the flow band: a particle canvas behind the whole hero. Five department streams enter
 *      from the left, converge on the forward-deployed growth executive, and run as one spine
 *      through the five stages to "revenue you can see"
 *   3. the explainer: who it's for → what you get → how it's done, one reader at a time
 *
 * The band and the explainer share one state: the featured reader. Its teams' streams brighten,
 * the rest dim, and the stages light in a wave. The reader auto-advances when the timer bar
 * fills; hovering the explainer pauses it; clicking a reader or hovering a team takes over.
 *
 * Canvas rules (playbook §4.4, §10.6): DPR capped at 2; the loop stops off-screen and on a
 * hidden tab; frame time clamped to 48 ms; fills batched by color; reduced motion draws one
 * static frame and never auto-advances. Every label is real HTML over the canvas. Geometry is
 * pure and tested in lib/hero-flow.ts.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Department, HeroAudience } from "@/lib/content/types";
import { layoutFlow, particleAt, type FlowLayout } from "@/lib/hero-flow";
import { hasFinePointer, prefersReducedMotion } from "./motion";

const DEPT_RGB = ["255,0,102", "99,91,255", "14,165,233", "16,185,129", "245,158,11"];
const DEPT_DOTS = ["bg-brand-500", "bg-accent-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500"];
const ROTATE_MS = 6000;
const REPEL_RADIUS = 90;

type Layout = FlowLayout & { width: number; height: number; compact: boolean; labelX: number };

export function HeroFlow({
  audiences,
  departments,
  stages,
  children,
}: {
  audiences: HeroAudience[];
  departments: Department[];
  stages: string[];
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [active, setActive] = useState(0);
  const [hoverTeam, setHoverTeam] = useState<number | null>(null);
  const [motionOk, setMotionOk] = useState(false);
  const [visible, setVisible] = useState(true);

  const a = audiences[active]!;
  const lit = departments.map((d, i) => (hoverTeam === null ? a.teams.includes(d.title) : hoverTeam === i));

  // Shared with the animation loop without restarting it.
  const litRef = useRef(lit);
  litRef.current = lit;
  const layoutRef = useRef<Layout | null>(null);
  layoutRef.current = layout;

  // ── Measure: canvas covers the section; the flow lives in the band ──
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const band = bandRef.current;
    if (!section || !band) return;
    const measure = () => {
      const width = section.clientWidth;
      const height = section.clientHeight;
      const compact = width < 768;
      // Labels align with the page container's edges (1200px max, 24px gutter).
      const labelX = Math.max(16, (width - 1200) / 2 + 24);
      // Keep the spine's right end clear for the "Revenue you can see" label.
      const insetRight = compact ? 16 : labelX + 190;
      const flow = layoutFlow(width, { top: band.offsetTop, height: band.offsetHeight }, departments.length, stages.length, compact, insetRight);
      setLayout({ ...flow, width, height, compact, labelX });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    return () => ro.disconnect();
  }, [departments.length, stages.length]);

  useEffect(() => {
    setMotionOk(!prefersReducedMotion());
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.05 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // ── The particle loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section || !layout) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(layout.width * dpr);
    canvas.height = Math.round(layout.height * dpr);
    canvas.style.width = `${layout.width}px`;
    canvas.style.height = `${layout.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const perStream = layout.compact ? 90 : 240;
    const n = perStream * departments.length;
    const stream = new Uint8Array(n);
    const prog = new Float32Array(n);
    const speed = new Float32Array(n);
    const offset = new Float32Array(n);
    const size = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      stream[i] = i % departments.length;
      prog[i] = Math.random() * 2;
      speed[i] = 0.1 + Math.random() * 0.08;
      offset[i] = (Math.random() * 2 - 1) * Math.random();
      size[i] = Math.random() < 0.8 ? 2 : 3;
    }
    const alpha = departments.map((_, i) => (litRef.current[i] ? 1 : 0.2));
    const pointer = { x: -9999, y: -9999 };
    const finePointer = hasFinePointer();

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    if (finePointer) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    }

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, layout.width, layout.height);
      // Ease each stream's brightness toward its target (featured streams lit, others dim).
      for (let s = 0; s < alpha.length; s++) {
        const target = litRef.current[s] ? 1 : 0.22;
        alpha[s]! += (target - alpha[s]!) * Math.min(1, dt * 4);
      }
      const repelled: number[] = [];
      for (let s = 0; s < departments.length; s++) {
        // Curve particles in the stream color; spine particles a little softer.
        for (const onSpine of [false, true]) {
          ctx.fillStyle = `rgba(${DEPT_RGB[s % DEPT_RGB.length]},${(alpha[s]! * (onSpine ? 0.7 : 0.9)).toFixed(3)})`;
          for (let i = s; i < n; i += departments.length) {
            if (prog[i]! > 1 !== onSpine) continue;
            const pt = particleAt(layout, s, prog[i]!, offset[i]!);
            const dx = pt.x - pointer.x;
            const dy = pt.y - pointer.y;
            if (dx * dx + dy * dy < REPEL_RADIUS * REPEL_RADIUS) {
              repelled.push(i);
              continue;
            }
            ctx.fillRect(pt.x, pt.y, size[i]!, size[i]!);
          }
        }
      }
      // Particles near the cursor are pushed away and turn brand pink.
      if (repelled.length) {
        ctx.fillStyle = "rgba(255,0,102,0.9)";
        for (const i of repelled) {
          const pt = particleAt(layout, stream[i]!, prog[i]!, offset[i]!);
          const dx = pt.x - pointer.x;
          const dy = pt.y - pointer.y;
          const d = Math.max(1, Math.hypot(dx, dy));
          const push = ((REPEL_RADIUS - d) / REPEL_RADIUS) * 28;
          ctx.fillRect(pt.x + (dx / d) * push, pt.y + (dy / d) * push, size[i]! + 0.4, size[i]! + 0.4);
        }
      }
    };

    // Reduced motion, or off-screen: one static frame.
    if (!motionOk || !visible) {
      draw(1);
      return () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    }

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last) / 1000;
      last = now;
      if (document.visibilityState === "visible") {
        for (let i = 0; i < n; i++) {
          prog[i]! += speed[i]! * dt;
          if (prog[i]! > 2) {
            prog[i] = 0;
            offset[i] = (Math.random() * 2 - 1) * Math.random();
          }
        }
        draw(dt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [layout, motionOk, visible, departments.length]);

  const autoplay = motionOk && visible;

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-white">
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />

      {/* 1 · Headline block */}
      {children}

      {/* 2 · Flow band: department labels, the executive node, the stages, the outcome */}
      <div ref={bandRef} className="relative h-[240px] md:h-[300px]">
        {layout && (
          <>
            {departments.map((d, i) => {
              const y = layout.streams[i]!.p0.y - (bandRef.current?.offsetTop ?? 0);
              return (
                <button
                  key={d.title}
                  type="button"
                  onPointerEnter={() => hasFinePointer() && setHoverTeam(i)}
                  onPointerLeave={() => setHoverTeam(null)}
                  onFocus={() => setHoverTeam(i)}
                  onBlur={() => setHoverTeam(null)}
                  className={`absolute hidden -translate-y-1/2 items-center gap-2 rounded-full border bg-white/95 px-3 py-1.5 text-xs font-bold transition-all duration-500 md:inline-flex ${
                    lit[i] ? "border-slate-900 text-slate-900" : "border-slate-200 text-slate-400"
                  }`}
                  style={{ left: layout.labelX, top: y }}
                >
                  <span className={`h-2 w-2 rounded-full ${lit[i] ? DEPT_DOTS[i % DEPT_DOTS.length] : "bg-slate-300"}`} />
                  {d.title}
                </button>
              );
            })}

            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 px-4 py-2 text-center text-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)]"
              style={{ left: layout.node.x, top: layout.node.y - (bandRef.current?.offsetTop ?? 0) }}
            >
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.08em] text-slate-400">Leads it</span>
              <span className="font-display block whitespace-nowrap text-sm font-bold">
                {layout.compact ? "Growth executive" : "Forward-deployed growth executive"}
              </span>
            </div>

            {/* Stage modules: a dot-matrix block on the spine, its name beneath */}
            {stages.map((s, i) => (
              <span
                key={s}
                className="absolute flex -translate-x-1/2 flex-col items-center"
                style={{ left: layout.stages[i]!.x, top: layout.stages[i]!.y - (bandRef.current?.offsetTop ?? 0) - 13 }}
              >
                <span className="stage-module dot-matrix h-[22px] w-[22px] rounded-md border border-slate-200 bg-white md:h-[26px] md:w-[26px]" style={{ ["--i" as string]: i }} />
                <span className="mt-2 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-slate-500">
                  <span className="text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ml-1 hidden md:inline">{s}</span>
                </span>
              </span>
            ))}

            {!layout.compact && (
              <span
                className="absolute -translate-y-1/2 translate-x-[-100%] whitespace-nowrap rounded-full bg-brand-500 px-3.5 py-2 text-xs font-bold text-white shadow-[0_8px_24px_-8px_rgba(255,0,102,0.6)]"
                style={{ left: layout.width - Math.max(16, (layout.width - 1200) / 2 + 24), top: layout.node.y - (bandRef.current?.offsetTop ?? 0) }}
              >
                Revenue you can see
              </span>
            )}
          </>
        )}
        {/* Text alternative for the picture above */}
        <span className="sr-only">
          Five in-house teams ({departments.map((d) => d.title).join(", ")}) report to one forward-deployed growth executive, and the
          work runs through {stages.join(", ")} to revenue you can see.
        </span>
      </div>

      {/* 3 · Explainer: who → what → how */}
      <Explainer audiences={audiences} departments={departments} active={active} setActive={setActive} lit={lit} autoplay={autoplay} />
    </section>
  );
}

function Explainer({
  audiences,
  departments,
  active,
  setActive,
  lit,
  autoplay,
}: {
  audiences: HeroAudience[];
  departments: Department[];
  active: number;
  setActive: (i: number) => void;
  lit: boolean[];
  autoplay: boolean;
}) {
  const [cycle, setCycle] = useState(0);
  const [held, setHeld] = useState(false); // a click stops auto-advance
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const a = audiences[active]!;

  // Sliding selection behind the active reader.
  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);
  useEffect(() => {
    const onResize = () => {
      const el = tabRefs.current[active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const go = (i: number) => {
    setActive((i + audiences.length) % audiences.length);
    setCycle((c) => c + 1);
  };

  const litTeams = departments.filter((_, i) => lit[i]);

  return (
    <div className="relative px-6 pb-16 md:pb-24">
      <div className="hero-explainer group mx-auto max-w-page rounded-3xl border border-slate-200 bg-white/95 shadow-[0_30px_60px_-30px_rgba(9,12,29,0.25)] backdrop-blur">
        {/* Reader selector + auto-advance timer */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="-mx-1 overflow-x-auto px-1 [&::-webkit-scrollbar]:hidden">
          <div className="relative flex w-max gap-1 rounded-full bg-slate-100 p-1" role="group" aria-label="Who it's for">
            {pill && (
              <span
                aria-hidden
                className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-slate-900 transition-all duration-500 ease-out-expo"
                style={{ left: pill.left, width: pill.width }}
              />
            )}
            {audiences.map((x, i) => (
              <button
                key={x.segment}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  setHeld(true);
                  if (i !== active) go(i);
                }}
                className={`relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-colors duration-300 md:px-4 ${
                  i === active ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="mono-label text-slate-400">
              {String(active + 1).padStart(2, "0")} / {String(audiences.length).padStart(2, "0")}
            </span>
            <div className="h-1 w-28 overflow-hidden rounded-full bg-slate-100" aria-hidden>
              {autoplay && !held && (
                <span
                  key={cycle}
                  className="hero-progress block h-full origin-left animate-[progress-fill_6s_linear_both] bg-brand-500"
                  onAnimationEnd={() => go(active + 1)}
                />
              )}
            </div>
            <span className="hidden gap-1 sm:flex">
              <button type="button" aria-label="Previous reader" onClick={() => (setHeld(true), go(active - 1))} className={ARROW}>
                ←
              </button>
              <button type="button" aria-label="Next reader" onClick={() => (setHeld(true), go(active + 1))} className={ARROW}>
                →
              </button>
            </span>
          </div>
        </div>

        {/* Who → What → How, side by side */}
        <div className="grid divide-y divide-slate-200 md:grid-cols-[1fr_1.15fr_1.35fr] md:divide-x md:divide-y-0" aria-live={held ? "polite" : "off"}>
          <Column n="01" label="Who it's for" delay={0} k={active}>
            <p className="font-display text-xl font-bold leading-snug text-onyx">{a.label}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{a.need}</p>
          </Column>

          <Column n="02" label="What you get" delay={90} k={active} arrow>
            <p className="text-[17px] font-semibold leading-snug text-slate-900">
              {a.gets.split(" ").map((w, i) => (
                <span key={`${active}-${i}`} className="inline-block overflow-hidden align-bottom">
                  <span className="inline-block animate-word-in" style={{ animationDelay: `${120 + i * 26}ms` }}>
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </p>
          </Column>

          <Column n="03" label="How it's done" delay={180} k={active} arrow>
            <p className="text-sm text-slate-600">
              A <strong className="text-slate-900">forward-deployed growth executive</strong> leads it inside your business, directing:
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {litTeams.map((d, i) => {
                const idx = departments.indexOf(d);
                return (
                  <li
                    key={`${active}-${d.title}`}
                    className="inline-flex animate-pop-in items-center gap-1.5 rounded-full border border-slate-900 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900"
                    style={{ animationDelay: `${260 + i * 110}ms` }}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${DEPT_DOTS[idx % DEPT_DOTS.length]}`} aria-hidden />
                    {d.title}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
              <span className="rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-brand-700">
                Starts with
              </span>
              <span className="font-bold text-slate-900">{a.start}</span>
              <span className="text-slate-500">{a.shape}</span>
            </p>
          </Column>
        </div>
      </div>
    </div>
  );
}

const ARROW =
  "flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900";

function Column({
  n,
  label,
  delay,
  k,
  arrow = false,
  children,
}: {
  n: string;
  label: string;
  delay: number;
  k: number;
  arrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-5 md:p-7">
      {/* The step arrow on the divider between columns */}
      {arrow && (
        <span
          aria-hidden
          className="absolute -left-3.5 top-7 z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs text-slate-500 md:flex"
        >
          →
        </span>
      )}
      <p className="mono-label flex items-center gap-2 text-slate-400">
        <span className="flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-slate-300 text-[9px]">{n}</span>
        {label}
      </p>
      <div key={k} className="mt-4 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}
