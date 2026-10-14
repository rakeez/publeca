import type { Post } from "../types";

const post: Post = {
  slug: "aeo-geo-what-actually-matters",
  title: "AEO and GEO: what actually moves AI search visibility (and what doesn't)",
  who: "For founders, CEOs and marketing leads being pitched AEO or GEO work who want to know which parts actually affect visibility in AI search before paying for any of it.",
  value:
    "A clear line, drawn from Google's own guidance, between the work that earns visibility in AI Overviews and AI Mode and the work Google says it doesn't need, plus checklists you can run on your own site this week.",
  excerpt:
    "Google says its AI search runs on its core ranking systems. What that means for AEO/GEO budgets, what to stop paying for, and what to do instead.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["general", "technical-founders", "ceos"],
  body: [
    {
      paragraphs: [
        "Google's AI Overviews and AI Mode are rooted in the same core ranking and quality systems as regular Google Search. That is Google's own description, from its guide Optimizing for generative AI features in Google Search (https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). It means an AEO or GEO budget belongs in two places: pages that are crawlable, indexed and eligible to show a snippet, and content only your business could have written.",
        "The same guide is unusually direct about what Google Search does not need: llms.txt or other AI-specific files, content chopped into small chunks, pages rewritten “for AI,” special schema markup for AI, and manufactured mentions. If a proposal on your desk spends most of its effort there, most of the budget is going to work Google has publicly said it doesn't require.",
      ],
    },
    {
      heading: "How an AI answer actually gets built",
      paragraphs: [
        "Google describes two mechanisms. The first is grounding, a form of retrieval-augmented generation: core ranking systems retrieve relevant, current pages from the Search index, the model reads them to write a response, and the response links to supporting pages. The second is query fan-out: the system runs a set of concurrent, related queries to gather more material for the original question.",
        "Put together, those change the unit of competition. You are not only competing for the question the user typed. You are competing for each related question the system may run alongside it, and on each of those you win or lose through ordinary ranking.",
        "Hypothetical example: a CEO asks whether to replace a spreadsheet-based stock system before the busy season. Related searches could plausibly cover implementation timelines, the risk of switching mid-season, and the cost of running two systems in parallel. A vendor with a generic “benefits of inventory software” page has nothing to offer any of them. A vendor with a candid page on sequencing a rollout has a real chance on at least one.",
        "That is why AEO and GEO are mostly a ranking and content problem, not a formatting problem.",
      ],
    },
    {
      heading: "Three gates, and the promise nobody can make",
      paragraphs: [
        "Before content quality matters, a page has to clear three gates in Google's guidance. Fail any one and nothing else here applies to that page. Clearing all three still guarantees nothing: Google states plainly that crawling, indexing and serving aren't guaranteed, so a vendor guaranteeing placement in AI Overviews is promising something Google itself does not.",
      ],
      bullets: [
        "Crawlable and public. The content is publicly accessible, not behind a login, not blocked in robots.txt, and present in the rendered page. If the main text only appears after JavaScript runs, confirm that Google actually renders it.",
        "Indexed. URL Inspection in Search Console shows whether Google has the page and which URL it chose as canonical. If Google picked a different canonical than you intended, the page you care about may not be the one that gets shown.",
        "Eligible for a snippet. Google requires that a page be eligible to appear in Search with a snippet. A nosnippet directive left in a template quietly fails that test for every page built on it.",
      ],
    },
    {
      heading: "What Google says you can stop paying for",
      paragraphs: [
        "Each item below appears in the guide as unnecessary for Google Search. A proposal built around them tells you something about the proposal.",
      ],
      bullets: [
        "llms.txt, AI text files and markdown copies of pages. Google Search doesn't use them, and Google says they neither help nor harm visibility there. Other AI companies make their own choices; read their documentation rather than assuming.",
        "Chunking content into small pieces. There is no requirement to break pages up. Structure each page for the person reading it.",
        "Writing for AI. Google says no special style is needed for generative AI search. Clear writing for a human buyer is the brief.",
        "Special schema for AI. There is no AI-specific schema.org markup. Accurate structured data still matters for rich results, so keep the markup that describes what is genuinely on the page.",
        "Manufactured mentions. Google says chasing inauthentic mentions across the web is less helpful than it looks.",
        "Tools that claim to read Google's internal metrics. Google states that no third-party tool has access to its internal ranking or AI systems. A vendor's “AI visibility score” is that vendor's own model: possibly a useful rough proxy, never a measurement of Google.",
      ],
    },
    {
      heading: "The work that earns citations: content only you could write",
      paragraphs: [
        "Google's positive advice is short: create content yourself from what you know, make it unique rather than commodity, and support it with high-quality, relevant images and video. The hard part is judging whether a page clears that bar. One test does most of the work.",
        "The commodity test: could a competent writer with no access to your business produce this page using only what is already online? If yes, the index already holds many versions of it, and the system has no reason to prefer yours. If no, you have something worth retrieving.",
        "Hypothetical example: a software company retires its generic benefits article and publishes what its implementation team sees in the first month of a rollout: the data cleanup customers underestimate, the order in which to move teams across, and when it would advise waiting. Nobody without that team's experience could write the page, which is exactly why it is worth retrieving.",
        "To find material that passes, put these questions to your own team:",
      ],
      bullets: [
        "Which questions do prospects ask on sales calls that the website never answers?",
        "What do we tell customers only after they sign, about timelines, trade-offs or what tends to go wrong?",
        "Where do we disagree with the standard advice in our industry, and why?",
        "Which numbers do we hold that nobody else has, such as our real pricing ranges, delivery times or failure modes, and which of them are we willing to publish?",
        "What does the work look like in practice, and do we have real photos, screenshots or walkthrough video to show it?",
      ],
    },
    {
      heading: "The technical layer engineers own",
      paragraphs: [
        "For technical founders this part is familiar: crawlable pages, clear structure, minimal duplicate content, JavaScript SEO basics, fast responses, layouts that work on every device, and main content that is easy to find. Semantic HTML helps, though Google puts human readability ahead of perfect code.",
        "Assistants outside Google, such as ChatGPT and Perplexity, generally draw on web search indexes and on pages their own crawlers can reach. Their internals are not documented the way Google's are, so the defensible position is the same foundation: allow the crawlers you want in robots.txt, and be the best source on the questions you can genuinely answer.",
        "One newer consideration: Google notes that browser agents may complete tasks on a site by looking at the rendered page, inspecting the DOM and reading the accessibility tree. The markup that serves screen readers largely serves agents too. Four checks cover most of it:",
      ],
      bullets: [
        "Main content is in the rendered HTML without a click, scroll or consent interaction needed to reveal it.",
        "Each page has one canonical URL, and parameter or duplicate variants consolidate to it.",
        "Booking, buying and contact actions are real links and buttons with accessible names, and every form field has a label.",
        "Headings follow the structure of the page, and images that carry meaning have descriptive alt text.",
      ],
    },
    {
      heading: "Measure it with first-party data",
      paragraphs: [
        "Search Console includes reporting on how your content performs in Google's generative AI features. That is Google's own data, and it should be the baseline for AEO or GEO work, ahead of any vendor dashboard.",
        "Pair it with your own analytics. Where AI assistants pass a referrer, group those sessions into their own channel and follow them through to leads and sales. The monthly question: which pages earned visibility, on which topics, and did those visits turn into revenue? If visibility rises and conversions don't, either the pages answer questions your buyers don't ask, or the path from answer to action is broken. Both are fixable once you can see them.",
      ],
    },
    {
      heading: "If you want an outside read",
      paragraphs: [
        "For a site-specific answer, Publeca's AEO/GEO review applies this article to your website: the three gates checked across your key page templates, the commodity test run on the pages that matter commercially, and a ranked list of fixes split between your engineers and the people who hold the expertise. Nothing in it depends on tactics Google has said it doesn't use.",
      ],
    },
  ],
  cta: {
    label: "Request an AEO/GEO review",
    message:
      "Hi Publeca, I'd like an AEO/GEO review of our site, based on Google's published guidance. Our website is: ",
    note: "Grounded in Google's guidance. No gimmicks, no guaranteed placements.",
  },
  seo: {
    title: "AEO and GEO: What Actually Moves AI Search Visibility",
    description:
      "What earns visibility in Google's AI Overviews and AI Mode, per Google's own guidance, and the AEO/GEO tactics it says you can skip. With practical checklists.",
    keywords: [
      "AEO",
      "GEO",
      "answer engine optimization",
      "generative engine optimization",
      "AI Overviews optimization",
      "AI Mode SEO",
      "llms.txt",
      "AI search visibility",
    ],
  },
};

export default post;
