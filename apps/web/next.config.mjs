import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";

// Single source of truth: load the monorepo-root .env so the app and the Prisma CLI
// share one env file. On Vercel, env vars come from the dashboard and this is a no-op.
loadEnv({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@publeca/db", "@publeca/payments", "@publeca/tickets"],
  images: {
    remotePatterns: [
      // Cloudflare R2 public bucket / CDN
      { protocol: "https", hostname: "cdn.publeca.com" },
    ],
  },
  // Retired service URLs from the events-era site → their successors (keeps link equity).
  async redirects() {
    return [
      { source: "/services/paid-ads", destination: "/services/social-media-ads", permanent: true },
      { source: "/services/creative-content", destination: "/services/content-creation", permanent: true },
    ];
  },
};

export default nextConfig;
