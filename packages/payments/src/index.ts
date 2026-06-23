import type { PaymentProvider, ProviderId } from "./types";
import { payhere } from "./payhere";

export * from "./types";
export { payhere };

const providers: Partial<Record<ProviderId, PaymentProvider>> = {
  payhere,
  // koko, mintpay, webxpay, onepay — added in later phases
};

export function getProvider(id: ProviderId): PaymentProvider {
  const p = providers[id];
  if (!p) throw new Error(`Unknown or unconfigured payment provider: ${id}`);
  return p;
}

export function listProviders(): ProviderId[] {
  return Object.keys(providers) as ProviderId[];
}
