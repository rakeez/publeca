"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@publeca/db";
import { signIn } from "@/auth";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signupHost(_prev: unknown, formData: FormData) {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.host.findUnique({ where: { email } });
  if (existing) return { error: "An account with this email already exists" };

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.host.create({ data: { name, email, passwordHash } });

  await signIn("credentials", { email, password, redirectTo: "/app" });
  return { error: null };
}
