import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { DemoSection } from "@/components/marketing/demo-section";
import { DEPT_DOTS, GrowthDiagram } from "@/components/marketing/growth-diagram";
import { Spotlight } from "@/components/marketing/motion";
import { ReaderTabs } from "@/components/marketing/tabs";
import {
  CheckList,
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

const stagger = (i: number) => ({ "--reveal-i": i }) as React.CSSProperties;

export default function HomePage() {
  const insights = POSTS.filter((p) => !p.audience.includes("events")).slice(0, 3);
  const stageNames = home.process.steps.map((s) => s.title);
  const readerTabs = SEGMENTS.map((s) => ({
    key: s.slug,
    label: s.name,
    name: s.navLabel,
    value: s.cardSummary,
    points: s.gains.slice(0, 4),
    href: `/for/${s.slug}`,
    linkLabel: s.slug === "investors" ? "How portfolio teams use us" : `More for ${s.name.toLowerCase()}`,
  }));
  const [lead, ...otherDepts] = home.firm.departments;

  return (
    <main>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* ── Hero: who + value first, the thesis drawn beside it (P1) ─────────── */}
      <Spotlight>
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
              <CtaButton cta={home.hero.primaryCta} size="lg" source="hero" />
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

          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 animate-aura-drift rounded-[2rem] opacity-80 blur-2xl"
              style={{ background: "linear-gradient(135deg, rgba(255,0,102,0.18), rgba(99,91,255,0.22))" }}
            />
            <GrowthDiagram departments={home.firm.departments} stages={stageNames} />
          </div>
        </Container>
      </Spotlight>

      {/* ── Every capability, one firm (R7 marquee; the duplicate is aria-hidden) ── */}
      <div className="marquee overflow-hidden border-y border-slate-100 bg-white py-4">
        <div className="marquee-track flex w-max animate-marquee gap-3">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 || undefined}>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="inline-flex whitespace-nowrap rounded-full bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ── Who we help: one tab per reader (P2) ────────────────────── */}
      <section id="who-we-help" className="scroll-mt-20 bg-slate-50">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Who we help"
            heading={home.audiences.heading}
            headingDim={home.audiences.headingDim}
            intro={home.audiences.intro}
          />
          <div className="mt-10">
            <ReaderTabs tabs={readerTabs} />
          </div>
        </Container>
      </section>

      {/* ── The problem: the enemy, as a situation ──────────────────── */}
      <section className="bg-slate-950 text-white">
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="The problem we solve"
            heading={home.problem.heading}
            headingDim={home.problem.headingDim}
            intro={home.problem.intro}
            tone="light"
          />
          <div className="mt-10">
            <ScrollRow cols={3}>
              {home.problem.points.map((p, i) => (
                <div key={p.title} data-reveal style={stagger(i)} className={`${scrollItem} rounded-2xl border border-white/10 bg-white/5 p-6`}>
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
          <SectionHeading eyebrow="What you get" heading={home.value.heading} headingDim={home.value.headingDim} intro={home.value.intro} />
          <div className="mt-10">
            <ScrollRow cols={4}>
              {home.value.items.map((v, i) => (
                <div key={v.title} data-reveal style={stagger(i)} className={`${scrollItem} rounded-2xl border border-slate-100 bg-white p-6 shadow-sm`}>
                  <span className={`block h-1 w-10 rounded-full ${i % 2 === 0 ? "bg-brand-500" : "bg-accent-500"}`} />
                  <p className="font-display mt-5 text-lg font-semibold text-slate-900">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── The deliverables, demonstrated (P3) ─────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50">
        <Container className="py-16 md:py-24">
          <DemoSection content={home.demos} />
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal>
            <CtaButton cta={home.hero.primaryCta} source="demos" />
            <p className="text-sm text-slate-500">{home.hero.primaryCta.note}</p>
          </div>
        </Container>
      </section>

      {/* ── How we work (P7) ────────────────────────────────────── */}
      <section id="how-we-work" className="scroll-mt-20">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="How we work" heading={home.process.heading} headingDim={home.process.headingDim} intro={home.process.intro} />
          <div className="mt-10">
            <NumberedCards steps={home.process.steps} connector />
          </div>
        </Container>
      </section>

      {/* ── The commercial shape, objection first (P6) ──────────────── */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="How it starts"
              heading={home.commitments.heading}
              headingDim={home.commitments.headingDim}
              intro={home.commitments.intro}
            />
            <div className="mt-8" data-reveal>
              <CtaButton cta={home.finalCta.cta} size="lg" source="commitments" />
              <p className="mt-4 text-sm text-slate-500">
                Not sure yet?{" "}
                <Link
                  href="/diagnostic"
                  data-cta="commitments-intake"
                  className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand-600"
                >
                  See what a diagnostic would look at first
                </Link>
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {home.commitments.promises.map((p, i) => (
              <li key={p.title} data-reveal style={stagger(i)} className="rounded-2xl border border-slate-200 bg-white p-6">
                <CheckList items={[p.title]} />
                <p className="mt-2 pl-8 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Capabilities ────────────────────────────────────────── */}
      <section>
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="Capabilities"
            heading={home.capabilities.heading}
            headingDim={home.capabilities.headingDim}
            intro={home.capabilities.intro}
          />
          <div className="mt-8">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.id} data-reveal className="grid gap-6 border-t border-slate-100 py-8 lg:grid-cols-[260px_1fr] lg:gap-10">
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

      {/* ── How the firm is built: a bento (P4 / R6) ─────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Built like a firm" heading={home.firm.heading} headingDim={home.firm.headingDim} intro={home.firm.intro} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {lead && (
              <div
                data-reveal
                className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 p-7 text-white md:col-span-2 lg:row-span-2"
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Directs the other four</p>
                <p className="font-display mt-3 text-2xl font-bold md:text-3xl">{lead.title}</p>
                <p className="mt-3 max-w-md leading-relaxed text-white/85">{lead.body}</p>
                <p className="font-display mt-auto pt-8 text-lg font-semibold leading-snug">{lead.outcome}</p>
                <ol className="mt-5 flex flex-wrap gap-1.5 text-xs font-medium">
                  {stageNames.map((s) => (
                    <li
                      key={s}
                      className={`rounded-full px-2.5 py-1 ${lead.stages.includes(s) ? "bg-white text-slate-900" : "bg-white/15 text-white/80"}`}
                    >
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {otherDepts.map((d, i) => (
              <div
                key={d.title}
                data-reveal
                style={stagger(i + 1)}
                className="bento-tile group flex flex-col rounded-3xl border border-slate-200 bg-white p-6"
              >
                <span className={`block h-2.5 w-2.5 rounded-full ${DEPT_DOTS[(i + 1) % DEPT_DOTS.length]}`} />
                <p className="font-display mt-4 font-semibold text-slate-900">{d.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.body}</p>
                <p className="bento-outcome mt-auto pt-4 text-sm font-semibold leading-snug text-slate-900">{d.outcome}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Events arm ──────────────────────────────────────────── */}
      <section>
        <Container className="py-16 md:py-20">
          <div data-reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 p-8 text-white md:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 animate-aura-drift rounded-full bg-white/10 blur-2xl" />
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
            <SectionHeading eyebrow="Insights" heading={home.insights.heading} headingDim={home.insights.headingDim} intro={home.insights.intro} />
            <TextLink href="/blog">All insights</TextLink>
          </div>
          <div className="mt-10">
            <ScrollRow cols={3}>
              {insights.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  data-reveal
                  style={stagger(i)}
                  className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{AUDIENCE_LABELS[p.audience[0]!]}</p>
                  <p className="font-display mt-3 text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-600">{p.title}</p>
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
