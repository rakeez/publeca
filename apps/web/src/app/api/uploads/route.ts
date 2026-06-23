import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { r2Configured, uploadToR2 } from "@/lib/r2";

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB
const ALLOWED = /^(image|video)\//;

// Authenticated host media upload to Cloudflare R2. Returns the public URL.
// If R2 isn't configured yet, returns 503 so the UI tells the host to paste a URL.
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return new NextResponse("unauthorized", { status: 401 });

  if (!r2Configured) {
    return new NextResponse("uploads not configured", { status: 503 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return new NextResponse("no file", { status: 400 });
  if (!ALLOWED.test(file.type)) return new NextResponse("unsupported type", { status: 415 });
  if (file.size > MAX_BYTES) return new NextResponse("file too large", { status: 413 });

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const key = `uploads/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const url = await uploadToR2(key, buffer, file.type);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("R2 upload failed:", (e as Error).message);
    return new NextResponse("upload failed", { status: 500 });
  }
}
