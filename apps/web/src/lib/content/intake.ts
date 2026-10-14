/**
 * The growth diagnostic intake (playbook P11a): six questions, then a short, readable list of
 * what a diagnostic would look at first, and why. Modeled on a configurator that shows its
 * working: every item is labelled with the answer(s) that produced it.
 *
 * Rules (CLAUDE.md "Banned"): it never produces a score, a forecast or a number. Every item is
 * a deliverable or review that the documented packages already include (docs/positioning.md).
 *
 * Pure data + a pure function, so the logic is unit-tested (intake.test.ts) and the page
 * component only renders it. Keep imports type-only: the test runs this file directly.
 */
import type { FAQ, SegmentSlug, SeoMeta, ValueFirst } from "./types";

/** Page copy for /diagnostic. Writing rule order: who + value, problem, details, CTA. */
export const intakePage: ValueFirst & { eyebrow: string; startLabel: string; faqs: FAQ[]; seo: SeoMeta } = {
  eyebrow: "Diagnostic planner",
  who: "For owners, CEOs and founders deciding whether a growth diagnostic is worth it before anyone sends a proposal.",
  value: "See what a growth diagnostic would look at first in your business, and why",
  valueDetail:
    "Six questions. You get a short list of where the diagnostic would start, each item labelled with the answer that produced it, plus the package that fits and what you would receive every week. No score, no forecast, nothing invented.",
  problem:
    "Most first conversations with a consultant start with a pitch. You can't see what they would actually look at, so you can't judge whether it's worth the fee until you've already paid it.",
  startLabel: "Answer the six questions",
  faqs: [
    {
      q: "What happens to my answers?",
      a: "Nothing is stored. Your answers stay in your browser. If you choose to talk it through, they are written into a WhatsApp message that you can read and edit before you send it.",
    },
    {
      q: "Is this the diagnostic?",
      a: "No. It is a starting list built from six answers. The Growth Diagnostic itself works from your sales, spend, website and data, and from working sessions with your leadership team, and it confirms or replaces this list.",
    },
    {
      q: "Why no score or estimate?",
      a: "Because six multiple-choice answers can't support one. Any number produced here would be invented. What the answers can do is point to where the work should start, and say why.",
    },
  ],
  seo: {
    title: "Growth Diagnostic Planner: See Where It Would Start",
    description:
      "Six questions, then a short list of what a growth diagnostic would look at first in your business, each item labelled with the answer behind it. No score.",
    keywords: ["growth diagnostic", "growth consulting", "business growth assessment", "where to grow next"],
  },
};

export type QuestionId = "business" | "answerTo" | "revenue" | "tracking" | "tried" | "blocker";

export interface IntakeOption {
  id: string;
  label: string;
}

export interface IntakeQuestion {
  id: QuestionId;
  prompt: string;
  help?: string;
  multi?: boolean;
  options: IntakeOption[];
}

