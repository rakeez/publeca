import type { Post } from "../types";

const post: Post = {
  slug: "positioning-technical-products",
  title: "Positioning a technical product: from feature list to the reason someone pays",
  who: "For technical founders whose product is clearly better under the hood, and whose homepage still reads like a feature list.",
  value:
    "A five-step positioning method, with the exact questions to ask at each step, that turns what your product does into the reason a specific buyer pays, ending in a homepage headline you can ship.",
  excerpt:
    "Positioning is a dependency chain, not a brainstorm: alternatives, unique capabilities, value, best-fit customers, category, then the headline.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["technical-founders"],
  body: [
    {
      paragraphs: [
        "Your feature list describes the product. Positioning explains why a specific buyer should choose it over what they would otherwise do, and that comparison is the part most technical founders leave out. Buyers never evaluate a product in isolation; they compare it with an alternative they already understand, and if your homepage doesn't name one, they pick it for you, usually the wrong one.",
        "The fix is a method, not a brainstorm. Positioning has five inputs, and they form a dependency chain: competitive alternatives determine which capabilities count as unique, unique capabilities determine the value you can credibly claim, that value determines which customers care most, and those customers determine the market category that makes everything obvious. Resolve them in that order and the headline nearly writes itself. Start from features and every later step inherits the bug.",
        "The sequence is adapted from April Dunford's positioning framework. Below: the questions for each step, the traps specific to people who built the thing, and a worked hypothetical example ending in a real headline.",
      ],
    },
    {
      heading: "Step 1: List what customers would do if you didn't exist",
      paragraphs: [
        "Competitive alternatives are not the vendors on a comparison site. They are what a buyer would actually do without you: a spreadsheet, an internal script, a contractor, a feature inside a platform they already pay for, or nothing at all. “Do nothing” is often the strongest alternative, because keeping it costs nothing.",
        "Engineers tend to rush this step because the answer feels obvious. It rarely is. The tool you think you compete with may never come up in a sales call, while the real alternative is a habit nobody would call a product. Answer from evidence:",
      ],
      bullets: [
        "What were your most recent customers using the day before they signed?",
        "When you lost a deal, what did the buyer choose instead? “We'll keep doing it by hand” counts.",
        "Who inside the customer's company does this work today, and what does it cost them in hours, errors or risk?",
      ],
    },
    {
      heading: "Step 2: Isolate what only you can do",
      paragraphs: [
        "Only now do features enter the picture, and only through a filter: a capability is unique only if the alternatives from step 1 lack it. This is where technical founders struggle most, because everything they built took effort and feels distinctive. Effort is not the test. If an alternative can credibly claim the same thing, it belongs in your documentation, not your positioning.",
        "Look past features, too. Some of the strongest unique capabilities are architectural or commercial: it runs inside the customer's network so data never leaves, it works with the stack they already have, it needs no sales call to set up, it was built by people who did the buyer's job.",
      ],
      bullets: [
        "For each feature: which alternative cannot do this? If the answer is “none of them,” cut it from the list.",
        "Which design decisions would a competitor have to rewrite their product to copy?",
        "What do customers mention, unprompted, when they explain why they switched?",
      ],
    },
    {
      heading: "Step 3: Turn capabilities into value a buyer can measure",
      paragraphs: [
        "A capability is what the product does. Value is what changes for the buyer because of it. Translate with a chain of “so what?” questions, asked until you reach something the buyer would write into a budget request: revenue gained, cost removed, hours returned to a team, a risk taken off the table, control kept in-house.",
        "A hypothetical chain: the product scores transactions in a streaming pipeline instead of a nightly batch. So what? Fraud signals arrive while the order is still open, not the next morning. So what? Suspicious orders can be held before they ship. So what? The business stops shipping goods it will never be paid for. That last answer is the value. The first is an engineering decision that only matters because of it.",
        "Two checks keep this honest. If you can't say how the buyer would measure it, it isn't value yet, so keep asking. Then group capabilities into a few value themes: a buyer can repeat two or three reasons to pay to their boss, never a dozen.",
      ],
    },
    {
      heading: "Step 4: Name the customers who care most",
      paragraphs: [
        "Many companies could use your product. Positioning targets the ones for whom your value is largest, usually the ones where the alternative fails worst. Describe them by the characteristic that makes the value matter, not by industry or headcount alone: they deploy many times a day, they answer to an auditor, they have no data team, their peak season breaks their current tooling.",
        "This step makes sales and marketing cheaper, because it tells you who to ignore. A precise description lets you disqualify a prospect on the first call instead of after the fifth meeting.",
      ],
      bullets: [
        "Which customers bought fastest and asked the fewest questions about why they needed it?",
        "Which customers would be most upset if you shut down, and what do they have in common?",
        "Which prospects love the demo but never buy? The attribute they lack belongs in your definition.",
      ],
    },
    {
      heading: "Step 5: Choose the category that makes your strengths obvious",
      paragraphs: [
        "The market category is the frame buyers use to make sense of you. It sets their assumptions before they read a word: who you compete with, roughly what you should cost, which features you must have. Choose a frame that leads buyers to expect exactly the strengths you have, and your differentiators read as obvious rather than as claims.",
        "There are three practical options. Compete head-on in an existing category when you win on the criteria buyers already use. Take a subsegment, the “X for Y” move, when you are stronger for a specific customer than the general leaders are. Create a new category only when nothing fits, knowing it means educating the market yourself, which is slow and expensive early on.",
        "Then test it out loud. Say the category to someone who matches your target customer. If they immediately know what you replace and why you might be better, the frame works. If they ask “so what is it, exactly?”, it doesn't.",
      ],
    },
    {
      heading: "Worked example (hypothetical): from feature list to headline",
      paragraphs: [
        "Consider a hypothetical product built by a pair of backend engineers: a tool that checks database schema migrations against real production query patterns and flags changes that will lock tables or break queries before they deploy. Their first headline reads: “AI-powered schema analysis for Postgres, with CI integration and query replay.” Every word is accurate. None of it says why anyone pays.",
        "Run the five steps, then assemble the headline in a fixed order: the value first, then who it is for, then the mechanism that makes it believable and the alternative it retires.",
      ],
      bullets: [
        "Alternatives: a senior engineer hand-reviews every migration; risky changes wait for a late-night maintenance window; a staging database without production-scale data; or ship it and roll back if it breaks.",
        "Unique capabilities: replays recorded production query patterns against each migration, which a staging database without production data cannot; runs on every pull request, which manual review cannot sustain; estimates lock time against actual table sizes.",
        "Value: schema changes ship during business hours without outage risk, and senior engineers stop being the bottleneck on every migration.",
        "Customers who care most: teams changing schemas often on large, busy Postgres databases, where downtime hits customers or an SLA. Not early startups with small tables, where most migrations are already safe.",
        "Category: not “AI code analysis,” which invites comparison with general code review tools; instead “migration safety for Postgres,” a frame where the buyer instantly knows what it replaces.",
        "Headline: “Ship Postgres migrations during business hours, without the outage risk.” Subhead: “For teams running busy production databases. Every pull request's migrations are checked against your recorded production query patterns, so risky changes are caught before merge, not in a late-night maintenance window, and nobody hand-reviews every change.” The feature list moves below the fold, where it supports a claim instead of trying to be one.",
      ],
    },
    {
      heading: "If you want a second pair of hands",
      paragraphs: [
        "Positioning is one of the first jobs technical founders expect a business co-founder to take on, and equity is an expensive way to pay for it. Publeca's Go-to-Market Sprint runs this method with you on your own customer interviews, wins and lost deals, then carries it into market: a defined ideal customer, a landing page rewritten around the new position, conversion tracking you can trust, and a launch campaign. Fixed scope, fixed fee, and your cap table stays exactly as it is.",
      ],
    },
  ],
  cta: {
    label: "Scope a Go-to-Market Sprint",
    message:
      "Hi Publeca, I read your piece on positioning a technical product. I'm a technical founder and I'd like to scope a Go-to-Market Sprint for our product.",
    note: "Fixed scope. No equity.",
  },
  seo: {
    title: "Positioning a Technical Product: A Founder's Method",
    description:
      "Technical founders: turn your feature list into the reason a buyer pays. A five-step product positioning method, from alternatives to category to headline.",
    keywords: [
      "product positioning",
      "positioning for technical founders",
      "how to position a technical product",
      "competitive alternatives",
      "market category positioning",
      "homepage headline",
      "B2B SaaS positioning",
    ],
  },
};

export default post;
