/**
 * Content contract for every public page.
 *
 * THE PUBLECA WRITING RULE (full text in /CLAUDE.md — keep both in sync):
 *   Who + Value  →  Problem  →  Details  →  CTA
 * Every page/card/post must open by naming WHO it is for and the EXACT VALUE they get
 * (an outcome, not an activity), derived from the problem we solve. Only then explain
 * the details (what's included, how it works), and close with a CTA.
 *
 * The `ValueFirst` fields below are required on every page type so the rule is enforced
 * by the type checker, and the page templates render them FIRST, in that order.
 */

export type SegmentSlug = "ceos" | "technical-founders" | "investors";

export type ServiceCategory = "strategy" | "marketing" | "data" | "engineering" | "events";

/** The four fields every page must lead with. See /CLAUDE.md "Writing rule". */
export interface ValueFirst {
  /** WHO this is for, in their own terms. e.g. "For directors and CEOs who run profitable companies but can't see where the next stage of growth comes from." */
  who: string;
  /** The exact value they get — the headline. An outcome, never an activity. */
  value: string;
  /** 1–2 sentences that make the value concrete: what changes for them, specifically. */
  valueDetail: string;
  /** The problem we solve, phrased the way the customer actually feels it. */
  problem: string;
}

export interface FAQ {
  q: string;
  a: string;
}

/**
 * A call to action. By default it opens WhatsApp with `message` prefilled.
 * Set `href` to link somewhere instead (e.g. "/signup"), or `channel: "email"` to open
 * a pre-addressed email (used for low-pressure CTAs such as the investor page).
 */
export interface Cta {
  label: string;
  message: string;
  channel?: "whatsapp" | "email";
  href?: string;
  /** Optional reassurance shown under the button, e.g. "No pitch. 30 minutes." */
  note?: string;
}

export interface SeoMeta {
  /** <title> — keep under ~60 chars; the site name is appended automatically. */
  title: string;
  /** Meta description — 140–160 chars, value-first, includes the primary keyword. */
  description: string;
  keywords: string[];
}

export interface TitledText {
  title: string;
  body: string;
}

/**
 * A section heading. `headingDim` is the optional resolving clause of a two-tone heading
 * (playbook R1): it renders in muted ink right after `heading`, as one sentence. The reader's
 * value must never sit only in the dim half.
 */
export interface Heading {
  heading: string;
  headingDim?: string;
}

/** The deliverable micro-demos (playbook P3). Copy and sample values live in ./demos.ts. */
export type DemoId =
  | "opportunity-map"
  | "weekly-readout"
  | "verified-sale"
  | "verified-sale-technical"
  | "verified-ticket"
  | "cost-per-sale"
  | "seat-hold";

/** A "shown, not described" section: up to three demos of what the client receives. */
export interface DemoSection extends Heading {
  intro: string;
  items: DemoId[];
}

/** One of Publeca's five departments. Read by the hero diagram and the firm bento. */
export interface Department extends TitledText {
  /** One-line outcome for the reader, revealed on hover in the bento (always shown on touch). */
  outcome: string;
  /** The method stages this department does most of its work in (names from home.process). */
  stages: string[];
}

export interface Service extends ValueFirst {
  slug: string;
  /** Full name, e.g. "Search engine optimization (SEO)". */
  name: string;
  /** Short label for nav and cards, e.g. "SEO". */
  shortName: string;
  category: ServiceCategory;
  /** One value-first line for cards (≤ 140 chars). */
  cardSummary: string;
  /** "What you get" — 3–5 outcome bullets. */
  outcomes: string[];
  /** "What's included" — 3–6 concrete deliverables. */
  includes: TitledText[];
  /** "How we work" — 3–5 steps. */
  process: TitledText[];
  /** Which audience segments this capability matters most to. */
  forSegments: SegmentSlug[];
  /** 3–4 genuine buyer questions with direct answers. */
  faqs: FAQ[];
  cta: Cta;
  seo: SeoMeta;
  /** Optional demos of this service's deliverables, shown after "What you get". */
  demos?: DemoSection;
}

