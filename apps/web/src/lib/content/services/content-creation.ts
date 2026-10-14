import type { Service } from "../types";

const service: Service = {
  slug: "content-creation",
  category: "marketing",
  name: "Content creation",
  shortName: "Content creation",

  who: "For CEOs and founders who pay for a steady flow of posts, videos and articles but can't name one deal that content helped close.",
  value: "Content that answers what buyers ask before they buy, and shows up in your sales numbers",
  valueDetail:
    "Every piece starts from a question your customers already ask on sales calls, in WhatsApp threads and in reviews, so it handles objections your team currently answers by hand. Each one is tracked to the leads and sales it touches, so you know which topics and formats deserve more budget.",
  problem:
    "Content goes out every week and the engagement looks healthy. But when you ask which posts or videos helped close a deal, nobody can answer, and your sales team still explains the same points from scratch on every call.",

  cardSummary:
    "Content built from your buyers' real questions, produced in-house and judged by the leads and sales it creates, not views.",

  outcomes: [
    "Sales conversations start further along, because buyers have already seen clear answers to the questions that usually stall a deal.",
    "A plain read on which topics and formats produce leads and sales, so content budget follows revenue instead of reach.",
    "Fresh ad creative ready before performance fades, so paid campaigns aren't left running tired ads while someone waits on new assets.",
    "Case studies built from your own verified results that give a hesitant buyer proof they can check for themselves.",
  ],

  includes: [
    {
      title: "Question-led content strategy",
      body: "Sales-call notes, support tickets, WhatsApp threads, reviews and search data, mined for the questions buyers ask before they commit. Each question is mapped to a piece of content and the stage of the sale it unblocks.",
    },
    {
      title: "Short-form video",
      body: "Reels, TikToks and YouTube Shorts, each scripted around one buyer question or objection, then shot, edited and cut for every platform's format in-house.",
    },
    {
      title: "Photography and on-location shoots",
      body: "Product, team and location photography from the same photo and video crews that cover events for our events arm. Shot lists are planned around where every image will run: ads, the website, proposals and sales decks.",
    },
    {
      title: "Articles and buyer guides",
      body: "Long-form answers to what buyers search for before choosing a supplier, drafted with your subject-matter experts and coordinated with our SEO and AEO/GEO work, so each piece aims to be the clearest, most complete answer to its question.",
    },
    {
      title: "Ad creative in testable batches",
      body: "Static, carousel and video variations for Meta, TikTok, LinkedIn and Google, produced in sets with different hooks so the paid media team can test, keep the winners and retire the rest on a schedule.",
    },
    {
      title: "Case studies from your real results",
      body: "Customer interviews, footage and write-ups built only from outcomes you can verify in your own analytics, CRM or a customer's words on record. Never invented, never rounded up, and packaged for the website, sales follow-ups and ads.",
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Audit what you have already published against your sales data, and collect the questions buyers ask at each stage, from first search to signed contract.",
    },
    {
      title: "Prioritize",
      body: "Rank topics by how close they sit to a buying decision and how often they come up, then agree a 90-day content plan tied to specific stages of your pipeline.",
    },
    {
      title: "Produce",
      body: "Writers, editors, photographers and video crews from our Marketing & Brand team and events arm produce each piece. Your experts review for accuracy instead of rewriting from scratch.",
    },
    {
      title: "Measure",
      body: "Our Analytics & Data Science team tags and tracks every piece, so you see the leads, sales and assisted conversions it touches, explained in a plain-language read-out every week.",
    },
    {
      title: "Scale",
      body: "Topics and formats that move pipeline get more budget and are repurposed into ads, email and sales material. The ones that don't are cut.",
    },
  ],

  forSegments: ["ceos", "technical-founders"],

  faqs: [
    {
      q: "How can content be measured by sales when most buyers never click straight through?",
      a: "With tracked links, tagged distribution, source fields in your CRM and assisted-conversion reporting set up by our Analytics & Data Science team. Not every touch can be attributed perfectly, so directly tracked sales are reported separately from assisted ones, and any gaps in the data are stated plainly rather than filled with estimates.",
    },
    {
      q: "Do I have to be on camera?",
      a: "No. Some formats work better with a founder or expert on screen, and we will say when that is the case. Product footage, customer stories, explainers and written guides don't need you at all. When you do appear, sessions are scripted and batched so they take as little of your time as possible.",
    },
    {
      q: "What if we don't have many results to build case studies from yet?",
      a: "Case studies are built only from results you can verify, so none are written until the proof exists. In the meantime, tracking and a customer-interview routine are set up so that evidence is captured as it happens, and explainers and product demonstrations carry the load until then.",
    },
    {
      q: "How is this different from hiring a content agency or a freelancer?",
      a: "An agency or freelancer is usually briefed on topics and judged on volume. Here, topics come from your sales conversations, production sits alongside the paid media, SEO and analytics teams that use the content, and every piece is judged on the pipeline it moves. Formats that don't contribute are dropped.",
    },
  ],

  cta: {
    label: "Plan content that sells",
    message:
      "Hi Publeca, we publish content regularly but can't tell which of it actually helps us sell. I'd like to talk about content creation built from our customers' questions and measured by sales.",
  },

  seo: {
    title: "Content Creation Services Measured by Sales, Not Views",
    description:
      "Content creation built from your buyers' real questions: video, photography, articles and ad creative produced in-house and measured by leads and sales.",
    keywords: [
      "content creation services",
      "content marketing Sri Lanka",
      "content strategy",
      "short-form video production",
      "ad creative production",
      "case study production",
      "content marketing ROI",
    ],
  },
};

export default service;
