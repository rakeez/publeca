import type { Service } from "../types";

const service: Service = {
  slug: "web-development",
  category: "engineering",
  name: "Web development",
  shortName: "Web development",

  who: "For directors and founders whose website looks professional but rarely turns visitors into calls, forms or sales, and whose team can't change a page without waiting on a developer.",
  value: "A website that brings in leads and sales you can measure, not a brochure you pay to host",
  valueDetail:
    "Every page is built around one action (a call, a form, a booking, a purchase) and every one of those actions is tracked from launch day, so you can see which pages and campaigns produce revenue. It is built by our own Engineering department, with tracking set up by our Analytics & Data Science team, so the site is judged on the business it brings in, not on how it looks.",
  problem:
    "You paid for a site that looks the part, yet inquiries are rare, nobody can say which visitors became customers, and changing a headline means a ticket and a week's wait. Meanwhile your ads send paying traffic to pages that load slowly on a phone and give visitors no obvious next step.",

  cardSummary:
    "Websites and landing pages that win leads and sales you can measure: fast, found on Google, and editable by your own team.",

  outcomes: [
    "More of the visitors you already pay for become calls, form fills, bookings and orders, because every page leads to one clear next step.",
    "A clear view, from the first day the site is live, of which pages, channels and campaigns produce leads and sales.",
    "Pages Google can crawl, understand and rank, so organic search adds customers on top of paid traffic instead of starting from zero.",
    "Your team publishes pages, edits copy and launches campaign landing pages on its own schedule, without a developer in the loop.",
  ],

  includes: [
    {
      title: "Conversion architecture and copy",
      body: "Each page is mapped to the question a buyer arrives with and to one primary action. Copy is written or restructured so the offer, the reasons to trust you and the next step are clear before anyone scrolls.",
    },
    {
      title: "Speed built to Core Web Vitals",
      body: "Pages engineered against Google's Core Web Vitals on real mobile connections: compressed images, minimal JavaScript and server rendering where it matters, so visitors you paid to attract don't leave before the page appears.",
    },
    {
      title: "Conversion tracking installed before launch",
      body: "Our Analytics & Data Science team configures GA4, Google Tag Manager, server-side events, the Meta Conversions API and Google Ads enhanced conversions. Every form, call click, booking and purchase is recorded from day one, and ad platforms learn from real customers instead of page views.",
    },
    {
      title: "Technical SEO and structured data",
      body: "Clean URLs, unique titles and descriptions, an XML sitemap, deliberate internal linking and schema.org markup that matches what is on the page, so search engines and AI answers can read, trust and cite it.",
    },
    {
      title: "A CMS your team will actually use",
      body: "A content system modeled on your real content (services, products, locations, landing pages) with reusable page blocks, so marketing can publish quickly without breaking the design. Includes a hands-on handover and written guides.",
    },
    {
      title: "Accessible, maintained and owned by you",
      body: "Built against WCAG accessibility guidelines on a modern stack such as Next.js, with ongoing maintenance, security updates and uptime monitoring. The code, domain, hosting and analytics accounts sit in your company's name.",
    },
  ],

  process: [
    {
      title: "Diagnose",
      body: "Review the current site, analytics, search data and sales process to find where visitors drop off, which pages should carry the most revenue, and whether a fix beats a rebuild.",
    },
    {
      title: "Prioritize",
      body: "Agree the page map, the primary action on every page and the events to track, ranked by impact on leads and sales so the highest-value pages ship first.",
    },
    {
      title: "Build",
      body: "Design and development in short cycles on a staging site you can click through, with speed, tracking, SEO and accessibility checked before anything goes live.",
    },
    {
      title: "Measure",
      body: "Launch with every conversion event verified end to end, then a weekly plain-language read-out: which pages convert, which don't, and what changes next.",
    },
    {
      title: "Scale",
      body: "Test headlines, offers and layouts on the highest-traffic pages, add landing pages for new campaigns, and keep the site fast, secure and current.",
    },
  ],

  forSegments: ["ceos", "technical-founders"],

  faqs: [
    {
      q: "How is this different from hiring a web design agency?",
      a: "A web agency hands over a site at launch and moves on. Here the same firm that builds the site also runs the tracking, SEO and campaigns that send it traffic, so it is measured on the leads and sales it produces, and every change after launch is based on what the data shows.",
    },
    {
      q: "Will we lose our Google rankings if you rebuild the site?",
      a: "Not if the migration is planned. Before launch, every existing URL is mapped to its new address with a 301 redirect, titles and content on pages that already rank are carried over, and Search Console is checked after launch for crawl errors. Rankings are usually lost when that step is skipped.",
    },
    {
      q: "Can our team update the site without you?",
      a: "Yes, and that is a design requirement, not an extra. Your team gets a CMS with reusable page blocks, a hands-on handover and written guides. You come to us for new features and growth work, not to change a price or add a page.",
    },
    {
      q: "Who owns the website and the code?",
      a: "You do. The code repository, domain, hosting, CMS and analytics accounts are set up in your company's name from the start, so you can take the site anywhere and are never locked in.",
    },
  ],

  cta: {
    label: "Talk about your website",
    message:
      "Hi Publeca, our website isn't bringing in enough leads or sales and I'd like to understand what a site built to convert and rank would involve. Our current site is: ",
  },

  seo: {
    title: "Web Development Services Built to Convert and Rank",
    description:
      "Web development for companies that need leads and sales, not a brochure: fast, SEO-ready sites with conversion tracking built in and a CMS your team can edit.",
    keywords: [
      "web development",
      "website development company",
      "conversion-focused website",
      "landing page development",
      "Next.js development",
      "Core Web Vitals optimization",
      "SEO-ready website",
      "website with conversion tracking",
    ],
  },
};

export default service;
