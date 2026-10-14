/**
 * Content registry. To add a page: create the content file (following the writing rule in
 * /CLAUDE.md and the types in ./types.ts) and register it here.
 */
import type { PostAudience, Post, Segment, SegmentSlug, Service, ServiceCategory } from "./types";
import { BUCKETS } from "./buckets";

// Services — strategy
import growthConsulting from "./services/growth-consulting";
import productMarketing from "./services/product-marketing";
// Services — marketing
import branding from "./services/branding";
import contentCreation from "./services/content-creation";
import socialMediaAds from "./services/social-media-ads";
import googleAds from "./services/google-ads";
import seo from "./services/seo";
import aeoGeo from "./services/aeo-geo";
// Services — data
import conversionTracking from "./services/conversion-tracking-analytics";
// Services — engineering
import webDevelopment from "./services/web-development";
import softwareDevelopment from "./services/software-development";
import aiSolutions from "./services/ai-solutions";
// Services — events arm
import eventMarketing from "./services/event-marketing";
import photoVideo from "./services/photography-videography";
import ticketingPlatform from "./services/ticketing-platform";

// Segments
import ceos from "./segments/ceos";
import technicalFounders from "./segments/technical-founders";
import investors from "./segments/investors";

// Posts
import p01 from "./posts/where-your-next-growth-comes-from";
import p02 from "./posts/forward-deployed-growth-executive";
import p03 from "./posts/is-your-marketing-working";
import p04 from "./posts/growth-without-giving-up-equity";
import p05 from "./posts/conversion-tracking-for-engineers";
import p06 from "./posts/positioning-technical-products";
import p07 from "./posts/why-go-to-market-stalls-after-the-round";
import p08 from "./posts/questions-for-a-growth-plan";
import p09 from "./posts/aeo-geo-what-actually-matters";
import p10 from "./posts/first-ai-project-payback";
import p11 from "./posts/sell-out-your-event-sri-lanka";
import p12 from "./posts/meta-vs-google-ads-for-events";
import p13 from "./posts/bnpl-event-tickets-sri-lanka";

import home from "./home";
import eventsHub from "./events-hub";

export * from "./types";
export { CATEGORIES, departmentOf, getCategory } from "./categories";
export { home, eventsHub };
export { brandLine } from "./site";
export { DEMO_COPY } from "./demos";
export { intakePage } from "./intake";
export { BUCKETS } from "./buckets";

export const SERVICES: Service[] = [
  growthConsulting,
  productMarketing,
  branding,
  contentCreation,
  socialMediaAds,
  googleAds,
  seo,
  aeoGeo,
  conversionTracking,
  webDevelopment,
  softwareDevelopment,
  aiSolutions,
  eventMarketing,
  photoVideo,
  ticketingPlatform,
];

export const SEGMENTS: Segment[] = [ceos, technicalFounders, investors];

export const POSTS: Post[] = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date) || a.title.localeCompare(b.title)
);

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getSegment = (slug: string) => SEGMENTS.find((s) => s.slug === slug);
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const servicesIn = (category: ServiceCategory) => SERVICES.filter((s) => s.category === category);
export const servicesFor = (segment: SegmentSlug) => SERVICES.filter((s) => s.forSegments.includes(segment));
export const postsFor = (audience: PostAudience) => POSTS.filter((p) => p.audience.includes(audience));

/** Value buckets with their services resolved, in display order (see ./buckets.ts). */
export const BUCKET_GROUPS = BUCKETS.map((b) => ({
  ...b,
  services: b.services.map((slug) => SERVICES.find((s) => s.slug === slug)).filter((s): s is Service => !!s),
}));

/** The bucket a service belongs to. Every service is in exactly one (tested). */
export const bucketOf = (slug: string) => BUCKET_GROUPS.find((b) => b.services.some((s) => s.slug === slug));

export const AUDIENCE_LABELS: Record<PostAudience, string> = {
  ceos: "For CEOs",
  "technical-founders": "For technical founders",
  investors: "For investors",
  general: "AI search & growth",
  events: "Events",
};
