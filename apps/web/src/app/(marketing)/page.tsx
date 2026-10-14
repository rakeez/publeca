import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { BucketPanel } from "@/components/marketing/buckets";
import { DemoSection } from "@/components/marketing/demo-section";
import { HeroCard } from "@/components/marketing/hero-card";
import { PanelTabs } from "@/components/marketing/tabs";
import {
  BenefitList,
  CheckList,
  Container,
  CtaBand,
  CtaButton,
  FaqList,
  NumberedCards,
  ScrollRow,
  SectionHeading,
  StatusPill,
  TextLink,
  buttonClass,
  scrollItem,
} from "@/components/marketing/ui";
import { CONTACT, WHATSAPP_NUMBER } from "@/lib/brand";
import { AUDIENCE_LABELS, BUCKET_GROUPS, POSTS, SEGMENTS, SERVICES, home } from "@/lib/content";

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

/** Renders the headline with its one accent phrase in gradient ink. */
function Headline({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-gradient">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

export default function HomePage() {
  const insights = POSTS.filter((p) => !p.audience.includes("events")).slice(0, 3);

  return (
    <main>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* ── Hero: who + value + checkmark benefits, the product card beside it (P1) ── */}
      <section className="bg-white">
        {/* Who we serve is told by the card (who → what → how). DOM order puts it right after the
            H1, so on phones the reader finds themselves before the benefits; from lg it sits in
            the right column beside both. */}
        <Container className="grid gap-10 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-x-16 lg:gap-y-0 lg:pb-24">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <h1 className="font-display tracking-display text-[2.6rem] font-extrabold leading-[1.02] text-onyx md:text-6xl lg:text-[4.25rem]">
              <Headline text={home.hero.headline} accent={home.hero.headlineAccent} />
            </h1>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <HeroCard audiences={home.hero.audiences} departments={home.departments} />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:pt-7">
            <div>
              <BenefitList items={home.hero.benefits} />
            </div>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-500">{home.hero.subhead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaButton cta={home.hero.primaryCta} size="lg" source="hero" />
              <Link href={home.hero.secondaryCta.href} className={buttonClass("secondary")}>
                {home.hero.secondaryCta.label}
              </Link>
            </div>
            {home.hero.primaryCta.note && <p className="mt-4 text-sm text-slate-500">{home.hero.primaryCta.note}</p>}

            {/* Feature tag pills: the five value buckets */}
            <div className="mt-9 border-t border-slate-200 pt-6">
              <p className="mono-label text-slate-400">Five ways to grow</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {BUCKET_GROUPS.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/services#${b.id}`}
                      className="inline-flex rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-800 transition-colors duration-150 hover:border-slate-900"
                    >
                      {b.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The problem: the enemy, as a situation ──────────────────── */}
      <section className="border-t border-slate-200 bg-white">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="The problem we solve"
            heading={home.problem.heading}
            headingDim={home.problem.headingDim}
            intro={home.problem.intro}
            align="center"
          />
          <div className="mt-12">
            <ScrollRow cols={3}>
              {home.problem.points.map((p, i) => (
                <div key={p.title} data-reveal style={stagger(i)} className={`${scrollItem} rounded-2xl border border-slate-200 bg-white p-7`}>
                  <StatusPill tone="neutral">Gap {String(i + 1).padStart(2, "0")}</StatusPill>
                  <p className="font-display mt-4 text-xl font-bold text-onyx">{p.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── What we deliver: value buckets, each with "How we do it" (P2) ── */}
      <section id="what-we-deliver" className="scroll-mt-20 bg-band">
        <Container className="py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="What you get" heading={home.buckets.heading} headingDim={home.buckets.headingDim} intro={home.buckets.intro} />
            <TextLink href="/services">See every capability</TextLink>
          </div>
          <div className="mt-12">
            <PanelTabs
              label="What you get"
              tabs={BUCKET_GROUPS.map((b) => ({ key: b.id, label: b.label }))}
              panels={BUCKET_GROUPS.map((b, i) => (
                <BucketPanel key={b.id} bucket={b} index={i} />
              ))}
            />
          </div>
        </Container>
      </section>

      {/* ── The deliverables, demonstrated (P3) ─────────────────────── */}
      <section className="bg-white">
        <Container className="py-20 md:py-28">
          <DemoSection content={home.demos} />
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal>
            <CtaButton cta={home.hero.primaryCta} size="lg" source="demos" />
            <p className="text-sm text-slate-500">{home.hero.primaryCta.note}</p>
          </div>
        </Container>
      </section>

      {/* ── How we work (P7) ────────────────────────────────────── */}
      <section id="how-we-work" className="scroll-mt-20 border-y border-slate-200 bg-slate-50">
        <Container className="py-20 md:py-28">
          <SectionHeading eyebrow="How we work" heading={home.process.heading} headingDim={home.process.headingDim} intro={home.process.intro} />
          <div className="mt-12">
            <NumberedCards steps={home.process.steps} connector />
          </div>
        </Container>
      </section>

      {/* ── The commercial shape, objection first (P6) ──────────────── */}
      <section className="bg-white">
        <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="How it starts" heading={home.commitments.heading} headingDim={home.commitments.headingDim} intro={home.commitments.intro} />
            <div className="mt-8" data-reveal>
              <CtaButton cta={home.finalCta.cta} size="lg" source="commitments" />
              <p className="mt-4 text-sm text-slate-500">
                Not sure yet?{" "}
                <Link
                  href="/diagnostic"
                  data-cta="commitments-intake"
                  className="font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand-600"
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

      {/* ── Who we help ─────────────────────────────────────────── */}
      <section id="who-we-help" className="scroll-mt-20 bg-band">
        <Container className="py-20 md:py-28">
          <SectionHeading eyebrow="Who we help" heading={home.audiences.heading} headingDim={home.audiences.headingDim} intro={home.audiences.intro} />
          <div className="mt-12">
            <ScrollRow cols={3}>
              {SEGMENTS.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/for/${s.slug}`}
                  data-reveal
                  style={stagger(i)}
                  className={`${scrollItem} group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-150 hover:border-slate-400`}
                >
                  <StatusPill tone={i === 0 ? "brand" : i === 1 ? "violet" : "neutral"}>{s.navLabel}</StatusPill>
                  <p className="font-display mt-5 text-2xl font-bold text-onyx">{s.name}</p>
                  <p className="mt-2 flex-1 leading-relaxed text-slate-600">{s.cardSummary}</p>
                  <span className="mt-6 text-sm font-bold text-slate-900 group-hover:text-brand-600">
                    {s.slug === "investors" ? "How portfolio teams use us" : "How we help you"} →
                  </span>
                </Link>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── Insights ────────────────────────────────────────────── */}
      <section className="bg-white">
        <Container className="py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" heading={home.insights.heading} headingDim={home.insights.headingDim} intro={home.insights.intro} />
            <TextLink href="/blog">All insights</TextLink>
          </div>
          <div className="mt-12">
            <ScrollRow cols={3}>
              {insights.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  data-reveal
                  style={stagger(i)}
                  className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-400`}
                >
                  <p className="mono-label text-slate-500">{AUDIENCE_LABELS[p.audience[0]!]}</p>
                  <p className="font-display mt-3 text-lg font-bold leading-snug text-onyx group-hover:text-brand-600">{p.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.value}</p>
                  <p className="mt-4 font-mono text-xs text-slate-400">{p.readingMins} min read</p>
                </Link>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50">
        <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" heading="What leaders ask us first" />
          <FaqList faqs={home.faqs} />
        </Container>
      </section>

      <CtaBand heading={home.finalCta.heading} body={home.finalCta.body} cta={home.finalCta.cta} />
    </main>
  );
}
