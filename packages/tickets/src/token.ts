import { createHmac, timingSafeEqual } from "crypto";

// Compact, tamper-proof ticket token: base64url(payload).base64url(hmac).
// The QR encodes this string; the scanner verifies the signature server-side and
// then enforces single-use in the database.

export interface TicketPayload {
  tid: string; // ticket id
  eid: string; // event id
  v: number; // nonce/version for invalidation
}

function key(): string {
  const k = process.env.TICKET_SECRET || process.env.AUTH_SECRET;
  if (!k) throw new Error("TICKET_SECRET / AUTH_SECRET is not set");
  return k;
}

const b64url = (buf: Buffer | string) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromB64url = (s: string) =>
  Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

function sign(data: string): string {
  return b64url(createHmac("sha256", key()).update(data).digest());
}

export function signTicketToken(payload: TicketPayload): string {
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyTicketToken(token: string): TicketPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts as [string, string];

  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(fromB64url(body).toString("utf8")) as TicketPayload;
    if (!parsed.tid || !parsed.eid) return null;
    return parsed;
  } catch {
    return null;
  }
}
