import type { Metadata } from "next";
import Link from "next/link";
import { Container, ScrollRow, scrollItem } from "@/components/marketing/ui";
import { AUDIENCE_LABELS, POSTS, type Post, type PostAudience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights on Growth, Marketing, AI Search & Events",
  description:
    "Practical growth playbooks for CEOs, technical founders and investors — growth diagnostics, conversion tracking, AEO/GEO, AI payback, and selling out events.",
  alternates: { canonical: "/blog" },
};

const ORDER: PostAudience[] = ["ceos", "technical-founders", "investors", "general", "events"];

const GROUP_INTRO: Record<PostAudience, string> = {
  ceos: "Plain-English playbooks for directors and CEOs who want the next stage of growth — and want to know their spend is working.",
  "technical-founders": "For founders who built the product: go-to-market, positioning and tracking at the level of detail you expect.",
  investors: "Observations from inside portfolio go-to-market work.",
  general: "What actually moves visibility in AI search, and where AI pays back first.",
  events: "Playbooks from our events arm for selling out.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { dateStyle: "medium" });
}

function PostCard({ p }: { p: Post }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className={`${scrollItem} group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md`}
    >
      <p className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-600">{p.title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.value}</p>
      <p className="mt-4 text-xs text-slate-400">
        {formatDate(p.date)} · {p.readingMins} min read
      </p>
    </Link>
  );
}

export default function BlogPage() {
  // Each post is listed once, under its primary audience.
  const groups = ORDER.map((a) => ({ audience: a, posts: POSTS.filter((p) => p.audience[0] === a) })).filter(
    (g) => g.posts.length > 0
  );

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
          <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Insights</p>
          <p className="mt-5 max-w-3xl text-lg font-medium text-slate-700">
            For CEOs, technical founders and investors who would rather make growth decisions on
            evidence than on opinion.
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl">
            Practical thinking you can use in your next planning meeting.
          </h1>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to audience">
            {groups.map((g) => (
              <a
                key={g.audience}
                href={`#${g.audience}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                {AUDIENCE_LABELS[g.audience]}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        {groups.map((g) => (
          <section key={g.audience} id={g.audience} className="scroll-mt-24 border-b border-slate-100 py-10 last:border-0">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">{AUDIENCE_LABELS[g.audience]}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">{GROUP_INTRO[g.audience]}</p>
            <div className="mt-6">
              <ScrollRow cols={3}>
                {g.posts.map((p) => (
                  <PostCard key={p.slug} p={p} />
                ))}
              </ScrollRow>
            </div>
          </section>
        ))}
      </Container>
    </main>
  );
}
