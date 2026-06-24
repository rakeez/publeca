import { redirect } from "next/navigation";
import { prisma } from "@publeca/db";

// Team access model:
//  - READ/scan: a user can access their own events + every org they're a member of.
//  - MANAGE (edit/publish/landing): own events + orgs where they're a MANAGER.
// Payments config stays strictly owner-only (handled with getCurrentHost directly).

export async function accessibleHostIds(userId: string): Promise<string[]> {
  const memberships = await prisma.teamMember.findMany({
    where: { memberId: userId },
    select: { ownerId: true },
  });
  return [userId, ...memberships.map((m) => m.ownerId)];
}

export async function manageableHostIds(userId: string): Promise<string[]> {
  const memberships = await prisma.teamMember.findMany({
    where: { memberId: userId, role: "MANAGER" },
    select: { ownerId: true },
  });
  return [userId, ...memberships.map((m) => m.ownerId)];
}

/** Load an event the user may access, or redirect. Pass {manage:true} for edit rights. */
export async function assertEventAccess(
  eventId: string,
  userId: string,
  opts: { manage?: boolean } = {}
) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) redirect("/app/events");
  const allowed = opts.manage
    ? await manageableHostIds(userId)
    : await accessibleHostIds(userId);
  if (!allowed.includes(event.hostId)) redirect("/app/events");
  return event;
}
