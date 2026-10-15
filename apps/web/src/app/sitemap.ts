import type { MetadataRoute } from "next";
import { prisma } from "@publeca/db";
import { CONTENT_UPDATED, POSTS, SEGMENTS, SERVICES } from "@/lib/content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

// Refresh hourly so newly published events appear without a redeploy.
export const revalidate = 3600;

/**
 * Every public, indexable page. Google reads <loc> and <lastmod> and ignores priority and
 * changefreq, so the work goes into lastmod being accurate: posts carry their own date, the
 * blog index the newest post's date, and every other page the content date in
 * lib/content/site.ts (CONTENT_UPDATED). Private paths are excluded here and in robots.ts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = new Date(CONTENT_UPDATED);
  const newestPost = POSTS.reduce((d, p) => (new Date(p.date) > d ? new Date(p.date) : d), new Date(0));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, lastModified: content, changeFrequency: "weekly", priority: 1 },
    { url: `${APP_URL}/services`, lastModified: content, changeFrequency: "monthly", priority: 0.9 },
    { url: `${APP_URL}/events`, lastModified: content, changeFrequency: "monthly", priority: 0.8 },
    { url: `${APP_URL}/diagnostic`, lastModified: content, changeFrequency: "monthly", priority: 0.7 },
    { url: `${APP_URL}/blog`, lastModified: newestPost, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/contact`, lastModified: content, changeFrequency: "yearly", priority: 0.6 },
  ];

  const segmentPages: MetadataRoute.Sitemap = SEGMENTS.map((s) => ({
    url: `${APP_URL}/for/${s.slug}`,
    lastModified: content,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${APP_URL}/services/${s.slug}`,
    lastModified: content,
    changeFrequency: "monthly",
    priority: s.category === "events" ? 0.7 : 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${APP_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Published events that haven't finished. Past events drop out instead of lingering as
  // pages nobody can buy tickets for.
  let eventPages: MetadataRoute.Sitemap = [];
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const events = await prisma.event.findMany({
      where: {
        status: "LIVE",
        OR: [{ endsAt: { gte: now } }, { endsAt: null, startsAt: { gte: dayAgo } }],
      },
      select: { slug: true, updatedAt: true },
      orderBy: { startsAt: "asc" },
      take: 5000,
    });
    eventPages = events.map((e) => ({
      url: `${APP_URL}/e/${e.slug}`,
      lastModified: e.updatedAt,
      changeFrequency: "daily",
      priority: 0.6,
    }));
  } catch {
    // DB cold/unreachable — serve the static portion rather than failing the sitemap.
  }

  return [...staticPages, ...segmentPages, ...servicePages, ...blogPages, ...eventPages];
}
