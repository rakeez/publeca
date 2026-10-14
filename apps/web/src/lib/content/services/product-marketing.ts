import type { Service } from "../types";

const service: Service = {
  slug: "product-marketing",
  category: "strategy",
  name: "Product marketing",
  shortName: "Product marketing",

  who: "For technical founders and CEOs whose product is better than its sales suggest: buyers can't say what makes it different, so they stall, or they haggle on price.",
  value: "Product marketing that makes buyers see, in one read, why to choose you and why you're worth the price",
  valueDetail:
    "Sales calls stop being feature tours, and your website, deck, demo and launch all make the same case for buying. Your product marketing (positioning, messaging and packaging) is rebuilt around the problem your best customers actually pay to solve.",
  problem:
    "You know the product is better. But prospects keep asking how you're different, demos turn into feature walkthroughs, and good deals stall at \"we'll think about it.\" The website says one thing, the pitch deck another, and the sales team improvises a third. Launches get polite interest and few signups. And when price comes up, buyers compare you to the cheapest option, because nobody has shown them what you're worth.",

  cardSummary:
    "Buyers who see in one read why to choose you and why you're worth the price, with positioning, messaging and launches that make the case.",

  outcomes: [
    "Prospects can repeat back what you do, who it's for and why it beats their current option after one page or one call.",
    "Sales conversations start from the buyer's problem, not a feature tour, and reach price with the value already clear, so fewer deals stall without a reason.",
    "Packages that match how customers get value, so your price is judged against the outcome, not the cheapest competitor.",
    "Launches that go out with one message across site, ads, sales and product, with tracking that shows which message converts.",
  ],

  includes: [
    {
      title: "Competitive analysis and positioning",
      body: "Who your real alternatives are in the buyer's eyes, including spreadsheets, an agency or doing nothing. Where you win, where you lose, and the one position you can own and defend in a sales conversation.",
    },
    {
      title: "Ideal customer profile",
      body: "The companies and buyer roles that get the most value, close fastest and stay longest, built from your customer data, pipeline history and win/loss interviews, so marketing and sales stop chasing everyone.",
    },
    {
      title: "Messaging architecture",
      body: "A one-page source of truth: the core promise, the proof behind it, the answer to each recurring objection, and the language for each buyer role. Written to drop straight into your website, ads, deck and onboarding.",
    },
    {
      title: "Pricing and packaging input",
      body: "The value metric to charge on, the tier structure, what belongs in each package and what buyers will compare it to, with the trade-offs laid out. The pricing decision stays yours.",
    },
    {
      title: "Launch plan",
      body: "Audience, message, channels, sequence and success metrics for your next launch, with conversion tracking set up by our Analytics & Data Science team before it goes live, so you know what actually worked.",
    },
    {
      title: "Sales enablement kit",
      body: "Pitch narrative, demo script, objection handling, battlecards against the competitors you meet most, and a one-page explainer that you, or whoever sells after you, can use the next day.",
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Interview recent customers and the buyers behind deals you won and lost. Review your pipeline, site analytics and competitors' messaging. Find the gap between how you describe the product and why people actually buy it.",
    },
    {
      title: "Prioritize",
      body: "Choose the segment and the position with the most revenue behind them. Agree the ideal customer profile, the core promise, and the launch or sales motion it goes into first.",
    },
    {
      title: "Deploy",
      body: "A forward-deployed growth executive leads; our Marketing & Brand team rewrites your website, deck and sales materials. Where the product itself carries the message, such as the pricing page, onboarding or in-app copy, our Engineering team ships the change.",
    },
    {
      title: "Measure",
      body: "Tracking shows which message, segment and package convert, from first visit to signup or signed deal. You get a plain-language read-out every week.",
    },
    {
      title: "Scale",
      body: "Roll the winning message into every channel, refresh battlecards as competitors move, and feed what buyers tell us back into your roadmap.",
    },
  ],

  forSegments: ["technical-founders", "ceos"],

  faqs: [
    {
      q: "Is this just a messaging workshop?",
      a: "No. A workshop leaves you with sticky notes. You get positioning, an ideal customer profile, messaging, pricing input and sales materials written and in use: on your website, in your deck and in your next launch, with tracking that shows whether the new message converts better than the old one.",
    },
    {
      q: "I built the product. Why wouldn't I write the positioning myself?",
      a: "You know the product better than anyone, which is exactly the trap: founders describe what they built, while buyers pay for what it fixes. We bring the outside view from customer interviews, win/loss data and competitor analysis, and structure it into a position you can defend. You make the final call, and you keep all of your equity.",
    },
    {
      q: "Will you set our prices?",
      a: "We give pricing and packaging input: the value metric, the tiers, what goes in each package and how buyers will compare it. The decision is yours. Where it helps, we test packages on live pages with tracking, so the choice rests on what buyers do rather than on opinion.",
    },
    {
      q: "How is this different from hiring a product marketing manager?",
      a: "One hire has to learn your market first, then depend on others to build pages, run campaigns and set up tracking. Here a forward-deployed growth executive leads the work and our marketing, engineering and analytics teams execute it, so the positioning goes live instead of staying in a document. If you hire in-house later, that person starts from a tested foundation.",
    },
  ],

  cta: {
    label: "Talk through your positioning",
    message:
      "Hi Publeca, I'd like help with product marketing. Buyers don't immediately see why they should choose our product or pay what we charge. Can we talk about our positioning, messaging and next launch?",
  },

  seo: {
    title: "Product Marketing Consulting: Positioning & Launches",
    description:
      "Product marketing consulting for founders and CEOs: positioning, messaging and launches that show buyers why to choose you and why you're worth the price.",
    keywords: [
      "product marketing consulting",
      "product marketing agency",
      "positioning and messaging",
      "go-to-market strategy",
      "product launch strategy",
      "ideal customer profile",
      "sales enablement",
      "competitive analysis",
    ],
  },
};

export default service;
