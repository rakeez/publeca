import { prisma } from "@publeca/db";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Produce a slug unique across all events, appending a short suffix on collision. */
export async function uniqueEventSlug(title: string, excludeEventId?: string): Promise<string> {
  const base = slugify(title) || "event";
  let candidate = base;

  for (let i = 0; i < 50; i++) {
    const existing = await prisma.event.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeEventId) return candidate;
    const suffix = Math.random().toString(36).slice(2, 6);
    candidate = `${base}-${suffix}`;
  }

  // Extremely unlikely fallback.
  return `${base}-${Date.now().toString(36)}`;
}
