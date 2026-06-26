import { NextResponse } from "next/server";
import { prisma } from "@publeca/db";
import { getProvider, type ProviderId } from "@publeca/payments";
import { resolveAccountCreds } from "./payment-config";
import { issueTicketsForOrder } from "./issue-tickets";

/**
 * Generic provider callback handler (Koko, Mintpay, ...). Resolves the order's host,
 * loads that host's decrypted credentials, verifies the signature, and — on success —
 * issues tickets idempotently. PayHere has its own route using platform-env fallback.
 */
export async function processProviderWebhook(
  provider: ProviderId,
  payload: Record<string, string>
): Promise<NextResponse> {
  const orderId = payload.orderId ?? payload.order_id ?? "";
  if (!orderId) return new NextResponse("missing order id", { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { event: true },
  });
  if (!order) return new NextResponse("unknown order", { status: 404 });

  // Use the exact account that took the payment so the signature verifies.
  const creds = await resolveAccountCreds(order.paymentAccountId, order.event.hostId);
  if (!creds) return new NextResponse("account not configured", { status: 400 });

  let result;
  try {
    result = getProvider(provider).verifyWebhook(payload, creds);
  } catch (e) {
    console.error(`${provider} callback rejected:`, (e as Error).message);
    return new NextResponse("invalid signature", { status: 400 });
  }

  if (result.status === "paid") {
    try {
      await issueTicketsForOrder(result.orderId, result.providerRef);
    } catch (e) {
      console.error("Issuance failed:", (e as Error).message);
      return new NextResponse("issuance error", { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function parseFormOrJson(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const j = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(j).map(([k, v]) => [k, String(v)]));
  }
  const form = await req.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = String(v);
  return out;
}
