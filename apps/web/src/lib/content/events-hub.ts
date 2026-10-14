import type { EventsHubContent } from "./types";

const eventsHub: EventsHubContent = {
  eyebrow: "Event marketing, management and ticketing in Sri Lanka",

  who: "For event organizers, promoters and brands in Sri Lanka who sell tickets, need the room full on the night, and want to know exactly which spend filled it.",
  value: "Event marketing and ticketing that fill the room, with every paid booking teaching your ads who buys",
  valueDetail:
    "Your event page, checkout and Meta and Google tracking run as one system, so a purchase is reported to the ad platforms only when payment clears, with the ticket value attached. Your ads stop chasing people who tap and start finding people who pay, which is what brings cost per ticket down as the on-sale runs.",
  problem:
    "The date is set, the venue is paid for and money is going into ads, but the numbers never line up. Meta reports clicks, the ticketing tool reports orders, and nothing connects the two, so the ad platforms keep optimizing for people who tap and never buy. Each extra ticket costs more than it should, and you only find out whether the room will be full when it is too late to change course.",

  differentiator: {
    heading: "The only place to build an event page with paid-booking conversion tracking built in",
    body: "Most ticketing tools collect the money and stop there, so your ads never learn who actually bought. On Publeca, the event page, the checkout and your Meta and Google tracking are the same system: when a buyer's payment is verified, a purchase with its ticket value goes straight to Meta and Google. The platforms learn what a ticket buyer looks like and spend your budget finding more of them, which is how cost per ticket falls while the on-sale is still running.",
    points: [
      {
        title: "A page you build yourself, tracking you paste in once",
        body: "Your photos, video, lineup, ticket tiers, assigned seating and venue map on an event page you build without a developer. Paste your Meta Pixel, Conversions API token and Google Ads conversion details into that event's settings, and tracking is live. No code, no tag manager.",
      },
      {
        title: "A purchase counts only when payment clears",
        body: "Meta and Google receive a purchase after payment is verified, carrying the ticket value and order ID. Meta also gets it from our server, so a sale still counts when an ad blocker stops the pixel, and the order ID stops it being counted twice. Abandoned checkouts never register as sales.",
      },
      {
        title: "Budget follows buyers, not clicks",
        body: "With real purchase data, Meta and Google optimize toward people who pay, and you get a true cost per ticket for every campaign, audience and creative. You know which ads to fund and which to cut while there is still time for it to matter.",
      },
    ],
  },

  // The platform's real behavior, demonstrated with sample data (playbook P3 / §9.3).
  demos: {
    heading: "Watch a ticket sale teach your ads,",
    headingDim: "while your sales figures stay real.",
    intro:
      "Shown with sample data: a purchase reaches Meta and Google only once payment is verified, and a seat held at checkout never counts as sold.",
    items: ["verified-ticket", "seat-hold"],
  },

  paths: {
    doneForYou: {
      title: "Done for you: hand over the on-sale",
      body: "One team plans the campaign backward from your event date, produces the creative, runs Meta and Google ads and creators, builds the event page and covers the night on photo and video. Each week you see tickets sold against target, spend and cost per ticket, with what changes next. On the night, you host.",
    },
    selfServe: {
      title: "Self-serve: run it on the platform",
      body: "Build the event page, set ticket tiers or assigned seating, take card payments through PayHere and installments through Koko or Mintpay into your own merchant accounts, and check guests in by scanning QR e-tickets on your phone. The conversion tracking is the same one a managed campaign uses, and the team can take over the marketing at any point.",
    },
  },

  journey: [
    {
      title: "Promote",
      body: "An on-sale plan in four phases (tease, launch, sustain, final call), each with its own ticket target and budget. Meta builds demand, Google catches people already searching for something to do, and creators are judged on the tickets their tracked links sell.",
    },
    {
      title: "Create",
      body: "Short-form video, key visuals and several hooks per phase, made to be tested against each other. Budget moves to the creative that sells tickets, not the one everyone liked in the review.",
    },
    {
      title: "Sell",
      body: "An event page with your lineup, venue map and seat picker, a checkout with card and installment options, and QR e-tickets emailed once payment is confirmed. Seats held during checkout never count as sold, so your sales figures are real, and the door scanner flags any ticket that has already been used.",
    },
    {
      title: "Capture",
      body: "A photo and video crew shooting to a list written from your next campaign: arrivals, the room filling, crowd reactions, sponsor zones. Social selects come first while attendees are still posting, then reels and the aftermovie.",
    },
    {
      title: "Grow",
      body: "A debrief on cost per ticket by ad, audience and creator. Buyer audiences, winning creative and fresh footage carry straight into your next on-sale, so it opens with people who have already bought from you instead of starting cold.",
    },
  ],

  services: ["event-marketing", "photography-videography", "ticketing-platform"],

  faqs: [
    {
      q: "Is Publeca an event management company?",
      a: "Publeca runs the selling side of event management: marketing, the event page and ticketing, assigned seating, payments, door check-in, and photo and video coverage. Venue, staging, sound and catering stay with your production team or venue, and the campaign is planned around their run of show.",
    },
    {
      q: "Do ticket payments go through Publeca's account?",
      a: "Not once your own accounts are connected. You connect your own PayHere, Koko and Mintpay merchant accounts, keep more than one per provider if you like, and choose which ones each event offers. Each payment goes to the account that takes it. Publeca's own PayHere account is available too, so you can sell before your merchant account is approved; switch it off on an event and every payment goes to your own accounts.",
    },
    {
      q: "Do I need a developer to set up conversion tracking?",
      a: "No. Paste your Meta Pixel ID, Conversions API token, and Google Ads conversion ID and label into the event's settings. From then on, every verified payment reports a purchase with its value. On a managed campaign, tracking is set up for you and checked with a test booking before any ad goes live.",
    },
    {
      q: "Can I start self-serve and hand over the marketing later?",
      a: "Yes. The team takes over on the same event page and the same tracking, so your ads keep the purchase data they have already learned from instead of starting again. You can bring the team in for one event, such as a bigger on-sale, and run the rest yourself.",
    },
    {
      q: "What kinds of events does this work for?",
      a: "Concerts, festivals, club nights, conferences, workshops, product launches and any ticketed event where seats have to be sold. Assigned seating covers venues laid out in blocks and rows, and ticket tiers cover general admission.",
    },
  ],

  cta: {
    label: "Plan your event",
    message:
      "Hi Publeca, I'm planning a ticketed event and want to sell it out, with tracking that shows which ads actually sell tickets. It's on [date], capacity is about [number], and I'd like to [hand over the marketing / run ticketing myself / talk through both].",
    note: "Works before or after tickets go on sale.",
  },

  seo: {
    title: "Event Marketing, Management & Ticketing in Sri Lanka",
    description:
      "Sell out your event in Sri Lanka: event marketing and ticketing that report paid bookings to Meta and Google, so ads find buyers and cost per ticket falls.",
    keywords: [
      "event management Sri Lanka",
      "event marketing Sri Lanka",
      "event ticketing Sri Lanka",
      "online ticketing platform Sri Lanka",
      "sell event tickets online",
      "event promotion Sri Lanka",
      "event conversion tracking",
      "QR e-tickets",
    ],
  },
};

export default eventsHub;
