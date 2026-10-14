import type { Service } from "../types";

const service: Service = {
  slug: "aeo-geo",
  category: "marketing",
  name: "AEO & GEO (AI search optimization)",
  shortName: "AEO / GEO",

  who: "For founders and CEOs whose buyers now ask Google's AI Overviews, AI Mode and AI assistants for a shortlist, and who want their company in that answer without paying for tricks.",
  value:
    "Become a source AI answers draw on when buyers research your category, without the gimmicks",
  valueDetail:
    "Your key pages become indexed, crawlable and worth citing in Google's AI Overviews and AI Mode, which run on the same ranking and quality systems as Google Search. Your budget goes only to the expert content and technical fixes that move visibility, and you judge the result in your own Search Console data, not in a vendor's score.",
  problem:
    "Buyers ask AI which firm to call and another name comes back. Meanwhile your inbox fills with offers for llms.txt files, AI rewrites and \"AI visibility scores\", and you have no way to tell which of them would make any difference.",

  cardSummary:
    "Be a source Google's AI Overviews and AI assistants can find and cite, through expert content and sound technicals, not gimmicks.",

  outcomes: [
    "Every page you want found is indexed, crawlable and eligible to be shown with a snippet, the baseline Google requires before a page can appear in AI Overviews or AI Mode.",
    "Content that gives an AI answer a reason to cite you: first-hand expertise on the questions your buyers ask, which a competitor cannot copy from the same sources.",
    "Spend that goes only to work that moves visibility, with every gimmick you are being pitched named and ruled out in writing.",
    "Visibility you can verify in your own Search Console data and analytics, including the visits and enquiries AI answers send you, instead of a third-party score.",
  ],

  includes: [
    {
      title: "AI search eligibility audit",
      body: "A page-by-page check against what Google requires for its AI features: indexed, eligible for a snippet, publicly accessible, crawlable, and rendering its content properly when JavaScript is involved. Robots rules and CDN or firewall settings that silently block AI assistants' crawlers are checked too. You get a ranked list of blockers, each with its fix.",
    },
    {
      title: "Technical foundation fixes",
      body: "Our engineering team fixes what the audit finds: crawl paths, page speed, mobile responsiveness, canonical URLs, rendering, and structured data where it earns rich results. Clean, semantic HTML also matters for agentic browsing, which may read the rendered page, the DOM and the accessibility tree.",
    },
    {
      title: "Buyer question map",
      body: "The questions buyers put to Google and AI assistants at each stage of a purchase, checked against the answers they get today and the sources those answers lean on. It shows where your expertise fills a real gap and where another generic article would add nothing.",
    },
    {
      title: "Expert, non-commodity content",
      body: "Pages built from what only your company knows: your data, your process, the trade-offs your experts explain to customers every week, with original images and video where they show more than text can. Written for people in your experts' words. No rewriting for AI, no chopping pages into fragments.",
    },
    {
      title: "Consistent facts about your company",
      body: "Your name, offer, locations and areas of expertise stated the same way across your site, Google Business Profile and the listings your industry relies on, so anyone or any system reading about you gets one coherent story. Mentions are earned with work worth referencing, never bought or planted.",
    },
    {
      title: "Search Console and AI referral reporting",
      body: "Plain-language read-outs from your own Search Console data, including Google's reporting on generative AI features, plus visits and conversions from AI assistants tracked by our analytics and data science team wherever the referral is passed. Each read-out says what moved, why, and what comes next.",
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Audit eligibility and technical health, then map the questions your buyers ask and who gets cited for them today.",
    },
    {
      title: "Prioritize",
      body: "Rank fixes and content by their link to revenue-relevant questions and the effort involved. Gimmicks are listed and ruled out, so you know exactly what you are not paying for.",
    },
    {
      title: "Deploy",
      body: "Engineering fixes the foundation while a strategist works with your subject experts to publish content only your company can write.",
    },
    {
      title: "Measure",
      body: "Track indexing, Search Console performance including generative AI reporting, and AI-referred visits and enquiries in analytics, read out in plain language.",
    },
    {
      title: "Scale",
      body: "Put more into the topics and formats that earn visibility and enquiries, extend into adjacent buyer questions, and keep technical health from slipping as the site grows.",
    },
  ],

  forSegments: ["ceos", "technical-founders"],

  faqs: [
    {
      q: "Do we need an llms.txt file or AI-specific pages to appear in Google's AI Overviews?",
      a: "No. Google says llms.txt files and AI-specific text or markdown versions are not needed for Google Search, where they neither help nor hurt. It also says there is no need to break content into small chunks, write specially for AI, or add special schema markup for AI. What it does require is a page that is indexed and eligible for a snippet, with content worth showing. That is where your budget goes.",
    },
    {
      q: "Can you guarantee we will be cited in AI answers?",
      a: "No, and be wary of anyone who does. Google states that inclusion in its AI features is never guaranteed, and it warns against third-party tools that claim to use internal Google metrics. What can be done is to remove every technical reason you would be excluded, publish content that deserves to be cited, and measure the effect in Search Console.",
    },
    {
      q: "Is AEO/GEO different from SEO, or the same thing with a new name?",
      a: "Mostly the same foundation. Google's AI Overviews and AI Mode rely on its existing ranking and quality systems, retrieving pages and running related searches (query fan-out) to build an answer, so SEO fundamentals still apply. The difference is emphasis: Google's guidance points to unique, non-commodity, expert content, so that is where most of the effort goes, and the same work strengthens your regular search results.",
    },
    {
      q: "What about ChatGPT, Perplexity and other AI assistants?",
      a: "Their internals are not public, so nobody can honestly promise a method for each one. They generally draw on web search indexes and on pages their crawlers can access, so the same foundation applies: accessible, well-built pages and expert content worth citing. On top of that, your robots rules and firewall settings are checked so they are not blocking those crawlers by accident, and the answers they give to your buyers' key questions are spot-checked.",
    },
  ],

  cta: {
    label: "Check my AI search visibility",
    message:
      "Hi Publeca, I'd like to understand how my business shows up in Google's AI Overviews and AI assistants, and which fixes would actually make a difference. My website is: ",
    note: "Straight answers on what works, and what to stop paying for.",
  },

  seo: {
    title: "AEO & GEO Services: AI Search Optimization, No Gimmicks",
    description:
      "Get found in Google AI Overviews, AI Mode and AI assistants with AEO & GEO built on what Google says works: expert content and sound technical SEO. No gimmicks.",
    keywords: [
      "AEO and GEO services",
      "answer engine optimization",
      "generative engine optimization",
      "AI search optimization",
      "Google AI Overviews optimization",
      "AI Mode visibility",
      "AI assistant visibility",
      "LLM visibility",
    ],
  },
};

export default service;
