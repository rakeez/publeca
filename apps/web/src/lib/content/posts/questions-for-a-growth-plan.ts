import type { Post } from "../types";

const post: Post = {
  slug: "questions-for-a-growth-plan",
  title: "Six questions that separate a growth plan from a deck",
  who: "For investors assessing a growth plan in diligence or at the board, and for CEOs asked to approve one their team has written.",
  value:
    "Six questions, with the follow-ups and the shape of a good answer to each, that show whether a growth plan can be executed, measured and stopped if it fails.",
  excerpt:
    "Assumptions, unit economics, measurement, sequencing, owners and kill criteria: six questions that show whether a growth plan is real.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["investors", "ceos"],
  body: [
    {
      paragraphs: [
        "A growth plan is real when it can answer six questions with specifics: what has to be true, what a customer costs and returns, how progress will be measured each week, what happens first, who owns each number, and what result would make the team stop. A deck answers the same questions with market sizes and adjectives. The difference usually shows within the first few minutes of asking.",
        "What follows is each question, the follow-ups worth pressing on, and what a good answer sounds like. None of it requires a marketing background. The questions work in diligence, in a board meeting, or when a CEO is reviewing a plan their own team has written. Two habits make them more useful: send them ahead of the meeting, so the team answers with data rather than improvisation, and treat “we don't know yet, and here is how we'll find out” as a strong answer. Confidence about everything is the weaker signal.",
      ],
    },
    {
      heading: "1. What has to be true for this to work?",
      paragraphs: [
        "Every forecast rests on a handful of beliefs: that a particular kind of buyer exists in useful numbers, that they can be reached through a given channel at a tolerable cost, that some share of them will buy, and that they will stay. The forecast is only as strong as the weakest of those beliefs. A deck presents the market; a plan lists the assumptions underneath the forecast and says which ones have been tested.",
        "Ask the team to name the three assumptions that would break the forecast if they turned out to be wrong, then ask what evidence supports each. The evidence can be modest: a small paid test, a run of sales conversations, last quarter's customer data. What matters is that the team can separate what it has proven from what it is still betting on.",
      ],
      bullets: [
        "Follow-up: which assumption are you least sure of, and what is the cheapest way to test it before the budget is committed?",
        "Hypothetical good answer: “Search leads convert to paying customers at a rate we have measured for two quarters. Whether that rate holds when we double spend is untested, so the first month is designed to answer it.”",
        "Weak answer: the size of the total market, restated with more conviction.",
      ],
    },
    {
      heading: "2. What does a customer cost, what are they worth, and when does the money come back?",
      paragraphs: [
        "Growth that loses money on each new customer is a subsidy with a revenue line. A plan should state, by channel where possible, what it costs to acquire a paying customer, the gross margin that customer produces, and how long that margin takes to repay the acquisition cost. Blended averages hide the problem: a profitable referral channel can quietly cover for a paid channel that never pays back.",
        "Two errors are common enough to check for every time. The first is calculating payback on revenue rather than gross margin, which flatters every channel. The second is assuming acquisition cost stays flat as spend increases. It rarely does. The most ready buyers are reached first, and each additional unit of budget reaches people who are a little less ready to buy.",
      ],
      bullets: [
        "Ask for acquisition cost and payback by channel, not blended across the business.",
        "Ask whether payback is measured on revenue or on gross margin.",
        "Ask what the plan assumes happens to acquisition cost as budget grows, and where that assumption came from.",
      ],
    },
    {
      heading: "3. How will you know, week by week, whether it is working?",
      paragraphs: [
        "Many plans are reviewed quarterly against numbers nobody can reconcile. The ad platform reports one figure, the sales system another, finance a third. When measurement is unreliable, every discussion about performance turns into a discussion about whose number is right, and a failing plan can drift for months before anyone can prove it has failed.",
        "A real plan names a small set of leading indicators that move weekly, ties each one to the revenue outcome it predicts, and says exactly where each number comes from. It also says whether tracking will be in place before spend scales or fixed afterward. “Afterward” usually means the first expensive quarter is spent without knowing which part of the budget worked.",
      ],
      bullets: [
        "Which steps are tracked from first visit to paid order, on the website and in the app?",
        "Are confirmed sales sent back to the ad platforms from the company's own servers, so their bidding learns from purchases rather than clicks?",
        "Who reconciles platform-reported conversions with the revenue finance recognizes, and how often?",
        "What will the weekly read-out show, and could a board member understand it in a few minutes?",
      ],
    },
    {
      heading: "4. What happens first, and why that before anything else?",
      paragraphs: [
        "Plans that try to do everything at once tend to do nothing well, and the order of work reveals whether a team understands its own constraints. If the website converts poorly, more traffic magnifies the waste. If positioning is unclear, better ads deliver an unclear message more efficiently. If tracking is missing, nothing that follows can be judged.",
        "A good plan orders the work so each step makes the next one cheaper or more certain, and it states what is deliberately being left out this quarter. A short list of postponed initiatives is often the most reassuring page in the document, because it shows that trade-offs have been made rather than avoided.",
        "Hypothetical example: a professional services firm wants more inbound leads. The deck proposes new ads, a rebrand and a content program, all starting in the same month. The plan proposes tracking first, then a rebuilt landing page tested against the current one, then a larger search budget only once the new page is shown to convert better. The ambition is identical. The amount of money at risk before anything is proven is not.",
      ],
    },
    {
      heading: "5. Who owns each number, and what can they actually change?",
      paragraphs: [
        "A metric without an owner gets reported rather than managed. Every target in the plan should have one named person accountable for it, and that person should control the levers that move it. Ownership breaks down most often at the seams between suppliers: the agency owns ad performance, the developer owns the website, the sales team owns follow-up, and nobody owns cost per sale, which depends on all three.",
        "Ask who owns the end-to-end number and whether they have authority over budget, landing pages and lead follow-up. If the honest answer is the CEO, in whatever time is left over, the plan has a capacity problem presented as a strategy.",
      ],
      bullets: [
        "Is there one named owner per metric, rather than a team or a function?",
        "Can that person change the inputs, or only report on them?",
        "Who can move budget between channels mid-quarter without waiting for the next board meeting?",
      ],
    },
    {
      heading: "6. What result would make you stop?",
      paragraphs: [
        "This is the question that most reliably separates a plan from a deck, because decks rarely contemplate failure. Kill criteria are agreed in advance: if a channel has not reached a stated cost per sale after a stated amount of spend or time, the budget moves elsewhere. Agreeing on them before the money is spent removes the sunk-cost argument that keeps weak programs alive for another quarter.",
        "Good kill criteria are specific, dated and owned, and they work in both directions. The same discipline should define what result would justify putting more money behind a channel that is working, so success is scaled on purpose instead of noticed late.",
      ],
      bullets: [
        "Hypothetical good answer: “If LinkedIn ads haven't produced a qualified opportunity under our target cost by the end of month two, that budget moves to search, where we already have evidence.”",
        "Weak answer: “We'll keep optimizing.”",
      ],
    },
    {
      heading: "The one-page test",
      paragraphs: [
        "A plan that survives these six questions usually fits on one page: the assumptions and how each was tested, acquisition cost and payback by channel, the weekly indicators and their source, the order of work, an owner for each number, and the conditions for stopping or scaling. If that page cannot be written, the plan is not ready, however polished the deck.",
        "Publeca's growth teams build and review plans against that same page, in portfolio growth reviews for investors and growth diagnostics for leadership teams. If you are looking at a plan and would value a second operator's read, or would simply like to compare notes on how you assess them, an email is the easiest place to start.",
      ],
    },
  ],
  cta: {
    label: "Compare notes by email",
    message:
      "Hello, I read “Six questions that separate a growth plan from a deck” and would like to compare notes on how you review growth plans.",
    channel: "email",
    note: "A conversation between operators, not a pitch.",
  },
  seo: {
    title: "Growth Plan Review: Six Questions for Investors and CEOs",
    description:
      "Six questions that separate a real growth plan from a deck: assumptions, unit economics, measurement, sequencing, owners and kill criteria, with good answers.",
    keywords: [
      "growth plan review",
      "growth plan due diligence",
      "commercial due diligence questions",
      "go-to-market plan review",
      "unit economics questions",
      "board growth plan questions",
      "marketing kill criteria",
    ],
  },
};

export default post;
