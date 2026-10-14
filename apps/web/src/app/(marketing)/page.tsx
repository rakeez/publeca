import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import {
  Container,
  CtaBand,
  CtaButton,
  FaqList,
  NumberedCards,
  ScrollRow,
  SectionHeading,
  TextLink,
  scrollItem,
} from "@/components/marketing/ui";
import { CONTACT, WHATSAPP_NUMBER } from "@/lib/brand";
import { AUDIENCE_LABELS, POSTS, SEGMENTS, SERVICES, SERVICE_GROUPS, home } from "@/lib/content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

export const metadata: Metadata = {
  title: { absolute: `${home.seo.title} | Publeca` },
  description: home.seo.description,
  keywords: home.seo.keywords,
  alternates: { canonical: "/" },
  openGraph: { title: `${home.seo.title} | Publeca`, description: home.seo.description, url: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Publeca",
  url: APP_URL,
  logo: `${APP_URL}/publeca-icon.png`,
  description: home.seo.description,
  email: CONTACT.email,
  telephone: `+${WHATSAPP_NUMBER}`,
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  knowsAbout: SERVICES.map((s) => s.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Publeca services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${APP_URL}/services/${s.slug}` },
    })),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Publeca",
  url: APP_URL,
};

const DEPT_DOTS = ["bg-brand-500", "bg-accent-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500"];

export default function HomePage() {
  const insights = POSTS.filter((p) => !p.audience.includes("events")).slice(0, 3);

  return (
    <main>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* ── Hero: who + value first ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1100px 520px at 80% -10%, #ffd9e8 0%, transparent 55%), radial-gradient(820px 460px at -5% 0%, #e0e3ff 0%, transparent 52%)",
          }}
        />
        <div className="absolute -top-28 right-0 -z-10 h-80 w-full -skew-y-6 bg-gradient-to-r from-brand-500/10 via-accent-500/10 to-transparent" />
        <Container className="grid gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:pb-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {home.hero.eyebrow}
            </p>
            <p className="mt-6 max-w-xl text-lg font-medium text-slate-700">{home.hero.who}</p>
            <h1 className="font-display mt-3 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-[4rem]">
              {home.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{home.hero.subhead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaButton cta={home.hero.primaryCta} size="lg" />
              <Link
                href={home.hero.secondaryCta.href}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition hover:border-slate-300"
              >
                {home.hero.secondaryCta.label}
              </Link>
            </div>
            {home.hero.primaryCta.note && <p className="mt-3 text-sm text-slate-500">{home.hero.primaryCta.note}</p>}
            <ul className="mt-8 flex flex-wrap gap-2">
              {home.hero.chips.map((c) => (
                <li key={c} className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* One accountable team — a picture of how the firm is built */}
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-80 blur-2xl"
              style={{ background: "linear-gradient(135deg, rgba(255,0,102,0.18), rgba(99,91,255,0.22))" }}
            />
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-300/40">
              <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Leads your growth</p>
                <p className="font-display mt-1 text-xl font-bold">Forward-deployed growth executive</p>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Directs our own teams</p>
              <ul className="mt-3 space-y-2">
                {home.firm.departments.map((d, i) => (
                  <li key={d.title} className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DEPT_DOTS[i % DEPT_DOTS.length]}`} />
                    <span className="text-sm font-semibold text-slate-800">{d.title}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                {home.process.steps.map((s, i) => (
                  <span key={s.title} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-slate-300">→</span>}
                    {s.title}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Who we help ─────────────────────────────────────────── */}
      <section id="who-we-help" className="scroll-mt-20 border-y border-slate-100 bg-slate-50">
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="Who we help" heading={home.audiences.heading} intro={home.audiences.intro} />
          <div className="mt-10">
            <ScrollRow cols={3}>
              {SEGMENTS.map((s) => (
                <Link
                  key={s.slug}
                  href={`/for/${s.slug}`}
                  className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{s.navLabel}</p>
                  <p className="font-display mt-3 text-xl font-bold text-slate-900">{s.name}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.cardSummary}</p>
                  <span className="mt-5 text-sm font-semibold text-slate-900 transition group-hover:text-brand-600">
                    How we help {s.slug === "investors" ? "portfolio teams" : "you"} →
                  </span>
                </Link>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── The problem ─────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="The problem we solve" heading={home.problem.heading} intro={home.problem.intro} tone="light" />
          <div className="mt-10">
            <ScrollRow cols={3}>
              {home.problem.points.map((p) => (
                <div key={p.title} className={`${scrollItem} rounded-2xl border border-white/10 bg-white/5 p-6`}>
                  <p className="font-display text-lg font-semibold text-white">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── The value ───────────────────────────────────────────── */}
      <section>
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="What you get" heading={home.value.heading} intro={home.value.intro} />
          <div className="mt-10">
            <ScrollRow cols={4}>
              {home.value.items.map((v, i) => (
                <div key={v.title} className={`${scrollItem} rounded-2xl border border-slate-100 bg-white p-6 shadow-sm`}>
                  <span className={`block h-1 w-10 rounded-full ${i % 2 === 0 ? "bg-brand-500" : "bg-accent-500"}`} />
                  <p className="font-display mt-5 text-lg font-semibold text-slate-900">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── How we work ─────────────────────────────────────────── */}
      <section id="how-we-work" className="scroll-mt-20 border-y border-slate-100 bg-slate-50">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="How we work" heading={home.process.heading} intro={home.process.intro} />
          <div className="mt-10">
            <NumberedCards steps={home.process.steps} />
          </div>
        </Container>
      </section>

      {/* ── Capabilities ────────────────────────────────────────── */}
      <section>
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Capabilities" heading={home.capabilities.heading} intro={home.capabilities.intro} />
          <div className="mt-8">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.id} className="grid gap-6 border-t border-slate-100 py-8 lg:grid-cols-[260px_1fr] lg:gap-10">
                <div>
                  <p className="font-display text-lg font-bold text-slate-900">{g.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{g.value}</p>
                </div>
                <ScrollRow cols={3}>
                  {g.services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`${scrollItem} group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md`}
                    >
                      <p className="font-semibold text-slate-900 transition group-hover:text-brand-600">{s.shortName}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.cardSummary}</p>
                    </Link>
                  ))}
                </ScrollRow>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How the firm is built ───────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Built like a firm" heading={home.firm.heading} intro={home.firm.intro} />
          <div className="mt-10">
            <ScrollRow cols={5}>
              {home.firm.departments.map((d, i) => (
                <div key={d.title} className={`${scrollItem} rounded-2xl border border-slate-200 bg-white p-5`}>
                  <span className={`block h-2.5 w-2.5 rounded-full ${DEPT_DOTS[i % DEPT_DOTS.length]}`} />
                  <p className="font-display mt-4 font-semibold text-slate-900">{d.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── Events arm ──────────────────────────────────────────── */}
      <section>
        <Container className="py-16 md:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 p-8 text-white md:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Our events arm</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">{home.eventsArm.heading}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{home.eventsArm.body}</p>
            <Link
              href="/events"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              {home.eventsArm.ctaLabel}
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Insights ────────────────────────────────────────────── */}
      <section className="border-t border-slate-100">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" heading={home.insights.heading} intro={home.insights.intro} />
            <TextLink href="/blog">All insights</TextLink>
          </div>
          <div className="mt-10">
            <ScrollRow cols={3}>
              {insights.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                    {AUDIENCE_LABELS[p.audience[0]!]}
                  </p>
                  <p className="font-display mt-3 text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-600">
                    {p.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{p.value}</p>
                  <p className="mt-4 text-xs text-slate-400">{p.readingMins} min read</p>
                </Link>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" heading="What leaders ask us first" />
          <FaqList faqs={home.faqs} />
        </Container>
      </section>

      <CtaBand heading={home.finalCta.heading} body={home.finalCta.body} cta={home.finalCta.cta} />
    </main>
  );
}
