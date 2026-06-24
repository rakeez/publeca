"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { manageableHostIds } from "@/lib/access";

export type LandingState = { error: string | null; ok?: boolean };

export async function upsertLandingPage(
  eventId: string,
  _prev: LandingState,
  formData: FormData
): Promise<LandingState> {
  const host = await getCurrentHost();
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) redirect("/app/events");
  const allowed = await manageableHostIds(host.id);
  if (!allowed.includes(event.hostId)) redirect("/app/events");

  const str = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" && v.trim() ? v.trim() : null;
  };

  const theme = { accent: str("accent") ?? "#ff0066" };
  const copyBlocks = {
    tagline: str("tagline"),
    aboutHeading: str("aboutHeading"),
    aboutBody: str("aboutBody"),
  };

  const data = {
    theme,
    copyBlocks,
    heroImageUrl: str("heroImageUrl"),
    videoUrl: str("videoUrl"),
    metaPixelId: str("metaPixelId"),
    metaCapiToken: str("metaCapiToken"),
    googleAdsId: str("googleAdsId"),
    googleConversionLabel: str("googleConversionLabel"),
  };

  await prisma.landingPage.upsert({
    where: { eventId },
    create: { eventId, ...data },
    update: data,
  });

  revalidatePath(`/app/events/${eventId}/landing`);
  revalidatePath(`/e/${event.slug}`);
  return { error: null, ok: true };
}
