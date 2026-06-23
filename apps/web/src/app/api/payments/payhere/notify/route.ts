import { processProviderWebhook, parseFormOrJson } from "@/lib/process-webhook";

// PayHere server-to-server callback (form-encoded). The shared handler resolves the
// host's own PayHere keys, falling back to the platform keys, then verifies the
// md5sig and issues tickets idempotently. PayHere expects a 200 on success.
export async function POST(req: Request) {
  return processProviderWebhook("payhere", await parseFormOrJson(req));
}
