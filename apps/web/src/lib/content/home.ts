import type { HomeContent } from "./types";
import { brandLine } from "./site";

// Homepage copy. Follows the writing rule in /CLAUDE.md: who + value first, then the
// problem, then the details, then the CTA. Layout follows docs/design-system.md; section
// patterns follow docs/playbook.md (P1 hero diagram, P2 bucket tabs, P3 demos, P6, P7).
const home: HomeContent = {
  hero: {
    // Who + what + how, shown in the hero card (user direction, 2026-10-14): the three readers
    // from the old "who" line, each with the need in their words, the value they get, the teams
    // involved and where it starts. Team names must match `departments` below.
    audiences: [
      {
        segment: "ceos",
        label: "Directors & CEOs",
        need: "For directors and CEOs who want the next stage of growth explained in plain English.",
        gets: "Know which growth opportunity is worth your money, and get a senior executive who delivers it and reports in plain English.",
        teams: ["Growth Consulting", "Analytics & Data Science", "Marketing & Brand", "Engineering"],
        start: "Growth Diagnostic",
        shape: "Fixed fee. About three weeks.",
      },
      {
        segment: "technical-founders",
        label: "Technical founders",
        need: "For technical founders scaling without trading equity for a co-founder.",
        gets: "Keep 100% of your equity: a growth team that runs positioning, demand and tracking instead of a business co-founder.",
        teams: ["Growth Consulting", "Marketing & Brand", "Analytics & Data Science"],
        start: "Go-to-Market Sprint",
        shape: "About six weeks. Fixed scope, no equity.",
      },
      {
        segment: "investors",
        label: "Investors & VCs",
        need: "For the investors who back them, and want a growth team their portfolio companies can call on.",
        gets: "A senior growth team portfolio companies can call on, with a short brief a partner can read in minutes.",
        teams: ["Growth Consulting", "Analytics & Data Science", "Marketing & Brand", "Engineering"],
        start: "Portfolio Growth Review",
        shape: "About two weeks per company.",
      },
    ],
    headline:
      "Revenue and market share you can see, from a growth consulting firm that executes its own plan",
    headlineAccent: "you can see",
    benefits: [
      { lead: "A costed answer", rest: "on where your next growth comes from, before you fund it." },
      { lead: "A senior growth executive", rest: "inside your business who owns the plan, without a C-level hire." },
      { lead: "Spend traced to sales,", rest: "measured by our own analytics team from day one." },
    ],
    primaryCta: {
      label: "Book a growth diagnostic",
      message:
        "Hi Publeca, I run [type of business] and want to know where our next growth will come from, and what it should be worth. Could we set up a growth diagnostic call?",
      note: "Fixed fee. About three weeks. Ends with a 90-day plan.",
    },
    secondaryCta: { label: "See how an engagement runs", href: "#how-we-work" },
  },

  audiences: {
    heading: "Where you start depends on what you answer for",
    intro:
      "Owners and CEOs answer for revenue and need decisions they can make without a translator. Technical founders answer for the product and need go-to-market muscle without giving up stake. Investors want portfolio companies to hit plan without waiting on a senior hire. Each path starts in a different place and is measured the same way: tracked revenue.",
  },

  problem: {
    // The interactive comparison under the problem: the same three pieces of work, bought from
    // three vendors, then owned by one firm.
    compare: {
      beforeLabel: "Three vendors",
      afterLabel: "One firm",
      pieces: [
        { who: "Consultants", does: "Strategy", before: "Hand over a deck and leave", after: "The plan, and the person who owns it" },
        { who: "Agencies", does: "Marketing", before: "Report the clicks they control", after: "Campaigns judged on tracked sales" },
        { who: "Developers", does: "Software", before: "Build to spec, without the market", after: "Sites and systems built to convert" },
      ],
      beforeResult: "Three briefs, three reports, and a result that belongs to nobody.",
      afterResult: "One plan, one set of numbers, and one firm answering for the result.",
    },
    heading: brandLine.enemy.replace(/.$/, ""),
    intro:
      "Most companies buy growth in three pieces: strategy from consultants, marketing from agencies, software from developers. Each piece can be done well and the result still belongs to nobody.",
  },

  demos: {
    heading: "Know which growth bet pays",
    headingDim: "before you fund it.",
    intro:
      "Three things every engagement hands you, shown here with sample data: the opportunity map that decides where the money goes, the weekly read-out that says what moved, and tracking that counts a sale only once it's real.",
    items: ["opportunity-map", "weekly-readout", "verified-sale"],
  },

  process: {
    heading: "How an engagement runs:",
    headingDim: "five stages, each ending in something your leadership can decide on.",
    intro: "Each stage has an owner, a deliverable and a decision point, so the work never runs on trust alone.",
    steps: [
      {
        title: "Diagnose",
        deliverable: "An opportunity map, sized in money",
        body: "Your market, customers, funnel, unit economics, and data quality are examined to find where the next growth will actually come from, and each opportunity is sized in money.",
      },
      {
        title: "Prioritize",
        deliverable: "A 90-day plan with named owners",
        body: "Opportunities are ranked by financial impact, effort, and risk. Leadership agrees on a 90-day plan with named owners and the numbers it should move.",
      },
      {
        title: "Deploy",
        deliverable: "A growth executive inside your business",
        body: "A forward-deployed growth executive leads the plan inside your business, on-site or remote, and directs our marketing, engineering, and analytics specialists to execute it.",
      },
      {
        title: "Measure",
        deliverable: "A plain-language read-out every week",
        body: "Tracking and analytics are in place from day one. Every week you get a plain-language read-out: what moved, what didn't, and what changes next.",
      },
      {
        title: "Scale",
        deliverable: "Systems that make what works repeatable",
        body: "What works gets more budget and is built into the systems, software, and AI that make it repeatable. What doesn't work is cut early, before it absorbs another quarter.",
      },
    ],
  },

  commitments: {
    heading: "Fixed fee. About three weeks.",
    headingDim: "The plan is yours to keep.",
    intro:
      "Every engagement starts with a Growth Diagnostic: an opportunity map, a financial model of your growth levers and a 90-day plan presented to your leadership team. Whether you continue with us is a separate decision.",
    promises: [
      {
        title: "The plan is yours to keep",
        body: "Run it with your own people, with us or with anyone else. It is written so it doesn't depend on us.",
      },
      {
        title: "Tracking before spend scales",
        body: "Our analytics & data science team puts tracking in place before budgets grow, so results are judged on sales, not reach.",
      },
      {
        title: "No equity, ever",
        body: "Engagements are paid as a fixed fee or a monthly fee, never in stake. You keep full ownership of your company.",
      },
      {
        title: "Scope reviewed every quarter",
        body: "Ongoing work is written down and reviewed with you each quarter, so you always know what you are paying for and why.",
      },
    ],
  },

  buckets: {
    heading: "Five ways to grow,",
    headingDim: "one firm accountable for all of them.",
    intro:
      "Pick the outcome you need. Under each one is how it gets done: the capabilities involved and the in-house department that delivers each, all answering to one growth plan.",
  },

  // Read by the hero diagram. Every department answers to the plan the growth executive owns.
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

  insights: {
    heading: "Thinking you can use",
    headingDim: "before you hire anyone.",
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
        "Hi Publeca, I run [type of business] and I'd like to book a growth diagnostic. I want a clear, costed view of where our next stage of growth should come from. Could we set up a call?",
      note: "Fixed fee. About three weeks. The plan is yours to keep.",
    },
  },

  seo: {
    title: "Growth Consulting Firm for Marketing, Management & Events",
    // Carries the repeated line (playbook §8.2, construction 2). Title covers management + events.
    description:
      "A growth consulting firm that builds what it recommends: a costed growth plan, then our own marketing, engineering and analytics teams to deliver it.",
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
