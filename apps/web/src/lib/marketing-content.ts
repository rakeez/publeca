// Content for service pages and the blog. Data-driven so pages stay consistent.

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  includes: { title: string; body: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "event-marketing",
    name: "Event marketing & awareness",
    tagline: "From idea to sold out.",
    summary:
      "We build the whole go-to-market for your event — positioning, audience, campaign plan, and the creative to make people care. You focus on the show; we fill the room.",
    outcomes: [
      "A clear campaign plan with targets and timeline",
      "Audience research and messaging that converts",
      "Coordinated rollout across ads, social and influencers",
    ],
    includes: [
      { title: "Campaign strategy", body: "Positioning, audience segments, channel mix and a week-by-week plan to your on-sale and event date." },
      { title: "Funnel build", body: "Awareness to ticket purchase, wired with tracking so every rupee is measured." },
      { title: "Launch management", body: "We run the rollout end to end and report on what's working in real time." },
    ],
  },
  {
    slug: "paid-ads",
    name: "Meta & Google ads",
    tagline: "Performance ads that sell tickets.",
    summary:
      "We plan, launch and optimize Meta and Google campaigns built specifically for ticket sales — with proper conversion tracking so spend maps to seats, not just clicks.",
    outcomes: [
      "Lower cost per ticket through constant optimization",
      "Server-side conversion tracking that survives ad-blockers",
      "Transparent reporting on spend, reach and sales",
    ],
    includes: [
      { title: "Meta ads", body: "Instagram and Facebook campaigns — prospecting, retargeting and lookalikes tuned to your buyer." },
      { title: "Google ads", body: "Search, Performance Max and YouTube to catch intent and extend reach." },
      { title: "Conversion tracking", body: "Pixel, CAPI and Google conversions installed per event — paid buyers tracked accurately." },
    ],
  },
  {
    slug: "creative-content",
    name: "Creative & content",
    tagline: "Scroll-stopping creative.",
    summary:
      "Ad creatives, reels, key visuals and copy designed to stop the scroll and drive action — produced fast and tested so the best performers get the budget.",
    outcomes: [
      "A library of ad-ready creative in every format",
      "On-brand key visuals and motion graphics",
      "Copy and hooks written to convert, not just look good",
    ],
    includes: [
      { title: "Ad creatives", body: "Static and video ads in all placements, built for testing and iteration." },
      { title: "Social content", body: "Reels, stories and countdown content to build momentum to your on-sale." },
      { title: "Key visuals & copy", body: "A cohesive look and message across every touchpoint." },
    ],
  },
  {
    slug: "photography-videography",
    name: "Photography & videography",
    tagline: "Capture the night, fuel the next one.",
    summary:
      "On-the-ground photo and video coverage of your event — plus aftermovies and highlight reels that become the marketing engine for your next one.",
    outcomes: [
      "Professional coverage of your event, delivered fast",
      "Aftermovie and reels ready for the next campaign",
      "A growing content bank you own",
    ],
    includes: [
      { title: "Event coverage", body: "Photographers and videographers capturing the crowd, the moments and the brand." },
      { title: "Aftermovie & reels", body: "Edited highlights turned around quickly while the buzz is hot." },
      { title: "Content for next time", body: "Real proof that powers the ads for your next event." },
    ],
  },
  {
    slug: "ticketing-platform",
    name: "Ticketing platform",
    tagline: "Do it yourself, in minutes.",
    summary:
      "Prefer to run it yourself? Publeca's platform gives you customizable event pages, local payments and BNPL, QR e-tickets, door check-in and conversion tracking — all self-serve.",
    outcomes: [
      "Live in minutes with your own event page",
      "Local payments (PayHere) and BNPL (Koko, Mintpay)",
      "QR tickets, door scanning and live attendee stats",
    ],
    includes: [
      { title: "Custom event pages", body: "Your images, video and copy on a page built to convert — no developer needed." },
      { title: "Payments & BNPL", body: "Connect your own merchant accounts; buyers pay by card or in installments." },
      { title: "Tickets & check-in", body: "QR e-tickets by email and a phone scanner to check guests in at the door." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMins: number;
  author: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "sell-out-your-event-sri-lanka",
    title: "How to sell out your event in Sri Lanka",
    excerpt:
      "A practical playbook for filling the room — from your on-sale plan to the ads, creative and retargeting that actually move tickets.",
    date: "2026-05-12",
    readingMins: 6,
    author: "Publeca",
    body: [
      {
        paragraphs: [
          "Selling out isn't luck — it's a funnel. The events that fill up reliably treat marketing as a system that starts weeks before doors open, not a burst of posts the day of on-sale.",
        ],
      },
      {
        heading: "Start with the on-sale, work backwards",
        paragraphs: [
          "Pick your event date, then your on-sale date, then plan the awareness and retargeting windows before it. A typical timeline runs three to six weeks: tease, launch, sustain, and a final-call push.",
          "Every phase has a job. Tease builds an audience you can retarget. Launch converts the warmest buyers. Sustain keeps momentum with fresh creative. Final-call uses scarcity honestly — real remaining inventory, not fake countdowns.",
        ],
      },
      {
        heading: "Spend where intent is",
        paragraphs: [
          "Meta is where you create demand — short video that stops the scroll and gets shared. Google captures the demand you've created, plus people already searching for things to do.",
          "The mistake is treating them as either/or. Run Meta to build the audience and Google to catch them at the moment of intent.",
        ],
      },
      {
        heading: "Measure tickets, not clicks",
        paragraphs: [
          "Install conversion tracking per event — pixel and server-side — so you know your true cost per ticket, not just your cost per click. That single number tells you where to move budget, every day.",
        ],
      },
    ],
  },
  {
    slug: "meta-vs-google-ads-for-events",
    title: "Meta vs Google ads for events: where to spend first",
    excerpt:
      "They do different jobs. Here's how we split budget between demand creation and demand capture for ticketed events.",
    date: "2026-04-03",
    readingMins: 5,
    author: "Publeca",
    body: [
      {
        paragraphs: [
          "The most common question we get from organizers: should I put my budget on Meta or Google? The honest answer is both — but in a specific order and for specific jobs.",
        ],
      },
      {
        heading: "Meta creates demand",
        paragraphs: [
          "Most people don't wake up searching for your event — they don't know it exists yet. Meta's strength is putting a compelling 6–15 second video in front of the right audience and making them want to go.",
          "It's also where retargeting lives: everyone who watched your video or visited your page becomes an audience you can bring back cheaply.",
        ],
      },
      {
        heading: "Google captures demand",
        paragraphs: [
          "Once people know about your event — or are searching for 'things to do this weekend' — Google catches that intent. Search and Performance Max convert warm and in-market audiences at a strong cost per ticket.",
        ],
      },
      {
        heading: "How we usually split it",
        paragraphs: [
          "For a typical event we start weighted toward Meta to build the audience, then shift budget to Google and retargeting as the on-sale heats up. The exact split depends on your price point, audience and timeline — which is what the campaign plan is for.",
        ],
      },
    ],
  },
  {
    slug: "bnpl-event-tickets-sri-lanka",
    title: "BNPL is changing how Sri Lanka buys event tickets",
    excerpt:
      "Buy-now-pay-later options like Koko and Mintpay are lifting conversion on higher-priced tickets. Here's what organizers should know.",
    date: "2026-02-18",
    readingMins: 4,
    author: "Publeca",
    body: [
      {
        paragraphs: [
          "For premium and VIP tickets, price is the biggest drop-off point at checkout. Buy-now-pay-later changes that maths by splitting the cost into installments — and we're seeing it lift conversion meaningfully.",
        ],
      },
      {
        heading: "Why it works for events",
        paragraphs: [
          "Event tickets are an emotional, time-bound purchase. When a buyer can say yes now and spread the cost, fewer carts are abandoned at the final step — especially for higher tiers.",
        ],
      },
      {
        heading: "Offer it without the hassle",
        paragraphs: [
          "With Publeca you connect your own Koko and Mintpay merchant accounts, and buyers simply choose how to pay at checkout. Funds settle to you; the buyer gets flexibility. It's a small change that removes a real barrier.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
