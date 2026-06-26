import { prisma } from "@publeca/db";
import { getProviderMeta, type ProviderCredentials, type ProviderId } from "@publeca/payments";
import { decryptJson } from "./crypto";

// A host can connect several accounts per provider. Each enabled PaymentConfig is an
// "account"; the platform's own PayHere is offered as a virtual fallback account.

export const PLATFORM_PAYHERE_ID = "platform-payhere";

export type Account = {
  id: string; // PaymentConfig id, or PLATFORM_PAYHERE_ID
  provider: ProviderId;
  label: string;
  kind: "card" | "bnpl";
};

type StoredCreds = {
  merchantId?: string;
  merchantSecret?: string;
  sandbox?: boolean;
  [k: string]: unknown;
};

function platformPayhereCreds(): ProviderCredentials | null {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
  if (!merchantId || !merchantSecret) return null;
  return { merchantId, merchantSecret, sandbox: process.env.PAYHERE_SANDBOX !== "false" };
}

/** Every account a host can offer: their enabled configs + platform PayHere fallback. */
export async function availableAccountsForHost(hostId: string): Promise<Account[]> {
  const configs = await prisma.paymentConfig.findMany({
    where: { hostId, enabled: true },
    orderBy: { createdAt: "asc" },
  });

  const accounts: Account[] = configs.map((c) => ({
    id: c.id,
    provider: c.provider as ProviderId,
    label: c.label,
    kind: getProviderMeta(c.provider as ProviderId)?.kind ?? "card",
  }));

  if (platformPayhereCreds()) {
    accounts.push({
      id: PLATFORM_PAYHERE_ID,
      provider: "payhere",
      label: "PayHere (Publeca)",
      kind: "card",
    });
  }
  return accounts;
}

/** Accounts offered for a specific event (intersection with the event's selection). */
export async function accountsForEvent(event: {
  hostId: string;
  paymentAccountIds: string[];
}): Promise<Account[]> {
  const all = await availableAccountsForHost(event.hostId);
  const selected = event.paymentAccountIds ?? [];
  if (selected.length === 0) return all;
  return all.filter((a) => selected.includes(a.id));
}

/** Decrypted credentials for a specific account, scoped to its host. */
export async function resolveAccountCreds(
  accountId: string | null | undefined,
  hostId: string
): Promise<ProviderCredentials | null> {
  if (!accountId) return null;
  if (accountId === PLATFORM_PAYHERE_ID) return platformPayhereCreds();

  const cfg = await prisma.paymentConfig.findUnique({ where: { id: accountId } });
  if (!cfg || cfg.hostId !== hostId) return null;

  const creds = decryptJson<StoredCreds>(cfg.credentials);
  if (!creds.merchantId || !creds.merchantSecret) return null;
  return {
    merchantId: creds.merchantId,
    merchantSecret: creds.merchantSecret,
    sandbox: creds.sandbox ?? true,
  };
}
