import Link from "next/link";
import { Logo, LogoMark } from "@/components/logo";
import { WhatsAppButton, WhatsAppFab } from "@/components/whatsapp";
import { MobileMenu } from "@/components/marketing/mobile-menu";
import { MarketingMotion, ScrollProgress } from "@/components/marketing/motion";
import { CONTACT, whatsappUrl } from "@/lib/brand";
import { BUCKET_GROUPS, SEGMENTS, brandLine } from "@/lib/content";

// Written in the reader's voice, with a slot they can fill in (playbook §8.2, construction 10).
const DIAGNOSTIC_MESSAGE =
  "Hi Publeca, I run [type of business] and want to know where our next growth will come from. Could we talk about a growth diagnostic?";

const NAV_PILL = "rounded-full px-3 py-1.5 transition-colors duration-150 hover:bg-black/[0.04] hover:text-slate-900";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const mobileGroups = [
    ...BUCKET_GROUPS.map((b) => ({
      title: b.label,
      links: b.services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
    })),
    {
      title: "Who we help",
      links: [...SEGMENTS.map((s) => ({ label: s.name, href: `/for/${s.slug}` })), { label: "Event organizers", href: "/events" }],
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
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-6">
          <Link href="/" aria-label="Publeca home">
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 text-[15px] font-medium text-slate-800 lg:flex">
            {/* Services menu, grouped by value bucket */}
            <div className="group relative">
              <Link href="/services" className={`${NAV_PILL} inline-flex items-center gap-1`}>
                What we deliver <span className="text-xs text-slate-400" aria-hidden>▾</span>
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[980px] -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-5 gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]">
                  {BUCKET_GROUPS.map((b) => (
                    <div key={b.id}>
                      <Link href={`/services#${b.id}`} className="font-display text-sm font-bold text-onyx hover:text-brand-600">
                        {b.label}
                      </Link>
                      <ul className="mt-3 space-y-2">
                        {b.services.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="text-[13.5px] text-slate-600 hover:text-brand-600">
                              {s.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-5 -mb-1 flex items-center justify-between border-t border-slate-200 pt-4">
                    <Link href="/services" className="text-sm font-bold text-slate-900 hover:text-brand-600">
                      See every capability →
                    </Link>
                    <Link href="/diagnostic" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                      Not sure? See where a diagnostic would start
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Who we help */}
            <div className="group relative">
              <button type="button" className={`${NAV_PILL} inline-flex items-center gap-1`}>
                Who we help <span className="text-xs text-slate-400" aria-hidden>▾</span>
              </button>
              <div className="invisible absolute left-0 top-full w-[380px] pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]">
                  {SEGMENTS.map((s) => (
                    <Link key={s.slug} href={`/for/${s.slug}`} className="block rounded-2xl p-3 transition-colors hover:bg-slate-50">
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-slate-500">{s.cardSummary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/events" className={NAV_PILL}>
              Events
            </Link>
            <Link href="/blog" className={NAV_PILL}>
              Insights
            </Link>
            <Link href="/contact" className={NAV_PILL}>
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 xl:inline-flex"
            >
              Host sign in
            </Link>
            <a
              href={whatsappUrl(DIAGNOSTIC_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header"
              className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-600 sm:inline-flex"
            >
              Book a growth diagnostic
            </a>
            <MobileMenu groups={mobileGroups} cta={{ label: "Book a growth diagnostic", href: whatsappUrl(DIAGNOSTIC_MESSAGE) }} />
          </div>
        </nav>
        <ScrollProgress />
      </header>

      {children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-page gap-10 px-6 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <LogoMark className="h-10" />
            {/* The repeated line and the enemy it answers (playbook §8.2, constructions 2–3). */}
            <p className="font-display tracking-display mt-6 max-w-md text-2xl font-bold leading-tight text-onyx">{brandLine.line}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              {brandLine.enemy} Publeca is a growth consulting firm with its own marketing, engineering, and analytics &amp;
              data science teams, so the plan and the execution come from the same place.
            </p>
            <div className="mt-6">
              <WhatsAppButton message={DIAGNOSTIC_MESSAGE}>Talk to us on WhatsApp</WhatsAppButton>
            </div>
          </div>
          <FooterCol
            title="Who we help"
            links={[...SEGMENTS.map((s) => ({ href: `/for/${s.slug}`, label: s.name })), { href: "/events", label: "Event organizers" }]}
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

        {/* Every capability, under the result it delivers */}
        <div className="mx-auto grid max-w-page gap-8 border-t border-slate-200 px-6 py-10 sm:grid-cols-2 lg:grid-cols-5">
          {BUCKET_GROUPS.map((b) => (
            <FooterCol
              key={b.id}
              title={b.label}
              href={`/services#${b.id}`}
              links={b.services.map((s) => ({ href: `/services/${s.slug}`, label: s.shortName }))}
            />
          ))}
        </div>

        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row">
            <p className="font-mono text-xs uppercase tracking-[0.06em]">© {new Date().getFullYear()} Publeca</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-900">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFab />
    </div>
  );
}

function FooterCol({ title, href, links }: { title: string; href?: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      {href ? (
        <Link href={href} className="mono-label text-slate-900 hover:text-brand-600">
          {title}
        </Link>
      ) : (
        <h3 className="mono-label text-slate-900">{title}</h3>
      )}
      <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="transition-colors hover:text-slate-900">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
