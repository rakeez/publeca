import type { Post } from "../types";

const post: Post = {
  slug: "conversion-tracking-for-engineers",
  title: "Conversion tracking for engineers: an event model you won't have to rebuild",
  who: "For technical founders and engineering leads who own the tracking code and want it to hold up when the second ad platform, the mobile app and the consent banner arrive.",
  value:
    "A conversion tracking architecture you build once and extend by mapping: revenue-first events emitted by the server, deduplicated by an ID from the business record, and checked like production code.",
  excerpt:
    "Emit money events once from the server, deduplicate with an ID taken from the order, map to each platform, and test it like payments code.",
  date: "2026-10-12",
  readingMins: 6,
  author: "Publeca",
  audience: ["technical-founders"],

  body: [
    {
      paragraphs: [
        "Tracking survives new ad platforms, a mobile app and a privacy change when it follows one rule: every event that moves money is emitted once, by the system that knows it happened, with an ID derived from the business record, then fanned out to GA4, Meta, Google Ads and anything else through a thin mapping layer. Browser tags still matter, but their job shrinks to collecting identifiers and consent. They stop deciding what counts as a sale.",
        "Three early decisions carry the design: canonical event names, deterministic event IDs, and identifiers captured at the edge. Get those right and adding a destination later is a mapping change, not a rebuild.",
      ],
    },
    {
      heading: "Design the taxonomy around money, not clicks",
      paragraphs: [
        "Most tracking plans start in the tag manager and end up as a list of whatever was easy to fire. Start from the revenue model and work backward. Give every event one canonical internal name in one style (subscription_renewed, not a mix of RenewSub and renewal-complete) and a required property set: event ID, timestamp, internal user ID, anonymous or device ID, platform and app version, consent state, and value and currency wherever money is involved. Keep that spec as types in the codebase, not a spreadsheet, so a missing property fails the build instead of quietly degrading a campaign. Platform vocabulary such as GA4's purchase or Meta's Purchase belongs in the mapping layer, never in domain code.",
        "Then sort events into three tiers, because each has a different emitter and different destinations:",
      ],
      bullets: [
        "Revenue events (purchase, renewal, upgrade, refund): emitted by the backend from the system of record, sent to analytics and to ad platforms as the conversions they bid on.",
        "Funnel milestones (account created, trial started, lead qualified): emitted server-side where the state changes, sent to analytics and selectively to ad platforms as secondary signals.",
        "Product behavior (feature used, screen viewed): emitted client-side to analytics only. To a bidding algorithm it is noise.",
      ],
    },
    {
      heading: "Let the server decide, let the browser collect",
      paragraphs: [
        "The thank-you page is a weak source of truth. It can fire again on refresh, misses buyers who close the tab before the redirect, and is blocked by some browsers and extensions. The backend should emit the purchase at the moment payment is verified, usually on the payment provider's webhook.",
        "A server event is only useful if the platform can match it to a person and a click. Meta's Conversions API matches on email and phone, normalized and SHA-256 hashed, plus browser identifiers. Google Ads enhanced conversions apply the same idea: hashed first-party data such as email travels with the conversion. GA4's Measurement Protocol accepts server events too, but Google positions it as a supplement to on-page tagging, so keep the GA4 tag for sessions and acquisition.",
        "That leaves the browser a narrow, essential job: capture the identifiers only it can see and store them with the user or order, so the server can send them later.",
      ],
      bullets: [
        "Google click IDs from the landing URL: gclid, plus gbraid and wbraid, which can appear on iOS traffic.",
        "Meta's _fbp cookie and the _fbc value derived from fbclid, plus client IP address and user agent.",
        "The GA4 client ID from the _ga cookie, which the Measurement Protocol needs to attach a server event to the right user and session.",
        "The consent choices in force when those identifiers were collected.",
      ],
    },
    {
      heading: "Deduplicate with one ID, chosen before anything fires",
      paragraphs: [
        "Once browser and server both report a purchase, deduplication decides whether your numbers mean anything. Each platform keys it on a field you control. Meta merges a pixel event and a Conversions API event that share the same event name and event ID. Google Ads treats repeat conversions with the same transaction ID for a conversion action as duplicates. GA4's purchase event carries a transaction ID for the same purpose.",
        "The common mistake is generating that ID at fire time, with a fresh random UUID in each place. Derive it from the business record: the order ID for a purchase, subscription ID plus billing period for a renewal, a lead ID created before the form submits. Render it into the confirmation page for the browser tag and read it from the database on the server. Retries become harmless, because a resent event carries the same ID.",
        "Below is a hypothetical mapping for a subscription product with a free trial. Adding TikTok or LinkedIn later means one more mapping per event; nothing upstream changes.",
      ],
      bullets: [
        "account_created maps to GA4 sign_up, Meta CompleteRegistration, and a secondary Google Ads conversion that is observed but not bid on.",
        "trial_started maps to a GA4 custom event, Meta StartTrial, and another secondary Google Ads conversion.",
        "subscription_paid maps to GA4 purchase, Meta Purchase and a primary Google Ads conversion, each carrying the invoice ID as its transaction or event ID, with value and currency.",
      ],
    },
    {
      heading: "Apps: Firebase for behavior, an MMP for installs",
      paragraphs: [
        "In an app the model holds and the plumbing changes. Firebase records in-app events into GA4, so reuse the web's canonical names and properties and one funnel spans both. Server-sent app events need the app instance ID from the Firebase SDK, so store it with the user as you store the web client ID.",
        "Install attribution is a separate job. A mobile measurement partner such as AppsFlyer, Adjust or Branch attributes installs across ad networks and handles Apple's constraints: device-level identifiers require App Tracking Transparency permission, and for users who decline, attribution runs through SKAdNetwork and the newer AdAttributionKit, which report without user-level detail and with built-in delays.",
        "Revenue still comes from the server. Validate store purchases through App Store Server Notifications and Google Play's Real-time developer notifications, emit subscription_paid from the backend, and send it server-to-server to the MMP with that user's MMP device ID. That join, from install to paying user, is the number an app business runs on.",
      ],
    },
    {
      heading: "Consent and offline conversions belong in the first version",
      paragraphs: [
        "Server-side does not mean consent-free. Store consent state with the identifiers and have the mapping layer check it before every send. Google's Consent Mode v2 carries four signals (ad_storage, analytics_storage, ad_user_data, ad_personalization), and in advanced mode tags send cookieless pings when consent is denied so Google can model the gap. Meta's pixel has its own consent grant and revoke calls. Retrofitting consent onto a live pipeline means re-validating every destination, so design for it now.",
        "Offline conversions are where high-ticket and B2B businesses gain most. When a lead closes in the CRM weeks later, the click IDs and hashed contact details stored at lead time let you send the closed deal back: to Google Ads through offline conversion import or enhanced conversions for leads, and to Meta through the Conversions API with an action source that reflects where the sale happened. Send refunds too. GA4 has a refund event and Google Ads supports conversion adjustments, so bidding learns from net revenue, not gross.",
      ],
    },
    {
      heading: "Test it like payments code, monitor it like uptime",
      paragraphs: [
        "Tracking breaks silently. A release renames a field, a consent update blocks a tag, an access token expires, and every dashboard keeps rendering. Build the checks into the pipeline:",
      ],
      bullets: [
        "A test script per revenue event: place a sandbox order and confirm it in GA4 DebugView (or Firebase DebugView for apps), Meta's Test Events tool and Google Tag Assistant.",
        "A deduplication check: confirm Meta shows the browser and server events for that test order merged into one.",
        "Schema validation in CI against the typed event spec, so a missing value or currency fails before deploy.",
        "A daily reconciliation of purchase events per destination against orders in your database, alerting when the gap moves past a tolerance you set.",
        "Logged outbound calls with idempotent retries, and no tracking call ever on the fulfillment path.",
        "GA4's BigQuery export, so audits run on raw events instead of interface reports.",
      ],
    },
    {
      heading: "When a review is faster than a rebuild",
      paragraphs: [
        "If your setup grew by accretion, a review usually beats starting over. Publeca's Analytics & Data Science team compares what each platform reports with your actual orders, traces where events are lost or double-counted, and hands back a prioritized fix list your engineers or ours can implement.",
        "It is the pattern our own events platform runs on: the purchase event fires from our server once payment is verified, goes to Meta's Conversions API with the order ID as the event ID, and merges with the browser pixel's purchase for that order. Google Ads conversions carry the same order ID as the transaction ID, and a failed tracking call is logged without holding up ticket issuance.",
      ],
    },
  ],

  cta: {
    label: "Have our analytics team review your setup",
    message:
      "Hi Publeca, I'd like your analytics team to review our conversion tracking: event model, server-side events, deduplication and what our ad platforms actually receive. Can we set up a time?",
    note: "Bring your event spec, or the lack of one. Either is a fine starting point.",
  },

  seo: {
    title: "Conversion Tracking for Engineers: Server-Side Event Model",
    description:
      "Build conversion tracking once: a revenue-first event taxonomy, server-side events, dedup by shared ID for Meta CAPI, Google Ads and GA4, plus apps and consent.",
    keywords: [
      "conversion tracking architecture",
      "server-side tracking",
      "Meta Conversions API deduplication",
      "Google Ads enhanced conversions",
      "GA4 Measurement Protocol",
      "event taxonomy design",
      "app install attribution",
      "offline conversion tracking",
    ],
  },
};

export default post;
