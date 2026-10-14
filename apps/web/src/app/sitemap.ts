import type { MetadataRoute } from "next";
import { prisma } from "@publeca/db";
import { POSTS, SEGMENTS, SERVICES } from "@/lib/content";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

// Refresh hourly so newly published events appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${APP_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${APP_URL}/events`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${APP_URL}/diagnostic`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${APP_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const segmentPages: MetadataRoute.Sitemap = SEGMENTS.map((s) => ({
    url: `${APP_URL}/for/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${APP_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: s.category === "events" ? 0.7 : 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${APP_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Live, upcoming events from the ticketing platform.
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
      priority: 0.6,
    }));
  } catch {
    // DB cold/unreachable — serve the static portion rather than failing the sitemap.
  }

  return [...staticPages, ...segmentPages, ...servicePages, ...blogPages, ...eventPages];
}
