import type { Metadata } from "next";
import { BucketPanel } from "@/components/marketing/buckets";
import { Container, CtaBand, Eyebrow } from "@/components/marketing/ui";
import { BUCKET_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Growth, Marketing, Engineering & AI Services",
  description:
    "Services grouped by the result you need: where to grow, spend tied to sales, being found and chosen, systems that scale, and sold-out events. One firm.",
  alternates: { canonical: "/services" },
};

/**
 * Every capability, pooled into value buckets (lib/content/buckets.ts). Each bucket leads with
 * who it's for and the value, then "How we do it": the services and the department behind each.
 */
export default function ServicesPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <Container className="pb-14 pt-12 md:pb-20 md:pt-16">
          <Eyebrow>Capabilities</Eyebrow>
          <p className="mt-6 max-w-3xl text-base font-medium text-slate-600 md:text-lg">
            For leaders who want one accountable team instead of a consultant, three agencies and a freelance developer.
          </p>
          <h1 className="font-display tracking-display mt-3 max-w-4xl text-[2.5rem] font-extrabold leading-[1.04] text-onyx md:text-6xl">
            Start from the result you need. We bring every capability behind it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Five outcomes, each delivered by our own departments and owned by one growth plan. Take one, or let a forward-deployed
            growth executive combine them around the opportunities that will actually move your revenue.
          </p>
          <nav className="mt-9 flex flex-wrap gap-2" aria-label="Jump to an outcome">
            {BUCKET_GROUPS.map((b, i) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition-colors duration-150 hover:border-slate-900"
              >
                <span className="font-mono text-[11px] font-medium text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                {b.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {BUCKET_GROUPS.map((b, i) => (
        <section key={b.id} id={b.id} className={`scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-200`}>
          <Container className="py-16 md:py-24">
            <div data-reveal>
              <BucketPanel bucket={b} index={i} headingLevel="h2" />
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        heading="Not sure which of these you need?"
        body="That's what the growth diagnostic is for. It finds where your next growth will come from first, then recommends only the capabilities that get you there."
        cta={{
          label: "Book a growth diagnostic",
          message: "Hi Publeca, I run [type of business] and I'm not sure which services we need. Can we start with a growth diagnostic?",
          note: "Fixed fee. About three weeks. The plan is yours to keep.",
        }}
      />
    </main>
  );
}
