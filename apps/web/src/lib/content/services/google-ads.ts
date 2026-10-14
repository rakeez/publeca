import type { Service } from "../types";

const service: Service = {
  slug: "google-ads",
  category: "marketing",
  name: "Google Ads management",
  shortName: "Google Ads",

  who: "For directors, CEOs and founders who spend on Google Ads every month but can't say which campaigns produce customers rather than clicks.",
  value: "Google Ads that optimize to the sales in your CRM, not to clicks and form fills",
  valueDetail:
    "Google Ads management built on your real sales data: qualified leads and closed deals flow back from your CRM, so Google's automated bidding learns which searches bring buyers and bids more for them. You see cost per sale by campaign, not just cost per click.",
  problem:
    "The dashboard says conversions are up, but sales haven't moved. Nobody can tell you which keywords bring customers, the monthly report is clicks and impressions, and Performance Max is a black box you're asked to trust while the budget keeps growing.",

  cardSummary:
    "Google Ads trained on the revenue in your CRM, so budget moves to the searches that bring customers, not just clicks.",

  outcomes: [
    "Cost per qualified lead and cost per sale for every campaign, every week, not only cost per click.",
    "Bidding that chases revenue and lead quality, because outcomes from your CRM are fed back to Google.",
    "Less budget lost to irrelevant searches, junk placements and overlapping campaigns that split the data bidding learns from.",
    "An account you own outright, structured so new campaigns learn quickly and every result can be explained.",
  ],

  includes: [
    {
      title: "Conversion actions that count real outcomes",
      body: "Conversion tracking rebuilt so only business outcomes are marked as primary conversions, with page views and micro-actions demoted. Enhanced conversions send hashed first-party data to recover conversions lost to cookie limits and cross-device journeys. Set up and verified by our Analytics & Data Science team.",
    },
    {
      title: "Offline conversion import from your CRM",
      body: "Qualified leads, booked meetings and closed deals are imported back into Google Ads with their value, matched by click ID or by enhanced conversions for leads. Google stops learning which clicks filled a form and starts learning which clicks became revenue.",
    },
    {
      title: "Value-based bidding, when the data supports it",
      body: "Once conversion volume and values are reliable, campaigns move to Maximize conversion value or target ROAS. Until then they stay on simpler strategies, because switching early teaches the algorithm noise and wastes the learning period.",
    },
    {
      title: "Account structure built for learning",
      body: "Campaigns grouped by intent, margin and goal instead of by habit, so each one collects enough conversion data to optimize. Fewer, well-fed campaigns replace dozens of thin ones splitting the same signal.",
    },
    {
      title: "Search, Performance Max, YouTube and Demand Gen, each with a job",
      body: "Search captures demand that already exists. Performance Max and Demand Gen extend reach using your best-converting audiences and assets. YouTube builds the demand Search later captures. Brand exclusions keep Performance Max off searches for your name, and brand and non-brand results are reported separately, so no campaign takes credit for customers who were already looking for you.",
    },
    {
      title: "Search term and negative keyword hygiene",
      body: "Search terms reviewed on a fixed cadence, shared negative keyword lists maintained at account level, and brand and placement exclusions applied to Performance Max, so spend stops leaking into queries and sites that never convert.",
    },
  ],

  process: [
    {
      title: "Diagnose: trace spend to real sales",
      body: "Search terms, conversion actions and tracking are checked against what your CRM and finance records say actually happened. The audit shows where money is wasted and where conversions are being miscounted or double-counted.",
    },
    {
      title: "Prioritize: fix the signal before the spend",
      body: "Clean conversion actions, enhanced conversions and CRM import go in before budgets change, because bidding can only optimize to what it is told. Targets are agreed per campaign: cost per qualified lead, cost per sale or return on ad spend.",
    },
    {
      title: "Deploy: rebuild the account for learning",
      body: "Campaigns are restructured around intent and margin, negatives and exclusions are applied, and each campaign gets the bid strategy its data can support today.",
    },
    {
      title: "Measure: weekly read-outs from your own numbers",
      body: "Every week you see what was spent, what it produced in qualified leads and sales, what changed and why. The numbers reconcile to your CRM, not only to the Google Ads interface.",
    },
    {
      title: "Scale: value-based bidding and wider reach",
      body: "When conversion values are dependable, campaigns shift to value-based bidding, then extend into YouTube and Demand Gen to create demand that Search can capture at a known cost per sale.",
    },
  ],

  forSegments: ["ceos", "technical-founders"],

  faqs: [
    {
      q: "Can you guarantee a top position or a specific return on ad spend?",
      a: "No, and anyone who does is guessing. Ad position is decided by an auction that runs fresh on every search, and return depends on your margins, pricing and sales process as much as on the ads. What is in our control is the mechanism: clean tracking, CRM revenue fed back to Google, an account structured to learn, and weekly reporting that shows what each campaign actually produced.",
    },
    {
      q: "Do we need a CRM for offline conversion import to work?",
      a: "You need a reliable record of what happened to each lead, not necessarily a large CRM. Each lead has to keep its Google click ID, or the email or phone number used for enhanced conversions for leads, and its outcome: qualified, won, and value. If your current setup can't capture that, our Analytics & Data Science team builds it, from a scheduled spreadsheet upload to a direct CRM integration.",
    },
    {
      q: "Should we be using Performance Max?",
      a: "Often, but not by default. Performance Max performs well when it is fed accurate conversion values and strong assets, and poorly when it optimizes to cheap form fills or quietly claims branded searches. It runs with brand exclusions, separate brand reporting and offline conversion data, alongside Search campaigns wherever you need control over exact queries.",
    },
    {
      q: "Who owns the Google Ads account and its data?",
      a: "You do. The account sits under your business and we are granted access to it. Campaigns, conversion history, audiences and learning stay with you if you ever stop working with us.",
    },
  ],

  cta: {
    label: "Review my Google Ads account",
    message:
      "Hi Publeca, I'd like you to look at our Google Ads account. We're spending every month but can't tie it clearly to sales. Can we talk about fixing the tracking and feeding our CRM data back into bidding?",
    note: "Read-only access is enough for a first look.",
  },

  demos: {
    heading: "Cost per sale by campaign,",
    headingDim: "not just cost per click.",
    intro:
      "Once sales from your CRM flow back into the account, campaigns are ranked by what each sale cost, and budget follows that ranking. Shown with sample data.",
    items: ["cost-per-sale", "verified-sale"],
  },

  seo: {
    title: "Google Ads Management That Optimizes to Revenue",
    description:
      "Google Ads management trained on the sales in your CRM: enhanced conversions, offline conversion import, value-based bidding and cost per sale by campaign.",
    keywords: [
      "Google Ads management",
      "Google Ads agency",
      "Performance Max management",
      "offline conversion import",
      "enhanced conversions",
      "value-based bidding",
      "Google Ads audit",
      "Google Ads conversion tracking",
    ],
  },
};

export default service;
