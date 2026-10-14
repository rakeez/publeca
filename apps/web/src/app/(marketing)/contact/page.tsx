import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/ui";
import { CONTACT, mailtoUrl, whatsappUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact a Growth Consultant",
  description:
    "Tell us where you want to grow. Book a growth diagnostic, ask about a package, or compare notes on a portfolio company — on WhatsApp or by email.",
  alternates: { canonical: "/contact" },
};

const STARTS = [
  {
    who: "Directors & CEOs",
    value: "Find out where your next stage of growth will come from — before you spend more on marketing.",
    label: "Book a growth diagnostic",
    href: whatsappUrl("Hi Publeca, I run a business and I'd like to book a growth diagnostic. A bit about us:"),
    external: true,
  },
  {
    who: "Technical founders",
    value: "Get a go-to-market team working on your growth — and keep all of your equity.",
    label: "Talk about a Go-to-Market Sprint",
    href: whatsappUrl("Hi Publeca, I'm a technical founder looking for help with go-to-market. A bit about the product:"),
    external: true,
  },
  {
    who: "Investors & VCs",
    value: "A senior growth team your portfolio companies can call on, reported in a format you can read in minutes.",
    label: "Request a sample portfolio brief",
    href: mailtoUrl("Request a sample portfolio brief", "Hi Publeca,\n\nCould you share a sample portfolio brief?\n\nThanks,"),
    external: false,
  },
  {
    who: "Event organizers",
    value: "Sell out your next event, with ticketing and conversion tracking built in.",
    label: "Plan your event",
    href: whatsappUrl("Hi Publeca, I'm planning an event and would like to discuss it. Details:"),
    external: true,
  },
];

export default function ContactPage() {
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
        <Container className="pb-14 pt-14 md:pb-16 md:pt-20">
          <p className="font-display mono-label text-brand-600">Contact</p>
          <p className="mt-5 max-w-3xl text-lg font-medium text-slate-700">
            For leaders who want a straight answer on whether we can help — and what the first step would be.
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl">
            Tell us where you want to grow. We'll tell you honestly how we'd get you there.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            The fastest way to reach us is WhatsApp. Pick the starting point that fits you — the message is
            pre-written, so you only need to add a few details about your business.
          </p>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {STARTS.map((s) => (
            <div key={s.who} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <p className="mono-label text-brand-600">{s.who}</p>
              <p className="font-display mt-3 text-lg font-semibold leading-snug text-slate-900">{s.value}</p>
              <a
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-6 inline-flex w-fit rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
              >
                {s.label} →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">WhatsApp</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-slate-600 hover:text-slate-900">
              {CONTACT.whatsappDisplay}
            </a>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Email</p>
            <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-sm text-slate-600 hover:text-slate-900">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Running an event yourself?{" "}
          <Link href="/signup" className="font-semibold text-brand-600 hover:underline">
            Start free on the ticketing platform →
          </Link>
        </p>
      </Container>
    </main>
  );
}
