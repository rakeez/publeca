"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@publeca/db";
import { getProviderMeta, type ProviderId } from "@publeca/payments";
import { getCurrentHost } from "@/lib/session";
import { encryptJson } from "@/lib/crypto";

export type ConfigState = { error: string | null; ok?: boolean };

/** Add a new payment account (a host can have several per provider). */
export async function addPaymentAccount(
  _prev: ConfigState,
  formData: FormData
): Promise<ConfigState> {
  const host = await getCurrentHost();
  const provider = String(formData.get("provider") || "") as ProviderId;
  const meta = getProviderMeta(provider);
  if (!meta) return { error: "Choose a provider" };

  const label = String(formData.get("label") || "").trim() || meta.label;

  const creds: Record<string, unknown> = {};
  for (const f of meta.fields) {
    const v = formData.get(f.name);
    if (typeof v === "string" && v.trim()) creds[f.name] = v.trim();
  }
  if (!creds.merchantId || !creds.merchantSecret) {
    return { error: "Merchant ID and secret are required" };
  }
  if (meta.hasSandbox) creds.sandbox = formData.get("sandbox") === "on";

  await prisma.paymentConfig.create({
    data: { hostId: host.id, provider, label, credentials: encryptJson(creds), enabled: true },
  });

  revalidatePath("/app/payments");
  return { error: null, ok: true };
}

export async function setAccountEnabled(id: string, enabled: boolean): Promise<void> {
  const host = await getCurrentHost();
  await prisma.paymentConfig.updateMany({ where: { id, hostId: host.id }, data: { enabled } });
  revalidatePath("/app/payments");
}

export async function removeAccount(id: string): Promise<void> {
  const host = await getCurrentHost();
  await prisma.paymentConfig.deleteMany({ where: { id, hostId: host.id } });
  revalidatePath("/app/payments");
}
