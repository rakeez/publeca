import type { Bucket } from "./types";

/**
 * Services pooled into buckets by the value the customer gets, not by our department
 * (user direction, 2026-10-14). Each bucket opens with who + value + the problem it solves;
 * its "How we do it" breakdown then lists the capabilities (service pages) that deliver it,
 * with the department behind each one.
 *
 * Every service belongs to exactly one bucket. Order = display order everywhere (home tabs,
 * /services, nav, footer). Copy uses only documented claims (docs/positioning.md §1–§5).
 */
export const BUCKETS: Bucket[] = [
  {
    id: "where-to-grow",
    label: "Know where to grow",
    who: "For leaders whose growth has leveled off, with several directions it could come from.",
    value: "Know which growth bet pays before you fund it, and have one senior person own it",
    problem:
      "Every option, from a new market to a new website to more advertising, has a champion. None has been sized in money, and nobody senior owns the result.",
    outcomes: [
      "Every realistic option ranked by financial impact, effort and risk",
      "A 90-day plan with named owners and the numbers it should move",
      "A forward-deployed growth executive who owns the plan inside your business",
      "Positioning that turns what the product does into reasons to buy",
    ],
    services: ["growth-consulting", "product-marketing"],
  },
  {
    id: "spend-to-sales",
    label: "Turn spend into sales",
    who: "For companies spending on ads every month without a straight answer on what it returns.",
    value: "Ad spend tied to sales you can count, not clicks you can't",
    problem:
      "The ad dashboards report clicks and conversions that never match your sales records, so nobody can say which spend pays back, and the platforms keep optimizing for people who tap.",
    outcomes: [
      "Cost per sale by campaign, not just cost per click",
      "Tracking on your website and app in place before budgets grow",
      "Ad platforms that learn from buyers, because confirmed sales are sent back to them",
    ],
    services: ["google-ads", "social-media-ads", "conversion-tracking-analytics"],
  },
  {
    id: "be-chosen",
    label: "Be found and chosen",
    who: "For companies that depend on ads because buyers don't find them on their own.",
    value: "Be the obvious choice when buyers search, ask and compare",
    problem:
      "You're hard to find on Google and absent from AI answers, the brand looks smaller than the company, and content gets made without moving anyone closer to buying.",
    outcomes: [
      "Organic traffic from the searches buyers actually make",
      "Citable expert content and clear signals for AI answers, without gimmicks",
      "A brand that earns trust and supports premium pricing",
      "Content built from the questions customers ask before they buy",
    ],
    services: ["seo", "aeo-geo", "branding", "content-creation"],
  },
  {
    id: "remove-limits",
    label: "Remove what caps growth",
    who: "For companies whose website, tools or manual work have become the bottleneck.",
    value: "A website, software and AI that convert, measure and take hours out of the business",
    problem:
      "The site looks fine but doesn't convert or rank, the systems can't keep up with the plan, and AI so far has been talk without payback.",
    outcomes: [
      "Fast, measurable websites built to convert and rank",
      "Custom software from our own Engineering department",
      "AI automations chosen where payback is measurable against today's baseline",
    ],
    services: ["web-development", "software-development", "ai-solutions"],
  },
  {
    id: "sell-out",
    label: "Sell out the room",
    who: "For event organizers who sell tickets and need the room full on the night.",
    value: "Fill the room, and know which spend filled it",
    problem:
      "Money goes into ads, but Meta reports clicks, the ticketing tool reports orders, and nothing connects the two, so each extra ticket costs more than it should.",
    outcomes: [
      "An on-sale campaign planned backward from your event date",
      "Ticketing with paid-booking conversion tracking built in",
      "Photo and video that fuel the next on-sale",
    ],
    services: ["event-marketing", "ticketing-platform", "photography-videography"],
  },
];
