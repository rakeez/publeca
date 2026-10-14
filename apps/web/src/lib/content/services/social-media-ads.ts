import type { Service } from "../types";

const service: Service = {
  slug: "social-media-ads",
  category: "marketing",
  name: "Social media advertising",
  shortName: "Social media ads",

  who: "For CEOs, founders and marketing leads spending every month on Facebook, Instagram, TikTok or LinkedIn ads who still can't say which campaigns bring in paying customers.",
  value: "Social media advertising that finds paying customers — and shows you what each one cost",
  valueDetail:
    "Your confirmed purchases and qualified leads are sent server-side to Meta, TikTok and LinkedIn, so each platform's algorithm learns from the people who buy instead of the people who click. Every week you get a plain-language read-out: what was spent, what it produced, and where the next budget should go.",
  problem:
    "The money goes out every month. The dashboards report reach, clicks and \"conversions\" that never match your sales figures, the person running the ads says the campaigns are performing, and you still can't answer the only question that matters: which of this spend brought in customers, and should you be spending more of it or less?",

  cardSummary:
    "Ad spend that finds buyers, not clicks: Meta, TikTok and LinkedIn campaigns optimized on your real sales and qualified leads.",

  outcomes: [
    "Platform algorithms that learn from your confirmed sales and qualified leads, so budget flows toward people likely to buy — not just people likely to click.",
    "A cost per customer or per qualified lead for every campaign, checked against your own sales records rather than the platform's own report.",
    "Creative decisions made on evidence: you know which message, offer and format sells, and each new round of creative builds on what has been proven.",
    "A plain-language answer every week to three questions: what was spent, what it returned, and what changes next.",
  ],

  includes: [
    {
      title: "Server-side conversion tracking",
      body: "Meta Conversions API, TikTok Events API and LinkedIn Conversions API connected to your checkout, CRM or backend. Purchases and qualified leads are sent from your server, deduplicated against the browser pixel, and checked for match quality before any budget scales — so sales lost to ad blockers and privacy settings still reach the algorithm.",
    },
    {
      title: "Optimization event design",
      body: "A deliberate choice of what each platform should chase: a purchase, a qualified lead, a booked call. Where conversion volume is too thin for the algorithm to exit its learning phase, the nearest event that still predicts revenue is used instead, and the switch to the real outcome is planned for when volume allows.",
    },
    {
      title: "Structured creative testing",
      body: "A test plan that isolates one variable at a time — hook, offer, angle, format — with a written hypothesis for each test and a rule, agreed in advance, for when a winner is called. Winners get budget; losers are retired with the lesson recorded so it isn't paid for twice.",
    },
    {
      title: "Audience strategy by platform",
      body: "Broad targeting where the algorithm has strong purchase data to learn from; customer-list and site-visitor audiences for retargeting and exclusions; job title, seniority and company targeting on LinkedIn when the buyer is a business. Existing customers are excluded from acquisition budgets so you stop paying to win people you already have.",
    },
    {
      title: "Budget pacing and reallocation",
      body: "Daily pacing checks so a month's budget isn't exhausted in two weeks, and money moved between campaigns and platforms on cost per customer — not on whichever platform reports the most flattering numbers about itself.",
    },
    {
      title: "Weekly plain-language read-out",
      body: "Spend, customers or qualified leads, cost per result, what was tested, what was learned and what changes next week — written so a CEO can read it in minutes, with the underlying data open to anyone who wants to check it.",
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "An audit of your ad accounts, pixel and conversion setup: which events the platforms are optimizing toward today, which real sales they never see, and where past spend went compared with your own sales records.",
    },
    {
      title: "Prioritize",
      body: "Choose the platforms, offer and optimization event that match how your customers buy. Set a target cost per customer from your margins, then agree the starting budget and the first round of tests.",
    },
    {
      title: "Deploy",
      body: "Server-side tracking goes live and is verified before campaigns launch. Our Analytics & Data Science team owns the data; our Marketing & Brand team runs the campaigns, the audience structure and the creative tests.",
    },
    {
      title: "Measure",
      body: "Pacing checked daily, results reconciled against your sales data, and a weekly read-out that says plainly what worked, what didn't and what happens next.",
    },
    {
      title: "Scale",
      body: "Budget moves to the audiences, creative and platforms producing customers at or below your target cost, and new creative is built from the messages that have already proven they sell.",
    },
  ],

  forSegments: ["ceos", "technical-founders", "investors"],

  faqs: [
    {
      q: "Can you guarantee a return on ad spend or a specific cost per sale?",
      a: "No, and be cautious of anyone who does. Results depend on your offer, pricing, margins and market as much as on the ads. What we commit to is the system: tracking that tells the platforms and you the truth, a disciplined test plan, and a weekly read-out that shows exactly what the spend is producing — so you can decide on real numbers whether to scale, change course or stop.",
    },
    {
      q: "Why does server-side tracking matter? Isn't the pixel enough?",
      a: "The browser pixel misses conversions when people use ad blockers, restrict tracking in their browser or phone, or switch devices, and it can't see what happens after the website — a lead that becomes a paying customer weeks later, for example. The Conversions API sends those events from your own server or CRM, so the platforms optimize toward outcomes you care about and your reports sit much closer to your actual sales.",
    },
    {
      q: "Which platforms should we be advertising on?",
      a: "Wherever your buyers spend attention and the platform can learn from your conversion data. Consumer products and events usually start with Meta and TikTok; B2B and high-value services often belong on LinkedIn, where you can reach people by job title, seniority and company. The starting mix is set from your margins and sales cycle, not from what's fashionable.",
    },
    {
      q: "Who owns the ad accounts, audiences and data?",
      a: "You do. Campaigns run in ad accounts, pixels and business assets owned by your company, with Publeca given partner access. If you stop working with us, the accounts, audiences, tracking setup and the full record of what was tested stay with you.",
    },
  ],

  cta: {
    label: "Review my ad spend and tracking",
    message:
      "Hi Publeca, we're spending on social media ads (Meta/TikTok/LinkedIn) but can't tell which campaigns are bringing in customers. Could you review our ad accounts and conversion tracking and tell us what you'd change?",
    note: "Starts with a look at your current tracking and spend.",
  },

  seo: {
    title: "Social Media Advertising Optimized for Sales, Not Likes",
    description:
      "Social media advertising that finds paying customers: Meta, TikTok and LinkedIn ads trained on your real sales data, with plain-language weekly reports.",
    keywords: [
      "social media advertising",
      "social media ads agency",
      "Meta Conversions API",
      "Facebook and Instagram ads",
      "TikTok ads",
      "LinkedIn ads",
      "paid social",
      "ad creative testing",
    ],
  },
};

export default service;
