// Provider-agnostic payment contracts. Adding a new gateway (BNPL Koko/Mintpay,
// WebXPay, OnePay, ...) means implementing PaymentProvider — nothing in the app's
// checkout/webhook flow needs to change.

export type ProviderId = "payhere" | "koko" | "mintpay" | "webxpay" | "onepay";

export interface ProviderCredentials {
  merchantId: string;
  merchantSecret: string;
  sandbox?: boolean;
}

export interface CheckoutRequest {
  orderId: string;
  amount: number; // major units, e.g. 1500.00 LKR
  currency: string; // "LKR"
  itemsDescription: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
}

/**
 * Most LK gateways (PayHere included) take a self-submitting POST form rather than a
 * plain redirect URL, so the universal shape is an HTTP method + action URL + fields.
 */
export interface CheckoutResult {
  method: "POST" | "GET";
  actionUrl: string;
  fields: Record<string, string>;
}

export type WebhookStatus = "paid" | "failed" | "pending" | "cancelled" | "chargeback";

export interface WebhookResult {
  orderId: string;
  status: WebhookStatus;
  providerRef: string; // gateway's own payment id — used for idempotency
  amount?: number;
  currency?: string;
}

export interface PaymentProvider {
  readonly id: ProviderId;
  createCheckout(req: CheckoutRequest, creds: ProviderCredentials): CheckoutResult;
  /** Verify signature and parse a webhook/notify payload. Throws if signature invalid. */
  verifyWebhook(
    payload: Record<string, string>,
    creds: ProviderCredentials
  ): WebhookResult;
}
