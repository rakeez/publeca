import type { Service } from "../types";

const service: Service = {
  slug: "software-development",
  category: "engineering",
  name: "Software development",
  shortName: "Software development",

  who: "For directors, CEOs and founders whose next stage of growth is waiting on software: a customer portal, an internal tool, an integration or a checkout that off-the-shelf products never quite get right.",
  value: "Custom software that clears the systems bottleneck on your growth, with code you fully own",
  valueDetail:
    "The process your team runs on spreadsheets, the portal customers keep asking for, the integration that ends double entry: built by our own Engineering department in small releases your team starts using as each one lands. The code, the data and the accounts it runs on are yours, so the software is an asset you control, not a dependency on a vendor.",
  problem:
    "You can see the demand, but your systems can't carry it. Orders get re-keyed from WhatsApp into a spreadsheet, customers message to ask where their booking is, and the off-the-shelf tool almost fits, so the team works around it every day. The last developer left code nobody else wants to touch, and every new idea starts with \"we'd need to build something for that.\"",

  cardSummary:
    "Clear the systems bottleneck on your growth: portals, internal tools and integrations, built in small releases and owned by you.",

  outcomes: [
    "The manual work that caps how much you can sell (re-keying, chasing, reconciling) handled by software, so volume grows without headcount growing in step.",
    "Customers who can buy, pay, book and check their status on their own, at any hour, without waiting on your team.",
    "One version of the truth across orders, payments, stock and customers, so reports agree and decisions stop waiting on reconciliation.",
    "Code, data, cloud accounts and documentation in your company's name, so you can change developers, raise money or sell the business without asking anyone's permission.",
  ],

  includes: [
    {
      title: "Customer portals and web apps",
      body: "Self-serve ordering, bookings, accounts and status pages that take routine requests off your team. It is the kind of software we run in production ourselves: the Publeca events platform gives organizers custom event pages, QR e-tickets and assigned-seat maps their buyers pick from.",
    },
    {
      title: "Internal tools",
      body: "Admin dashboards, approval flows and operations screens shaped around how your team actually works, replacing the spreadsheet chains and copy-paste that slow every order down.",
    },
    {
      title: "Integrations and APIs",
      body: "Connections between your CRM, accounting, inventory, ad platforms and any system with an API, so data is entered once and lands everywhere it is needed.",
    },
    {
      title: "Payments and checkout",
      body: "Local gateways, buy-now-pay-later and order flows that confirm a sale only when the payment provider does. Our own platform runs PayHere and BNPL on each organizer's own merchant accounts and verifies every payment against the exact account that took it.",
    },
    {
      title: "Tools for the front line",
      body: "Apps for the people who are not at a desk: on the door, in the warehouse, on the road. The scanning app event teams use to check QR tickets at the entrance is one we built and run.",
    },
    {
      title: "Tracking built in from the first release",
      body: "Server-side conversion tracking set up with our Analytics & Data Science team, so you can see what the software does for revenue. Our events platform already works this way for organizers: only payments the provider has confirmed are reported, to Meta through its server-side Conversions API and to Google Ads as a purchase conversion, so both learn which buyers actually paid.",
    },
  ],

  process: [
    {
      title: "Diagnose the bottleneck",
      body: "Map the process the software has to carry, find where time and revenue leak, and decide what to build, what to buy and what to leave alone. Sometimes the honest answer is an existing product, configured properly.",
    },
    {
      title: "Prioritize the first release",
      body: "Rank features by business impact and agree the smallest release that removes the biggest constraint, with a written scope and acceptance criteria before any code is written.",
    },
    {
      title: "Build in small, shippable increments",
      body: "Our Engineering department builds in short cycles, and each increment goes to a live environment you can click through. You judge working software, not status reports.",
    },
    {
      title: "Launch and measure",
      body: "Release with monitoring, error alerts and conversion tracking in place, train the people who will use it, and watch the numbers that justified the build in the first place.",
    },
    {
      title: "Support and scale",
      body: "Fix, maintain and extend after launch, or hand over to your own team with documentation, full access and a walkthrough of the code.",
    },
  ],

  forSegments: ["ceos", "technical-founders"],

  faqs: [
    {
      q: "Do we own the code?",
      a: "Yes. The source code, database, cloud and domain accounts, and documentation sit in your company's name. You can bring in another developer or build an in-house team at any point, and the handover includes access, documentation and a walkthrough.",
    },
    {
      q: "I'm not technical. How will I know the project is on track?",
      a: "You will see working software, not percentages. Every increment goes to a live test environment you can use yourself, and each update is written in plain language: what shipped, what it changes for the business, what comes next and what we need from you.",
    },
    {
      q: "Should we build custom software or buy an off-the-shelf product?",
      a: "Buy whenever a product fits your process well enough; it is usually cheaper to run. Build when the process is how you win customers, when the workaround costs more than the software would, or when your systems need to talk to each other in ways no product supports. The Diagnose step answers this before anything is built.",
    },
    {
      q: "Can you work with our existing systems and developers?",
      a: "Yes. Often the right first move is inside the stack you already have: we read the code, document what is there, and either extend it or integrate around it. If you already have developers, our engineers work alongside them and leave the codebase easier for them to maintain.",
    },
  ],

  cta: {
    label: "Talk through your bottleneck",
    message:
      "Hi Publeca, I'm interested in custom software development. There's a process in our business that's slowing growth down, and I'd like to talk through whether it's worth building something for it.",
    note: "Describe the bottleneck. You'll get a straight answer on whether to build, buy or leave it.",
  },

  seo: {
    title: "Custom Software Development for Growing Companies",
    description:
      "Clear the systems bottleneck on your growth. Custom software development for portals, internal tools, integrations and payments, in small releases you own.",
    keywords: [
      "custom software development",
      "software development company Sri Lanka",
      "custom web application development",
      "internal tools development",
      "customer portal development",
      "API integration services",
      "payment gateway integration",
      "PayHere integration",
    ],
  },
};

export default service;
