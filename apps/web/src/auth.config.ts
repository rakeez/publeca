import type { NextAuthConfig } from "next-auth";

// Edge-safe config: NO Prisma, NO bcrypt here. Shared by middleware (edge runtime)
// and the full Node-side config in auth.ts. The Credentials provider — which needs
// the database — is added only in auth.ts.
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isDashboard = request.nextUrl.pathname.startsWith("/app");
      if (isDashboard) return !!auth;
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
