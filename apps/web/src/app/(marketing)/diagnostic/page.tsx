import type { Metadata } from "next";
import { IntakePlanner } from "@/components/marketing/intake-planner";
import { Breadcrumbs, Container, CtaBand, FaqList, ProblemCallout, SectionHeading, ValueHero } from "@/components/marketing/ui";
import { home, intakePage } from "@/lib/content";

export const metadata: Metadata = {
  title: intakePage.seo.title,
  description: intakePage.seo.description,
  keywords: intakePage.seo.keywords,
  alternates: { canonical: "/diagnostic" },
  openGraph: { title: intakePage.seo.title, description: intakePage.seo.description, url: "/diagnostic" },
};

export default function DiagnosticPlannerPage() {
  return (
    <main>
      <ValueHero
        eyebrow={intakePage.eyebrow}
        who={intakePage.who}
        value={intakePage.value}
        valueDetail={intakePage.valueDetail}
        primary={{ label: intakePage.startLabel, message: "", href: "#planner" }}
        note="Nothing is stored. Your answers stay in your browser."
      >
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Diagnostic planner", href: "/diagnostic" },
          ]}
        />
      </ValueHero>

      <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="space-y-6">
          <ProblemCallout problem={intakePage.problem} />
          <p className="text-sm leading-relaxed text-slate-500">
            Every item on the list is something the documented packages already include, and each one names the answer
            that put it there, so you can see the reasoning and change any answer.
          </p>
        </div>
        <div id="planner" className="scroll-mt-24">
          <IntakePlanner />
        </div>
      </Container>

      <section className="border-t border-slate-100 bg-slate-50">
        <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Questions" heading="About the planner" />
          <FaqList faqs={intakePage.faqs} />
        </Container>
      </section>

      <CtaBand heading={home.finalCta.heading} body={home.finalCta.body} cta={home.finalCta.cta} />
    </main>
  );
}
