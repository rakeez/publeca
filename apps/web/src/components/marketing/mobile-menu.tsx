"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Group = { title: string; links: { label: string; href: string }[] };

export function MobileMenu({ groups, cta }: { groups: Group[]; cta: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
      >
        <span className="relative block h-3 w-4">
          <span className={`absolute left-0 h-0.5 w-4 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 h-0.5 w-4 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[61px] z-50 overflow-y-auto border-t border-slate-100 bg-white px-6 pb-10 pt-4">
          {groups.map((g) => (
            <div key={g.title} className="border-b border-slate-100 py-4">
              <p className="mono-label text-slate-400">{g.title}</p>
              <div className="mt-2 grid grid-cols-2 gap-x-4">
                {g.links.map((l) => (
                  <Link key={l.href} href={l.href} className="py-2 text-[15px] font-medium text-slate-800">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 text-base font-semibold text-white"
          >
            {cta.label}
          </a>
          <Link href="/login" className="mt-3 block text-center text-sm font-medium text-slate-500">
            Event host sign in
          </Link>
        </div>
      )}
    </div>
  );
}
