import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@publeca/db";
import { authConfig } from "@/auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Full Node-side config. Pulls in the edge-safe base and adds the DB-backed
// Credentials provider. Used by API route handlers and server components.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const host = await prisma.host.findUnique({ where: { email } });
        if (!host) return null;

        const ok = await bcrypt.compare(password, host.passwordHash);
        if (!ok) return null;

        return { id: host.id, name: host.name, email: host.email, role: host.role };
      },
    }),
  ],
});