export interface Package {
  name: string;
  /** Who this package is for (first line on the card). */
  bestFor: string;
  /** The outcome of the package — the value, stated before anything else. */
  value: string;
  /** Duration / commitment / commercial shape. NEVER a price we haven't been given. */
  commitment: string;
  includes: string[];
  /** Mark exactly one package per segment as the recommended starting point. */
  highlight?: boolean;
}

export interface Segment extends ValueFirst {
  slug: SegmentSlug;
  /** e.g. "Directors & CEOs". */
  name: string;
  /** Nav label, e.g. "For CEOs". */
  navLabel: string;
  /** One value-first line for cards (≤ 140 chars). */
  cardSummary: string;
  /** "direct" = CEOs, "technical" = founders, "understated" = investors (no sales push). */
  tone: "direct" | "technical" | "understated";
  /** "Sound familiar?" — 4–5 pains, in the reader's words. */
  pains: string[];
  /** "What you get" — 3–4 value statements. */
  gains: TitledText[];
  /** Exactly 3 packages. */
  packages: Package[];
  /** "How an engagement runs" — 4–5 steps. */
  process: TitledText[];
  /** Service slugs most relevant to this segment (4–6). */
  services: string[];
  faqs: FAQ[];
  cta: Cta & { secondaryLabel?: string; secondaryMessage?: string };
  seo: SeoMeta;
  /**
   * Section headings that answer this reader's fear (playbook §8.2, construction 7).
   * Each falls back to a neutral default when omitted.
   */
  headings?: {
    gains?: Heading;
    packages?: Heading & { intro?: string };
    process?: Heading;
  };
  /** Optional deliverable demos. Never set on the investor page (it stays quiet). */
  demos?: DemoSection;
}

export type PostAudience = SegmentSlug | "events" | "general";

export interface PostSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** Who should read this — shown first. */
  who: string;
  /** What the reader walks away with — shown first. */
  value: string;
  /** One-line summary for cards and meta. */
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingMins: number;
  author: string;
  audience: PostAudience[];
  body: PostSection[];
  cta: Cta;
  seo: SeoMeta;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    /** Who we're for — rendered above/with the headline. */
    who: string;
    /** H1 — the value. Must naturally include "growth consulting firm". */
    headline: string;
    subhead: string;
    primaryCta: Cta;
    secondaryCta: { label: string; href: string };
    /** 3–4 short proof-of-capability chips (capabilities, not invented stats). */
    chips: string[];
  };
  /** "Who we help" tabs. Each panel is built from that segment's own content. */
  audiences: Heading & { intro: string };
  problem: Heading & { intro: string; points: TitledText[] };
  value: Heading & { intro: string; items: TitledText[] };
  /** "What you'd actually receive": the deliverables, demonstrated. */
  demos: DemoSection;
  process: Heading & { intro: string; steps: TitledText[] };
  /**
   * The commercial shape, objection first (no prices): the documented promises a reader
   * can hold us to, and the primary CTA repeated.
   */
  commitments: Heading & { intro: string; promises: TitledText[] };
  capabilities: Heading & { intro: string };
  firm: Heading & { intro: string; departments: Department[] };
  eventsArm: { heading: string; body: string; ctaLabel: string };
  insights: Heading & { intro: string };
  faqs: FAQ[];
  finalCta: { heading: string; body: string; cta: Cta };
  seo: SeoMeta;
}

/** The repeated brand line (playbook §8.2, construction 2): footer + named meta descriptions. */
export interface BrandLine {
  line: string;
  /** The enemy, as a situation (never a competitor). Repeated in the footer. */
  enemy: string;
}

export interface EventsHubContent extends ValueFirst {
  eyebrow: string;
  /** "Only on Publeca" differentiator — conversion tracking on paid bookings. */
  differentiator: Heading & { body: string; points: TitledText[] };
  /** The real platform behavior, demonstrated with sample data. */
  demos?: DemoSection;
  paths: { doneForYou: TitledText; selfServe: TitledText };
  journey: TitledText[];
  /** Service slugs in the events arm. */
  services: string[];
  faqs: FAQ[];
  cta: Cta;
  seo: SeoMeta;
}
