import type { MetadataRoute } from "next";
import { prisma } from "@publeca/db";
import { SERVICES, POSTS } from "@/lib/marketing-content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

// Refresh hourly so newly published events appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${APP_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${APP_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${APP_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${APP_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Live, upcoming events — the pages we most want discovered.
  let eventPages: MetadataRoute.Sitemap = [];
  try {
    const events = await prisma.event.findMany({
      where: { status: "LIVE" },
      select: { slug: true, updatedAt: true },
      orderBy: { startsAt: "asc" },
      take: 5000,
    });
    eventPages = events.map((e) => ({
      url: `${APP_URL}/e/${e.slug}`,
      lastModified: e.updatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    }));
  } catch {
    // DB cold/unreachable — serve the static portion rather than failing the sitemap.
  }

  return [...staticPages, ...servicePages, ...blogPages, ...eventPages];
}
