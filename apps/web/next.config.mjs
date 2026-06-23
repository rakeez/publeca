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
};

export default nextConfig;
