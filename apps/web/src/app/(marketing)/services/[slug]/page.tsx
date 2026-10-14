import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  Breadcrumbs,
  CheckList,
  Container,
  CtaBand,
  FaqList,
  NumberedCards,
  ProblemCallout,
  ScrollRow,
  SectionHeading,
  ValueHero,
  scrollItem,
} from "@/components/marketing/ui";
import { SERVICES, getCategory, getSegment, getService, servicesIn } from "@/lib/content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    keywords: s.seo.keywords,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.seo.title, description: s.seo.description, url: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const category = getCategory(s.category);
  const related = servicesIn(s.category).filter((x) => x.slug !== s.slug).slice(0, 3);
  const segments = s.forSegments.map((id) => getSegment(id)).filter((x) => !!x);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.seo.description,
          url: `${APP_URL}/services/${s.slug}`,
          provider: { "@type": "Organization", name: "Publeca", url: APP_URL },
          audience: { "@type": "Audience", audienceType: s.who },
        }}
      />

      <ValueHero
        eyebrow={`${category.name} · ${s.shortName}`}
        who={s.who}
        value={s.value}
        valueDetail={s.valueDetail}
        primary={s.cta}
        secondary={
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition hover:border-slate-300"
          >
            How it works
          </a>
        }
        note={s.cta.note}
      >
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: s.shortName, href: `/services/${s.slug}` },
          ]}
        />
      </ValueHero>

      {/* Problem → value */}
      <Container className="grid gap-8 py-14 md:py-20 lg:grid-cols-2 lg:gap-12">
        <ProblemCallout problem={s.problem} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">What you get</p>
          <div className="mt-4">
            <CheckList items={s.outcomes} />
          </div>
        </div>
      </Container>

      {/* Details */}
      <section className="border-y border-slate-100 bg-slate-50">
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="What's included" heading={`What ${s.shortName} includes`} />
          <div className="mt-8">
            <ScrollRow cols={s.includes.length % 3 === 0 ? 3 : s.includes.length === 4 ? 4 : 3}>
              {s.includes.map((i) => (
                <div key={i.title} className={`${scrollItem} rounded-2xl border border-slate-200 bg-white p-6`}>
                  <p className="font-display font-semibold text-slate-900">{i.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{i.body}</p>
                </div>
              ))}
            </ScrollRow>
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="scroll-mt-20">
        <Container className="py-14 md:py-20">
          <SectionHeading eyebrow="How it works" heading="How we work with you" />
          <div className="mt-8">
            <NumberedCards steps={s.process} />
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      {segments.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50">
          <Container className="py-14 md:py-20">
            <SectionHeading eyebrow="Who it's for" heading="Built around the people we work with" />
            <div className="mt-8">
              <ScrollRow cols={3}>
                {segments.map((seg) => (
                  <Link
                    key={seg!.slug}
                    href={`/for/${seg!.slug}`}
                    className={`${scrollItem} group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-md`}
                  >
                    <p className="font-display font-semibold text-slate-900 group-hover:text-brand-600">{seg!.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{seg!.cardSummary}</p>
                  </Link>
                ))}
              </ScrollRow>
            </div>
          </Container>
        </section>
      )}

      <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="Questions" heading={`${s.shortName}: what buyers ask`} />
        <FaqList faqs={s.faqs} />
      </Container>

      {related.length > 0 && (
        <section className="border-t border-slate-100">
          <Container className="py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">More in {category.name}</p>
            <div className="mt-6">
              <ScrollRow cols={3}>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className={`${scrollItem} group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-brand-100 hover:shadow-md`}
                  >
                    <p className="font-semibold text-slate-900 group-hover:text-brand-600">{r.shortName}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{r.cardSummary}</p>
                  </Link>
                ))}
              </ScrollRow>
            </div>
          </Container>
        </section>
      )}

      <CtaBand heading={s.value} body={s.valueDetail} cta={s.cta} />
    </main>
  );
}
