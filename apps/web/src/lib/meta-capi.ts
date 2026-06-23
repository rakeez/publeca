import { createHash } from "crypto";

const sha256 = (s: string) => createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

/**
 * Server-side Meta Conversions API "Purchase" event. Fires from our server on verified
 * payment, so it lands even when the browser pixel is blocked. eventId = order id so
 * Meta dedupes against the browser pixel's Purchase event.
 */
export async function sendMetaPurchase(opts: {
  pixelId: string;
  token: string;
  orderId: string;
  value: number;
  currency: string;
  email?: string;
  sandbox?: boolean;
}) {
  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.orderId,
        action_source: "website",
        user_data: opts.email ? { em: [sha256(opts.email)] } : {},
        custom_data: { currency: opts.currency, value: opts.value },
      },
    ],
  };

  const url = `https://graph.facebook.com/v21.0/${opts.pixelId}/events?access_token=${encodeURIComponent(
    opts.token
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Meta CAPI ${res.status}: ${await res.text()}`);
  }
}
