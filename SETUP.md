# Publeca — Phase 0 Setup Guide

This guide covers the external accounts/services Publeca needs. The code is built and
builds cleanly; these steps connect it to a real database, hosting, storage, and email.

Work top to bottom. Each step says **what to do** and **what to give me** (the value to
paste into `.env` locally and into Vercel for production). Anything labelled **secret**
must never be committed.

---

## 0. Prerequisites (already done on this machine)

- Node 24, npm 11, git, GitHub CLI (`gh`, logged in as `rakeez-001`) ✅
- Dependencies installed, Prisma client generated, app builds ✅

To run locally right now (before the DB exists, the marketing pages, login, signup UI,
and scanner render; anything that queries the DB needs step 1):

```bash
npm run dev
# http://localhost:3000
```

---

## 1. Database — Neon (Postgres)  ⏱️ ~5 min

Publeca uses PostgreSQL. Neon is serverless and pairs well with Vercel.

1. Go to **https://neon.tech** → sign up (GitHub login is fine).
2. Create a project named **publeca** in the region closest to your audience
   (e.g. **AWS ap-south-1 / Singapore** for Sri Lanka).
3. In the project dashboard, open **Connection Details**. You need **two** strings:
   - The **pooled** connection string (has `-pooler` in the host) → this is `DATABASE_URL`.
   - The **direct** connection string (no `-pooler`) → this is `DIRECT_URL`.
   - Make sure both end with `?sslmode=require`.

**Give me:** `DATABASE_URL` and `DIRECT_URL` (both **secret**).

Then I (or you) run the migrations to create the tables + oversell constraints:

```bash
npm run db:migrate          # creates tables
# the 0001_oversell_constraint migration adds the CHECK constraints
```

---

## 2. Auth + encryption secrets  ⏱️ ~1 min

Generate two random 32-byte secrets:

```bash
# run twice, once for each
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Give me / set:**
- `AUTH_SECRET` (**secret**) — signs login sessions.
- `CREDENTIALS_ENCRYPTION_KEY` (**secret**) — encrypts hosts' stored gateway keys.

---

## 3. Hosting — Vercel  ⏱️ ~10 min

1. Go to **https://vercel.com** → sign up with GitHub (`rakeez-001`).
2. **Add New → Project** → import the **publeca** repo (created in step 6 below).
3. Framework preset: **Next.js**. Set **Root Directory** to `apps/web`.
4. Build settings (should auto-detect; if not):
   - Install command: `npm install` (run at repo root)
   - Build command: `npm run build`
5. Under **Environment Variables**, add everything from `.env` (all the values from
   steps 1, 2, 4, 5, and later payments). Set them for **Production** and **Preview**.
6. Deploy. You'll get a `*.vercel.app` URL — confirm `https://<url>/api/health`
   returns `{"status":"ok"}`.

**Give me:** the production `*.vercel.app` URL (not secret) so I can set
`NEXT_PUBLIC_APP_URL` / `NEXTAUTH_URL`.

> Note: Vercel runs the app; Cloudflare (next step) only does DNS/CDN/storage.

---

## 4. Domain — Cloudflare DNS  ⏱️ ~10 min

Your domain `publeca.com` is already on Cloudflare.

1. In Vercel: **Project → Settings → Domains → Add** `publeca.com` and `www.publeca.com`.
   Vercel will show the exact DNS records required.
2. In **Cloudflare → publeca.com → DNS → Records**, add what Vercel specified — usually:
   - `A` record `@` → Vercel's IP (Vercel shows it), **or** `CNAME` `@` → `cname.vercel-dns.com`
   - `CNAME` `www` → `cname.vercel-dns.com`
3. Set those records' proxy status to **DNS only** (grey cloud) initially, as Vercel
   recommends, until the domain verifies; you can enable proxying afterward.
4. Wait for Vercel to show **Valid Configuration**.

**Nothing secret here** — just confirm when the domain shows valid in Vercel.

---

## 5. Media storage — Cloudflare R2  ⏱️ ~10 min

For landing-page images/videos and ticket assets.

1. **Cloudflare dashboard → R2 → Create bucket** named **`publeca-media`**.
2. **R2 → Manage R2 API Tokens → Create API token** with **Object Read & Write** for
   that bucket. Copy the **Access Key ID** and **Secret Access Key** (shown once).
3. Note your **Account ID** (R2 overview page).
4. (Public media) **R2 → publeca-media → Settings → Public access**: connect a custom
   domain **`cdn.publeca.com`**. Cloudflare auto-adds the DNS record.

**Give me:**
- `R2_ACCOUNT_ID` (not secret)
- `R2_ACCESS_KEY_ID` (**secret**)
- `R2_SECRET_ACCESS_KEY` (**secret**)
- `R2_BUCKET` = `publeca-media`
- `R2_PUBLIC_URL` = `https://cdn.publeca.com`

---

## 6. Email — Resend  ⏱️ ~10 min

For sending QR tickets.

1. Go to **https://resend.com** → sign up.
2. **Domains → Add Domain** → `publeca.com`. Resend gives you **DKIM/SPF** DNS records.
3. Add those records in **Cloudflare DNS**. Wait for Resend to verify the domain.
4. **API Keys → Create** → copy it.

**Give me:**
- `RESEND_API_KEY` (**secret**)
- `EMAIL_FROM` = `Publeca <tickets@publeca.com>` (adjust the address if you prefer)

---

## 7. Payments — PayHere (Phase 2, do later)  ⏱️ ~15 min

You don't need this for Phase 0, but to get it ready:

1. Register a merchant account at **https://www.payhere.lk**.
2. Complete business verification (this can take a few days — start early).
3. **Settings → Domains & Credentials**: add your domain and generate
   **Merchant ID** + **Merchant Secret**.
4. Enable the **sandbox** account first for testing at
   **https://sandbox.payhere.lk**.

**Give me (when ready):** `PAYHERE_MERCHANT_ID`, `PAYHERE_MERCHANT_SECRET` (**secret**),
and keep `PAYHERE_SANDBOX=true` until we go live.

> BNPL (Koko, Mintpay): hosts will enter their own merchant keys in the admin later;
> no platform-level setup needed now.

---

## How to send me the values

Two options:

- **Easiest & safe:** add each value yourself in **Vercel → Settings → Environment
  Variables** and create a local `.env` from `.env.example`. Then just tell me
  *"env is set"* and I'll continue building features against it.
- **If you want me to wire/migrate things for you:** paste the values and I'll put them in
  `.env` locally. ⚠️ Treat anything marked **secret** carefully — prefer the Vercel route
  for production secrets; rotate any secret that's been shared in chat.

---

## Quick checklist

| # | Service | Values needed | Status |
|---|---------|---------------|--------|
| 1 | Neon Postgres | `DATABASE_URL`, `DIRECT_URL` | ⬜ |
| 2 | Secrets | `AUTH_SECRET`, `CREDENTIALS_ENCRYPTION_KEY` | ⬜ |
| 3 | Vercel | deploy + app URL | ⬜ |
| 4 | Cloudflare DNS | domain valid in Vercel | ⬜ |
| 5 | Cloudflare R2 | `R2_*` keys | ⬜ |
| 6 | Resend | `RESEND_API_KEY`, `EMAIL_FROM` | ⬜ |
| 7 | PayHere | `PAYHERE_*` (Phase 2) | ⬜ |
