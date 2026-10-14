import Link from "next/link";
import type { Cta, FAQ } from "@/lib/content/types";
import { ctaHref, isExternalCta } from "@/lib/brand";
import { JsonLd } from "@/components/json-ld";
import { Spotlight } from "./motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

// ─────────────────────────── Buttons ───────────────────────────

type Variant = "primary" | "secondary" | "quiet" | "inverse";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600",
  secondary:
    "border border-slate-200 bg-white text-slate-800 hover:border-slate-300",
  // Low-pressure style for investor-facing CTAs.
  quiet:
    "border border-slate-300 bg-transparent text-slate-800 hover:border-slate-500",
  inverse: "bg-white text-slate-900 hover:bg-slate-100",
};

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
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ${
    size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm"
  } ${VARIANTS[variant]} ${className}`;

  if (cta.href) {
    return (
      <Link href={href} className={cls} {...tag}>
        {cta.label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...tag}
      {...(isExternalCta(cta) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {cta.label}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition hover:text-brand-600">
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
export function ScrollRow({
  cols,
  children,
  className = "",
}: {
  cols: 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 ${GRID[cols]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "light" }) {
  return (
    <p
      className={`font-display text-xs font-semibold uppercase tracking-[0.14em] ${
        tone === "light" ? "text-accent-300" : "text-brand-600"
      }`}
    >
      {children}
    </p>
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
  className = "",
}: {
  eyebrow?: string;
  heading: string;
  headingDim?: string;
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`} data-reveal>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display mt-3 text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl ${
          tone === "light" ? "text-white" : "text-slate-900"
        }`}
      >
        {heading}
        {headingDim && (
          <>
            {" "}
            {/* slate-500, not the playbook's slate-400: slate-400 on white is under WCAG's 3:1 for large text. */}
            <span className={tone === "light" ? "text-slate-400" : "text-slate-500"}>{headingDim}</span>
          </>
        )}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "light" ? "text-slate-300" : "text-slate-600"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────── Value-first hero ───────────────────────────

/**
 * The writing rule, rendered: WHO (kicker) + VALUE (H1) + what changes (detail) + CTA.
 * Every service, segment and events page opens with this.
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
  spotlight = false,
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
  /** Cursor spotlight (R2). Home and events heroes only. */
  spotlight?: boolean;
  children?: React.ReactNode;
}) {
  const Wrap = spotlight ? Spotlight : PlainSection;
  return (
    <Wrap className="relative overflow-hidden border-b border-slate-100">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(760px 380px at 85% -10%, #ffd9e8 0%, transparent 60%), radial-gradient(680px 360px at 5% 0%, #e0e3ff 0%, transparent 60%)",
        }}
      />
      <Container className="pb-16 pt-14 md:pb-20 md:pt-20">
        {children}
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="mt-5 max-w-3xl text-base font-medium text-slate-700 md:text-lg">{who}</p>
        <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-[3.5rem]">
          {value}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{valueDetail}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CtaButton cta={primary} variant={primaryVariant} size="lg" source="hero" />
          {secondary}
        </div>
        {note && <p className="mt-3 text-sm text-slate-500">{note}</p>}
      </Container>
    </Wrap>
  );
}

function PlainSection({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <section className={className}>{children}</section>;
}

export function ProblemCallout({ label = "The problem we solve", problem }: { label?: string; problem: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="font-display mt-3 text-xl leading-snug text-slate-900 md:text-2xl">{problem}</p>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-slate-700">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
            ✓
          </span>
          <span className="leading-relaxed">{t}</span>
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
          className={`absolute left-6 right-6 top-[2.35rem] hidden h-px md:block ${
            dark ? "bg-gradient-to-r from-accent-300/60 to-brand-400/60" : "bg-gradient-to-r from-accent-300 to-brand-300"
          }`}
        />
      )}
    <ScrollRow cols={steps.length >= 5 ? 5 : steps.length >= 4 ? 4 : 3}>
      {steps.map((s, i) => (
        <div
          key={s.title}
          data-reveal
          style={{ "--reveal-i": i } as React.CSSProperties}
          className={`${scrollItem} relative rounded-2xl p-6 ${
            dark ? "border border-white/10 bg-white/5" : "border border-slate-100 bg-white shadow-sm"
          }`}
        >
          <span className={`font-display text-2xl font-bold ${dark ? "text-accent-300" : "text-accent-500"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className={`font-display mt-3 text-lg font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
            {s.title}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{s.body}</p>
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
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 md:p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span className="mt-0.5 text-slate-400 transition group-open:rotate-45" aria-hidden>
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
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
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
      <section className="border-t border-slate-100 bg-slate-50">
        <Container className="py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{heading}</h2>
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
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(700px 320px at 90% 0%, rgba(255,0,102,0.35) 0%, transparent 60%), radial-gradient(640px 320px at 0% 100%, rgba(99,91,255,0.35) 0%, transparent 60%)",
        }}
      />
      <Container className="relative py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CtaButton cta={cta} variant="primary" size="lg" source="closing" />
            {secondary}
          </div>
          {cta.note && <p className="mt-3 text-sm text-slate-400">{cta.note}</p>}
        </div>
      </Container>
    </section>
  );
}
