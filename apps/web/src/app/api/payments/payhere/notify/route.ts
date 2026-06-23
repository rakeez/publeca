import { NextResponse } from "next/server";
import { getProvider } from "@publeca/payments";
import { issueTicketsForOrder } from "@/lib/issue-tickets";

// PayHere server-to-server callback. This — not the browser return — is the
// authoritative confirmation of payment. PayHere expects a 200 response.
export async function POST(req: Request) {
  const form = await req.formData();
  const payload: Record<string, string> = {};
  for (const [k, v] of form.entries()) payload[k] = String(v);

  let result;
  try {
    result = getProvider("payhere").verifyWebhook(payload, {
      merchantId: process.env.PAYHERE_MERCHANT_ID ?? "",
      merchantSecret: process.env.PAYHERE_MERCHANT_SECRET ?? "",
      sandbox: process.env.PAYHERE_SANDBOX !== "false",
    });
  } catch (e) {
    console.error("PayHere notify rejected:", (e as Error).message);
    // Bad signature — do not retry-loop; acknowledge but take no action.
    return new NextResponse("invalid signature", { status: 400 });
  }

  if (result.status === "paid") {
    try {
      await issueTicketsForOrder(result.orderId, result.providerRef);
    } catch (e) {
      console.error("Issuance failed:", (e as Error).message);
      // Return 500 so PayHere retries the notification.
      return new NextResponse("issuance error", { status: 500 });
    }
  } else {
    console.log(`PayHere order ${result.orderId} status: ${result.status}`);
  }

  return NextResponse.json({ ok: true });
}
