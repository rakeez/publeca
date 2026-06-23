"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@publeca/db";
import { getProviderMeta, type ProviderId } from "@publeca/payments";
import { getCurrentHost } from "@/lib/session";
import { encryptJson } from "@/lib/crypto";

export type ConfigState = { error: string | null; ok?: boolean };

export async function savePaymentConfig(
  provider: ProviderId,
  _prev: ConfigState,
  formData: FormData
): Promise<ConfigState> {
  const host = await getCurrentHost();
  const meta = getProviderMeta(provider);
  if (!meta) return { error: "Unknown provider" };

  const creds: Record<string, unknown> = {};
  for (const f of meta.fields) {
    const v = formData.get(f.name);
    if (typeof v === "string" && v.trim()) creds[f.name] = v.trim();
  }
  if (!creds.merchantId || !creds.merchantSecret) {
    return { error: "Merchant ID and secret are required" };
  }
  if (meta.hasSandbox) creds.sandbox = formData.get("sandbox") === "on";

  await prisma.paymentConfig.upsert({
    where: { hostId_provider: { hostId: host.id, provider } },
    create: { hostId: host.id, provider, credentials: encryptJson(creds), enabled: true },
    update: { credentials: encryptJson(creds), enabled: true },
  });

  revalidatePath("/app/payments");
  return { error: null, ok: true };
}

export async function setProviderEnabled(provider: ProviderId, enabled: boolean): Promise<void> {
  const host = await getCurrentHost();
  await prisma.paymentConfig.updateMany({
    where: { hostId: host.id, provider },
    data: { enabled },
  });
  revalidatePath("/app/payments");
}

export async function removeProviderConfig(provider: ProviderId): Promise<void> {
  const host = await getCurrentHost();
  await prisma.paymentConfig.deleteMany({ where: { hostId: host.id, provider } });
  revalidatePath("/app/payments");
}
