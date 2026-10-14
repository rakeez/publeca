import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  Breadcrumbs,
  CheckList,
  Container,
  CtaBand,
  CtaButton,
  FaqList,
  NumberedCards,
  ProblemCallout,
  ScrollRow,
  SectionHeading,
  ValueHero,
  scrollItem,
} from "@/components/marketing/ui";
import { whatsappUrl } from "@/lib/brand";
import { SEGMENTS, getSegment, getService, postsFor } from "@/lib/content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }): Promise<Metadata> {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    keywords: s.seo.keywords,
    alternates: { canonical: `/for/${s.slug}` },
    openGraph: { title: s.seo.title, description: s.seo.description, url: `/for/${s.slug}` },
  };
}

export default async function SegmentPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) notFound();

  const quiet = s.tone === "understated";
  const services = s.services.map((slug) => getService(slug)).filter((x) => !!x);
  const posts = postsFor(s.slug).slice(0, 3);

  const secondary = s.cta.secondaryLabel ? (
    <a
      href={whatsappUrl(s.cta.secondaryMessage ?? s.cta.message)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        quiet
          ? "text-base font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
          : "inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition hover:border-slate-300"
      }
    >
      {s.cta.secondaryLabel}
    </a>
  ) : (
    <a
      href="#packages"
      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition hover:border-slate-300"
    >
      See the packages
    </a>
  );

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${s.name} — growth packages`,
          description: s.seo.description,
          url: `${APP_URL}/for/${s.slug}`,
          provider: { "@type": "Organization", name: "Publeca", url: APP_URL },
          audience: { "@type": "Audience", audienceType: s.name },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Packages for ${s.name}`,
            itemListElement: s.packages.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: p.name, description: p.value },
            })),
          },
        }}
      />

      <ValueHero
        eyebrow={s.navLabel}
        who={s.who}
        value={s.value}
        valueDetail={s.valueDetail}
        primary={s.cta}
        primaryVariant={quiet ? "quiet" : "primary"}
        secondary={secondary}
        note={s.cta.note}
      >
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Who we help", href: "/#who-we-help" },
            { name: s.name, href: `/for/${s.slug}` },
          ]}
        />
      </ValueHero>

      {/* Problem, in their words */}
      <Container className="grid gap-8 py-14 md:py-20 lg:grid-cols-2 lg:gap-12">
        <ProblemCallout label={quiet ? "What we often see" : "The problem we solve"} problem={s.problem} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {quiet ? "Patterns worth recognizing" : "Sound familiar?"}
          </p>
          <ul className="mt-4 space-y-3">
            {s.pains.map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed text-slate-700">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Value */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="What you get" heading={quiet ? "What portfolio companies get" : "What changes for you"} />
          <div className="mt-8">
            <ScrollRow cols={s.gains.length >= 4 ? 4 : 3}>
              {s.gains.map((g, i) => (
                <div key={g.title} className={`${scrollItem} rounded-2xl border border-slate-200 bg-white p-6`}>
                  <span className={`block h-1 w-10 rounded-full ${i % 2 === 0 ? "bg-brand-500" : "bg-accent-500"}`} />
                  <p className="font-display mt-5 text-lg font-semibold text-slate-900">{g.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-20">
        <Container className="py-14 md:py-20">
          <SectionHeading
            eyebrow={quiet ? "Ways we can help" : "Packages"}
            heading={quiet ? "Three ways portfolio teams use us" : "Start small. Scale what works."}
            intro={
              quiet
                ? "Scoped per company, agreed with the founder, reported to you in a format you can read in minutes."
                : "Every package is scoped around an outcome, not hours. Most clients start with the first and grow from there."
            }
          />
          <div className="mt-10">
            <ScrollRow cols={3}>
              {s.packages.map((p) => (
                <div
                  key={p.name}
                  className={`${scrollItem} relative flex flex-col rounded-3xl border p-7 ${
                    p.highlight ? "border-brand-200 bg-white shadow-xl shadow-brand-500/10" : "border-slate-200 bg-white"
                  }`}
                >
                  {p.highlight && (
                    <span
                      className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-semibold ${
                        quiet ? "bg-slate-900 text-white" : "bg-brand-500 text-white"
                      }`}
                    >
                      {quiet ? "A sensible first step" : "Recommended start"}
                    </span>
                  )}
                  <p className="text-sm text-slate-500">{p.bestFor}</p>
                  <p className="font-display mt-2 text-xl font-bold text-slate-900">{p.name}</p>
                  <p className="mt-3 font-medium leading-relaxed text-slate-800">{p.value}</p>
                  <p className="mt-4 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {p.commitment}
                  </p>
                  <div className="mt-5 flex-1 border-t border-slate-100 pt-5 text-sm">
                    <CheckList items={p.includes} />
                  </div>
                  {!quiet && (
                    <CtaButton
                      className="mt-7 w-full"
                      variant={p.highlight ? "primary" : "secondary"}
                      cta={{
                        label: `Ask about the ${p.name}`,
                        message: `Hi Publeca, I'm interested in the ${p.name}. Here's a bit about my business:`,
                      }}
                    />
                  )}
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="How it runs" heading={quiet ? "How an engagement runs" : "How we work together"} />
          <div className="mt-8">
            <NumberedCards steps={s.process} />
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      {services.length > 0 && (
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="Capabilities" heading={quiet ? "Capabilities we bring in" : "The teams behind the work"} />
          <div className="mt-8">
            <ScrollRow cols={3}>
              {services.map((sv) => (
                <Link
                  key={sv!.slug}
                  href={`/services/${sv!.slug}`}
                  className={`${scrollItem} group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-brand-100 hover:shadow-md`}
                >
                  <p className="font-semibold text-slate-900 group-hover:text-brand-600">{sv!.shortName}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{sv!.cardSummary}</p>
                </Link>
              ))}
            </ScrollRow>
          </div>
        </Container>
      )}

      {/* Insights */}
      {posts.length > 0 && (
        <section className="border-t border-slate-100">
          <Container className="py-14 md:py-20">
            <SectionHeading eyebrow="Insights" heading={quiet ? "Notes from the field" : "Worth reading first"} />
            <div className="mt-8">
              <ScrollRow cols={3}>
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md`}
                  >
                    <p className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-600">{p.title}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{p.value}</p>
                    <p className="mt-4 text-xs text-slate-400">{p.readingMins} min read</p>
                  </Link>
                ))}
              </ScrollRow>
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-slate-100 bg-slate-50">
        <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" heading={quiet ? "Questions partners ask" : "Questions we hear first"} />
          <FaqList faqs={s.faqs} />
        </Container>
      </section>

      <CtaBand
        quiet={quiet}
        heading={quiet ? "If it would be useful, we're happy to compare notes." : s.value}
        body={s.valueDetail}
        cta={s.cta}
        secondary={s.cta.secondaryLabel ? secondary : undefined}
      />
    </main>
  );
}