export const QUESTIONS: IntakeQuestion[] = [
  {
    id: "business",
    prompt: "Which best describes the business?",
    options: [
      { id: "established", label: "An established company I run or own" },
      { id: "product", label: "A product or software company I founded and built" },
      { id: "portfolio", label: "A company in an investor's portfolio" },
      { id: "events", label: "I organize ticketed events" },
    ],
  },
  {
    id: "answerTo",
    prompt: "Who do you answer to for growth?",
    options: [
      { id: "owners", label: "Myself and the other owners" },
      { id: "board", label: "A board" },
      { id: "investors", label: "Our investors" },
      { id: "nobody", label: "Honestly, nobody owns it yet" },
    ],
  },
  {
    id: "revenue",
    prompt: "Where does most of the revenue come from today?",
    options: [
      { id: "referrals", label: "Referrals and repeat customers" },
      { id: "paid", label: "Paid ads" },
      { id: "sales", label: "A sales team" },
      { id: "online", label: "An online store or self-serve signups" },
      { id: "mix", label: "A mix nobody has untangled" },
    ],
  },
  {
    id: "tracking",
    prompt: "Can you trace a sale back to what produced it?",
    options: [
      { id: "yes", label: "Yes, sales are tied to the channel that produced them" },
      { id: "platforms", label: "The ad platforms report conversions, but they don't match our sales" },
      { id: "traffic", label: "We see clicks and traffic, not sales" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "tried",
    prompt: "What has already been tried?",
    help: "Choose all that apply.",
    multi: true,
    options: [
      { id: "agency", label: "An agency" },
      { id: "consultant", label: "A consultant's plan" },
      { id: "website", label: "A new website" },
      { id: "hire", label: "An in-house marketing hire" },
      { id: "nothing", label: "Nothing yet" },
    ],
  },
  {
    id: "blocker",
    prompt: "What is most in the way right now?",
    options: [
      { id: "which", label: "Not knowing which opportunity to back" },
      { id: "owner", label: "Nobody senior owns growth" },
      { id: "spend", label: "Not knowing which spend makes money" },
      { id: "systems", label: "The website or our systems hold us back" },
      { id: "position", label: "Buyers don't get what the product does" },
    ],
  },
];

/** The things a diagnostic can look at first. Each is part of a documented package. */
export const FOCUS = {
  opportunities: {
    title: "The opportunity map",
    gets: "Every realistic option ranked by financial impact, effort and risk, with a financial model behind the leading ones.",
  },
  owner: {
    title: "Who should own growth",
    gets: "A clear view of whether a forward-deployed growth executive, light-touch advisory or a full-time hire fits, and what the role has to deliver.",
  },
  tracking: {
    title: "Tracking from spend to sale",
    gets: "A tracking plan our Analytics & Data Science team puts in place before any budget grows, checked against your own sales records.",
  },
  spend: {
    title: "Spend against sales, by channel",
    gets: "Which spend brings in paying customers and which doesn't, so budget moves to what works.",
  },
  systems: {
    title: "The website and systems",
    gets: "Where the site, checkout or internal tools cap growth, and what our Engineering team would change first.",
  },
  positioning: {
    title: "Positioning",
    gets: "How buyers actually describe the problem the product solves, from interviews with customers, recent wins and lost deals.",
  },
  beyondReferrals: {
    title: "Growth beyond referrals",
    gets: "Which channels could reach more buyers like your best referrals, sized before anything is spent.",
  },
  funnel: {
    title: "The sales funnel",
    gets: "Where deals stall between first contact and a signed customer, and what fixing each stage is worth.",
  },
  vendors: {
    title: "What each vendor delivers",
    gets: "What your agency or team delivers in revenue. Nobody is replaced by default; gaps are filled where they exist.",
  },
  lastPlan: {
    title: "Why the last plan stalled",
    gets: "Where the previous plan stopped turning into work, so this one is built to be executed, not filed.",
  },
} as const;

export type FocusId = keyof typeof FOCUS;

export const STARTS: Record<"established" | "product" | "portfolio", { pkg: string; shape: string; segment: SegmentSlug }> = {
  established: { pkg: "Growth Diagnostic", shape: "Fixed fee. About three weeks. Ends with a 90-day plan.", segment: "ceos" },
  product: { pkg: "Go-to-Market Sprint", shape: "About six weeks. Fixed scope, fixed fee. No equity.", segment: "technical-founders" },
  portfolio: { pkg: "Portfolio Growth Review", shape: "About two weeks per company. Fixed fee.", segment: "investors" },
};

export const REPORTING: Record<string, string> = {
  owners: "A plain-language read-out every week: what moved, what didn't, what changes next.",
  board: "A plain-language read-out every week, plus a monthly report you can put in front of your board.",
  investors: "A weekly read-out for you, and a short brief for your investors in the same format each time.",
  nobody: "A plain-language read-out every week, owned by one senior person instead of landing on your desk.",
};

export type Answers = Partial<Record<QuestionId, string | string[]>>;

export interface FocusItem {
  id: FocusId;
  title: string;
  gets: string;
  /** The answers that produced this item, in the reader's own words. */
  because: string[];
}

export type Plan =
  | { kind: "events" }
  | {
      kind: "growth";
      start: (typeof STARTS)[keyof typeof STARTS];
      focus: FocusItem[];
      reporting: string;
    };

export const MAX_FOCUS = 4;

const labelOf = (q: QuestionId, id: string) =>
  QUESTIONS.find((x) => x.id === q)?.options.find((o) => o.id === id)?.label ?? id;

const one = (a: Answers, q: QuestionId) => {
  const v = a[q];
  return Array.isArray(v) ? v[0] : v;
};

const many = (a: Answers, q: QuestionId) => {
  const v = a[q];
  return Array.isArray(v) ? v : v ? [v] : [];
};

/** True once every question has an answer (or the reader is routed to the events arm). */
export function isComplete(a: Answers) {
  if (one(a, "business") === "events") return true;
  return QUESTIONS.every((q) => many(a, q.id).length > 0);
}

/**
 * Turn answers into a plan. Priority: the stated blocker first, then tracking, then where
 * revenue comes from, then what has been tried, then who growth answers to. An item produced
 * by several answers appears once, carrying every answer that produced it.
 */
export function planFor(a: Answers): Plan {
  const business = one(a, "business");
  if (business === "events") return { kind: "events" };

  const items = new Map<FocusId, string[]>();
  const add = (id: FocusId, q: QuestionId, answer: string) => {
    const because = items.get(id) ?? [];
    const label = labelOf(q, answer);
    if (!because.includes(label)) because.push(label);
    items.set(id, because);
  };

  const tracking = one(a, "tracking");
  const tracked = tracking === "yes";
  // "Which spend makes money" can't be answered without tracking, so it lands there first.
  const spendItem: FocusId = tracked ? "spend" : "tracking";

  const blocker = one(a, "blocker");
  if (blocker) {
    const byBlocker: Record<string, FocusId> = {
      which: "opportunities",
      owner: "owner",
      spend: spendItem,
      systems: "systems",
      position: "positioning",
    };
    const id = byBlocker[blocker];
    if (id) add(id, "blocker", blocker);
  }

  if (tracking && !tracked) add("tracking", "tracking", tracking);

  const revenue = one(a, "revenue");
  if (revenue) {
    const byRevenue: Record<string, FocusId> = {
      referrals: "beyondReferrals",
      paid: spendItem,
      sales: "funnel",
      online: "systems",
      mix: spendItem,
    };
    const id = byRevenue[revenue];
    if (id) add(id, "revenue", revenue);
  }

  for (const t of many(a, "tried")) {
    const byTried: Record<string, FocusId | undefined> = {
      agency: "vendors",
      consultant: "lastPlan",
      website: "systems",
      hire: "vendors",
    };
    const id = byTried[t];
    if (id) add(id, "tried", t);
  }

  const answerTo = one(a, "answerTo");
  if (answerTo === "nobody") add("owner", "answerTo", answerTo);

  // Every plan starts from a ranked view of the options, even when nothing pointed there.
  if (!items.has("opportunities") && items.size < MAX_FOCUS) {
    items.set("opportunities", []);
  }

  const focus: FocusItem[] = [...items.entries()]
    .slice(0, MAX_FOCUS)
    .map(([id, because]) => ({ id, ...FOCUS[id], because }));

  const startKey = business === "product" || business === "portfolio" ? business : "established";
  return {
    kind: "growth",
    start: STARTS[startKey],
    focus,
    reporting: REPORTING[answerTo ?? "owners"] ?? REPORTING.owners!,
  };
}

/** The WhatsApp message, in the reader's voice, carrying their answers so nothing is retyped. */
export function messageFor(a: Answers, plan: Plan) {
  if (plan.kind === "events") {
    return "Hi Publeca, I organize ticketed events and want to sell out the next one, with tracking that shows which ads actually sell tickets. It's on [date] and capacity is about [number].";
  }
  const line = (q: QuestionId) =>
    many(a, q)
      .map((id) => labelOf(q, id))
      .join(", ");
  return [
    `Hi Publeca, I used the diagnostic planner on your site and I'd like to talk about the ${plan.start.pkg}.`,
    `The business: ${line("business")}.`,
    `Most revenue comes from: ${line("revenue")}.`,
    `Tracking: ${line("tracking")}.`,
    `Tried so far: ${line("tried")}.`,
    `Most in the way: ${line("blocker")}.`,
  ].join("\n");
}
