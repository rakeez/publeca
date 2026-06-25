import Link from "next/link";
import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/whatsapp";
import { CONTACT } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact — Publeca",
  description: "Talk to Publeca about promoting and selling out your event. Message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(700px 380px at 80% -10%, #ffd9e8 0%, transparent 55%), radial-gradient(600px 340px at 10% 0%, #e0e3ff 0%, transparent 55%)" }}
        />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Let's plan your next event
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Tell us what you're working on — capacity, date, vibe — and we'll come back with
            a plan to promote and sell it out. The fastest way to reach us is WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              className="px-7 py-3.5 text-base"
              message="Hi Publeca, I'm planning an event and would like to discuss your services."
            >
              Message us on WhatsApp
            </WhatsAppButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Email us
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-lg gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
              <p className="text-sm font-semibold text-slate-900">WhatsApp</p>
              <p className="mt-1 text-sm text-slate-500">{CONTACT.whatsappDisplay}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-500">{CONTACT.email}</p>
            </div>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            Prefer to run it yourself?{" "}
            <Link href="/signup" className="font-semibold text-brand-600 hover:underline">
              Start free on the platform →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
