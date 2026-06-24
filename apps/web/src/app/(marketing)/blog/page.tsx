import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Blog — Publeca",
  description: "Playbooks and ideas on selling out events in Sri Lanka — ads, creative, BNPL and more.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { dateStyle: "medium" });
}

export default function BlogPage() {
  const posts = [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <main>
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600">
            Blog
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Ideas for filling rooms
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Practical playbooks on promoting and selling out events in Sri Lanka.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{formatDate(p.date)}</span>
                <span>·</span>
                <span>{p.readingMins} min read</span>
              </div>
              <h2 className="font-display mt-2 text-2xl font-bold text-slate-900 transition group-hover:text-brand-600">
                {p.title}
              </h2>
              <p className="mt-2 text-slate-600">{p.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600">Read →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
