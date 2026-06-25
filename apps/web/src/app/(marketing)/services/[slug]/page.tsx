import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/lib/marketing-content";
import { WhatsAppButton } from "@/components/whatsapp";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Services — Publeca" };
  return { title: `${service.name} — Publeca`, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);
  const isPlatform = service.slug === "ticketing-platform";

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(700px 380px at 82% -10%, #ffd9e8 0%, transparent 55%), radial-gradient(620px 360px at 8% 0%, #e0e3ff 0%, transparent 55%)" }}
        />
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link href="/services" className="text-sm font-medium text-slate-500 hover:text-slate-900">
            ← All services
          </Link>
          <p className="mt-6 text-sm font-medium text-brand-600">{service.tagline}</p>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{service.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isPlatform ? (
              <Link
                href="/signup"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
              >
                Start free
              </Link>
            ) : (
              <WhatsAppButton className="px-6 py-3 text-base">Contact now</WhatsAppButton>
            )}
            <Link
              href="/contact"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">What's included</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {service.includes.map((i) => (
            <div key={i.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="font-display font-semibold text-slate-900">{i.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{i.body}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display mt-14 text-2xl font-bold tracking-tight text-slate-900">
          What you get
        </h2>
        <ul className="mt-6 space-y-3">
          {service.outcomes.map((o) => (
            <li key={o} className="flex gap-3 text-slate-700">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">
                ✓
              </span>
              <span className="text-sm leading-relaxed">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-14 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {isPlatform ? "Launch your event today" : "Let's make your event a sell-out"}
          </h2>
          <p className="max-w-xl text-slate-600">
            Tell us what you're planning and we'll come back with a plan.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <WhatsAppButton className="px-6 py-3 text-base">Contact now</WhatsAppButton>
            <Link
              href="/signup"
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Start free
            </Link>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-xl font-bold text-slate-900">More services</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-brand-100 hover:shadow-md"
            >
              <p className="font-display font-semibold text-slate-900">{s.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.tagline}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-600">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
