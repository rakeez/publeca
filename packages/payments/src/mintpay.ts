import { createHmac } from "crypto";
import type {
  CheckoutRequest,
  CheckoutResult,
  PaymentProvider,
  ProviderCredentials,
  WebhookResult,
  WebhookStatus,
} from "./types";

// Mintpay BNPL.
//
// NOTE: like Koko, Mintpay's exact endpoint/fields/signing are merchant-specific and
// provided on onboarding. This follows the common signed-redirect + HMAC-callback
// pattern and is isolated so it can be confirmed against the merchant's Mintpay docs
// without affecting the rest of the app.

const sign = (data: string, secret: string) =>
  createHmac("sha256", secret).update(data).digest("hex");

function checkoutUrl(sandbox?: boolean) {
  return sandbox
    ? "https://sandbox.mintpay.lk/checkout"
    : "https://mintpay.lk/checkout";
}

export const mintpay: PaymentProvider = {
  id: "mintpay",

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
        merchant_id: creds.merchantId,
        order_id: req.orderId,
        amount,
        currency: req.currency,
        description: req.itemsDescription,
        first_name: req.customer.firstName,
        last_name: req.customer.lastName,
        email: req.customer.email,
        phone: req.customer.phone ?? "",
        return_url: req.returnUrl,
        cancel_url: req.cancelUrl,
        notify_url: req.notifyUrl,
        signature,
      },
    };
  },

  verifyWebhook(payload: Record<string, string>, creds: ProviderCredentials): WebhookResult {
    const orderId = payload.order_id ?? payload.orderId ?? "";
    const amount = payload.amount ?? "";
    const status = payload.status ?? "";
    const reference = payload.reference ?? payload.payment_id ?? `mintpay_${orderId}`;
    const provided = (payload.signature ?? "").toLowerCase();

    const expected = sign([creds.merchantId, orderId, amount, status].join("|"), creds.merchantSecret);
    if (!provided || provided !== expected) {
      throw new Error("Mintpay callback signature mismatch");
    }

    const map: Record<string, WebhookStatus> = {
      SUCCESS: "paid",
      COMPLETED: "paid",
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
