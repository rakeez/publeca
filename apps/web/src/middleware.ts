import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Middleware runs on the edge runtime, so it uses the edge-safe config only
// (no Prisma / bcrypt). The `authorized` callback gates /app/* access.
export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  // authorized() in auth.config handles the redirect decision; nothing else needed.
  return;
});

export const config = {
  matcher: ["/app/:path*"],
};
