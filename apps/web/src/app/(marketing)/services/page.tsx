import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, ScrollRow, scrollItem } from "@/components/marketing/ui";
import { SERVICE_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Growth, Marketing, Engineering & AI Services",
  description:
    "Growth consulting, branding, content, social and Google Ads, SEO and AEO/GEO, conversion tracking, web and software development, AI solutions — and events.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(760px 380px at 85% -10%, #ffd9e8 0%, transparent 60%), radial-gradient(680px 360px at 5% 0%, #e0e3ff 0%, transparent 60%)",
          }}
        />
        <Container className="pb-16 pt-14 md:pb-20 md:pt-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Capabilities</p>
          <p className="mt-5 max-w-3xl text-lg font-medium text-slate-700">
            For leaders who want one accountable team instead of a consultant, three agencies and a
            freelance developer.
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-[3.5rem]">
            Every capability your growth plan needs, under one roof — and one owner of the result.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Strategy, marketing, analytics and engineering from our own departments. Take a single
            capability, or let a forward-deployed growth executive combine them around the
            opportunities that will actually move your revenue.
          </p>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to category">
            {SERVICE_GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                {g.name}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="py-10 md:py-16">
        {SERVICE_GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24 border-b border-slate-100 py-10 last:border-0">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{g.department}</p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{g.name}</h2>
              <p className="mt-2 text-lg leading-relaxed text-slate-600">{g.value}</p>
            </div>
            <div className="mt-8">
              <ScrollRow cols={3}>
                {g.services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md`}
                  >
                    <p className="font-display text-lg font-semibold text-slate-900 group-hover:text-brand-600">{s.name}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.cardSummary}</p>
                    <span className="mt-5 text-sm font-semibold text-slate-900 transition group-hover:text-brand-600">
                      See what you get →
                    </span>
                  </Link>
                ))}
              </ScrollRow>
            </div>
          </section>
        ))}
      </Container>

      <CtaBand
        heading="Not sure which of these you need?"
        body="That's what the growth diagnostic is for. We find where your next growth will come from first, then recommend only the capabilities that get you there."
        cta={{
          label: "Book a growth diagnostic",
          message: "Hi Publeca, I'm not sure which services I need. Can we start with a growth diagnostic?",
        }}
      />
    </main>
  );
}
