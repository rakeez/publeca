# Publeca

Event booking, ticketing, and customizable landing-page platform.

Four surfaces, one Next.js app:

1. **Public site** (`(marketing)`) — Stripe-inspired publeca.com
2. **Admin / booking system** (`(dashboard)/app`) — hosts manage events, attendees, payments
3. **Event landing pages** (`(landing)/e/[slug]`) — customizable pages + checkout + conversion tracking
4. **Ticketing / scanner** (`scan`) — QR e-tickets + check-in PWA

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
- PostgreSQL + Prisma (`packages/db`)
- Auth.js (host/admin auth)
- Cloudflare R2 (media), Resend (ticket email)
- Payment provider abstraction (`packages/payments`): PayHere first, then BNPL (Koko, Mintpay)
- Conversion tracking (`packages/tracking`): Meta CAPI + Google Ads
- Monorepo: **npm workspaces** + Turborepo

## Monorepo layout

```
apps/web            # the Next.js app (all 4 surfaces)
packages/db         # Prisma schema + client
packages/ui         # shared components + design tokens
packages/payments   # gateway abstraction
packages/tickets    # QR generation + verification
packages/tracking   # Meta CAPI + Google Ads helpers
```

## Getting started

```bash
npm install
cp .env.example .env   # then fill in values (see SETUP.md)
npm run db:generate
npm run db:migrate
npm run dev
```

See **SETUP.md** for provisioning the database, Vercel, Cloudflare DNS, R2, and email.

## Double-booking / oversell prevention

Inventory is protected at the database level — atomic conditional decrement plus a
`CHECK (quantitySold <= quantityTotal)` constraint, time-boxed reservation holds during
checkout, and idempotent payment webhooks. See `packages/db/prisma/schema.prisma`.
