import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

/** Private or transactional paths: never useful in search results or AI answers. */
const PRIVATE = [
  "/app/", // host dashboard (auth-gated)
  "/api/", // API + webhooks
  "/pay/", // payment redirect/return pages
  "/t/", // private ticket QR pages (unguessable tokens — keep out of the index)
  "/scan", // door scanner
  "/login",
  "/signup",
];

/**
 * AI search and answer crawlers, named so it is explicit that the public site is open to
 * them (AEO done honestly: crawlable, citable pages; no llms.txt or other gimmicks, which
 * Google says don't help). A crawler that matches a named group ignores the "*" group, so
 * each group repeats the private paths.
 *
 * Search/answer agents fetch pages to cite them in answers. Training crawlers (GPTBot,
 * ClaudeBot, Google-Extended, Applebot-Extended, CCBot) are not named: the "*" group already
 * allows them. Disallow them here if Publeca ever decides to opt out of model training.
 */
const AI_ANSWER_AGENTS = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT fetching a page for a user
  "PerplexityBot", // Perplexity search index
  "Perplexity-User",
  "Claude-SearchBot", // Claude search
  "Claude-User",
  "Bingbot", // Bing, which also grounds Copilot answers
];

export default function robots(): MetadataRoute.Robots {
  // Non-production (preview / dev.publeca.com): block all crawling.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_ANSWER_AGENTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  };
}
