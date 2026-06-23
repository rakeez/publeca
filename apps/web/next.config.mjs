/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@publeca/db"],
  images: {
    remotePatterns: [
      // Cloudflare R2 public bucket / CDN
      { protocol: "https", hostname: "cdn.publeca.com" },
    ],
  },
};

export default nextConfig;
