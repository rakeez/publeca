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

  await prisma.event.update({
    where: { id: eventId },
    data: { seatingMap: { blocks: result.data } },
  });

  revalidatePath(`/app/events/${eventId}/seating`);
  revalidatePath(`/e/${event.slug}`);
  return { error: null, ok: true };
}
