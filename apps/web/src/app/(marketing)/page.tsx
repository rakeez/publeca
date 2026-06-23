import Link from "next/link";

const features = [
  {
    title: "Custom event landing pages",
    body: "Every host gets a polished, conversion-optimized page. Swap images, video, and copy — keep the structure that sells.",
  },
  {
    title: "Local payments + BNPL",
    body: "Accept payments through PayHere out of the box, add BNPL like Koko and Mintpay, and bring your own merchant keys.",
  },
  {
    title: "QR tickets & door scanning",
    body: "Buyers get a QR ticket by email. Scan it from your phone at the door and mark attendees in real time.",
  },
  {
    title: "Built-in ad tracking",
    body: "Drop in your Meta Pixel and Google Ads IDs per event. Paid buyers fire as conversions — server-side, accurate.",
  },
  {
    title: "No double-bookings, ever",
    body: "Atomic inventory and time-boxed holds mean the last seat sells exactly once, even under a rush.",
  },
  {
    title: "One dashboard",
    body: "Events, ticket types, orders, attendees, and check-in stats — all in one admin built for hosts.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              "radial-gradient(1200px 600px at 80% -10%, #e0e3ff 0%, transparent 50%), radial-gradient(900px 500px at 0% 0%, #d7f5ec 0%, transparent 45%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <p className="mb-4 inline-block rounded-full border border-brand-200 bg-white/60 px-3 py-1 text-xs font-semibold text-brand-700">
            Built for event hosts in Sri Lanka 🇱🇰 and beyond
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-7xl">
            Sell tickets.
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-emerald-500 bg-clip-text text-transparent">
              Host unforgettable events.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Publeca gives you a beautiful landing page, local payments and BNPL, QR
            tickets, and ad conversion tracking — everything you need to fill the room.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
            >
              Create your event
            </Link>
            <a
              href="#features"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-300"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Everything to run a paid event
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          From the first ad click to the door scan, Publeca handles the whole journey.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payments band */}
      <section id="payments" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Get paid the way your audience pays
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Start with PayHere, add Buy-Now-Pay-Later, and plug in more gateways as you
            grow. Hosts connect their own merchant accounts — funds go straight to you.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["PayHere", "Koko (BNPL)", "Mintpay (BNPL)", "WebXPay", "OnePay", "More soon"].map(
              (p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium"
                >
                  {p}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Ready to sell your first ticket?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Create a host account, set up your event, and share your landing page in minutes.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
        >
          Start free
        </Link>
      </section>
    </main>
  );
}
