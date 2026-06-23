import type { PaymentProvider, ProviderId } from "./types";
import { payhere } from "./payhere";
import { koko } from "./koko";
import { mintpay } from "./mintpay";

export * from "./types";
export * from "./catalog";
export { payhere, koko, mintpay };

const providers: Partial<Record<ProviderId, PaymentProvider>> = {
  payhere,
  koko,
  mintpay,
  // webxpay, onepay — added later
};

export function getProvider(id: ProviderId): PaymentProvider {
  const p = providers[id];
  if (!p) throw new Error(`Unknown or unconfigured payment provider: ${id}`);
  return p;
}

export function listProviders(): ProviderId[] {
  return Object.keys(providers) as ProviderId[];
}
