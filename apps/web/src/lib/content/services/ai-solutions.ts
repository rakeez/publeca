import type { Service } from "../types";

const service: Service = {
  slug: "ai-solutions",
  category: "engineering",
  name: "AI solutions",
  shortName: "AI solutions",

  who: "For CEOs, directors and founders who have heard plenty about AI but still have skilled people retyping documents, answering the same customer questions and chasing the same follow-ups by hand.",
  value: "AI solutions that take hours and cost out of your business, measured against today's baseline",
  valueDetail:
    "Every build starts from work your team already repeats, with its current cost and response time measured first, so payback is a number you can check rather than a promise. Our own Engineering and Analytics & Data Science departments build it, test it against your real cases before launch, and keep a person in the loop wherever a mistake would be expensive.",
  problem:
    "You've seen the demos and maybe paid for a pilot. It impressed everyone in the meeting, then never made it into daily work. Or it did, and now nobody can say whether it saves money, how often it gets things wrong, or where the customer data you fed it ended up.",

  cardSummary:
    "Measurable hours and cost out of support, sales and back-office work, with AI that is tested, monitored and reviewed by people.",

  outcomes: [
    "Customers get answers drawn from your approved content in minutes, at any hour, and complex or sensitive cases reach a person with the conversation already summarized.",
    "Invoices, forms, contracts and applications arrive in your systems as clean, validated data, without anyone retyping them.",
    "Staff find the right policy, price or past answer in seconds, with a link to the source document so they can check it before they use it.",
    "A monthly report of hours saved, error rate and AI running cost against the original baseline, so you know whether to scale a use case or switch it off.",
  ],

  includes: [
    {
      title: "Payback assessment",
      body: "A map of the repetitive work across support, sales and operations, with time and cost measured for each task and use cases ranked by payback and risk. It names the ones worth building and the ones to leave alone, with the reasoning for both.",
    },
    {
      title: "Customer support and sales assistants",
      body: "Assistants on your website, WhatsApp or inbox that answer from your approved content, qualify leads, book appointments and hand off to your team with full context. They are built and tested to say when the answer isn't in your content and pass the question to a person, rather than guess.",
    },
    {
      title: "Document and data extraction",
      body: "Pipelines that read invoices, purchase orders, IDs, contracts and forms, pull out the fields you need, check them against your business rules and write them into your ERP, CRM or spreadsheets. Low-confidence fields go to a reviewer, not straight into your records.",
    },
    {
      title: "Knowledge search over your own documents",
      body: "Retrieval-augmented search across your policies, product documentation, contracts and past tickets. It respects existing access permissions, and every answer cites the passage it came from so staff can verify it in one click.",
    },
    {
      title: "Workflow automation and agents with human review",
      body: "Multi-step automations that triage requests, draft replies, update records and trigger follow-ups across the tools you already use. An approval step sits wherever an action moves money, changes a customer record or speaks for your brand.",
    },
    {
      title: "AI features inside your product",
      body: "Summaries, smart search, classification, recommendations or in-app copilots built into your software, shipped with an evaluation suite, usage limits and per-feature cost tracking so margins hold as usage grows.",
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Sit with the people doing the work, time the tasks, and sample real documents, tickets and conversations. Today's cost, error rate and response time become the baseline the AI is judged against.",
    },
    {
      title: "Prioritize",
      body: "Rank use cases by payback, risk and effort, then agree the first one to build, the numbers that define success, which data the AI may touch, and where a person must approve its output.",
    },
    {
      title: "Build and evaluate",
      body: "Engineering builds; Data Science assembles an evaluation set from your real cases and tests accuracy, failure modes and edge cases. Nothing goes live until it beats the baseline on that set.",
    },
    {
      title: "Measure",
      body: "Launch to a limited group with full logging, human review queues and cost monitoring per task. Weekly read-outs in plain language: hours saved, errors caught, cost per task.",
    },
    {
      title: "Scale",
      body: "Extend what pays back to more volume, channels or teams, retire what doesn't, and keep prompts, models and evaluations maintained as your data and the underlying AI models change.",
    },
  ],

  forSegments: ["ceos", "technical-founders"],

  faqs: [
    {
      q: "Where should a company like ours start with AI?",
      a: "With work that is high-volume, repetitive and easy to measure: answering common customer questions, extracting data from documents, routing and drafting replies. Those use cases have a clear baseline, so payback can be checked against real numbers after launch. Starting with a broad AI strategy or a fully autonomous agent usually produces a demo, not savings.",
    },
    {
      q: "What happens when the AI gets something wrong?",
      a: "It will, occasionally, so the system is designed for it. Before launch it is tested against an evaluation set built from your own cases, so you know its error rate and the kinds of mistakes it makes. In production, low-confidence outputs go to a person, actions that move money or change records need approval, and every output is logged so errors can be traced and fixed.",
    },
    {
      q: "What happens to our data and our customers' data?",
      a: "It is used only to run your system. We use business-grade model APIs whose terms exclude training on your data, keep personal data out of prompts where it isn't needed, apply your existing access permissions to search, and log what the AI saw and did. Where data cannot leave your environment, we deploy inside your own cloud account or use models that run on your infrastructure.",
    },
    {
      q: "How do we know it is paying for itself?",
      a: "Because the baseline is measured before anything is built. After launch, the monthly report compares hours, response times and error rates against that baseline and shows the running cost per task. If a use case doesn't pay back, the recommendation is to scale it down or switch it off, not to add more AI.",
    },
  ],

  cta: {
    label: "Find where AI pays back",
    message:
      "Hi Publeca, I'd like to find out where AI could save our team real time and cost. Could we talk through the work we repeat most and whether it's worth automating?",
    note: "If AI isn't the right fix, you'll hear that first.",
  },

  seo: {
    title: "AI Solutions for Business: Automation That Pays Back",
    description:
      "AI solutions that take measurable hours and cost out of support, sales and operations: assistants, document extraction and automation, tested before launch.",
    keywords: [
      "AI solutions for business",
      "AI automation",
      "AI customer support assistant",
      "document data extraction",
      "retrieval-augmented generation",
      "AI agents with human review",
      "AI workflow automation",
      "AI development company",
    ],
  },
};

export default service;
