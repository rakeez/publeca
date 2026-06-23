import { createHmac } from "crypto";
import type {
  CheckoutRequest,
  CheckoutResult,
  PaymentProvider,
  ProviderCredentials,
  WebhookResult,
  WebhookStatus,
} from "./types";

// Koko (Softlogic) BNPL.
//
// NOTE: Koko's exact checkout endpoint, field names and signing scheme are provided
// to each merchant on onboarding. This implementation follows the common pattern of a
// signed POST redirect + an HMAC-signed callback, and is isolated here so the precise
// field/endpoint details can be confirmed and adjusted per the merchant's Koko docs
// without touching the rest of the app. The contract (createCheckout/verifyWebhook)
// stays identical to every other provider.

const sign = (data: string, secret: string) =>
  createHmac("sha256", secret).update(data).digest("hex");

function checkoutUrl(sandbox?: boolean) {
  return sandbox
    ? "https://sandbox.paykoko.com/api/merchants/order"
    : "https://paykoko.com/api/merchants/order";
}

export const koko: PaymentProvider = {
  id: "koko",

  createCheckout(req: CheckoutRequest, creds: ProviderCredentials): CheckoutResult {
    const amount = req.amount.toFixed(2);
    const signature = sign(
      [creds.merchantId, req.orderId, amount, req.currency].join("|"),
      creds.merchantSecret
    );

    return {
      method: "POST",
      actionUrl: checkoutUrl(creds.sandbox),
      fields: {
        merchantId: creds.merchantId,
        orderId: req.orderId,
        amount,
        currency: req.currency,
        description: req.itemsDescription,
        customerFirstName: req.customer.firstName,
        customerLastName: req.customer.lastName,
        customerEmail: req.customer.email,
        customerPhone: req.customer.phone ?? "",
        returnUrl: req.returnUrl,
        cancelUrl: req.cancelUrl,
        notifyUrl: req.notifyUrl,
        signature,
      },
    };
  },

  verifyWebhook(payload: Record<string, string>, creds: ProviderCredentials): WebhookResult {
    const orderId = payload.orderId ?? payload.order_id ?? "";
    const amount = payload.amount ?? "";
    const status = payload.status ?? "";
    const reference = payload.reference ?? payload.transactionId ?? `koko_${orderId}`;
    const provided = (payload.signature ?? "").toLowerCase();

    const expected = sign([creds.merchantId, orderId, amount, status].join("|"), creds.merchantSecret);
    if (!provided || provided !== expected) {
      throw new Error("Koko callback signature mismatch");
    }

    const map: Record<string, WebhookStatus> = {
      SUCCESS: "paid",
      APPROVED: "paid",
      PAID: "paid",
      PENDING: "pending",
      CANCELLED: "cancelled",
      FAILED: "failed",
    };

    return {
      orderId,
      status: map[status.toUpperCase()] ?? "failed",
      providerRef: reference,
      amount: amount ? Number(amount) : undefined,
      currency: payload.currency,
    };
  },
};
