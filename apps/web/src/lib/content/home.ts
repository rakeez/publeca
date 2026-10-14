import type { HomeContent } from "./types";

// Homepage copy. Follows the writing rule in /CLAUDE.md: who + value first, then the
// problem, then the details, then the CTA. Synthesized from a 3-draft judge panel
// (winner: outcome-first draft, with grafts from the credibility and problem-first drafts).
const home: HomeContent = {
  hero: {
    eyebrow: "Consulting that builds what it recommends",
    who: "For directors and CEOs who want the next stage of growth explained in plain English, technical founders scaling without trading equity for a co-founder, and the investors who back them.",
    headline:
      "Revenue and market share you can see, from a growth consulting firm that executes its own plan",
    subhead:
      "Get a costed answer to where your next growth comes from, then a senior growth executive inside your business who delivers it with our own marketing, engineering, and analytics & data science teams. Strategy and execution sit in one firm, so one firm answers for the result.",
    primaryCta: {
      label: "Book a growth diagnostic",
      message:
        "Hi Publeca, I'd like to book a growth diagnostic. I want a clear, costed view of where our next growth will come from and what it should be worth. Could we set up a call?",
      note: "Fixed fee. About three weeks. Ends with a 90-day plan.",
    },
    secondaryCta: { label: "See how an engagement runs", href: "#how-we-work" },
    chips: [
      "Forward-deployed growth executives",
      "In-house engineering department",
      "Analytics & data science team",
      "Conversion tracking for websites and apps",
    ],
  },

  audiences: {
    heading: "Where you start depends on what you answer for",
    intro:
      "Owners and CEOs answer for revenue and need decisions they can make without a translator. Technical founders answer for the product and need go-to-market muscle without giving up stake. Investors want portfolio companies to hit plan without waiting on a senior hire. Each path starts in a different place and is measured the same way: tracked revenue.",
  },

  problem: {
    heading: "Growth stalls in the gaps between the firms you hire",
    intro:
      "Most companies buy growth in three pieces: strategy from consultants, marketing from agencies, software from developers. Each piece can be done well and the result still belongs to nobody.",
    points: [
      {
        title: "The strategy stops at the deck",
        body: "A consultant diagnoses the business, recommends a direction, and leaves. The plan may be right, but no one stays to turn it into campaigns, software, and tracked sales.",
      },
      {
        title: "The agency executes without the plan",
        body: "Agencies run ads and publish content against a brief, not against your growth plan. They report reach, clicks, and impressions because those are the numbers they control. Revenue is left for you to reconcile.",
      },
      {
        title: "The developers build without the market",
        body: "The website or app is built to spec, but nobody briefed the developers on the market, the funnel or what a conversion is worth. It works. It just doesn't sell, and nothing in it is set up to show why.",
      },
    ],
  },

  value: {
    heading: "What changes when one firm owns the result",
    intro: "You stop managing three vendors and start reviewing one set of numbers. Specifically, you get:",
    items: [
      {
        title: "A clear answer on where growth comes from",
        body: "Opportunities ranked by financial impact, effort, and risk, each with a financial model behind it, so leadership puts money behind the right bet instead of the loudest one.",
      },
      {
        title: "Senior growth leadership without a C-level hire",
        body: "A forward-deployed growth executive works inside your business, owns the plan, and directs the specialists who execute it, without the search, cost, and risk of recruiting a full-time executive.",
      },
      {
        title: "Spend you can trace to sales",
        body: "Conversion tracking on your website and apps goes live before spend scales, set up by our own analytics & data science team, so you see cost per sale and revenue by channel instead of likes, reach and clicks.",
      },
      {
        title: "Growth that stays built into the business",
        body: "What works is turned into systems, software, and AI automations that run in your accounts, so results repeat without depending on a single campaign or a single person.",
      },
    ],
  },

  process: {
    heading: "How an engagement runs",
    intro: "Five stages, each ending in something your leadership can review and decide on.",
    steps: [
      {
        title: "Diagnose",
        body: "Your market, customers, funnel, unit economics, and data quality are examined to find where the next growth will actually come from, and each opportunity is sized in money.",
      },
      {
        title: "Prioritize",
        body: "Opportunities are ranked by financial impact, effort, and risk. Leadership agrees on a 90-day plan with named owners and the numbers it should move.",
      },
      {
        title: "Deploy",
        body: "A forward-deployed growth executive leads the plan inside your business, on-site or remote, and directs our marketing, engineering, and analytics specialists to execute it.",
      },
      {
        title: "Measure",
        body: "Tracking and analytics are in place from day one. Every week you get a plain-language read-out: what moved, what didn't, and what changes next.",
      },
      {
        title: "Scale",
        body: "What works gets more budget and is built into the systems, software, and AI that make it repeatable. What doesn't work is cut early, before it absorbs another quarter.",
      },
    ],
  },

  capabilities: {
    heading: "Every capability the plan calls for, built in-house",
    intro:
      "When the diagnosis points to a rebuilt website, server-side tracking, a product launch or an AI workflow, the team that recommended it is the team that builds it. Each capability has its own page covering what's included and how it's measured.",
  },

  firm: {
    heading: "Five departments, one growth plan, one firm accountable",
    intro:
      "Every department answers to the plan your forward-deployed growth executive owns. Work moves between desks, not between companies, so nothing gets lost in a handover and no one can blame another vendor.",
    departments: [
      {
        title: "Growth Consulting",
        body: "Diagnosis, opportunity sizing, and growth planning, plus the forward-deployed growth executives who lead each engagement from inside the client's business.",
      },
      {
        title: "Marketing & Brand",
        body: "Branding, content, social media ads, Google Ads, SEO, AEO/GEO, and product marketing, each judged on tracked sales and leads rather than reach.",
      },
      {
        title: "Engineering",
        body: "Web development, software development, and AI solutions, built to convert, rank, and measure, and to remove the system bottlenecks that cap growth.",
      },
      {
        title: "Analytics & Data Science",
        body: "Conversion tracking and analytics for websites and apps, attribution, dashboards, and modeling, so every growth decision is tied to revenue.",
      },
      {
        title: "Events",
        body: "Publeca's original arm: event marketing, event photo and video, and the Publeca ticketing platform.",
      },
    ],
  },

  eventsArm: {
    heading: "Sell out the room: the events arm Publeca started with",
    body: "For event organizers who need ticket sales, not likes, there are two paths: done-for-you event marketing, or the self-serve Publeca ticketing platform. Publeca is the only place to build an event page with paid-booking conversion tracking built in, so Meta and Google learn who actually buys a ticket and your cost per ticket falls. Local payments and buy-now-pay-later through your own merchant accounts, QR e-tickets, door scanning, and assigned seating come with it.",
    ctaLabel: "Plan your event",
  },

  insights: {
    heading: "Thinking you can use before you hire anyone",
    intro:
      "Practical guides for CEOs, technical founders, and investors: how to size the next growth opportunity before spending on it, what to ask before approving a growth plan, how to tell whether marketing is working, and what actually moves AI search visibility.",
  },

  faqs: [
    {
      q: "What is a forward-deployed growth executive?",
      a: "A senior growth operator who works inside your business, on-site or remotely, for the length of the engagement. They identify the right opportunities, own the growth plan, and direct our marketing, engineering, and analytics & data science teams to deliver it. You get senior growth leadership and a single person accountable for results, without recruiting and paying for a full-time C-level hire.",
    },
    {
      q: "Is Publeca a management consulting firm?",
      a: "Partly. Growth Consulting covers the management consulting work that decides growth: market and customer analysis, opportunity sizing, unit economics and a prioritized plan presented to leadership. The difference is that the same firm stays to execute the plan and measure the result.",
    },
    {
      q: "Do you take equity?",
      a: "No. Engagements are paid as a fixed fee or a monthly fee, never in stake. Owners and founders keep full ownership of their company.",
    },
    {
      q: "How does an engagement start?",
      a: "With a Growth Diagnostic: a fixed-fee engagement of about three weeks. You get an opportunity map, a financial model of your growth levers, and a 90-day plan presented to your leadership team. The plan is yours to keep, whether or not you continue with us.",
    },
    {
      q: "Do you replace our agency or in-house team?",
      a: "Only if you want us to. We can work alongside your existing agency and team: the forward-deployed growth executive sets the plan and targets, our specialists fill the gaps, and everyone is measured against the same tracked numbers.",
    },
    {
      q: "How is this different from a consulting firm or a marketing agency?",
      a: "A consulting firm usually delivers a recommendation and leaves execution to you. An agency executes but rarely owns the strategy or the revenue number. Publeca does both: the firm that diagnoses where growth will come from also builds the campaigns, software, and tracking that deliver it, and reports against revenue.",
    },
    {
      q: "Do I need to understand marketing or technology to work with you?",
      a: "No. Translating it is part of your growth executive's job. Every recommendation comes with what it costs, what it should return, and how you will know it worked, in plain English. Technical choices are explained in terms of what changes for the business.",
    },
    {
      q: "Do you still run events?",
      a: "Yes. Events are Publeca's original arm. We run event marketing that fills rooms, cover events with photo and video, and operate the Publeca ticketing platform, where organizers build event pages with paid-booking conversion tracking built in.",
    },
  ],

  finalCta: {
    heading: "Find out where your next growth will come from",
    body: "Start with a Growth Diagnostic. In about three weeks you get an opportunity map, a financial model of your growth levers, and a 90-day plan your leadership can act on, with us or without us.",
    cta: {
      label: "Book a growth diagnostic",
      message:
        "Hi Publeca, I'd like to book a growth diagnostic for my company. I want a clear, costed view of where our next stage of growth should come from. Could we set up a call?",
      note: "Fixed fee. About three weeks. The plan is yours to keep.",
    },
  },

  seo: {
    title: "Growth Consulting Firm for Marketing, Management & Events",
    description:
      "A growth consulting firm that diagnoses and delivers: marketing consulting, management consulting, engineering, analytics and event management in one team.",
    keywords: [
      "growth consulting firm",
      "growth consulting",
      "marketing consulting",
      "marketing consulting firm",
      "management consulting",
      "forward-deployed growth executive",
      "fractional growth team",
      "conversion tracking and analytics",
      "event management",
      "event marketing",
      "growth consulting Sri Lanka",
    ],
  },
};

export default home;
