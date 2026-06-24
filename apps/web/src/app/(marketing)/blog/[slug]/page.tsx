import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/marketing-content";
import { WhatsAppButton } from "@/components/whatsapp";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog — Publeca" };
  return { title: `${post.title} — Publeca`, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-GB", { dateStyle: "long" });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-900">
        ← Blog
      </Link>

      <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
        <span>{date}</span>
        <span>·</span>
        <span>{post.readingMins} min read</span>
        <span>·</span>
        <span>{post.author}</span>
      </div>
      <h1 className="font-display mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900">
        {post.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>

      <article className="mt-10">
        {post.body.map((section, i) => (
          <section key={i} className="mb-8">
            {section.heading && (
              <h2 className="font-display mb-3 text-xl font-bold text-slate-900">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((para, j) => (
              <p key={j} className="mb-4 leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </section>
        ))}
      </article>

      <div className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-7 text-center">
        <h3 className="font-display text-xl font-bold text-slate-900">
          Planning an event? Let's talk.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          We'll put together a plan to promote and sell it out.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <WhatsAppButton>Contact now</WhatsAppButton>
          <Link
            href="/signup"
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Start free
          </Link>
        </div>
      </div>
    </main>
  );
}
