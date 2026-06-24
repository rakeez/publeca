"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { accessibleHostIds } from "@/lib/access";

async function ownedTicket(ticketId: string, userId: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { order: { include: { event: true } } },
  });
  if (!ticket) return null;
  const hostIds = await accessibleHostIds(userId);
  if (!hostIds.includes(ticket.order.event.hostId)) return null;
  return ticket;
}

export async function manualCheckIn(ticketId: string): Promise<void> {
  const host = await getCurrentHost();
  const ticket = await ownedTicket(ticketId, host.id);
  if (!ticket) return;

  await prisma.ticket.updateMany({
    where: { id: ticketId, status: "VALID" },
    data: { status: "USED", checkedInAt: new Date(), checkedInBy: host.id },
  });
  await prisma.scanLog.create({ data: { ticketId, scannedBy: host.id, result: "OK" } });
  revalidatePath("/app/attendees");
}

export async function undoCheckIn(ticketId: string): Promise<void> {
  const host = await getCurrentHost();
  const ticket = await ownedTicket(ticketId, host.id);
  if (!ticket) return;

  await prisma.ticket.updateMany({
    where: { id: ticketId, status: "USED" },
    data: { status: "VALID", checkedInAt: null, checkedInBy: null },
  });
  revalidatePath("/app/attendees");
}
