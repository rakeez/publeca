import Link from "next/link";
import type { Bucket, Service } from "@/lib/content/types";
import { departmentOf } from "@/lib/content";
import { CheckList, StatusPill } from "./ui";

type BucketGroup = Omit<Bucket, "services"> & { services: Service[] };

/**
 * One value bucket, in Writing-rule order: who → value → problem → outcomes, then the
 * "How we do it" breakdown of the capabilities that deliver it. Server-rendered in full, so
 * every service name and detail is in the HTML whether or not its tab is showing.
 */
export function BucketPanel({ bucket, index, headingLevel = "h3" }: { bucket: BucketGroup; index: number; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      <div>
        <StatusPill tone="brand">
          {String(index + 1).padStart(2, "0")} · {bucket.label}
        </StatusPill>
        <p className="mt-5 text-[15px] font-medium text-slate-600">{bucket.who}</p>
        <H className="font-display tracking-display mt-2 text-[1.75rem] font-bold leading-[1.1] text-onyx md:text-[2rem]">{bucket.value}</H>
        <p className="mt-4 leading-relaxed text-slate-600">{bucket.problem}</p>
        <div className="mt-6">
          <CheckList items={bucket.outcomes} />
        </div>
      </div>
      <HowWeDoIt services={bucket.services} />
    </div>
  );
}

/**
 * "How we do it": the capabilities behind a bucket. Each row names the service, the
 * in-house department that delivers it, its value line, and what it includes.
 */
export function HowWeDoIt({ services }: { services: Service[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 md:p-4">
      <p className="mono-label px-3 pb-3 pt-2 text-slate-500">How we do it</p>
      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group block rounded-2xl border border-slate-200 bg-white p-4 transition-colors duration-150 hover:border-slate-400 md:p-5"
            >
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-base font-bold text-onyx group-hover:text-brand-600">{s.name}</span>
                <StatusPill tone="violet">{departmentOf(s)}</StatusPill>
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-slate-600">{s.cardSummary}</span>
              <span className="mt-3 flex flex-wrap gap-1.5">
                {s.includes.slice(0, 3).map((inc) => (
                  <span key={inc.title} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {inc.title}
                  </span>
                ))}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:text-brand-600">
                How it works <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
