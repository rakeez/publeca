import type { Post } from "../types";

const post: Post = {
  slug: "is-your-marketing-working",
  title: "Is your marketing working? Seven questions a CEO can ask without being a marketer",
  who: "For directors and CEOs who sign off on marketing spend, whether it goes to an agency, an in-house team or both, but can't tell from the reports whether it is making the company money.",
  value:
    "Seven plain questions to put to your marketing team, what a good answer sounds like for each, and the red flags that tell you the spend isn't tied to real sales.",
  excerpt:
    "You don't need to understand marketing to judge it. Ask these seven questions, then listen for money, evidence and what was stopped.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["ceos"],
  body: [
    {
      paragraphs: [
        "You can judge whether your marketing is working without learning marketing. You need seven questions, asked in writing, and the discipline to accept only answers that connect money spent to sales your finance team can see in the books.",
        "Here they are. Below, for each one: what a good answer sounds like, and which answers should worry you.",
      ],
      bullets: [
        "What does it cost us to win one new customer, all-in, and is that cost rising or falling?",
        "How long does a new customer take to pay back what we spent to win them?",
        "Which channels produced last month's sales, and how do you know?",
        "If we paused our biggest channel for a month, what would we actually lose?",
        "When did someone last check our tracking against real sales?",
        "What did you stop doing last quarter, and why?",
        "What are you testing next, and what result would make you stop?",
      ],
    },
    {
      heading: "Questions about money: what a customer costs, and when it pays back",
      paragraphs: [
        "Start with the cost of winning a customer. The honest version adds up everything spent to win new business in a period (ad spend, agency fees, software, the sales time spent chasing new accounts) and divides it by the new paying customers won in that period. Not leads. Not sign-ups. Customers.",
        "A good answer gives one figure per main channel, says what it includes, and shows which way it has moved recently. If the answer comes back as cost per click or cost per lead, ask again. A cheap lead that never buys is the most expensive line in your marketing budget.",
        "Then ask about payback. A customer who is expensive to win can still be a good deal if they buy again and again at a healthy margin; a cheap customer who buys once, at a discount, may never cover their cost. A good answer connects acquisition cost to the margin each customer brings in and gives a time: this many months until we break even. If nobody has ever worked it out, that is your finding.",
      ],
      bullets: [
        "Red flag: the figure covers ad spend only and leaves out fees, software and people.",
        "Red flag: \"brand takes time\", with no date by which you should expect to see a return.",
      ],
    },
    {
      heading: "Questions about cause: which channels really produced the sales",
      paragraphs: [
        "Every advertising platform reports its own results, and each one credits itself, under its own rules, for sales it had any part in. A customer who saw an Instagram ad, later searched your company name on Google and then bought can be counted as a sale in both dashboards. Neither platform is breaking its rules. Together, they overstate.",
        "Here is a test you can run yourself. Ask for the number of sales each platform claims for last month, add them up, and compare the total with the sales in your accounting system. If the platforms claim more sales than you made, your reports double-count, and budget drifts toward whichever channel claims credit most generously.",
        "A good answer names the channels, names the method (normally your own tracking, which records each sale once against its source) and shows where the platforms disagree with it.",
        "The follow-up, \"what would we lose if we paused our biggest channel for a month\", separates the sales your marketing caused from the sales that would have happened anyway. The classic case is paying for ads on searches for your own company name: many of those people were already looking for you. A good team has a view, ideally backed by a controlled test: pause spend in one region or for one period, and compare. The red flag is \"we'd lose everything\", said with no test behind it.",
      ],
    },
    {
      heading: "The question most teams can't answer: has anyone verified the tracking?",
      paragraphs: [
        "Every number above depends on tracking: the code on your website and in your app that records a sale and reports where it came from. Tracking breaks quietly. A website redesign, a new checkout, a change of payment provider or an app update can stop sales being recorded, or record them twice, while the dashboards keep showing tidy charts.",
        "The cost goes beyond bad reports. Google's and Meta's ad systems learn from the sales you report back and look for more people like those buyers. Feed them wrong data and your spend drifts toward people who don't buy.",
        "A good answer names a date, a person and a method. A hypothetical example: \"Last month our analyst compared tracked purchases with orders in the payment system, week by week. Most purchases are recorded; the gap comes mainly from visitors who decline cookies, and here is how we account for it.\"",
      ],
      bullets: [
        "Red flag: \"the pixel is installed\". Installed is not the same as accurate.",
        "Red flag: \"Google says it's working\". The platform checks that the code fires, not that it matches your sales.",
        "Red flag: nobody has ever compared tracked sales with real orders.",
        "Red flag: app sales aren't tracked at all, or are tracked separately and never reconciled with the website.",
      ],
    },
    {
      heading: "Questions about judgment: what was stopped, and what is being tested",
      paragraphs: [
        "Ask what the team stopped doing last quarter. It is the best single test of whether anyone is managing your budget or simply spending it. Every marketing program accumulates campaigns, audiences and channels; the ones that don't pay should be cut and the money moved.",
        "A good answer is specific and stated in money. A hypothetical example: \"We stopped the awareness campaign on one social platform because it brought visitors who never bought, and moved that budget into search, where each customer costs us less.\" The red flag is \"nothing, everything is being optimized\". A team that never stops anything isn't making decisions; it is accumulating activity.",
        "Then ask what is being tested next. A good answer has three parts, agreed before the test starts: what the team believes, the result that would prove it, and the date you will know. Another hypothetical: \"We think a shorter checkout will lift online sales. If the share of visitors who buy hasn't improved by the end of next month, we switch back.\" The red flag is a test with no stopping rule, where success is defined after the results come in.",
      ],
    },
    {
      heading: "Red flags that cut across every answer",
      paragraphs: [
        "One weak answer is fixable. These patterns usually mean the problem is in how the work is set up, not in one campaign:",
      ],
      bullets: [
        "You asked about money and got platform metrics: impressions, reach, engagement, click-through rate.",
        "Every number comes from the advertising platforms. None comes from your own sales records.",
        "The report's metrics change from month to month, so trends can't be compared.",
        "\"Attribution is complicated\" ends the conversation. It is complicated; a good team explains how they handle it and where they are unsure.",
        "Requests for more budget arrive before evidence that the current budget works.",
        "Nobody inside your company can answer these questions without the agency on the call.",
      ],
    },
    {
      heading: "How to ask without starting a fight",
      paragraphs: [
        "These questions work better as a standing agenda than as an interrogation. Send them in writing a week before your next review so the team can prepare real answers; how long the answers take to arrive is information too. Ask for one page, in your currency, using sales figures your finance team recognizes, and invite your finance lead to the meeting. They will spot a number that doesn't reconcile before anyone else.",
        "Reward honesty over polish. \"We don't know yet, and here is how and by when we will find out\" is a strong answer. A confident answer with nothing behind it is the weak one. Ask the same seven questions every quarter: the trend in the quality of the answers will tell you more than any single meeting.",
      ],
    },
    {
      heading: "If the answers come back thin",
      paragraphs: [
        "If the answers are vague, or the platforms and your books disagree, get an independent read before you change agencies or budgets. Publeca's Growth Diagnostic does that in about three weeks, for a fixed fee. Our analytics and data science team checks your tracking against real sales, our growth consultants rank where your next growth will come from by financial impact, and your leadership team gets a 90-day plan in plain English.",
      ],
    },
  ],
  cta: {
    label: "Book a growth diagnostic",
    message:
      "Hi Publeca, I read your article on whether our marketing is working. I'd like an independent view of where our marketing spend is actually producing sales and what to do next. Could we set up a call?",
    note: "Fixed fee. About three weeks. Plain-English answers.",
  },
  seo: {
    title: "Is Your Marketing Working? 7 Questions for CEOs",
    description:
      "Seven plain questions a CEO can ask an agency or in-house team to see if marketing spend drives real sales, what good answers sound like, and the red flags.",
    keywords: [
      "is my marketing working",
      "questions to ask your marketing agency",
      "how to evaluate a marketing agency",
      "customer acquisition cost",
      "marketing ROI for CEOs",
      "marketing attribution",
      "conversion tracking audit",
    ],
  },
};

export default post;
