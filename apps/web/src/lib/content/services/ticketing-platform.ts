import type { Service } from "../types";

const service: Service = {
  slug: "ticketing-platform",
  category: "events",
  name: "Ticketing platform",
  shortName: "Ticketing platform",

  who: "For event organizers, promoters and venues in Sri Lanka who sell their own tickets and are done matching bank-transfer slips to names, running the door off a printed list, and guessing which ads filled the room.",
  value: "Get paid directly and see which ads sell your tickets, on an event ticketing platform built for Sri Lanka",
  valueDetail:
    "Card payments through PayHere and installments through Koko and Mintpay settle into your own merchant accounts, buyers get a QR e-ticket by email the moment they pay, and your door staff check them in from their phones. Because this ticketing platform reports every paid order to Meta and Google Ads as a purchase, your campaigns learn who actually buys a ticket, not who clicks.",
  problem:
    "Tickets sell through DMs and bank transfers, someone reconciles payment screenshots against a spreadsheet late at night, and the door becomes a queue around a printed list. Move to a ticketing site and it often holds the money until after the event, keeps the buyer list, and puts its brand above yours. Either way, Meta and Google never see a ticket purchase, so your ads keep optimizing for clicks and you cannot tell which campaign paid for itself.",

  cardSummary:
    "Ticket money paid into your own merchant accounts, and Meta and Google Ads told who actually bought, all from one event page.",

  outcomes: [
    "Ticket revenue paid into your own PayHere, Koko and Mintpay merchant accounts on your own terms, instead of sitting with a ticketing site until its payout date.",
    "Premium and group tickets within reach of more buyers, who can split the price into installments with Koko or Mintpay at checkout.",
    "Ad budgets that buy tickets rather than clicks, because Meta and Google Ads receive every paid order with its value and bid toward people who actually purchase.",
    "A door that moves quickly and is hard to game: each QR ticket checks in once, and a reused, refunded or forged code is stopped at the scanner.",
  ],

  includes: [
    {
      title: "An event page that answers buyers before they ask",
      body: "A page for each event with cover images, video, a photo gallery, highlights, FAQs and a Google Map of the venue, so the questions that used to arrive in your DMs are answered before checkout. Each page carries its own title, share image and event structured data, so it previews properly when shared and is eligible for Google's event results.",
    },
    {
      title: "Card and installment payments into your accounts",
      body: "PayHere for cards, Koko and Mintpay for buy now, pay later, all running on your own merchant accounts. Connect several accounts per provider and choose which ones each event offers, so different brands, venues or co-promoters are each paid into the right account.",
    },
    {
      title: "Purchase tracking for Meta and Google Ads",
      body: "Add your Meta Pixel, Conversions API token and Google Ads conversion details per event. Once payment is confirmed, the order is sent as a purchase with its value: to Meta from both the browser and the server, merged into one conversion by the order ID, and to Google Ads with the order ID as the transaction ID.",
    },
    {
      title: "Assigned seating that cannot be oversold",
      body: "Lay out your seating plan once and buyers pick their exact seats on the event page. Seats and tickets are held only while a buyer pays and count as sold only after payment is verified, so the last seat is never sold twice and an abandoned checkout never leaves seats stuck off sale.",
    },
    {
      title: "QR e-tickets, reminders and door scanning",
      body: "Buyers are emailed a separate QR code for every ticket they buy as soon as payment is confirmed, and a reminder with a link to their tickets goes out automatically in the two days before the event. At the door, staff open the scanner in their phone's browser, with nothing to install, and every scan returns a clear result: checked in, already checked in with the time, invalid, or a ticket that belongs to another organizer.",
    },
    {
      title: "Orders, refunds, team and attendee export",
      body: "Refund an order in one step: its tickets are voided so they will not scan and its seats go back on sale, while the money is returned through your payment provider. Invite managers to run events and door staff who can only scan and view attendees, and export your attendee list to CSV whenever you need it.",
    },
  ],

  process: [
    {
      title: "Build the event page",
      body: "Sign up, add your event details and ticket types, then build the page with your images, video, gallery, highlights, FAQs and venue map. If seats are assigned, lay out the seating plan here.",
    },
    {
      title: "Connect payments and tracking",
      body: "Add your PayHere, Koko and Mintpay merchant accounts, choose which ones this event accepts, and paste in your Meta Pixel, Conversions API token and Google Ads conversion details so purchases are reported from the first sale.",
    },
    {
      title: "Go live and sell",
      body: "Publish the page and point your ads, posts and bio links at it. Buyers pay, receive their QR tickets by email immediately, and every paid order reaches Meta and Google Ads as a purchase.",
    },
    {
      title: "Run the door",
      body: "Invite your door staff, open the scanner on their phones, and check guests in. Reminder emails with ticket links have already gone out, so fewer people arrive hunting for their confirmation.",
    },
    {
      title: "Measure: carry the buyers forward",
      body: "Read cost per ticket sold in Meta Ads Manager and Google Ads, since both now see real purchases. Export the attendee list and start the next event with an audience you own and ad accounts that already know who buys.",
    },
  ],

  forSegments: ["ceos"],

  faqs: [
    {
      q: "Does the ticket money pass through Publeca first?",
      a: "Not when you connect your own merchant accounts. Payments run through your PayHere, Koko or Mintpay accounts and settle with you under your own agreements with those providers. If you have not connected PayHere yet, Publeca's platform PayHere account can be offered as a fallback so you can start selling while yours is set up.",
    },
    {
      q: "Can buyers pay for tickets in installments?",
      a: "Yes. Connect your Koko or Mintpay merchant account and enable it on the event, and buyers see buy now, pay later at checkout alongside card payment through PayHere. Approval and installment terms are handled by Koko or Mintpay, and you are paid under your agreement with them.",
    },
    {
      q: "How do you stop shared screenshots and fake tickets at the door?",
      a: "Every ticket carries its own signed QR code, which checks in once. If the same code is scanned again, the scanner shows that it was already used and when; a refunded ticket is voided and will not check in; a made-up code, or a ticket from another organizer's event, is rejected. Door staff need only a phone with a camera and their own staff login.",
    },
    {
      q: "Do I need a developer to set up the Meta Pixel and Google Ads tracking?",
      a: "No. Paste your Pixel ID, Conversions API access token, and Google Ads conversion ID and label into the event's settings. The platform reports the purchase with its value only once payment is confirmed, and uses the order ID so Meta merges the browser and server events rather than counting the sale twice. If you want the campaigns themselves run for you, that is our event marketing service.",
    },
  ],

  cta: {
    label: "Start free",
    message: "Hi Publeca, I want to set up my event on the platform.",
    href: "/signup",
  },

  seo: {
    title: "Sri Lanka Event Ticketing Platform: PayHere, Koko, Mintpay",
    description:
      "Get paid into your own PayHere, Koko and Mintpay accounts and see which ads sold each ticket. An event ticketing platform with QR tickets and door scanning.",
    keywords: [
      "event ticketing platform",
      "online ticketing Sri Lanka",
      "sell event tickets online",
      "PayHere event tickets",
      "Koko and Mintpay installments for tickets",
      "QR code e-tickets",
      "event check-in scanner",
      "Meta Pixel ticket purchase tracking",
    ],
  },
};

export default service;
