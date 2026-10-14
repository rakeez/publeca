import type { Post } from "../types";

const post: Post = {
  slug: "growth-without-giving-up-equity",
  title: "You don't need a business co-founder to grow. You need a growth function.",
  who: "For technical founders who built the product and are being told they need to give a large equity stake to a business or marketing co-founder before the company can grow.",
  value:
    "A test that tells you whether your gap is a co-founder or a growth function, the equity math in plain terms, and the order to build that function without giving up ownership.",
  excerpt:
    "A business co-founder brings four jobs and one partnership. How to tell which you actually need, and how to get the jobs without giving up the stake.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["technical-founders"],
  body: [
    {
      paragraphs: [
        "If you built the product and keep hearing that you need a business co-founder, here is the short answer: what you are missing is usually four jobs, not one person. Positioning, demand, a sales motion and measurement. Each of those can be defined, staffed, measured and replaced if it underperforms. Vested equity can't be taken back.",
        "So before you trade a permanent share of the company for those jobs, work out whether your gap is person-shaped or function-shaped. Below is a test that separates the two, the cases where a co-founder genuinely is the better answer, and the order to build the function in when it isn't.",
      ],
    },
    {
      heading: "What a business co-founder actually provides",
      paragraphs: [
        "Strip away the title and a commercial co-founder is expected to deliver four things. Write each one down as an outcome and it stops sounding like a person and starts reading like a scope of work.",
      ],
      bullets: [
        "Positioning — one sentence a stranger could repeat that names who the product is for, the moment they start looking, and what they use today instead. Done means your homepage, deck and ads say the same thing, and new prospects describe you back accurately.",
        "Demand — at least one channel that produces qualified signups, trials or conversations on a schedule you can forecast. Done means you know which channel, what a qualified lead costs there, and what happens when you double the budget.",
        "Sales motion — the designed path from first touch to paid: self-serve, sales-assisted or enterprise, with pricing, onboarding and follow-up built to match. Done means a new customer can buy without you personally rescuing the deal.",
        "Measurement — tracking that connects every campaign and every dollar to signups, activation and revenue. Done means the answer to \"what is working\" comes from a dashboard, not a debate.",
        "The fifth contribution is the one that actually justifies equity: a peer who shares the risk and the judgment across the whole company, from hiring to fundraising to the decision to pivot. Keep it separate from the other four. It decides the test below.",
      ],
    },
    {
      heading: "The equity math, stated plainly",
      paragraphs: [
        "Equity is paid once, at today's valuation, and kept forever. A growth function is paid as you go and stops when it stops being useful. That asymmetry decides most of this.",
        "A hypothetical, for illustration only: you own the company outright and agree to give a business co-founder one-fifth of it. If the company never amounts to much, the stake cost you little, but the go-to-market problem it was meant to solve didn't get solved either. If the company succeeds, one-fifth of whatever it becomes is the price you paid for positioning, demand, a sales motion and tracking. The stake is cheapest in the scenario where it failed and most expensive in the scenario you are building toward.",
        "Put differently: the more confident you are in the product, the more expensive equity is as a way to buy go-to-market. Cash is the cheaper currency for work that can be scoped.",
        "Two second-order costs are easy to miss. A co-founder who leaves early without proper vesting keeps a stake while contributing nothing, and investors in later rounds will ask about it. And the commercial contribution is heaviest at the start, when positioning is set and the first channel is found, while the stake is permanent. You would be paying a lifetime price for work that is front-loaded.",
      ],
    },
    {
      heading: "The test: co-founder gap or function gap?",
      paragraphs: [
        "Answer these honestly. The first four describe a function gap. The last three describe a co-founder gap.",
      ],
      bullets: [
        "Can you name your buyer, the trigger that makes them start looking, and the alternative they use today? If you can, positioning is a sharpening job, not a founding one.",
        "Do people already sign up, pay or ask for demos without paid spend? Then demand exists. What's missing is a channel you can scale on purpose.",
        "Can you describe what success looks like 90 days from now, in numbers you would track? Anything you can scope for a quarter can be run as a function.",
        "Is the gap mostly execution (campaigns, content, landing pages, tracking) rather than judgment about which market to be in? Execution is what a function is built for.",
        "Does winning depend on one person's relationships: enterprise procurement, regulated buyers, a handful of distribution partners? Then the network is the asset, and a person may be the only way to get it.",
        "Do you want someone to co-own the hard calls (fundraising, hiring, pivots), not just the marketing? That is a co-founder.",
        "Is there a specific person who has done this in your market and wants to commit for years? A role you are filling with whoever is available is a hire, not a co-founder.",
      ],
    },
    {
      heading: "When a co-founder really is the right call",
      paragraphs: [
        "In some businesses, go-to-market is the product. Enterprise software sold to a small number of large buyers, where the first deals close on someone's credibility. Marketplaces where signing the supply side is the whole game. Regulated industries where knowing who signs off, and how, is the moat. There, the commercial work is the core of the company, and the person doing it should own a meaningful share of the outcome.",
        "The same holds when you want a peer for the whole company rather than help with one part of it. If you would trust this person to run the company for a month without you, equity is a fair price. If you only want them for marketing, it isn't.",
        "If a lead investor asks for a commercial co-founder, treat the request as a question about risk and ask what they are worried about. Sometimes the answer really is a person. Sometimes it is \"we can't see how this company finds customers,\" and a working function, with tracking that shows cost per customer by channel, answers that more directly than a new name on the cap table.",
        "If you do bring in a co-founder, write the four jobs above into their scope, and use vesting with a cliff so the stake follows the contribution.",
      ],
    },
    {
      heading: "How to build the function instead, in order",
      paragraphs: [
        "The sequence matters more than the headcount. Built in this order, each step makes the next one cheaper.",
      ],
      bullets: [
        "Instrument before you spend — define the events that matter (signup, activation, first value, paid, retained) in the product and on the site, send conversion events server-side so ad platforms optimize toward paying customers instead of clicks, and put the whole funnel on one dashboard. You can write the code; the hard part is deciding what to measure.",
        "Position from evidence — talk to the customers who paid, not the ones who never converted. Find their trigger, their alternative and the exact words they used. Rebuild the homepage around those words and test them in ads before you commit.",
        "Pick one demand channel that matches how buyers look — if they already search for the problem, start with search: Google Ads for speed, SEO for compounding. If they don't know the category exists, use social and content to create the question. If the market is small and nameable, go direct and through partners.",
        "Design the motion around deal size — smaller, simpler purchases should be self-serve, with onboarding that gets users to first value fast. Larger, multi-stakeholder purchases need a sales-assisted path, even if you are the salesperson for now.",
        "Run a weekly read-out — one page: what moved, why, and what changes next week. It is the discipline a good commercial co-founder brings, and the easiest one to install.",
        "Keep ownership, whoever does the work — every ad account, analytics property, domain, CRM and creative file belongs to your company, with any provider given access, not ownership. A function you can't take back isn't a function. It's a dependency.",
      ],
    },
    {
      heading: "Keep the equity, get the function",
      paragraphs: [
        "This is the gap Publeca's growth team fills for technical founders. The Go-to-Market Sprint is a fixed-scope engagement of roughly six weeks that delivers positioning, an ideal customer profile, conversion tracking and a launch campaign. After that, a Fractional Growth Team (a growth lead with marketing and analytics behind them) runs the function month to month. Our own engineering and analytics teams build the tracking inside your stack, in your company's name. No equity. And if the test above says your gap is co-founder-shaped, we will tell you that too.",
      ],
    },
  ],
  cta: {
    label: "Keep your equity — talk to us",
    message:
      "Hi Publeca, I'm a technical founder and read your piece on growing without a business co-founder. I'd like to talk about building a growth function while keeping my equity. Briefly, the product and where growth is stuck:",
    note: "Fixed scope to start. No equity involved.",
  },
  seo: {
    title: "Grow Without a Business Co-Founder: Keep Your Equity",
    description:
      "Technical founders: what a business co-founder actually provides, a test for whether you need one, and how to build a growth function and keep your equity.",
    keywords: [
      "business co-founder",
      "technical founder",
      "co-founder equity",
      "growth without a co-founder",
      "fractional growth team",
      "go-to-market for technical founders",
      "keep startup equity",
    ],
  },
};

export default post;
