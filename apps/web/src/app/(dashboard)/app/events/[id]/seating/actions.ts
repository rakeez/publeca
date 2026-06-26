"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { manageableHostIds } from "@/lib/access";

const blockSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  rows: z.coerce.number().int().min(1),
  seats: z.coerce.number().int().min(1),
  x: z.coerce.number().min(0).max(100),
  y: z.coerce.number().min(0).max(100),
  ticketTypeId: z.string().optional(),
});

export type SeatingState = { error: string | null; ok?: boolean };

export async function saveSeating(
  eventId: string,
  _prev: SeatingState,
  formData: FormData
): Promise<SeatingState> {
  const host = await getCurrentHost();
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) redirect("/app/events");
  const allowed = await manageableHostIds(host.id);
  if (!allowed.includes(event.hostId)) redirect("/app/events");

  let parsed: unknown;
  try {
    parsed = JSON.parse((formData.get("seating") as string) || "[]");
  } catch {
    return { error: "Could not save layout" };
  }

  const result = z.array(blockSchema).safeParse(parsed);
  if (!result.success) return { error: "Invalid seating layout" };
  const blocks = result.data;

  await prisma.event.update({
    where: { id: eventId },
    data: { seatingMap: { blocks } },
  });

  // Regenerate seat inventory from blocks that are linked to a ticket type.
  // SOLD seats are preserved; everything else is rebuilt to match the layout.
  await prisma.seat.deleteMany({ where: { eventId, status: { not: "SOLD" } } });

  const seatRows: {
    eventId: string;
    block: string;
    row: number;
    num: number;
    ticketTypeId: string;
  }[] = [];
  for (const b of blocks) {
    if (!b.ticketTypeId) continue;
    for (let r = 1; r <= b.rows; r++) {
      for (let n = 1; n <= b.seats; n++) {
        seatRows.push({ eventId, block: b.name, row: r, num: n, ticketTypeId: b.ticketTypeId });
      }
    }
  }
  if (seatRows.length > 0) {
    await prisma.seat.createMany({ data: seatRows, skipDuplicates: true });
  }

  revalidatePath(`/app/events/${eventId}/seating`);
  revalidatePath(`/e/${event.slug}`);
  return { error: null, ok: true };
}
