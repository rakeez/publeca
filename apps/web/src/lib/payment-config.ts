import { prisma } from "@publeca/db";
import type { ProviderCredentials, ProviderId } from "@publeca/payments";
import { decryptJson } from "./crypto";

type StoredCreds = {
  merchantId?: string;
  merchantSecret?: string;
  sandbox?: boolean;
  [k: string]: unknown;
};

/** Decrypted credentials for a host's configured provider, or null if not set/enabled. */
export async function getHostProviderCreds(
  hostId: string,
  provider: ProviderId,
  requireEnabled = true
): Promise<ProviderCredentials | null> {
  const cfg = await prisma.paymentConfig.findUnique({
    where: { hostId_provider: { hostId, provider } },
  });
  if (!cfg) return null;
  if (requireEnabled && !cfg.enabled) return null;

  const creds = decryptJson<StoredCreds>(cfg.credentials);
  if (!creds.merchantId || !creds.merchantSecret) return null;
  return {
    merchantId: creds.merchantId,
    merchantSecret: creds.merchantSecret,
    sandbox: creds.sandbox ?? true,
  };
}

/** Platform PayHere fallback from env (used when a host hasn't added their own keys). */
function platformPayhere(): ProviderCredentials | null {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
  if (!merchantId || !merchantSecret) return null;
  return { merchantId, merchantSecret, sandbox: process.env.PAYHERE_SANDBOX !== "false" };
}

/** Credentials to use for a checkout/webhook: host config first, then platform PayHere. */
export async function resolveCreds(
  hostId: string,
  provider: ProviderId
): Promise<ProviderCredentials | null> {
  const own = await getHostProviderCreds(hostId, provider);
  if (own) return own;
  if (provider === "payhere") return platformPayhere();
  return null;
}

/** Provider ids the buyer can pay with for this host (enabled configs + platform PayHere). */
export async function enabledProvidersForHost(hostId: string): Promise<ProviderId[]> {
  const configs = await prisma.paymentConfig.findMany({
    where: { hostId, enabled: true },
    select: { provider: true },
  });
  const ids = new Set<ProviderId>(configs.map((c) => c.provider as ProviderId));
  if (platformPayhere()) ids.add("payhere"); // platform fallback always offers PayHere
  return [...ids];
}
