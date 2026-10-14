import Link from "next/link";
import type { Cta, FAQ } from "@/lib/content/types";
import { ctaHref, isExternalCta } from "@/lib/brand";
import { JsonLd } from "@/components/json-ld";

/*
 * Marketing UI primitives, built to docs/design-system.md: white canvas, grayscale, flat
 * cards defined by 1px borders (no shadow stacks), 9999px pills for every button, tag and
 * badge, Plus Jakarta Sans display at tight tracking, mono uppercase meta labels.
 * Pink (brand-500) stays the brand color and the primary CTA fill.
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

// ─────────────────────────── Buttons ───────────────────────────

type Variant = "primary" | "dark" | "secondary" | "quiet" | "inverse";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  dark: "bg-slate-900 text-white hover:bg-black",
  // Ghost outline: 1px default border.
  secondary: "border border-slate-200 bg-white text-slate-900 hover:border-slate-400",
  // Low-pressure style for investor-facing CTAs.
  quiet: "border border-slate-300 bg-transparent text-slate-900 hover:border-slate-600",
  inverse: "bg-white text-slate-900 hover:bg-slate-100",
};

/** Class string for a link styled as a button (for plain <Link>/<a> secondaries). */
export const buttonClass = (variant: Variant = "secondary", size: "md" | "lg" = "lg") =>
  `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-150 ${
    size === "lg" ? "px-6 py-3 text-[15px]" : "px-5 py-2.5 text-sm"
  } ${VARIANTS[variant]}`;

