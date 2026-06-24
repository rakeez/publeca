"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";

export type TeamState = { error: string | null; ok?: boolean };

const inviteSchema = z.object({
  email: z.string().email("Valid email required"),
  role: z.enum(["MANAGER", "STAFF"]),
});

export async function inviteTeamMember(_prev: TeamState, formData: FormData): Promise<TeamState> {
  const host = await getCurrentHost();
  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const email = parsed.data.email.toLowerCase();
  if (email === host.email.toLowerCase()) return { error: "That's you." };

  // Link immediately if the invitee already has an account.
  const existing = await prisma.host.findUnique({ where: { email } });

  await prisma.teamMember.upsert({
    where: { ownerId_memberEmail: { ownerId: host.id, memberEmail: email } },
    create: {
      ownerId: host.id,
      memberEmail: email,
      memberId: existing?.id ?? null,
      role: parsed.data.role,
    },
    update: { role: parsed.data.role, memberId: existing?.id ?? null },
  });

  revalidatePath("/app/team");
  return { error: null, ok: true };
}

export async function removeMember(membershipId: string): Promise<void> {
  const host = await getCurrentHost();
  // Scope deletion to memberships this host owns.
  await prisma.teamMember.deleteMany({ where: { id: membershipId, ownerId: host.id } });
  revalidatePath("/app/team");
}
