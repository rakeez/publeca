# Publeca — project instructions for Claude

Publeca is a **growth consulting firm** with its own marketing, engineering, and analytics &
data science teams, plus an **events arm** (event marketing + a self-serve ticketing platform).
This repo is the website (`apps/web`, Next.js) and the events platform (dashboard, checkout,
tickets, scanner). Positioning, audiences, services and offers are defined in
[`docs/positioning.md`](docs/positioning.md) — read it before writing any public copy.
Section patterns, motion, demos and tools follow [`docs/playbook.md`](docs/playbook.md),
which ranks **below** this file and `positioning.md` (where they disagree, they win).

---

## ✍️ Writing rule (MANDATORY for all public copy)

Applies to every page, section, card, package, blog post, meta description, email and CTA.

> **Identify the value from the problem we solve. Pinpoint the exact value we create for the
> customer. Every page speaks to the reader first: who they are and the value they get —
> then the details — then the call to action.**

### Required order — no exceptions

1. **Who + Value** — the first thing a reader sees names *who this is for* (in their own
   terms) and the *exact value* they get. Value is an **outcome**, never an activity.
   - ❌ "We run Google Ads campaigns." (activity)
   - ✅ "For founders paying for clicks that don't convert: a Google Ads account where every
     rupee is tied to a sale you can see." (who + outcome)
2. **Problem** — the problem we solve, phrased the way the customer feels it.
3. **Details** — what's included, how it works, why it works.
4. **CTA** — one clear next step that matches the reader's intent and the segment's tone.

### How to find the value

Problem the customer has → capability that solves it → **the specific value created**.
Name the value precisely: revenue, margin, cost per sale, time saved, risk removed, decisions
made with confidence, control kept, **equity kept**. "Grow your business" is not a value.

### Segment tone

| Segment | Who they are | Tone |
|---|---|---|
| **Directors & CEOs** (`/for/ceos`) | Run their own company, want further growth, little technical knowledge | Plain English, money and outcomes, zero jargon. Explain *what changes for the business*. |
| **Technical founders** (`/for/technical-founders`) | Built the product; want to grow without giving equity to a business co-founder | Direct, specific, mechanism-level. Respect their intelligence. Lead with "keep your equity". |
| **Investors & VCs** (`/for/investors`) | Want a growth team for their portfolio companies | **Understated. Very low push.** Insight and evidence over pitch. No urgency, no superlatives, no exclamation marks, no "limited spots". CTAs are invitations ("compare notes", "request a sample brief"). They smell sales pitches from miles away. |
| **Event organizers** (`/events`) | Our original arm | Practical and energetic; selling out is the outcome. |

### Banned

- **Invented proof:** no fabricated client names, logos, testimonials, case studies,
  percentages, revenue figures, team sizes, years in business, awards or partner badges.
  Use mechanisms and deliverables instead. Real numbers only when the user provides them.
- **Invented prices.** Describe commercial shape (fixed fee, monthly, no equity) only.
- Commodity filler ("in today's fast-paced digital world", "unlock your potential",
  "synergy", "cutting-edge", "game-changer", "leverage" as a verb, "seamless").
- Leading with features, process or "we" before the reader's value.
- AEO/GEO "hacks" Google has said don't work (llms.txt for Google, content chunking,
  writing *for* AI, buying mentions). Our AEO/GEO page sells the honest version.

### Where copy lives (edit content, not templates)

- `apps/web/src/lib/content/types.ts` — the contract. `ValueFirst` (`who`, `value`,
  `valueDetail`, `problem`) is required on every page type, so the type checker enforces the
  rule, and every template renders those fields **first**.
- `apps/web/src/lib/content/services/*.ts` — one file per service page (`/services/[slug]`).
- `apps/web/src/lib/content/segments/*.ts` — one file per audience page (`/for/[segment]`).
- `apps/web/src/lib/content/posts/*.ts` — one file per article (`/blog/[slug]`).
- `apps/web/src/lib/content/home.ts`, `events-hub.ts` — homepage and events arm.
- `apps/web/src/lib/content/site.ts` — the repeated line (*Consulting that builds what it
  recommends.*) and the enemy line. Footer on every page; meta descriptions of `/`,
  `/services/growth-consulting` and `/for/ceos` only. Never in investor headings or meta.
- `apps/web/src/lib/content/demos.ts` — copy **and every sample value** for the deliverable
  demos. Always labelled "Sample data"; no figures (dots and relative bars only).
- `apps/web/src/lib/content/intake.ts` — the `/diagnostic` planner: questions, focus items and
  the pure `planFor()` logic (tested by `intake.test.ts`). Never outputs a score or a number.
- Adding a page = add a content file + register it in `apps/web/src/lib/content/index.ts`.

### Self-check before shipping copy

- [ ] Does the first line name **who** and the **exact value**?
- [ ] Is the value an outcome tied to the customer's problem (not an activity)?
- [ ] Details come *after* value; the CTA comes last and fits the segment's tone?
- [ ] Zero invented numbers, clients, testimonials or prices?
- [ ] Investor copy would not read as a pitch to a skeptical partner?
- [ ] Two-tone headings (`headingDim`): the reader's value is never only in the dim half?
- [ ] Any demo or tool output: sample data labelled, no figures, only what we actually deliver?

### 🔁 Keep this rule current

This rule is a living document. **Whenever the user gives feedback on copy, tone,
positioning, audiences or offers, update this section (and `docs/positioning.md`) in the same
session** so every future session writes the way they want. Note the change in the log below.

**Change log**
- 2026-10-12 — Rule created with the repositioning to full-stack growth consulting
  (audiences: CEOs, technical founders, investors; events kept as an arm).
- 2026-10-14 — Site redone with `docs/playbook.md` (user instruction). Added: the repeated
  line and enemy in the footer, two-tone headings, fear-answering segment headings,
  sample-data demos (no figures), the `/diagnostic` planner and show-your-working copy in
  the ticketing platform. Decisions are recorded in playbook §15.1, pending confirmation.

---

## Engineering notes

- Monorepo, **npm workspaces** (not pnpm) + Turborepo. App: `apps/web`. DB: `packages/db` (Prisma, Neon Postgres).
- Build: `cd apps/web && npx next build`. Deploy: Vercel CLI from repo root
  (`vercel deploy --prod --scope publeca`), not git-connected.
- Inventory: `quantitySold` counts confirmed sales only; holds never touch it (see `packages/db/src/inventory.ts`).
- Payments: named accounts per host (multiple per provider), selected per event; webhook verifies with the order's exact account.
- Brand: pink `brand-500` (#ff0066, logo) + blue `accent-500` (#635bff). Real logo is `apps/web/public/publeca-logo.png` — never recreate it.
- SEO: `robots.ts`, `sitemap.ts`, JSON-LD via `components/json-ld.tsx`. Follow Google's guidance: no AEO hacks, unique non-commodity content.
- Motion: server renders the finished state; `prefers-reduced-motion` shows it with no
  movement; loops stop off-screen and on hidden tabs; hover gated to fine pointers. Runtime in
  `components/marketing/motion.tsx`. `/for/investors` and `/blog`: entrances only.
- Tests: `cd apps/web && npm test` (Node's built-in runner on `*.test.ts`).
