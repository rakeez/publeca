import { processProviderWebhook, parseFormOrJson } from "@/lib/process-webhook";

export async function POST(req: Request) {
  return processProviderWebhook("mintpay", await parseFormOrJson(req));
}
