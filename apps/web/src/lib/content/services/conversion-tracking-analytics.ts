import type { Service } from "../types";

const service: Service = {
  slug: "conversion-tracking-analytics",
  category: "data",
  name: "Conversion tracking & analytics",
  shortName: "Tracking & analytics",

  who: "For founders and CEOs putting serious money into ads, a website or an app, who still cannot get a straight answer to which of that spend comes back as revenue.",
  value: "See which spend actually makes money, measured against real orders on your website and app",
  valueDetail:
    "Purchases and qualified leads are recorded once through server-side conversion tracking, app installs are linked to what those users later spend, and sales are tied to the campaigns that produced them, so Meta, Google and TikTok optimize toward buyers instead of clicks. Marketing, finance and the board read one set of numbers that reconciles to your actual orders.",
  problem:
    "Every ad platform claims credit for the same sale, GA4 disagrees with your order system, and the app reports installs but not which of those users ever paid. Budget goes to whichever channel has the most convincing dashboard, and the bidding algorithms keep chasing clicks because the sales they should learn from arrive incomplete, double counted or not at all.",

  cardSummary:
    "Know which spend makes money: server-side tracking for websites and apps, so ad platforms learn from real sales, not clicks.",

  outcomes: [
    "One revenue number that marketing, finance and leadership agree on, reconciled against your actual orders rather than each platform's own claims.",
    "Ad platforms that bid for buyers, because Meta, Google and TikTok are fed confirmed purchases and qualified leads instead of page views and form fills.",
    "Sales still counted when browsers block pixels, cookies expire early, the purchase happens inside your app, or the deal closes offline in your CRM.",
    "Budget decisions you can defend: which channels, campaigns and creatives return revenue across web and app, and which only generate clicks or installs.",
  ],

  includes: [
    {
      title: "Measurement plan tied to revenue",
      body: "A written map of the events that move money in your business (lead, sign-up, trial, purchase, renewal), with names, parameters and owners agreed before a single tag goes live. Your developers, agencies and analysts all build against the same reference, so numbers stop drifting between tools.",
    },
    {
      title: "Server-side tracking for your website",
      body: "GA4 and Google Tag Manager with a server-side container, Meta Conversions API, Google Ads enhanced conversions and TikTok Events API. Browser and server events carry the same ID (the event ID for Meta and TikTok, the order's transaction ID for Google), so a sale the pixel misses is recovered and a sale both sides see is counted once, not twice.",
    },
    {
      title: "App measurement and install attribution",
      body: "Firebase and GA4 for in-app events, plus a mobile measurement partner such as AppsFlyer or Adjust to attribute installs to campaigns, including Apple's privacy-preserving attribution for iOS users who don't opt in to tracking. Installs are linked to what those users later spend, user by user where consent allows and through Apple's coarser conversion values where it doesn't, so you can see which campaigns bring paying users rather than downloads.",
    },
    {
      title: "Consent-aware setup",
      body: "Your consent banner and Google Consent Mode wired into every tag, and personal data such as email hashed before it reaches any ad platform. You collect only what users agreed to, and Google Ads and GA4 can still model the conversions they are not allowed to observe directly.",
    },
    {
      title: "CRM and offline conversions",
      body: "Leads that close by phone, in a showroom or through a sales team are sent back from your CRM to Google Ads and Meta. Campaigns get judged, and optimized, on closed revenue instead of the form fill that started the conversation.",
    },
    {
      title: "Warehouse, dashboards and attribution analysis",
      body: "Raw event data in BigQuery, Looker Studio dashboards built around revenue and cost per sale, and attribution analysis from our Analytics & Data Science team. Where volume allows, incrementality tests and media mix modeling show what each channel adds on top of the sales you would have made anyway.",
    },
  ],

  process: [
    {
      title: "Diagnose: find the gap",
      body: "Each platform's reported conversions are compared with your real orders and CRM records to expose double counting, missing events, broken consent and untracked app revenue, and to show how far your current numbers are from the truth.",
    },
    {
      title: "Prioritize: agree the measurement plan",
      body: "Decide which events matter to revenue, which platforms need them, and the order to fix them in, starting with whatever is distorting your largest budget.",
    },
    {
      title: "Deploy: build and verify",
      body: "Our engineers implement server-side tagging, app SDKs and CRM feeds, then prove every event with test purchases and deduplication checks before any campaign is allowed to depend on it.",
    },
    {
      title: "Measure: reconciled dashboards",
      body: "Dashboards go live on numbers reconciled to your orders, with a plain-language weekly read-out on what spend is returning and what is not.",
    },
    {
      title: "Scale: from reporting to decisions",
      body: "As data accumulates, the Analytics & Data Science team moves on to the harder questions: incrementality tests, media mix models, and where the next unit of budget should go.",
    },
  ],

  forSegments: ["ceos", "technical-founders", "investors"],

  faqs: [
    {
      q: "We already have GA4 and a Meta Pixel installed. Why isn't that enough?",
      a: "Browser-only tags miss conversions whenever ad blockers, privacy settings or shortened cookie lifetimes get in the way, and adding a second tag carelessly often counts the same sale twice. Server-side events, deduplicated against the browser by a shared event ID, recover the missing sales without inflating totals, and they give the ad platforms a cleaner signal to optimize on.",
    },
    {
      q: "Can you track app installs and in-app purchases, not just the website?",
      a: "Yes. Firebase and GA4 capture in-app events, and a mobile measurement partner such as AppsFlyer or Adjust attributes installs to the campaigns that drove them. The valuable part is linking the two, so you see which campaigns bring users who go on to pay, not just users who install.",
    },
    {
      q: "How does this handle consent and user privacy?",
      a: "Tags fire according to the choices users make in your consent banner, personal data such as email is hashed before it is sent to any ad platform, and Google's Consent Mode lets Google Ads and GA4 model conversions from users who decline. The aim is accurate measurement within what users have agreed to, not around it.",
    },
    {
      q: "Have you built this kind of tracking before?",
      a: "Yes, on our own product. The Publeca events platform sends a purchase event from our server once a payment is verified, to Meta's Conversions API with the order ID as the event ID, so Meta merges it with the browser pixel's event into a single conversion. Google Ads conversions carry the same order ID as the transaction ID. It is the same pattern our engineering and data teams implement for clients.",
    },
  ],

  cta: {
    label: "Ask for a tracking audit",
    message:
      "Hi Publeca, our ad platforms, analytics and actual sales don't agree, and I'd like to know which spend is really working. Can we talk about conversion tracking for our website and app?",
    note: "Bring two reports that disagree. That is where the audit starts.",
  },

  demos: {
    heading: "One purchase, counted once,",
    headingDim: "tied to a real order.",
    intro:
      "Sample data, real mechanism: the purchase event is sent once payment is verified, keyed by the order ID so browser and server count it once, and the reporting that follows ranks spend by cost per sale.",
    items: ["verified-sale-technical", "cost-per-sale"],
  },

  seo: {
    title: "Conversion Tracking & Analytics for Websites and Apps",
    description:
      "See which spend makes money. Server-side conversion tracking and analytics for websites and apps: GA4, Meta CAPI, enhanced conversions and install attribution.",
    keywords: [
      "conversion tracking",
      "server-side tracking",
      "Meta Conversions API setup",
      "GA4 and Google Tag Manager setup",
      "Google Ads enhanced conversions",
      "app install attribution",
      "marketing attribution analytics",
      "offline conversion tracking",
    ],
  },
};

export default service;
