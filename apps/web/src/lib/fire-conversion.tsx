"use client";

import { useEffect } from "react";

// Fires a purchase conversion to Meta Pixel and Google Ads once, on the return page.
// The Meta server-side CAPI event uses the same eventID (order id) so Meta dedupes
// the browser + server events into one conversion.
export function FireConversion({
  orderId,
  value,
  currency,
  googleAdsId,
  googleConversionLabel,
  hasMetaPixel,
}: {
  orderId: string;
  value: number;
  currency: string;
  googleAdsId?: string | null;
  googleConversionLabel?: string | null;
  hasMetaPixel: boolean;
}) {
  useEffect(() => {
    const w = window as unknown as {
      fbq?: (...a: unknown[]) => void;
      gtag?: (...a: unknown[]) => void;
    };

    if (hasMetaPixel && typeof w.fbq === "function") {
      w.fbq("track", "Purchase", { value, currency }, { eventID: orderId });
    }

    if (googleAdsId && googleConversionLabel && typeof w.gtag === "function") {
      w.gtag("event", "conversion", {
        send_to: `${googleAdsId}/${googleConversionLabel}`,
        value,
        currency,
        transaction_id: orderId,
      });
    }
  }, [orderId, value, currency, googleAdsId, googleConversionLabel, hasMetaPixel]);

  return null;
}
