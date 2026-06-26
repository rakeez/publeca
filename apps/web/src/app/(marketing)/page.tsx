import Link from "next/link";
import { SERVICES } from "@/lib/marketing-content";
import { WhatsAppButton } from "@/components/whatsapp";

const journey = [
  { step: "Promote", text: "Meta & Google ads, influencers and a campaign built to fill the room." },
  { step: "Create", text: "Scroll-stopping creative, reels and key visuals that make people care." },
  { step: "Sell", text: "Custom event pages, local payments and BNPL, QR e-tickets." },
  { step: "Capture", text: "Photography and videography that fuel your next event." },
  { step: "Grow", text: "Conversion tracking and reporting so every rupee is measured." },
];

const steps = [
  { n: "01", title: "Plan", body: "We learn your event and build the go-to-market — audience, message, channels and timeline." },
  { n: "02", title: "Promote", body: "Ads, creative and content go live, tuned daily to lower your cost per ticket." },
  { n: "03", title: "Sell", body: "Buyers land on a page built to convert and pay by card or BNPL. Tickets arrive instantly." },
  { n: "04", title: "Host", body: "Scan guests in at the door from your phone. Watch attendance live." },
  { n: "05", title: "Measure", body: "Clear reporting on spend, sales and conversions — and content for next time." },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1100px 520px at 78% -8%, #ffd9e8 0%, transparent 55%), radial-gradient(820px 460px at -5% 5%, #e0e3ff 0%, transparent 50%)",
          }}
        />
        {/* Stripe-style angled gradient ribbon */}
        <div className="absolute -top-28 right-0 -z-10 h-80 w-full -skew-y-6 bg-gradient-to-r from-brand-500/10 via-accent-500/10 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Sri Lanka's full-service event growth partner
          </p>
          <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.04] text-slate-900 md:text-7xl">
            We promote, sell out,
            <br />
            and run your{" "}
            <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
              events.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            From the first ad to the final scan at the door — Meta &amp; Google ads, creative,
            photography and videography, ticketing and check-in. Let us handle it all, or
            self-serve with our platform. You choose.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton className="px-6 py-3 text-base">Contact now</WhatsAppButton>
            <Link
              href="/signup"
              className="rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
            >
              Explore the platform
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Our services
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Done-for-you event marketing · or a self-serve ticketing platform · all in one place.
          </p>
        </div>
      </section>

      {/* Plain-language value */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Only on Publeca
          </span>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            The only place to build an event page with paid-booking conversion tracking built in
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            In plain English: most ticketing tools just collect the money. Publeca builds your
            event page <span className="font-semibold text-slate-900">and</span> wires in your
            Meta &amp; Google ad tracking — so the ad platforms learn who actually{" "}
            <span className="font-semibold text-slate-900">buys</span>, not who just clicks. That
            means cheaper ads and a lower cost per ticket.
          </p>

          <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
            {[
              {
                t: "Build your page in minutes",
                b: "Add your photos, video and words. Pick your tickets and prices. Your event page is live — no developer, no code.",
              },
              {
                t: "Every paid booking is tagged",
                b: "Your Meta Pixel and Google Ads are installed per event automatically. When someone pays, it's tracked as a real conversion.",
              },
              {
                t: "Your cost per ticket drops",
                b: "With real purchase data, the ad platforms optimize for buyers instead of clicks — so each ticket costs you less to sell over time.",
              },
            ].map((c, i) => (
              <div
                key={c.t}
                className="min-w-[80%] snap-start rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:min-w-[55%] md:min-w-0"
              >
                <span className="font-display text-2xl font-bold text-brand-500">0{i + 1}</span>
                <p className="mt-3 font-display text-lg font-semibold text-slate-900">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey strip */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600">
            The whole journey, handled
          </h2>
          <div className="-mx-6 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
            {journey.map((j) => (
              <div
                key={j.step}
                className="min-w-[72%] snap-start rounded-2xl border border-slate-200 bg-white p-5 sm:min-w-0"
              >
                <p className="font-display text-lg font-bold text-slate-900">{j.step}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{j.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            One team for everything your event needs
          </h2>
          <p className="mt-3 text-slate-600">
            Pick the pieces you want. Hand us the whole thing, or just use the platform —
            it's the same crew either way.
          </p>
        </div>
        <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group min-w-[80%] snap-start rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md sm:min-w-[55%] md:min-w-0"
            >
              <p className="font-display text-lg font-semibold text-slate-900">{s.name}</p>
              <p className="mt-1 text-sm font-medium text-brand-600">{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:text-brand-600">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            How we sell out your event
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            A system, not a scramble. Here's how a Publeca campaign runs from kickoff to
            the morning after.
          </p>
          <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
            {steps.map((s) => (
              <div
                key={s.n}
                className="min-w-[78%] snap-start rounded-2xl border border-white/10 bg-white/5 p-6 sm:min-w-[45%] md:min-w-0"
              >
                <span className="font-display text-2xl font-bold text-accent-400">{s.n}</span>
                <p className="mt-3 text-lg font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform / self-serve */}
      <section id="platform" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600">
              Prefer to run it yourself?
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              A ticketing platform you can launch in minutes
            </h2>
            <p className="mt-4 text-slate-600">
              Everything you need to sell and run an event yourself — no developer, no
              spreadsheets, no chasing payments.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Customizable event pages with your images, video and copy",
                "Local payments (PayHere) and BNPL (Koko, Mintpay) — your own merchant accounts",
                "QR e-tickets emailed instantly, with door scanning from your phone",
                "Meta & Google conversion tracking installed per event, no code",
              ].map((f) => (
                <li key={f} className="flex gap-3 text-slate-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
              >
                Start free
              </Link>
              <Link
                href="/services/ticketing-platform"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                See the platform
              </Link>
            </div>
          </div>

          {/* Decorative product card */}
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-3xl opacity-70"
              style={{ background: "radial-gradient(420px 300px at 70% 20%, #e0e3ff, transparent 70%)" }}
            />
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
              {/* event hero */}
              <div className="relative flex h-40 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 p-4">
                <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  Live
                </span>
                <p className="text-lg font-bold text-white drop-shadow-sm">Neon Nights — Colombo</p>
              </div>
              {/* event details */}
              <div className="mt-4">
                <p className="text-sm text-slate-500">Saturday 12 Sep · 8:00 PM · Arena Colombo</p>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">General Admission</p>
                    <p className="text-xs text-slate-500">LKR 2,500 · 38 left</p>
                  </div>
                  <div className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-semibold text-white">
                    Buy
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 font-medium text-violet-700">
                    BNPL
                  </span>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 font-medium text-sky-700">
                    PayHere
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
                    QR ticket
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="font-display text-xl font-bold text-slate-900">Done for you</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Hand us the event. We plan the campaign, run the ads, make the creative, shoot
              the photos and video, and sell the tickets — you just show up and host.
            </p>
            <WhatsAppButton className="mt-6">Talk to our team</WhatsAppButton>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="font-display text-xl font-bold text-slate-900">Self-serve</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Run it yourself on our platform — event page, payments, BNPL, QR tickets and
              door check-in. Add tracking in a click. Upgrade to done-for-you anytime.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Create your event
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">
          Let's fill your next event
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Tell us what you're planning. We'll come back with a plan to sell it out.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppButton className="px-7 py-3.5 text-base">Contact now</WhatsAppButton>
          <Link
            href="/signup"
            className="rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
          >
            Start free
          </Link>
        </div>
      </section>
    </main>
  );
}
