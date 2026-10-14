import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.publeca.com";

export default function robots(): MetadataRoute.Robots {
  // Non-production (preview / dev.publeca.com): block all crawling.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app/", // host dashboard (auth-gated)
          "/api/", // API + webhooks
          "/pay/", // payment redirect/return pages
          "/t/", // private ticket QR pages (unguessable tokens — keep out of the index)
          "/scan", // door scanner
          "/login",
          "/signup",
        ],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
