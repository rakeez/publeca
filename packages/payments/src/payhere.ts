import { createHash } from "crypto";
import type {
  CheckoutRequest,
  CheckoutResult,
  PaymentProvider,
  ProviderCredentials,
  WebhookResult,
  WebhookStatus,
} from "./types";

const md5Upper = (s: string) => createHash("md5").update(s, "utf8").digest("hex").toUpperCase();

// PayHere wants amounts formatted to 2 decimals with no thousands separators.
const formatAmount = (n: number) => n.toFixed(2);

function checkoutUrl(sandbox?: boolean) {
  return sandbox
    ? "https://sandbox.payhere.lk/pay/checkout"
    : "https://www.payhere.lk/pay/checkout";
}

/**
 * PayHere (Sri Lanka).
 * Docs: https://support.payhere.lk/api-&-mobile-sdk/checkout-api
 *
 * Checkout hash:
 *   UPPER( md5( merchant_id + order_id + amount + currency + UPPER(md5(secret)) ) )
 * Notify md5sig:
 *   UPPER( md5( merchant_id + order_id + payhere_amount + payhere_currency
 *               + status_code + UPPER(md5(secret)) ) )
 */
export const payhere: PaymentProvider = {
  id: "payhere",

  createCheckout(req: CheckoutRequest, creds: ProviderCredentials): CheckoutResult {
    const amount = formatAmount(req.amount);
    const secretHash = md5Upper(creds.merchantSecret);
    const hash = md5Upper(
      creds.merchantId + req.orderId + amount + req.currency + secretHash
    );

    return {
      method: "POST",
      actionUrl: checkoutUrl(creds.sandbox),
      fields: {
        merchant_id: creds.merchantId,
        return_url: req.returnUrl,
        cancel_url: req.cancelUrl,
        notify_url: req.notifyUrl,
        order_id: req.orderId,
        items: req.itemsDescription,
        currency: req.currency,
        amount,
        first_name: req.customer.firstName,
        last_name: req.customer.lastName,
        email: req.customer.email,
        phone: req.customer.phone ?? "",
        address: "",
        city: "",
        country: "Sri Lanka",
        hash,
      },
    };
  },

  verifyWebhook(payload: Record<string, string>, creds: ProviderCredentials): WebhookResult {
    const merchant_id = payload.merchant_id ?? "";
    const order_id = payload.order_id ?? "";
    const payhere_amount = payload.payhere_amount ?? "";
    const payhere_currency = payload.payhere_currency ?? "";
    const status_code = payload.status_code ?? "";
    const md5sig = payload.md5sig ?? "";
    const payment_id = payload.payment_id ?? "";

    const secretHash = md5Upper(creds.merchantSecret);
    const local = md5Upper(
      merchant_id + order_id + payhere_amount + payhere_currency + status_code + secretHash
    );

    if (!md5sig || local !== md5sig.toUpperCase()) {
      throw new Error("PayHere notify signature mismatch");
    }

    const statusMap: Record<string, WebhookStatus> = {
      "2": "paid",
      "0": "pending",
      "-1": "cancelled",
      "-2": "failed",
      "-3": "chargeback",
    };

    return {
      orderId: order_id,
      status: statusMap[status_code] ?? "failed",
      providerRef: payment_id || `payhere_${order_id}`,
      amount: payhere_amount ? Number(payhere_amount) : undefined,
      currency: payhere_currency,
    };
  },
};
