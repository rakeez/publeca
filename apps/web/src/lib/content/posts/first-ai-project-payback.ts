import type { Post } from "../types";

const post: Post = {
  slug: "first-ai-project-payback",
  title: "Your first AI project should pay for itself: four tests for choosing it",

  who: "For CEOs and founders under pressure from boards, investors or competitors to \"do AI\", who would rather fund one project that earns its keep than a pilot that only impresses a meeting.",
  value:
    "A four-test filter for picking an AI project whose payback you can measure, and a pilot plan that ends in a clear decision to scale it or stop it.",
  excerpt:
    "Pick your first AI project by payback: four tests, four hypothetical use cases, and a pilot designed to end in a scale-or-stop decision.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["ceos", "technical-founders"],

  body: [
    {
      paragraphs: [
        "Choose the first AI project you can price before you build it. That means filling four blanks in advance: what the work costs you today, what a correct result looks like, which past examples prove it, and who checks the output before it reaches a customer or your books. Work that fills all four (frequent, repetitive, judged against a clear standard and safe to put behind a reviewer) is where AI pays back first. Then run a short pilot against an evaluation set built from your own cases, with the thresholds to scale or stop written down before anyone sees a result.",
        "If no candidate fills all four blanks, the next step is not a build. It is a few weeks of measuring the work you already do, which costs less than a pilot and is the only way a pilot can end in a decision.",
      ],
    },
    {
      heading: "Why first AI projects stall at \"promising\"",
      paragraphs: [
        "Most first projects are chosen for how they look in a meeting: a chatbot that answers anything, a model that predicts next quarter. They impress, then drift, because nobody recorded what the work cost before, what counts as a correct answer, or what result would justify a wider rollout. So every review ends on the most expensive word in a technology budget: promising.",
        "The costs that sink payback are rarely the build. They are the minutes spent checking each output, the integration work to get results into the systems your team already uses, the running cost per task at real volume, and the upkeep as models and your data change. A project that removes typing but adds almost as much checking has paid for nothing.",
      ],
    },
    {
      heading: "The four tests a first project must pass",
      paragraphs: [
        "Run every candidate through these before it gets a budget. A use case that fails one is not necessarily a bad idea; it is a bad first idea.",
      ],
      bullets: [
        "Volume. The task repeats often enough that a small saving each time adds up. Ask how many times a week it happens and how long each one takes. Rare tasks never repay the build, however well the AI performs them.",
        "A clear quality bar. Someone can call an output right or wrong quickly, and two experienced people would usually agree. If your best staff argue about what good looks like, AI will not settle the argument; it will inherit it.",
        "Data you already have. Past tickets, documents or emails with the correct outcome recorded, or that your team can label in days rather than months. These examples instruct the system and, more importantly, test it.",
        "A natural review point. A person can approve, correct or reject the output before it reaches a customer, a contract or a ledger, and reviewing takes far less time than doing the work.",
      ],
    },
    {
      heading: "Do the payback arithmetic in plain terms",
      paragraphs: [
        "Value per task is the time saved multiplied by what that time costs you, plus whatever faster or more consistent work earns, such as a quote that goes out the same day instead of next week. Subtract reviewer time, running cost per task and a fair share of maintenance. Multiply by volume. If the result does not clearly cover the build within a period your finance team would accept, move to the next candidate.",
        "Leave these for later: anything where an unchecked error moves money or commits you to something, open-ended customer chatbots with no approved content to answer from, forecasting built on data your team does not trust, and any process whose rules live only in one person's head.",
      ],
    },
    {
      heading: "Four strong first candidates (hypothetical examples)",
      paragraphs: [
        "The companies below are hypothetical, chosen to show how the tests apply. Your version of each will differ, which is exactly why the baseline has to come from your own work.",
        "Notice the asymmetry. Triage and extraction have the cleanest payback because the work is already counted: tickets have timestamps, invoices have line items. Knowledge search often delivers real value, but the cost it removes, a senior person's interrupted afternoon, is rarely logged. Unless you can measure that baseline, it makes a better second project than a first.",
      ],
      bullets: [
        "Support triage. A hypothetical distributor receives a steady flow of emails and WhatsApp messages about orders, returns, pricing and complaints. AI classifies each by intent and urgency, routes it, and drafts a reply from approved content; an agent approves or edits it. Measure routing accuracy against how a senior agent would have routed, and time to first response.",
        "Document extraction. A hypothetical importer keys supplier invoices into its ERP by hand. AI pulls the fields, checks them against the purchase order, and sends mismatches and low-confidence fields to a reviewer. A field is right or it is wrong, so the quality bar is unambiguous. Measure field-level accuracy, the share of documents needing no correction, and time per document.",
        "Sales follow-up drafting. A hypothetical B2B firm whose reps send follow-ups days after meetings, or not at all. AI drafts each one from the rep's notes and the CRM record; the rep edits and sends. The value is revenue protected, not just time saved. Measure time from meeting to follow-up, how much reps rewrite each draft, and reply rates against the period before.",
        "Internal knowledge search. A hypothetical professional services firm where junior staff interrupt senior people for policy details, pricing rules and past proposals. Search across the firm's own documents answers with a citation to the source passage and respects existing access permissions. Measure accuracy on a test set of questions staff have actually asked.",
      ],
    },
    {
      heading: "Build the evaluation set before the system",
      paragraphs: [
        "Whichever candidate you choose, the most useful asset in the project is an evaluation set: a fixed collection of your real past cases, each paired with the answer your best person would give. It turns \"it seems good\" into a score you can compare across versions, vendors and models.",
      ],
      bullets: [
        "Use real cases and include the awkward ones on purpose: the blurry scan, the furious customer, the request that fits two categories.",
        "Have the people who do the work today record the correct outcome. Where they disagree, settle it and write down why; that note becomes part of the system's instructions.",
        "Score by category and severity. A system that reads totals perfectly but misreads tax IDs is not a good extraction system.",
        "Treat \"not sure, sending this to a person\" as a correct outcome. A confident wrong answer is the worst one.",
        "Hold part of the set back. If prompts are tuned against every case, the score stops predicting live performance.",
        "Where you can, score today's process on the same cases. People make mistakes too; the bar is beating your current baseline at an acceptable cost, not perfection.",
      ],
    },
    {
      heading: "Run the pilot to a decision, not a demo",
      paragraphs: [
        "Before the pilot starts, put four things in writing: the baseline, the result that triggers a wider rollout, the result that ends the project, and the date of the decision meeting. Thresholds set after seeing results always move.",
        "Start in shadow mode: the system runs alongside your team on live work, and its outputs are compared rather than used. Then move to limited live use with a person reviewing every output, logging each correction as a new evaluation case. Track the full cost per task throughout, including reviewer minutes and the engineering time needed to keep it working.",
        "At the decision meeting, allow three outcomes: scale it, fix one named problem and retest once, or stop. Stopping early is a good result. You learned a use case does not pay back for the price of a pilot rather than a rollout, and your baseline and evaluation set carry over to the next candidate.",
        "Whoever runs the pilot, whether a vendor, a consultant or your own team, should answer these before it starts:",
      ],
      bullets: [
        "What does this work cost us today, and how was that measured?",
        "What is in the evaluation set, who labeled it, and are our difficult cases in it?",
        "What does the system do when it is unsure? Show me.",
        "Where does a person approve the output, and how long does that review take?",
        "What does each task cost to run at our volume, and as volume grows?",
        "Where does our data go, and is it used to train anyone else's model?",
        "What result would make you recommend we stop? Anyone who cannot answer this has not thought about your money as carefully as their build.",
      ],
    },
    {
      heading: "A second opinion before you spend",
      paragraphs: [
        "If you want this filter applied by people who build and measure these systems, that is what Publeca's AI payback review is for. Our Growth Consulting, Engineering and Analytics & Data Science teams map the repetitive work across your support, sales and operations, measure the baseline, and rank candidates by payback and risk. You get a shortlist of what to build first, what to leave alone, and the evaluation plan for the pilot, including a plain \"not yet\" if your data or processes need work first.",
      ],
    },
  ],


  cta: {
    label: "Request an AI payback review",
    message:
      "Hi Publeca, I read your article on choosing a first AI project. I'd like an AI payback review to find which work in our business is worth automating first.",
    note: "A ranked shortlist, including what to leave alone.",
  },

  seo: {
    title: "Choosing Your First AI Project by Payback",
    description:
      "How CEOs and founders choose a first AI project that pays for itself: four tests, hypothetical use cases, and a pilot built to end in a scale-or-stop decision.",
    keywords: [
      "first AI project",
      "AI payback",
      "AI ROI for business",
      "AI use cases for business",
      "AI pilot evaluation",
      "AI evaluation set",
      "AI for CEOs",
    ],
  },
};

export default post;
