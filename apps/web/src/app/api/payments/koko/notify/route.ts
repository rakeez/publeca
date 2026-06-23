import { processProviderWebhook, parseFormOrJson } from "@/lib/process-webhook";

export async function POST(req: Request) {
  return processProviderWebhook("koko", await parseFormOrJson(req));
}
