import type { DemoId } from "./types";

/**
 * The deliverable micro-demos (playbook P3 / R5): their copy AND every sample value they
 * show. Components never hold literals of their own, so this file is the one place to
 * check that nothing looks like a client result.
 *
 * Rules (CLAUDE.md "Banned" + playbook §9.2 P3):
 * - Every demo is labelled "Sample data" on screen.
 * - No figures at all: scores are 1–5 dots and bars are relative widths. Nothing here is a
 *   client number, a benchmark or a forecast.
 * - Only things Publeca actually hands the client, or the platform's real behavior.
 * - Each demo's `note` is show-your-working microcopy: why it works the way it does.
 */

export interface DemoCopy {
  /** The deliverable the reader holds, bolded on the card (construction 6). */
  title: string;
  /** The specifics that make it useful. */
  body: string;
  /** Show-your-working line under the stage. */
  note: string;
  /** What the finished state shows, for screen readers. */
  label: string;
}

export const DEMO_COPY: Record<DemoId, DemoCopy> = {
  "opportunity-map": {
    title: "The opportunity map",
    body: "Every realistic option ranked by financial impact, effort and risk. The top three become a 90-day plan with a named owner each.",
    note: "Options that don't survive the numbers are dropped in writing, with the reason.",
    label:
      "Sample opportunity map: five growth options scored for impact, effort and risk, sorted so the top three move into a 90-day plan with owners, and two are dropped with a reason.",
  },
  "weekly-readout": {
    title: "The weekly read-out",
    body: "In plain language, every week: what moved, what didn't, and what changes next.",
    note: "Every read-out states plainly where the data is incomplete.",
    label:
      "Sample weekly read-out with three lines, what moved, what didn't and what changes next, plus a flag saying where the data is incomplete.",
  },
  "verified-sale": {
    title: "A sale counted only when it's real",
    body: "A click becomes a sale in your reporting only once payment clears, with its value and order ID attached.",
    note: "An abandoned checkout never counts as a sale, so the ad platforms learn from buyers, not browsers.",
    label:
      "Sample flow: an ad click leads to a checkout; only after payment is verified is a sale recorded and sent to Meta and Google. An abandoned checkout sends nothing.",
  },
  "verified-sale-technical": {
    title: "One purchase event, counted once",
    body: "The server sends the purchase after the payment webhook verifies it, keyed by the order ID. The browser sends the same ID, so the platform keeps one.",
    note: "Revenue-first: no purchase event exists until the business record does.",
    label:
      "Sample event flow: begin_checkout in the browser, payment verified by webhook on the server, then a Purchase event sent server-side and from the browser with the same event ID, deduplicated into one conversion. An abandoned checkout emits no Purchase.",
  },
  "verified-ticket": {
    title: "Ads that learn who actually buys",
    body: "When a buyer's payment is verified, a purchase with the ticket value goes to Meta and Google. Nothing is sent for an abandoned checkout.",
    note: "Meta gets it from the browser and our server, merged into one by the order ID, so an ad blocker doesn't hide the sale.",
    label:
      "Sample ticket purchase: event page, checkout, payment verified, then a purchase with the ticket value sent to Meta and Google. An abandoned checkout sends nothing.",
  },
  "cost-per-sale": {
    title: "Cost per sale by campaign, not just cost per click",
    body: "Once sales from your records flow back, the headline column changes from clicks to cost per sale, and the ranking changes with it.",
    note: "Bars are relative. The campaign with the most clicks is not always the one that sells.",
    label:
      "Sample campaign table: ranked by clicks, then re-ranked by cost per sale once sales data is connected. The campaign with the most clicks moves to the bottom.",
  },
  "seat-hold": {
    title: "Seats held at checkout never count as sold",
    body: "A seat is held while the buyer pays, sold only when payment is verified, and released if the checkout is abandoned.",
    note: "So the sold count on your dashboard is money received, not carts started.",
    label:
      "Sample seat map: seats turn amber while held during checkout, pink once payment is verified, and back to available when a hold expires.",
  },
};

// ─────────────────────────── Sample values ───────────────────────────

/** Scores are 1–5 dots. Ranking = impact counts double; effort and risk count against. */
export const OPPORTUNITIES = [
  { name: "Open a second city", impact: 4, effort: 5, risk: 4, owner: "", dropReason: "costs more than it returns" },
  { name: "Search ads, buying intent", impact: 4, effort: 2, risk: 2, owner: "Marketing & Brand" },
  { name: "Full rebrand", impact: 2, effort: 4, risk: 3, owner: "", dropReason: "no sales impact in 90 days" },
  { name: "Fix checkout drop-off", impact: 5, effort: 2, risk: 1, owner: "Engineering" },
  { name: "Referral offer", impact: 3, effort: 1, risk: 1, owner: "Growth executive" },
] as const;

export const opportunityScore = (o: { impact: number; effort: number; risk: number }) =>
  o.impact * 2 - o.effort - o.risk;

export const READOUT = {
  week: "Week 6",
  lines: [
    { label: "What moved", text: "Search ads on buying-intent terms: cost per sale fell for the second week running." },
    { label: "What didn't", text: "The referral offer: few referrals so far, so it stops on Friday as agreed." },
    { label: "What changes next", text: "Budget moves from broad social to search. The checkout fix ships on Tuesday." },
  ],
  flag: "Data incomplete: phone orders aren't tracked yet, so sales totals read low.",
} as const;

export const SALE_FLOW = {
  steps: ["Ad clicked", "Checkout started", "Payment verified", "Sale recorded"],
  sentTo: "Value + order ID sent to Meta and Google",
  abandoned: { steps: ["Ad clicked", "Checkout abandoned"], result: "Nothing sent" },
} as const;

export const SALE_FLOW_TECHNICAL = {
  steps: [
    { where: "browser", event: "begin_checkout" },
    { where: "server", event: "payment.verified (webhook)" },
    { where: "server", event: "Purchase · event_id = order_id" },
    { where: "browser", event: "Purchase · event_id = order_id" },
  ],
  result: "Deduplicated: 1 conversion",
  abandoned: { event: "begin_checkout", result: "No Purchase emitted" },
} as const;

export const TICKET_FLOW = {
  event: "Your event page",
  tier: "General Admission",
  steps: ["Ticket selected", "Checkout", "Payment verified", "Purchase sent"],
  platforms: ["Meta", "Google"],
  abandoned: "Checkout abandoned: nothing sent",
} as const;

/** Relative values (0–1). Lower cost per sale is better. */
export const CAMPAIGNS = [
  { name: "Broad social", clicks: 1, costPerSale: 1 },
  { name: "Display network", clicks: 0.72, costPerSale: 0.82 },
  { name: "Search: buying intent", clicks: 0.46, costPerSale: 0.34 },
  { name: "Retargeting", clicks: 0.28, costPerSale: 0.45 },
] as const;

/** A small seat block. Indexes into a 6 × 10 grid. */
export const SEAT_MAP = {
  rows: 6,
  cols: 10,
  sold: [2, 3, 4, 12, 13, 14, 15, 22, 23, 31, 32, 33, 34, 35],
  /** Held during checkout; the first two are paid, the last one's hold expires. */
  held: [45, 46, 27],
  paid: [45, 46],
  expired: [27],
} as const;