export function CtaButton({
  cta,
  variant = "primary",
  size = "md",
  className = "",
  source,
}: {
  cta: Cta;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  /** Where on the page this CTA sits (hero, demos, commitments, closing…). See MarketingMotion. */
  source?: string;
}) {
  const href = ctaHref(cta);
  const tag = source ? { "data-cta": source } : {};
  const cls = `${buttonClass(variant, size)} ${className}`;

  if (cta.href) {
    return (
      <Link href={href} className={cls} {...tag}>
        {cta.label}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...tag} {...(isExternalCta(cta) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {cta.label}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 transition-colors hover:text-brand-600">
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

// ─────────────────────────── Layout helpers ───────────────────────────

/** Item class for children of ScrollRow: a swipeable card on phones, a grid cell from md up. */
export const scrollItem = "min-w-[82%] snap-start sm:min-w-[55%] md:min-w-0";

const GRID: Record<2 | 3 | 4 | 5, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-3 lg:grid-cols-5",
};

/** Horizontally scrollable (snap) row on small screens; a grid on md+. */
export function ScrollRow({ cols, children, className = "" }: { cols: 2 | 3 | 4 | 5; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 ${GRID[cols]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-6 ${className}`}>{children}</div>;
}

/** Mono uppercase meta label with a brand dot: section eyebrows, card kickers. */
export function Eyebrow({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "light" }) {
  return (
    <p className={`mono-label inline-flex items-center gap-2 ${tone === "light" ? "text-slate-400" : "text-slate-500"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
      {children}
    </p>
  );
}

type PillTone = "brand" | "violet" | "green" | "neutral" | "dark";
const PILL: Record<PillTone, string> = {
  brand: "bg-brand-50 text-brand-700",
  violet: "bg-accent-50 text-accent-700",
  green: "bg-emerald-50 text-emerald-700",
  neutral: "bg-slate-100 text-slate-600",
  dark: "bg-white/10 text-white",
};

/** Status pill (mono, 9999px): stage numbers, "in plan", department badges. */
export function StatusPill({ tone = "neutral", children, className = "" }: { tone?: PillTone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] ${PILL[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Section heading. `headingDim` makes it a two-tone heading (playbook R1): one sentence, the
 * resolving clause in muted ink. Still one <h2>, read as one sentence by screen readers.
 */
export function SectionHeading({
  eyebrow,
  heading,
  headingDim,
  intro,
  tone = "dark",
  align = "left",
  size = "lg",
  className = "",
}: {
  eyebrow?: string;
  heading: string;
  headingDim?: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  /** "md" for headings in a narrow column (e.g. beside a sticky list). */
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`} data-reveal>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display tracking-display mt-4 text-[2rem] font-bold leading-[1.08] ${size === "md" ? "md:text-[2.5rem]" : "md:text-5xl"} ${
          tone === "light" ? "text-white" : "text-onyx"
        }`}
      >
        {heading}
        {headingDim && (
          <>
            {" "}
            {/* slate-500 on light (≥4.5:1), slate-400 on dark. */}
            <span className={tone === "light" ? "text-slate-400" : "text-slate-500"}>{headingDim}</span>
          </>
        )}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${tone === "light" ? "text-slate-400" : "text-slate-600"}`}>{intro}</p>}
    </div>
  );
}

// ─────────────────────────── Value-first hero ───────────────────────────

/**
 * The writing rule, rendered: WHO (kicker) + VALUE (H1) + what changes (detail) + CTA.
 * Every service, segment and events page opens with this. Pass `aside` for the 2-column
 * hero (text left, product UI right).
 */
export function ValueHero({
  eyebrow,
  who,
  value,
  valueDetail,
  primary,
  primaryVariant = "primary",
  secondary,
  note,
  aside,
  children,
}: {
  eyebrow: string;
  who: string;
  value: string;
  valueDetail: string;
  primary: Cta;
  primaryVariant?: Variant;
  secondary?: React.ReactNode;
  note?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="pb-16 pt-10 md:pb-24 md:pt-14">
        {children}
        <div className={aside ? "grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16" : ""}>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <p className="mt-6 max-w-3xl text-base font-medium text-slate-600 md:text-lg">{who}</p>
            <h1 className="font-display tracking-display mt-3 max-w-4xl text-[2.5rem] font-extrabold leading-[1.04] text-onyx md:text-6xl">
              {value}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{valueDetail}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaButton cta={primary} variant={primaryVariant} size="lg" source="hero" />
              {secondary}
            </div>
            {note && <p className="mt-4 text-sm text-slate-500">{note}</p>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

export function ProblemCallout({ label = "The problem we solve", problem }: { label?: string; problem: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-7 md:p-9">
      <p className="mono-label text-slate-500">{label}</p>
      <p className="font-display mt-4 text-xl font-semibold leading-snug text-onyx md:text-2xl">{problem}</p>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 text-brand-500 ${className}`} aria-hidden>
      <path d="M5 10.5l3.2 3.2L15 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-slate-700">
          <Check className="mt-0.5" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Checkmark list item: bold lead text, then a regular descriptor (hero benefits). */
export function BenefitList({ items, layout = "stack" }: { items: { lead: string; rest: string }[]; layout?: "stack" | "row" }) {
  return (
    <ul className={layout === "row" ? "grid gap-3 text-left md:grid-cols-3 md:gap-6" : "space-y-2.5"}>
      {items.map((b) => (
        <li key={b.lead} className="flex gap-2.5 text-[15px] md:text-base">
          <Check className="mt-0.5" />
          <span className="leading-snug text-slate-600">
            <strong className="font-bold text-slate-900">{b.lead}</strong> {b.rest}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered stage cards. `connector` adds the one motion this pattern takes (playbook P7): a
 * line joining the stages that draws itself as it enters the viewport (md+ only).
 */
export function NumberedCards({
  steps,
  dark = false,
  connector = false,
}: {
  steps: { title: string; body: string }[];
  dark?: boolean;
  connector?: boolean;
}) {
  return (
    <div className="relative">
      {connector && (
        <div
          aria-hidden
          data-reveal="line"
          className={`absolute left-6 right-6 top-[2.55rem] hidden h-px md:block ${dark ? "bg-white/20" : "bg-slate-300"}`}
        />
      )}
      <ScrollRow cols={steps.length >= 5 ? 5 : steps.length >= 4 ? 4 : 3}>
        {steps.map((s, i) => (
          <div
            key={s.title}
            data-reveal
            style={{ "--reveal-i": i } as React.CSSProperties}
            className={`${scrollItem} relative rounded-2xl p-6 ${dark ? "border border-white/10 bg-white/5" : "border border-slate-200 bg-white"}`}
          >
            <StatusPill tone={dark ? "dark" : i === 0 ? "brand" : "neutral"}>Stage {String(i + 1).padStart(2, "0")}</StatusPill>
            <p className={`font-display mt-4 text-lg font-bold ${dark ? "text-white" : "text-onyx"}`}>{s.title}</p>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{s.body}</p>
          </div>
        ))}
      </ScrollRow>
    </div>
  );
}

// ─────────────────────────── FAQ ───────────────────────────

export function FaqList({ faqs, withSchema = true }: { faqs: FAQ[]; withSchema?: boolean }) {
  if (faqs.length === 0) return null;
  return (
    <>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 md:p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

// ─────────────────────────── Breadcrumbs ───────────────────────────

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${APP_URL}${it.href}`,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
        {items.map((it, i) => (
          <span key={it.href}>
            {i > 0 && <span className="mx-2 text-slate-300">/</span>}
            {i === items.length - 1 ? (
              <span className="text-slate-700">{it.name}</span>
            ) : (
              <Link href={it.href} className="hover:text-slate-900">
                {it.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

// ─────────────────────────── CTA band ───────────────────────────

/**
 * The closing CTA. Default: the dark feature card (charcoal-to-black fade, white display
 * heading, pink CTA). `quiet`: a plain light band for the investor page.
 */
export function CtaBand({
  heading,
  body,
  cta,
  secondary,
  quiet = false,
}: {
  heading: string;
  body: string;
  cta: Cta;
  secondary?: React.ReactNode;
  quiet?: boolean;
}) {
  if (quiet) {
    return (
      <section className="border-t border-slate-200 bg-slate-50">
        <Container className="py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-onyx md:text-3xl">{heading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">{body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <CtaButton cta={cta} variant="quiet" source="closing" />
              {secondary}
            </div>
            {cta.note && <p className="mt-3 text-sm text-slate-500">{cta.note}</p>}
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-20">
        <div className="rounded-3xl px-6 py-14 text-center text-white md:px-12 md:py-20" style={{ background: "linear-gradient(rgb(17, 17, 17) 24%, rgb(0, 0, 0))" }}>
          <h2 className="font-display tracking-display mx-auto max-w-3xl text-[2rem] font-bold leading-[1.08] md:text-5xl">{heading}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaButton cta={cta} variant="primary" size="lg" source="closing" />
            {secondary}
          </div>
          {cta.note && <p className="mt-4 text-sm text-slate-400">{cta.note}</p>}
        </div>
      </Container>
    </section>
  );
}
