import type { Metadata } from "next";
import Link from "next/link";
import { DemoSection } from "@/components/marketing/demo-section";
import {
  Breadcrumbs,
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
import { eventsHub, getService, postsFor } from "@/lib/content";

export const metadata: Metadata = {
  title: eventsHub.seo.title,
  description: eventsHub.seo.description,
  keywords: eventsHub.seo.keywords,
  alternates: { canonical: "/events" },
  openGraph: { title: eventsHub.seo.title, description: eventsHub.seo.description, url: "/events" },
};

export default function EventsPage() {
  const services = eventsHub.services.map((slug) => getService(slug)).filter((x) => !!x);
  const posts = postsFor("events").slice(0, 3);

  return (
    <main>
      <ValueHero
        eyebrow={eventsHub.eyebrow}
        who={eventsHub.who}
        value={eventsHub.value}
        valueDetail={eventsHub.valueDetail}
        primary={eventsHub.cta}
        secondary={
          <Link
            href="/signup"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition hover:border-slate-300"
          >
            Start free on the platform
          </Link>
        }
        note={eventsHub.cta.note}
      >
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Events", href: "/events" }]} />
      </ValueHero>

      <Container className="py-14 md:py-20">
        <ProblemCallout problem={eventsHub.problem} />
      </Container>

      {/* Only on Publeca */}
      <section className="bg-slate-950 text-white">
        <Container className="py-16 md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Only on Publeca
          </span>
          <SectionHeading
            heading={eventsHub.differentiator.heading}
            headingDim={eventsHub.differentiator.headingDim}
            intro={eventsHub.differentiator.body}
            tone="light"
            className="mt-4"
          />
          <div className="mt-10">
            <NumberedCards steps={eventsHub.differentiator.points} dark />
          </div>
        </Container>
      </section>

      {/* The platform, demonstrated (P3) */}
      {eventsHub.demos && (
        <section>
          <Container className="py-14 md:py-20">
            <DemoSection content={eventsHub.demos} eyebrow="See it work" />
            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
              <CtaButton cta={eventsHub.cta} source="demos" />
              <Link
                href="/signup"
                data-cta="demos-signup"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300"
              >
                Start free on the platform
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Journey */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="The whole journey, handled" heading="From first ad to final scan at the door" />
          <div className="mt-8">
            <ScrollRow cols={5}>
              {eventsHub.journey.map((j, i) => (
                <div
                  key={j.title}
                  data-reveal
                  style={{ "--reveal-i": i } as React.CSSProperties}
                  className={`${scrollItem} rounded-2xl border border-slate-200 bg-white p-5`}
                >
                  <p className="font-display text-lg font-bold text-slate-900">{j.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{j.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      {/* Two paths */}
      <Container className="grid gap-6 py-14 md:grid-cols-2 md:py-20">
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8">
          <p className="mono-label text-brand-600">Done for you</p>
          <h2 className="font-display mt-3 text-2xl font-bold text-slate-900">{eventsHub.paths.doneForYou.title}</h2>
          <p className="mt-3 flex-1 leading-relaxed text-slate-600">{eventsHub.paths.doneForYou.body}</p>
          <CtaButton cta={eventsHub.cta} className="mt-7 w-fit" source="paths" />
        </div>
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8">
          <p className="mono-label text-accent-600">Self-serve</p>
          <h2 className="font-display mt-3 text-2xl font-bold text-slate-900">{eventsHub.paths.selfServe.title}</h2>
          <p className="mt-3 flex-1 leading-relaxed text-slate-600">{eventsHub.paths.selfServe.body}</p>

          {/* Product preview */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="relative flex h-24 items-end overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 p-3">
              <span className="absolute right-2 top-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">Live</span>
              <p className="text-sm font-bold text-white">Your event page</p>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5">
              <div>
                <p className="text-xs font-semibold text-slate-900">General Admission</p>
                <p className="text-[11px] text-slate-500">Card or pay later</p>
              </div>
              <span className="rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold text-white">Buy</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
              {["PayHere", "BNPL", "QR ticket", "Seat map", "Conversion tracking"].map((t) => (
                <span key={t} className="rounded-full bg-white px-2 py-0.5 font-medium text-slate-600 ring-1 ring-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/signup"
            className="mt-7 inline-flex w-fit rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Start free
          </Link>
        </div>
      </Container>

      {/* Event services */}
      {services.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50">
          <Container className="py-14 md:py-20">
            <SectionHeading eyebrow="Event services" heading="Pick the pieces you need" />
            <div className="mt-8">
              <ScrollRow cols={3}>
                {services.map((s) => (
                  <Link
                    key={s!.slug}
                    href={`/services/${s!.slug}`}
                    className={`${scrollItem} group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-400`}
                  >
                    <p className="font-display text-lg font-semibold text-slate-900 group-hover:text-brand-600">{s!.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s!.cardSummary}</p>
                  </Link>
                ))}
              </ScrollRow>
            </div>
          </Container>
        </section>
      )}

      {posts.length > 0 && (
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="Event playbooks" heading="Worth reading before your next on-sale" />
          <div className="mt-8">
            <ScrollRow cols={3}>
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition`}
                >
                  <p className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-600">{p.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{p.value}</p>
                  <p className="mt-4 text-xs text-slate-400">{p.readingMins} min read</p>
                </Link>
              ))}
            </ScrollRow>
          </div>
        </Container>
      )}

      <section className="border-t border-slate-100 bg-slate-50">
        <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" heading="What organizers ask us" />
          <FaqList faqs={eventsHub.faqs} />
        </Container>
      </section>

      <CtaBand
        heading={eventsHub.value}
        body={eventsHub.valueDetail}
        cta={eventsHub.cta}
        secondary={
          <Link href="/signup" className="inline-flex rounded-full bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100">
            Start free
          </Link>
        }
      />
    </main>
  );
}
