"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { uniqueEventSlug } from "@/lib/slug";
import { manageableHostIds } from "@/lib/access";
import { enabledProvidersForHost } from "@/lib/payment-config";

type ActionState = { error: string | null };

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  venue: z.string().optional(),
  venueLat: z.string().optional(),
  venueLng: z.string().optional(),
  placeId: z.string().optional(),
  mapsUrl: z.string().optional(),
  startsAt: z.string().min(1, "Start date/time is required"),
  endsAt: z.string().optional(),
  currency: z.string().default("LKR"),
});

function toNum(v?: string | null): number | null {
  if (!v) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

function venueFields(data: z.infer<typeof eventSchema>) {
  return {
    venue: data.venue || null,
    venueLat: toNum(data.venueLat),
    venueLng: toNum(data.venueLng),
    placeId: data.placeId || null,
    mapsUrl: data.mapsUrl || null,
  };
}

function toDate(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/** Confirm the signed-in user can manage this event (owner or MANAGER teammate). */
async function assertEventOwned(eventId: string, userId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) redirect("/app/events");
  const allowed = await manageableHostIds(userId);
  if (!allowed.includes(event.hostId)) redirect("/app/events");
  return event;
}

export async function createEvent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const host = await getCurrentHost();
  const parsed = eventSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const data = parsed.data;
  const startsAt = toDate(data.startsAt);
  if (!startsAt) return { error: "Start date/time is invalid" };

  const slug = await uniqueEventSlug(data.title);
  const event = await prisma.event.create({
    data: {
      hostId: host.id,
      slug,
      title: data.title,
      description: data.description || null,
      ...venueFields(data),
      startsAt,
      endsAt: toDate(data.endsAt),
      currency: data.currency || "LKR",
      status: "DRAFT",
    },
  });

  revalidatePath("/app/events");
  redirect(`/app/events/${event.id}`);
}

export async function updateEvent(
  eventId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const host = await getCurrentHost();
  await assertEventOwned(eventId, host.id);

  const parsed = eventSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const data = parsed.data;
  const startsAt = toDate(data.startsAt);
  if (!startsAt) return { error: "Start date/time is invalid" };

  await prisma.event.update({
    where: { id: eventId },
    data: {
      title: data.title,
      description: data.description || null,
      ...venueFields(data),
      startsAt,
      endsAt: toDate(data.endsAt),
      currency: data.currency || "LKR",
    },
  });

  revalidatePath(`/app/events/${eventId}`);
  return { error: null };
}

const ticketTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  quantityTotal: z.coerce.number().int().min(1, "Quantity must be at least 1"),
});

export async function addTicketType(eventId: string, formData: FormData): Promise<void> {
  const host = await getCurrentHost();
  await assertEventOwned(eventId, host.id);

  const parsed = ticketTypeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return; // form-level validation also guards this

  await prisma.ticketType.create({
    data: {
      eventId,
      name: parsed.data.name,
      price: parsed.data.price.toFixed(2),
      quantityTotal: parsed.data.quantityTotal,
    },
  });

  revalidatePath(`/app/events/${eventId}`);
}

export async function deleteTicketType(ticketTypeId: string): Promise<void> {
  const host = await getCurrentHost();
  const tt = await prisma.ticketType.findUnique({
    where: { id: ticketTypeId },
    include: { event: true },
  });
  if (!tt) return;
  const allowed = await manageableHostIds(host.id);
  if (!allowed.includes(tt.event.hostId)) return;
  // Don't allow deleting a type that has already sold seats.
  if (tt.quantitySold > 0) return;

  await prisma.ticketType.delete({ where: { id: ticketTypeId } });
  revalidatePath(`/app/events/${tt.eventId}`);
}

export async function setEventStatus(
  eventId: string,
  status: "DRAFT" | "LIVE" | "ENDED"
): Promise<void> {
  const host = await getCurrentHost();
  await assertEventOwned(eventId, host.id);

  // An event can only go LIVE once it has at least one ticket type.
  if (status === "LIVE") {
    const count = await prisma.ticketType.count({ where: { eventId } });
    if (count === 0) return;
  }

  await prisma.event.update({ where: { id: eventId }, data: { status } });
  revalidatePath(`/app/events/${eventId}`);
  revalidatePath("/app/events");
}

/** Choose which of the host's payment methods to offer for this event. Empty = all. */
export async function updateEventPayments(eventId: string, formData: FormData): Promise<void> {
  const host = await getCurrentHost();
  const event = await assertEventOwned(eventId, host.id);

  const available = new Set(await enabledProvidersForHost(event.hostId));
  const providers = formData
    .getAll("providers")
    .map(String)
    .filter((p) => available.has(p as never));

  await prisma.event.update({ where: { id: eventId }, data: { paymentProviders: providers } });
  revalidatePath(`/app/events/${eventId}`);
}
