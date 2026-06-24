import Link from "next/link";
import { Logo, LogoMark } from "@/components/logo";
import { WhatsAppButton, WhatsAppFab } from "@/components/whatsapp";
import { CONTACT } from "@/lib/brand";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platform", label: "Platform" },
  { href: "/blog", label: "Blog" },
];

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" aria-label="Publeca home">
            <Logo />
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-slate-900">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:block"
            >
              Sign in
            </Link>
            <WhatsAppButton className="hidden sm:inline-flex">Contact now</WhatsAppButton>
            <Link
              href="/signup"
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
            >
              Start free
            </Link>
          </div>
        </nav>
      </header>

      {children}

      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="text-brand-500">
              <LogoMark className="h-9 w-9" />
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              We promote, sell out and run events — ads, creative, photography and a
              ticketing platform, all in one place.
            </p>
            <div className="mt-5">
              <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
            </div>
          </div>

          <FooterCol
            title="Services"
            links={[
              { href: "/services/event-marketing", label: "Event marketing" },
              { href: "/services/paid-ads", label: "Meta & Google ads" },
              { href: "/services/creative-content", label: "Creative & content" },
              { href: "/services/photography-videography", label: "Photo & video" },
            ]}
          />
          <FooterCol
            title="Platform"
            links={[
              { href: "/services/ticketing-platform", label: "Ticketing" },
              { href: "/signup", label: "Create an event" },
              { href: "/login", label: "Host sign in" },
              { href: "/scan", label: "Door scanner" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
              { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
            ]}
          />
        </div>
        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-400 sm:flex-row">
            <p>© {new Date().getFullYear()} Publeca. All rights reserved.</p>
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

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
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
