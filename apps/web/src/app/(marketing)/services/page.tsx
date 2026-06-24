import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/marketing-content";
import { WhatsAppButton } from "@/components/whatsapp";

export const metadata: Metadata = {
  title: "Services — Publeca",
  description:
    "Event marketing, Meta & Google ads, creative, photography and videography, and a self-serve ticketing platform.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600">
            Services
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything it takes to fill the room
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            We handle promotion, creative, content and ticketing in house — take the whole
            package or just the pieces you need.
          </p>
          <div className="mt-7">
            <WhatsAppButton className="px-6 py-3 text-base">Contact now</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md"
            >
              <p className="font-display text-xl font-semibold text-slate-900">{s.name}</p>
              <p className="mt-1 text-sm font-medium text-brand-600">{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:text-brand-600">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
