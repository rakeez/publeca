import type { BrandLine } from "./types";

/**
 * The one repeated line and the enemy it answers (playbook §8.2, constructions 2 and 3;
 * §12.2). Said the same way everywhere: the footer on every page and the
 * meta descriptions of /, /services/growth-consulting and /for/ceos. Kept out of the
 * investor page's headings and meta, where a slogan reads as a pitch (footer only).
 */
export const brandLine: BrandLine = {
  line: "Consulting that builds what it recommends.",
  enemy: "Growth stalls in the gaps between the firms you hire.",
};

/**
 * The date the marketing content last changed in a meaningful way. Used as `lastmod` for
 * pages without their own date in the sitemap. Bump it when page copy changes, not for
 * styling-only releases: Google only trusts lastmod that is consistently accurate.
 */
export const CONTENT_UPDATED = "2026-10-15";
