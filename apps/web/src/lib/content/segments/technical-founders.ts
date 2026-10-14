import type { Segment } from "../types";

const segment: Segment = {
  slug: "technical-founders",
  name: "Technical founders",
  navLabel: "For founders",
  tone: "technical",

  who: "For technical founders who built the product themselves and now need customers and revenue, without handing a business co-founder a meaningful share of the company to get them.",
  value: "Keep 100% of your equity and still get the growth engine a business co-founder would bring",
  valueDetail:
    "Positioning, demand, conversion tracking and product marketing are owned by a forward-deployed growth lead and shipped by Publeca's own marketing, engineering and analytics teams. You pay a fee for a defined scope instead of a slice of the cap table, and every account, dataset and line of code stays in your name.",
  problem:
    "The product works and the users you have like it, but growth has stalled at the edge of your network. The standard advice is to bring in a business co-founder, which usually means giving a meaningful share of the company to someone you have known for weeks. Meanwhile the tracking you wired up between releases fires events twice, GA4 disagrees with your database, and spending on marketing feels like shipping to production with no logs.",

  cardSummary:
    "Keep 100% of your equity: a growth team that runs positioning, demand and tracking instead of a business co-founder.",

  pains: [
    "The product is good. The problem is that almost nobody outside our network knows it exists.",
    "Every investor and advisor tells me to find a business co-founder, which means giving a meaningful share of the company to someone I haven't worked with yet.",
    "I set up the analytics myself between sprints, and now GA4, the ad dashboards and our own database all report a different number of sign-ups.",
    "I can debug a race condition, but I can't tell you which marketing channel brought our paying users, or whether any of it paid back.",
    "Every week I spend rewriting the landing page and fiddling with ad accounts is a week I'm not shipping product.",
  ],

  gains: [
    {
      title: "Your cap table stays yours",
      body: "The go-to-market work a business co-founder would own, from positioning and pricing input to launches and measurement, is delivered under a commercial agreement with a defined scope. No equity, no vesting schedule, and no shareholder to buy out if the fit turns out to be wrong.",
    },
    {
      title: "Numbers you would accept in a code review",
      body: "A written event schema, server-side tracking that sends the same event ID from browser and server so each conversion is counted once, on web and in your app, and conversions reconciled against your database and billing system. It is documented like any other production system you run, so you can inspect every assumption.",
    },
    {
      title: "Marketing you can reason about",
      body: "Every channel runs as a hypothesis with a target metric, a budget cap and a stop condition. You see cost per paying customer and payback by channel, so a spend decision becomes a trade-off you can evaluate, not a matter of faith.",
    },
    {
      title: "Your time back on the product",
      body: "A forward-deployed growth lead owns the plan and directs the specialists who execute it. Your role shifts to a weekly review and the decisions only a founder should make, while the roadmap gets your full attention again.",
    },
  ],

  packages: [
    {
      name: "Go-to-Market Sprint",
      bestFor: "Founders with a working product and early users who need a repeatable way to reach the next customers.",
      value: "A defensible position, a defined ideal customer, tracking you can trust and a live launch, so you learn which message and channel bring paying users before you scale spend.",
      commitment: "About 6 weeks · fixed scope, fixed fee · no equity",
      includes: [
        "Positioning and messaging built from interviews with customers, recent wins and lost deals",
        "Ideal customer profile drawn from your own usage, retention and revenue data",
        "Event schema and server-side conversion tracking, reconciled against your database",
        "Landing page rewritten around the new position and shipped by our Engineering team",
        "Launch campaign on the channels most likely to reach your ideal customer",
        "Results read-out by channel and message, plus a ranked 90-day growth plan",
      ],
      highlight: true,
    },
    {
      name: "Fractional Growth Team",
      bestFor: "Founders who have found a channel that works and need it run, measured and expanded every week.",
      value: "A standing growth function with a lead, marketing and analytics capacity that turns go-to-market into a weekly operating rhythm, before you are ready to make senior hires.",
      commitment: "Monthly · ongoing team · no equity",
      includes: [
        "Forward-deployed growth lead who owns the plan and sets weekly priorities",
        "Paid campaigns on Google, Meta and LinkedIn, managed to cost per paying customer",
        "Content, SEO and AEO/GEO built from the questions your buyers actually ask",
        "Tracking maintained as you ship, so new features and flows are measured from release",
        "Weekly metrics review and a running experiment log with every result, kept or killed",
        "Role definitions and interview support when you decide to bring growth in-house",
      ],
    },
    {
      name: "Scale Partner",
      bestFor: "Founders with clear demand who need growth to compound across every channel and inside the product itself.",
      value: "The full funnel run as one system, from first ad impression to in-product conversion, with the engineering and AI work that makes growth repeatable.",
      commitment: "Quarterly · scope and targets agreed each quarter · no equity",
      includes: [
        "Full-funnel strategy and execution across paid, organic, content and lifecycle channels",
        "Product marketing for every major release: positioning, launch and sales enablement",
        "Conversion engineering on onboarding, pricing and signup flows, tested and shipped by our Engineering team",
        "AI automation where payback is measurable, such as lead scoring, routing or lifecycle messaging",
        "Attribution, cohort and payback analysis from our Analytics & Data Science team",
        "Quarterly plan and a board-ready report on what each channel returned",
      ],
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Audit the funnel from first touch to paid: event schema, tracking accuracy against your database, activation and retention by cohort, and the gap between how you describe the product and why customers actually bought it.",
    },
    {
      title: "Prioritize",
      body: "Rank go-to-market bets by expected revenue, effort and risk, then agree a 90-day plan in which every bet has a hypothesis, a metric and a stop condition.",
    },
    {
      title: "Deploy",
      body: "A forward-deployed growth lead runs the plan while our marketing, engineering and analytics teams ship pages, campaigns and tracking. Changes to your product arrive as pull requests you can review.",
    },
    {
      title: "Measure",
      body: "Server-side events are reconciled against your database and billing. The weekly read-out covers cost per paying customer by channel, activation, payback, and which experiments are being stopped.",
    },
    {
      title: "Scale",
      body: "Budget moves to what is proven, repeatable work gets automated, and everything is documented so the function can move in-house whenever you choose.",
    },
  ],

  services: [
    "product-marketing",
    "conversion-tracking-analytics",
    "google-ads",
    "social-media-ads",
    "seo",
    "aeo-geo",
  ],

  faqs: [
    {
      q: "Do you take any equity?",
      a: "No. There are no shares, options, advisory grants or warrants involved. The Go-to-Market Sprint is a fixed fee for a fixed scope, and ongoing work is billed monthly or quarterly. Your cap table looks exactly the same after working with us as it did before.",
    },
    {
      q: "How is this different from bringing in a business co-founder?",
      a: "A co-founder is one person, with one skill set, whose equity vests whether or not the go-to-market works, and whose vested shares stay on your cap table even if they leave. Here you get a growth lead plus marketing, engineering and analytics capacity, judged on metrics agreed up front. If it stops being the right fit, you end a commercial agreement instead of unwinding a shareholding.",
    },
    {
      q: "Can we hire our own growth team later?",
      a: "Yes, and for many companies that is the right end state. When you are ready, we help define the roles, interview candidates and hand over documented playbooks, the tracking spec, dashboards and full account access, so your first hire starts from a working system rather than a blank page.",
    },
    {
      q: "Who owns the ad accounts, tracking setup, data and code?",
      a: "You do. Ad accounts, GA4 properties, tag containers, server-side infrastructure, data warehouse tables, code and creative are set up under your organization, and our team works through access you grant. Ending the engagement means revoking that access, not migrating anything.",
    },
    {
      q: "How technical is the reporting?",
      a: "As technical as you want it to be. The weekly read-out is a short summary of spend, cost per paying customer, activation and payback by channel. Underneath it sit the event schema, tag configuration, raw event data you can query directly in BigQuery, dashboard definitions and the attribution assumptions, all documented and open to you.",
    },
    {
      q: "Will you need access to our codebase?",
      a: "Only where the work requires it, such as server-side tracking, the signup flow or the pricing page. Our Engineering team works in your repository through pull requests you review and merge, so nothing reaches production without your approval.",
    },
  ],

  cta: {
    label: "Keep your equity. Talk to us",
    message:
      "Hi Publeca, I'm a technical founder. I want to grow without bringing in a business co-founder for equity. Can we talk through our go-to-market, tracking and where growth should come from next?",
    note: "A working session on your funnel with a growth lead, not a sales call.",
    secondaryLabel: "Ask about the Go-to-Market Sprint",
    secondaryMessage:
      "Hi Publeca, I'd like to know more about the Go-to-Market Sprint for our product: what the six weeks cover, what you need from us, and how we'd get started.",
  },

  seo: {
    title: "Growth Team for Technical Founders: Keep Your Equity",
    description:
      "A growth team for technical founders who want to scale without giving equity to a business co-founder: positioning, tracking, paid and organic demand.",
    keywords: [
      "growth team for technical founders",
      "fractional growth team",
      "go-to-market for startups",
      "startup growth consulting",
      "alternative to a business co-founder",
      "startup conversion tracking",
      "product marketing for startups",
    ],
  },
};

export default segment;
