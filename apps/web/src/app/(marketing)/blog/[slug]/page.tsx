import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, CtaButton } from "@/components/marketing/ui";
import { AUDIENCE_LABELS, POSTS, getPost } from "@/lib/content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.seo.description,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const quiet = post.audience.includes("investors");
  const date = new Date(post.date).toLocaleDateString("en-GB", { dateStyle: "long" });
  const related = POSTS.filter((p) => p.slug !== post.slug && p.audience.some((a) => post.audience.includes(a))).slice(0, 3);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.seo.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: post.author, url: APP_URL },
          publisher: {
            "@type": "Organization",
            name: "Publeca",
            logo: { "@type": "ImageObject", url: `${APP_URL}/publeca-icon.png` },
          },
          mainEntityOfPage: `${APP_URL}/blog/${post.slug}`,
          keywords: post.seo.keywords.join(", "),
        }}
      />

      <article className="mx-auto max-w-2xl px-6 pb-16 pt-12 md:pt-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Insights", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{AUDIENCE_LABELS[post.audience[0]!]}</p>
        <h1 className="font-display mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-[2.6rem]">
          {post.title}
        </h1>

        {/* Writing rule: who it's for and what they get — before anything else */}
        <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Who this is for</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-800">{post.who}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">What you'll get</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-800">{post.value}</p>
          </div>
        </div>

        <p className="mt-5 text-xs text-slate-400">
          {date} · {post.readingMins} min read · {post.author}
        </p>

        <div className="mt-10">
          {post.body.map((section, i) => (
            <section key={i} className="mb-9">
              {section.heading && (
                <h2 className="font-display mb-3 text-xl font-bold text-slate-900 md:text-2xl">{section.heading}</h2>
              )}
              {section.paragraphs.map((para, j) => (
                <p key={j} className="mb-4 text-[17px] leading-[1.75] text-slate-700">
                  {para}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mb-4 space-y-2 pl-5">
                  {section.bullets.map((b) => (
                    <li key={b} className="list-disc text-[17px] leading-[1.7] text-slate-700 marker:text-brand-500">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className={`mt-12 rounded-2xl border p-7 ${quiet ? "border-slate-200 bg-white" : "border-brand-100 bg-brand-50/40"}`}>
          <p className="font-display text-lg font-semibold text-slate-900">
            {quiet
              ? post.audience.every((a) => a === "investors")
                ? "If this matches what you're seeing in your portfolio, it may help to compare notes."
                : "If you're weighing this for your company or a portfolio company, it may help to talk it through."
              : "Want this applied to your business?"}
          </p>
          <div className="mt-5">
            <CtaButton cta={post.cta} variant={quiet ? "quiet" : "primary"} />
          </div>
          {post.cta.note && <p className="mt-3 text-sm text-slate-500">{post.cta.note}</p>}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Keep reading</p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <p className="font-display font-semibold leading-snug text-slate-900 group-hover:text-brand-600">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.value}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
