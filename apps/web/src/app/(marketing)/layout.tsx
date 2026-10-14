import Link from "next/link";
import { Logo, LogoMark } from "@/components/logo";
import { WhatsAppButton, WhatsAppFab } from "@/components/whatsapp";
import { MobileMenu } from "@/components/marketing/mobile-menu";
import { MarketingMotion } from "@/components/marketing/motion";
import { CONTACT, whatsappUrl } from "@/lib/brand";
import { SEGMENTS, SERVICE_GROUPS, brandLine } from "@/lib/content";

// Written in the reader's voice, with a slot they can fill in (playbook §8.2, construction 10).
const DIAGNOSTIC_MESSAGE =
  "Hi Publeca, I run [type of business] and want to know where our next growth will come from. Could we talk about a growth diagnostic?";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const mobileGroups = [
    {
      title: "Who we help",
      links: SEGMENTS.map((s) => ({ label: s.name, href: `/for/${s.slug}` })),
    },
    ...SERVICE_GROUPS.filter((g) => g.id !== "events").map((g) => ({
      title: g.name,
      links: g.services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
    })),
    {
      title: "Events",
      links: [
        { label: "Events arm", href: "/events" },
        ...(SERVICE_GROUPS.find((g) => g.id === "events")?.services ?? []).map((s) => ({
          label: s.shortName,
          href: `/services/${s.slug}`,
        })),
      ],
    },
    {
      title: "Company",
      links: [
        { label: "All services", href: "/services" },
        { label: "Where a diagnostic would start", href: "/diagnostic" },
        { label: "Insights", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <MarketingMotion />
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-md">
        <nav className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="Publeca home">
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 text-sm font-medium text-slate-600 lg:flex">
            {/* Services mega menu */}
            <div className="group relative">
              <Link href="/services" className="rounded-full px-3 py-2 transition hover:text-slate-900">
                Services
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[860px] -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-5 gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/70">
                  {SERVICE_GROUPS.map((g) => (
                    <div key={g.id}>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{g.name}</p>
                      <ul className="mt-3 space-y-2">
                        {g.services.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="text-[13.5px] text-slate-700 hover:text-brand-600">
                              {s.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-5 -mb-1 border-t border-slate-100 pt-4">
                    <Link href="/services" className="text-sm font-semibold text-slate-900 hover:text-brand-600">
                      See every capability →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Who we help */}
            <div className="group relative">
              <button type="button" className="rounded-full px-3 py-2 transition hover:text-slate-900">
                Who we help
              </button>
              <div className="invisible absolute left-0 top-full w-[360px] pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-200/70">
                  {SEGMENTS.map((s) => (
                    <Link key={s.slug} href={`/for/${s.slug}`} className="block rounded-xl p-3 transition hover:bg-slate-50">
                      <p className="font-semibold text-slate-900">{s.name}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-slate-500">{s.cardSummary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/events" className="rounded-full px-3 py-2 transition hover:text-slate-900">
              Events
            </Link>
            <Link href="/blog" className="rounded-full px-3 py-2 transition hover:text-slate-900">
              Insights
            </Link>
            <Link href="/contact" className="rounded-full px-3 py-2 transition hover:text-slate-900">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden text-sm font-medium text-slate-500 transition hover:text-slate-900 xl:block">
              Host sign in
            </Link>
            <a
              href={whatsappUrl(DIAGNOSTIC_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header"
              className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 sm:inline-flex"
            >
              Book a growth diagnostic
            </a>
            <MobileMenu groups={mobileGroups} cta={{ label: "Book a growth diagnostic", href: whatsappUrl(DIAGNOSTIC_MESSAGE) }} />
          </div>
        </nav>
      </header>

      {children}

      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <LogoMark className="h-10" />
            {/* The repeated line and the enemy it answers (playbook §8.2, constructions 2–3). */}
            <p className="font-display mt-5 text-lg font-semibold leading-snug text-slate-900">{brandLine.line}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
              {brandLine.enemy} Publeca is a growth consulting firm with its own marketing,
              engineering, and analytics &amp; data science teams, so the plan and the execution
              come from the same place.
            </p>
            <div className="mt-5">
              <WhatsAppButton message={DIAGNOSTIC_MESSAGE}>Talk to us on WhatsApp</WhatsAppButton>
            </div>
          </div>

          {SERVICE_GROUPS.filter((g) => g.id === "strategy" || g.id === "marketing").length > 0 && (
            <FooterCol
              title="Growth & marketing"
              links={SERVICE_GROUPS.filter((g) => g.id === "strategy" || g.id === "marketing")
                .flatMap((g) => g.services)
                .map((s) => ({ href: `/services/${s.slug}`, label: s.shortName }))}
            />
          )}
          <FooterCol
            title="Data, engineering & AI"
            links={SERVICE_GROUPS.filter((g) => g.id === "data" || g.id === "engineering")
              .flatMap((g) => g.services)
              .map((s) => ({ href: `/services/${s.slug}`, label: s.shortName }))}
          />
          <FooterCol
            title="Who we help"
            links={[
              ...SEGMENTS.map((s) => ({ href: `/for/${s.slug}`, label: s.name })),
              { href: "/events", label: "Event organizers" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "/services", label: "All services" },
              { href: "/diagnostic", label: "Where a diagnostic would start" },
              { href: "/events", label: "Events arm" },
              { href: "/blog", label: "Insights" },
              { href: "/contact", label: "Contact" },
              { href: "/login", label: "Event host sign in" },
              { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
            ]}
          />
        </div>
        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-400 sm:flex-row">
            <p>© {new Date().getFullYear()} Publeca. Growth consulting · Marketing · Engineering · Events.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-700">Privacy</a>
              <a href="#" className="hover:text-slate-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFab />
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="transition hover:text-slate-900">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
