import type { Service } from "../types";

const service: Service = {
  slug: "event-marketing",
  category: "events",
  name: "Event marketing",
  shortName: "Event marketing",

  who: "For event organizers, promoters and companies running ticketed events who need every seat sold, and need to know which ads are actually selling them.",
  value: "Event marketing that fills the room and shows which ads are selling the tickets",
  valueDetail:
    "You see what each ad costs per ticket sold while there's still time to act, and budget moves to the ads that are filling seats. One team runs the whole event marketing campaign, from positioning and creative to Meta and Google ads and influencers, on an event page that reports paid bookings back to Meta and Google with their ticket value, so the platforms learn who actually buys.",
  problem:
    "The venue is booked, the lineup is announced and the on-sale date is fixed. You're spending on ads, but the dashboard shows reach and clicks while the sales sheet shows a slow trickle, and nobody can tell you which ad sold a single ticket. Two weeks out, you're guessing whether to spend more or cut your losses.",

  cardSummary:
    "Fill the room with a full event campaign where every paid booking is traced back to the ad, creator or channel that sold it.",

  outcomes: [
    "A cost per ticket for every ad and audience, counted on confirmed payments rather than clicks or abandoned carts, and checked against your real ticket sales so two platforms can't both take credit for the same buyer.",
    "Meta and Google optimizing toward people who actually buy tickets, because paid bookings are reported back to them with their ticket value.",
    "Sales paced against a ticket target for each phase of the on-sale, so you know weeks out whether you're on track and what changes if you're not.",
    "A buyer audience, proven creative and clean campaign data that give your next event's on-sale a head start.",
  ],

  includes: [
    {
      title: "An on-sale plan worked back from your event date",
      body: "Positioning, audience segments, channel mix and budget split, laid out week by week across four phases: tease, launch, sustain and final call. Each phase has a job, a ticket target and a budget, agreed with you before any money is spent.",
    },
    {
      title: "Creative built to be tested",
      body: "Short-form video, key visuals, reels, countdown content and ad copy for every placement, with several hooks per phase. Budget follows the creative that sells tickets, not the one everyone liked in the review meeting.",
    },
    {
      title: "Meta and Google ads, each with a job",
      body: "Instagram and Facebook create demand and retarget people who watched a video or visited the event page. Google Search catches people already looking for something to do on that date, while YouTube and Performance Max extend reach and bring event-page visitors back. Spend shifts between them as the on-sale heats up.",
    },
    {
      title: "Influencers and partners judged on tickets",
      body: "Creators and partners chosen for whether their audience buys, not for their follower count. Each one gets their own tracked link, so you can see how many people each creator sent to the event page and how ticket sales moved after they posted, rather than the views they collected.",
    },
    {
      title: "Conversion tracking on paid bookings",
      body: "Meta Pixel, Meta Conversions API and Google Ads conversion tracking on your event page. A purchase is sent only after payment is verified, with the ticket value and order ID attached. Meta also receives it from the server, so the sale still counts when an ad blocker stops the pixel, and the shared order ID stops it being counted twice. Google Ads receives it from the buyer's browser on the confirmation page, with the order ID as the transaction ID so a page reload is never counted as a second sale.",
    },
    {
      title: "Launch management and daily optimization",
      body: "The rollout is run end to end: launches, budget shifts, creative swaps and retargeting windows. Each week you get a plain read-out of tickets sold against target, spend, cost per ticket and what changes next.",
    },
  ],

  process: [
    {
      title: "Diagnose: who buys, and what stops them",
      body: "Your event, audience, price tiers, timeline and any sales data from past editions are reviewed to establish who will buy, why, and what is holding them back today: price, awareness, trust or timing.",
    },
    {
      title: "Prioritize: plan the on-sale backward from the date",
      body: "Phases, ticket targets, channel mix and budget split are set against the event date and agreed with you, with the warmest audiences and highest-intent channels funded first.",
    },
    {
      title: "Deploy: tracking verified, then the campaign goes live",
      body: "The event page, payments and conversion tracking are checked end to end with a test booking before the first ad runs. Then creative, ads, influencers and partners roll out on the plan.",
    },
    {
      title: "Measure: cost per ticket, every day",
      body: "Budget moves daily toward the ads, audiences and creators producing confirmed sales. If sales fall behind pace, you hear it weeks before the event, together with what is being changed.",
    },
    {
      title: "Scale: the final call, then the next event",
      body: "The final-call push uses real remaining inventory, never fake countdowns. After the doors close, buyer audiences, winning creative and a campaign debrief carry straight into your next on-sale.",
    },
  ],

  forSegments: ["ceos"],

  faqs: [
    {
      q: "When should the campaign start?",
      a: "Ideally before tickets go on sale, so the tease phase can build an audience to retarget at launch. A typical campaign runs three to six weeks. If you're already on sale and behind target, the campaign starts where intent is highest, with retargeting and Google Search, and builds outward from there.",
    },
    {
      q: "Can you guarantee a sell-out?",
      a: "No one honestly can. Demand depends on the lineup, price, date and competing events as much as on the marketing. What is in our control is the mechanism: a plan with targets per phase, tracking on every paid booking, and daily budget moves toward what is selling. If sales are behind, you know weeks out, not on the night.",
    },
    {
      q: "Do we have to sell tickets through Publeca?",
      a: "No, but it's where tracking is strongest. On Publeca's checkout, the Meta purchase event is sent from our server when payment is verified, so it counts even when a browser blocks the pixel, and Google Ads receives the same purchase, with its order ID, from the confirmation page. Buyers can pay by card through PayHere or in installments through Koko or Mintpay, settled to your own merchant accounts. If you're committed to another ticketing provider, we track as far as that provider allows and tell you upfront what can and can't be measured.",
    },
    {
      q: "Can you cover the event itself as well?",
      a: "Yes. Our photography and videography team can capture the night and cut an aftermovie and reels while interest is still high. That footage becomes the proof that sells your next event.",
    },
  ],

  cta: {
    label: "Plan your event",
    message:
      "Hi Publeca, I'm planning a ticketed event and want help selling it out, with tracking that shows which ads actually sell tickets. The event is on [date], capacity is about [number], and tickets [are / aren't] on sale yet.",
    note: "Works before or after tickets go on sale.",
  },

  seo: {
    title: "Event Marketing: Sell Out With Every Ticket Tracked",
    description:
      "Event marketing that fills the room: positioning, creative, Meta and Google ads and influencers, with every paid booking tracked back to the ad that sold it.",
    keywords: [
      "event marketing",
      "event marketing agency",
      "event promotion",
      "how to sell out an event",
      "Meta ads for events",
      "Google Ads for events",
      "ticket sales conversion tracking",
      "event marketing Sri Lanka",
    ],
  },
};

export default service;
