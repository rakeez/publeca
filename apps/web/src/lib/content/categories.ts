import type { ServiceCategory } from "./types";

/**
 * Service categories, in display order. Copy follows the writing rule (/CLAUDE.md):
 * `value` states the outcome of the whole category before any service is listed.
 */
export const CATEGORIES: {
  id: ServiceCategory;
  name: string;
  department: string;
  value: string;
}[] = [
  {
    id: "strategy",
    name: "Growth strategy",
    department: "Growth Consulting",
    value: "Know which growth bets are worth making — with someone senior accountable for delivering them.",
  },
  {
    id: "marketing",
    name: "Marketing & brand",
    department: "Marketing & Brand",
    value: "Demand that shows up as sales: a brand buyers trust, and channels you can measure.",
  },
  {
    id: "data",
    name: "Analytics & data science",
    department: "Analytics & Data Science",
    value: "Know exactly which spend makes money — on your website and in your app.",
  },
  {
    id: "engineering",
    name: "Engineering & AI",
    department: "Engineering",
    value: "Websites, software and AI that remove the bottlenecks between you and the next stage of growth.",
  },
  {
    id: "events",
    name: "Events",
    department: "Events",
    value: "Sold-out events, with ticketing and paid-booking conversion tracking built in. Our original arm.",
  },
];

export function getCategory(id: ServiceCategory) {
  return CATEGORIES.find((c) => c.id === id)!;
}
