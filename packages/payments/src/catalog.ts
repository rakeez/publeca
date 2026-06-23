import type { ProviderId } from "./types";

export interface CredentialField {
  name: string;
  label: string;
  type?: "text" | "password";
  placeholder?: string;
}

export interface ProviderMeta {
  id: ProviderId;
  label: string;
  kind: "card" | "bnpl";
  blurb: string;
  fields: CredentialField[];
  hasSandbox: boolean;
}

// Field names map to ProviderCredentials where applicable (merchantId, merchantSecret).
// BNPL exact field names should be confirmed against each provider's merchant docs.
export const PROVIDER_CATALOG: ProviderMeta[] = [
  {
    id: "payhere",
    label: "PayHere",
    kind: "card",
    blurb: "Cards, eZ Cash and more. Sri Lanka's most common gateway.",
    hasSandbox: true,
    fields: [
      { name: "merchantId", label: "Merchant ID" },
      { name: "merchantSecret", label: "Merchant Secret", type: "password" },
    ],
  },
  {
    id: "koko",
    label: "Koko",
    kind: "bnpl",
    blurb: "Buy now, pay later in 3 installments (by Softlogic).",
    hasSandbox: true,
    fields: [
      { name: "merchantId", label: "Merchant ID" },
      { name: "merchantSecret", label: "API Secret / Private Key", type: "password" },
      { name: "publicKey", label: "Public Key", type: "password" },
    ],
  },
  {
    id: "mintpay",
    label: "Mintpay",
    kind: "bnpl",
    blurb: "Buy now, pay later. Split into installments.",
    hasSandbox: true,
    fields: [
      { name: "merchantId", label: "Merchant ID" },
      { name: "merchantSecret", label: "API Key / Secret", type: "password" },
    ],
  },
];

export function getProviderMeta(id: ProviderId): ProviderMeta | undefined {
  return PROVIDER_CATALOG.find((p) => p.id === id);
}
