import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// AES-256-GCM encryption for hosts' payment-gateway credentials at rest.
// Format: base64(iv).base64(authTag).base64(ciphertext)

function key(): Buffer {
  const k = process.env.CREDENTIALS_ENCRYPTION_KEY;
  if (!k) throw new Error("CREDENTIALS_ENCRYPTION_KEY is not set");
  const buf = Buffer.from(k, "base64");
  if (buf.length !== 32) throw new Error("CREDENTIALS_ENCRYPTION_KEY must be 32 bytes (base64)");
  return buf;
}

export function encryptJson(value: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64"), tag.toString("base64"), ciphertext.toString("base64")].join(".");
}

export function decryptJson<T = Record<string, string>>(blob: string): T {
  const parts = blob.split(".");
  if (parts.length !== 3) throw new Error("Malformed encrypted credentials");
  const [ivB64, tagB64, dataB64] = parts as [string, string, string];
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(plaintext.toString("utf8")) as T;
}
