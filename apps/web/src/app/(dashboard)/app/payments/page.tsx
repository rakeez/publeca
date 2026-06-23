import { prisma } from "@publeca/db";
import { PROVIDER_CATALOG } from "@publeca/payments";
import { getCurrentHost } from "@/lib/session";
import { decryptJson } from "@/lib/crypto";
import { ProviderCard } from "./provider-card";

export default async function PaymentsPage() {
  const host = await getCurrentHost();
  const configs = await prisma.paymentConfig.findMany({ where: { hostId: host.id } });

  const byProvider = new Map(configs.map((c) => [c.provider, c]));

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
      <p className="mt-1 text-slate-600">
        Connect your own merchant accounts. Buyers pay through your gateway and funds go
        straight to you. Keys are encrypted and never shown again after saving.
      </p>

      <div className="mt-8 space-y-5">
        {PROVIDER_CATALOG.map((meta) => {
          const cfg = byProvider.get(meta.id);
          let sandbox = true;
          if (cfg) {
            try {
              sandbox = (decryptJson<{ sandbox?: boolean }>(cfg.credentials).sandbox ?? true) === true;
            } catch {
              sandbox = true;
            }
          }
          return (
            <ProviderCard
              key={meta.id}
              meta={meta}
              configured={!!cfg}
              enabled={cfg?.enabled ?? false}
              sandbox={sandbox}
            />
          );
        })}
      </div>

      <p className="mt-6 text-xs text-slate-400">
        If you don't connect PayHere, Publeca's platform PayHere is used as a fallback so you
        can start selling immediately.
      </p>
    </div>
  );
}
