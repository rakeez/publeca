"use client";

/**
 * Motion runtime for the marketing site (playbook §10.3–10.6).
 *
 * Rules every piece of motion here follows:
 * - The server renders the finished state. Motion only delivers it.
 * - prefers-reduced-motion shows the finished state with no movement.
 * - Loops stop off-screen and when the tab is hidden.
 * - Hover behavior is gated to fine pointers.
 */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// ─────────────────────────── Scroll reveal + CTA attribution ───────────────────────────

/**
 * Mounted once in the marketing layout.
 * 1. Scroll reveal: adds .is-in to [data-reveal] elements as they enter the viewport.
 * 2. CTA-source attribution: a click on any [data-cta] element pushes
 *    { event: "cta_click", cta_source, cta_label, page } to window.dataLayer, so whichever
 *    analytics tag is installed can report which section persuaded the reader.
 */
export function MarketingMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reveal = (el: Element) => el.classList.add("is-in");
    const pending = () => Array.from(document.querySelectorAll("[data-reveal]:not(.is-in):not(.is-shown)"));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      pending().forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const scan = () => {
      const firstPaint = !root.classList.contains("reveal-ready");
      for (const el of pending()) {
        // Anything already on screen at load is shown as-is (no animation), so nothing visible
        // ever blinks out or replays when the page hydrates.
        const r = el.getBoundingClientRect();
        if (firstPaint && r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-shown");
        else io.observe(el);
      }
    };

    scan();
    root.classList.add("reveal-ready");

    // Client-side navigations and late-mounted sections (batched to one scan per frame).
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cta]");
      if (!el) return;
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "cta_click",
        cta_source: el.getAttribute("data-cta"),
        cta_label: (el.textContent ?? "").trim().slice(0, 80),
        page: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

// ─────────────────────────── Visibility-gated loops ───────────────────────────

/**
 * True while the element is at least `threshold` visible AND the tab is visible AND motion
 * is allowed. Demos and the hero diagram only run while this is true.
 */
export function usePlayable<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, playing: inView && tabVisible && motionOk, motionOk };
}

/**
 * Steps through a scripted sequence while `playing`, then loops. Returns the current step.
 * Before it first plays (and under reduced motion) it returns `finalStep`, so the server
 * render and the no-motion view both show the finished state.
 */
export function useSequence(durations: readonly number[], playing: boolean) {
  const last = durations.length - 1;
  const [step, setStep] = useState(last);
  const at = useRef(last);
  const started = useRef(false);

  useEffect(() => {
    if (!playing) return;
    // First play starts from the top; after a pause it resumes where it stopped.
    const from = started.current ? at.current : 0;
    started.current = true;
    let timer: ReturnType<typeof setTimeout>;
    const show = (n: number) => {
      at.current = n;
      setStep(n);
      timer = setTimeout(() => show((n + 1) % durations.length), durations[n]);
    };
    show(from);
    return () => clearTimeout(timer);
    // durations is a static script per demo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return step;
}

// ─────────────────────────── Cursor spotlight (R2) ───────────────────────────

/** Wraps a hero section. Writes the pointer position to CSS variables inside rAF. */
export function Spotlight({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      });
    };
    const enter = () => el.classList.add("is-active");
    const leave = () => el.classList.remove("is-active");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={ref} className={`spotlight relative isolate overflow-hidden ${className}`}>
      {children}
    </section>
  );
}
