import type { Segment } from "../types";

const segment: Segment = {
  slug: "investors",
  name: "Investors & VCs",
  navLabel: "For investors",
  tone: "understated",

  who: "For partners, operating partners and platform teams at investment firms who want a senior growth team they can point at a portfolio company when its go-to-market falls behind its product.",
  value: "Senior growth execution for portfolio companies, and reporting a partner can read in minutes",
  valueDetail:
    "A portfolio company that needs growth help gets a senior operator backed by marketing, engineering and analytics specialists, without waiting out a hiring cycle or adding an agency for the founder to manage. The founder keeps the decisions. You get a short brief in the same format each time: what was found, what changed, and what it did to the commercial numbers.",
  problem:
    "When a portfolio company stalls, the product is often not the cause. The gap sits between the product and the market: positioning that never quite settled, a funnel nobody has mapped end to end, and tracking nobody fully trusts. From the outside, it all arrives as a board update that is hard to read with any confidence.",

  cardSummary:
    "A senior growth team portfolio companies can call on: faster than a hire, more accountable than an agency, reported in plain terms.",

  pains: [
    "The product is ahead of the go-to-market, and the gap shows up in every board pack.",
    "Founders are stretched across fundraising, hiring and product. Growth gets whatever time is left.",
    "A senior growth hire takes months to find, and longer still to know whether it worked.",
    "There is an agency, but the founder has become the person managing it.",
    "The reporting describes activity. It rarely answers the questions I actually ask: what is working, what it costs, and what changes next.",
  ],

  gains: [
    {
      title: "Capacity without a hiring decision made under pressure",
      body: "A forward-deployed growth lead, with specialists from Marketing & Brand, Engineering and Analytics & Data Science behind them, available to a company when it needs them and stepped back when it does not. The permanent hire can then be made later, with evidence of what the role actually requires.",
    },
    {
      title: "One party accountable for the result",
      body: "Diagnosis, plan and execution sit in the same firm, so there is no gap between the consultant who recommended it, the agency that ran it and the developer who built it. When a number does not move, it is clear whose job it was.",
    },
    {
      title: "Numbers that hold up before spend scales",
      body: "Conversion tracking for the website and, where there is one, the app is put in place first, by Publeca's own Analytics & Data Science team. Every read-out ties work to revenue and acquisition cost, and states plainly where the data is incomplete.",
    },
    {
      title: "Briefs written for a partner, comparable across companies",
      body: "One consistent format per company: current state, scorecard, prioritized fixes, what changed since the last brief, and the numbers used to judge it. Short enough to read before a board meeting, consistent enough to compare one company with another.",
    },
  ],

  packages: [
    {
      name: "Portfolio Growth Review",
      bestFor:
        "A portfolio company where growth has slowed or the go-to-market is unclear, and you want an independent view before committing more capital or headcount.",
      value:
        "An independent read of the company's go-to-market, a scorecard the founder and partner can both stand behind, and a short list of fixes ranked by commercial impact.",
      commitment: "About 2 weeks per company · fixed fee",
      includes: [
        "Working sessions with the founder and the people closest to revenue",
        "Review of positioning, channels, funnel, pricing signals and tracking quality",
        "Go-to-market scorecard on a consistent framework, comparable across the portfolio",
        "Fixes ranked by financial impact, effort and risk",
        "A clear view of what to fix in-house, what to hire for and what to bring in",
        "Joint read-out to the founder and partner, with a written brief",
      ],
      highlight: true,
    },
    {
      name: "Embedded Growth Pod",
      bestFor:
        "A company with a clear growth opportunity and not enough senior people to execute it.",
      value:
        "A quarter of focused execution: a growth lead working alongside the founder, specialists doing the work, and visible movement on the metrics agreed at the start.",
      commitment: "One quarter · monthly fee, renewed only by agreement",
      includes: [
        "A forward-deployed growth lead working with the founder, on-site or remote",
        "Specialists from Marketing & Brand, Engineering and Analytics & Data Science as the plan requires",
        "Conversion tracking for the website and any app, set up before spend scales",
        "A 90-day plan agreed with the founder before work begins",
        "Weekly read-outs to the founder and a monthly brief for the partner",
        "Handover documentation, so the work outlasts the engagement and informs the eventual hire",
      ],
    },
    {
      name: "Commercial Diligence Support",
      bestFor:
        "A deal team before an investment decision, when the commercial story needs an operator's check alongside the financial one.",
      value:
        "The commercial questions that matter raised before the investment decision, not after the round closes: an operator's check of whether the market, positioning, funnel and unit economics hold up.",
      commitment: "Scoped to your deal timeline · fixed fee",
      includes: [
        "Market and positioning review from the buyer's point of view",
        "Funnel and conversion analysis using the company's own data, where it is shared",
        "Unit-economics check: acquisition cost, payback and the assumptions behind them",
        "Tracking and data-quality assessment: how far the reported numbers can be relied on",
        "A written memo of risks, open questions and post-investment priorities",
        "Under NDA, with findings shared only with the deal team",
      ],
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Start with the founder, not around them. Market, customers, funnel, unit economics and data quality are reviewed with the founder involved throughout, so the findings are theirs as much as anyone's.",
    },
    {
      title: "Prioritize",
      body: "Opportunities are ranked by financial impact, effort and risk. The founder and the partner see the same short list, and the founder agrees the plan.",
    },
    {
      title: "Deploy",
      body: "Where execution help is needed, a forward-deployed growth lead takes ownership and the specialist teams do the work. The founder keeps the decisions; the growth lead keeps the plan moving.",
    },
    {
      title: "Measure",
      body: "Tracking comes first. The founder gets a weekly read-out; the partner gets a short brief on an agreed cadence, in the same format every time.",
    },
    {
      title: "Hand over",
      body: "What works is built into systems the company owns. When the company is ready to hire in-house, the playbooks, dashboards and documentation go with it.",
    },
  ],

  services: [
    "growth-consulting",
    "conversion-tracking-analytics",
    "product-marketing",
    "software-development",
    "ai-solutions",
  ],

  faqs: [
    {
      q: "How do you work with founders without overriding them?",
      a: "The founder remains the decision-maker. The growth lead works for the company, agrees the plan with the founder before any work starts, and raises disagreements with the founder directly rather than through the fund. A partner's introduction opens the conversation; it does not set the agenda.",
    },
    {
      q: "Who do you report to: the fund or the company?",
      a: "Day to day, the founder. The partner receives an agreed brief on an agreed cadence, and the founder sees it before it is sent. Who receives what is set out in writing at the start, so neither side is surprised later.",
    },
    {
      q: "How is confidentiality handled?",
      a: "NDAs are signed with the fund and with each company as needed. Nothing learned in one company is shared with another, and nothing is used publicly without written permission. Diligence findings go only to the deal team.",
    },
    {
      q: "How is scope agreed for each company?",
      a: "Company by company. A Portfolio Growth Review usually comes first, because it shows whether execution help is needed at all and what it should cover. Scope, duration and fee are then agreed with the founder, and with the fund where it is paying, before work begins. There is no portfolio-wide commitment.",
    },
    {
      q: "Who pays: the fund or the company?",
      a: "Either can. A fund may choose to cover the review as portfolio support, with any execution contracted by the company itself. Whichever it is, it is agreed upfront and does not change who the team works for.",
    },
    {
      q: "What does a sample portfolio brief contain?",
      a: "One or two pages for one company: the current state of its go-to-market, the scorecard, fixes in priority order, what changed since the previous brief, and the numbers used to judge progress, with a note on where each number comes from and how far it can be trusted. The sample uses an illustrative company, not client data.",
    },
  ],

  cta: {
    label: "Request a sample portfolio brief",
    channel: "email",
    message:
      "Hello,\n\nCould you send me a sample portfolio brief? I would like to see the format and how you assess a company's go-to-market.\n\nThank you.",
    note: "One or two pages per company: scorecard, prioritized fixes and the numbers behind them.",
    secondaryLabel: "Or simply compare notes",
    secondaryMessage:
      "Hi, I came across your page for investors. Happy to compare notes on go-to-market in portfolio companies whenever convenient.",
  },

  seo: {
    title: "Growth Team for Portfolio Companies | Investors & VCs",
    description:
      "A senior growth team for portfolio companies: go-to-market reviews, embedded execution and commercial diligence, with briefs a partner can read in minutes.",
    keywords: [
      "growth team for portfolio companies",
      "VC portfolio support",
      "portfolio growth review",
      "go-to-market assessment",
      "commercial due diligence",
      "operating partner support",
      "venture platform services",
    ],
  },
};

export default segment;
