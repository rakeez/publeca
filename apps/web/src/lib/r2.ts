import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;
const publicUrl = process.env.R2_PUBLIC_URL;

export const r2Configured = Boolean(
  accountId && accessKeyId && secretAccessKey && bucket && publicUrl
);

let client: S3Client | null = null;
function r2() {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
    });
  }
  return client;
}

/** Upload bytes to R2 and return the public CDN URL. */
export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2().send(
    new PutObjectCommand({ Bucket: bucket!, Key: key, Body: body, ContentType: contentType })
  );
  return `${publicUrl!.replace(/\/$/, "")}/${key}`;
}
