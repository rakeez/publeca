# Publeca design system

> The visual system for the marketing site, adopted 2026-10-14 at the user's direction:
> the ClickUp style reference ("hardworking dashboard on white marble"), **keeping
> Publeca's pink as the brand and primary CTA color**. Ranks below `CLAUDE.md` (the Writing
> rule) and `docs/positioning.md`; page patterns, motion and demos follow
> `docs/playbook.md`. Source reference: `ClickUpDesign.md` (outside the repo).

## Principles

- **White canvas, grayscale, color used surgically.** Pink marks the brand and the primary
  action; violet marks brand-identity badges and status pills; everything else is gray.
- **Show the product, not decoration.** Heroes and demos are product windows (window chrome,
  status pills, real labels). No stock photos, no decorative section gradients.
- **Flat by default.** Cards are a 1px `slate-200` border or a `slate-50` fill, never a
  shadow stack. The only shadow is on dropdown menus.
- **Pills everywhere.** Every button, tag, chip and badge is `rounded-full`.
- **Heavy, tight headlines; compact everything else.** Big section gaps (80–112px),
  compact gaps inside sections (8–12px).
- **One dramatic animation per page:** the rotating conic border on the hero product card.
  Everything else settles with a short ease-out, and nothing moves under reduced motion.

## Tokens (as implemented)

| Role | Value | Where |
|---|---|---|
| Brand / primary CTA | pink `brand-500` `#ff0066` | `tailwind.config.ts` |
| Identity accent (badges, status) | violet `accent-500` `#635bff` — never a CTA fill | `tailwind.config.ts` |
| Headline ink | `onyx` `#090c1d` | `text-onyx` |
| Ink / dark button | `slate-900` `#202020` | `slate` is remapped to the neutral grayscale |
| Body / secondary text | `slate-600` `#646464` / `slate-500` `#737373` (≥4.5:1) | |
| Default border / hairline | `slate-200` `#e8e8e8` / `slate-300` `#d4d4d4` | |
| Card surface / section band | `slate-50` `#f8f9fa` / `band` `#e9ebf0` | `bg-slate-50`, `bg-band` |
| Dark panel | `linear-gradient(#111 24%, #000)` | `CtaBand` |
| Radii | cards 12px (`rounded-2xl`), large cards 20px (`rounded-3xl`), pills 9999px | `tailwind.config.ts` |
| Page width | 1200px (`max-w-page`), 24px gutter | `Container` |

**Type:** Plus Jakarta Sans for display (700–800, `tracking-display` = −0.04em at 48px+,
`font-display` = −0.03em otherwise); Inter for body (16px/1.5) and UI; JetBrains Mono for
uppercase meta labels (`.mono-label`: 11px, +0.08em) and status pills. Loaded with
`next/font` in `apps/web/src/app/layout.tsx`.

## Components (`apps/web/src/components/marketing/`)

| Component | Pattern from the reference |
|---|---|
| `CtaButton` / `buttonClass` | Filled pill CTA (pink), dark pill, ghost outline pill |
| `Eyebrow`, `.mono-label` | Mono uppercase meta label with a pink dot |
| `StatusPill` | Status pill (mono, tinted fill): stage numbers, departments, "In plan" |
| `BenefitList` | Checkmark list item: bold lead + regular descriptor (hero) |
| `HeroCard` | Product screenshot card, inside the `.conic-frame` rotating border: who → what → how for each reader |
| `PanelTabs` + `BucketPanel` + `HowWeDoIt` | Feature list / tabs: value buckets with their capabilities |
| `DemoCard` | Product window with chrome and a "Sample data" label |
| `CtaBand` | Dark feature card (charcoal-to-black fade, white display heading) |
| header nav | Nav pills (`hover:bg-black/[0.04]`), ghost "Host sign in", pink CTA |

**Gradient text** (`.text-gradient`, pink → violet) is allowed on one phrase of a hero
headline (`home.hero.headlineAccent`). No other gradients except the conic border and the
dark panel fade.

## Not used, and why

- **Trust/logo strip, award badges, stat callouts with numbers:** banned as invented proof
  (`CLAUDE.md`). Use mechanisms, deliverables and demos instead.
- **Black primary CTA:** the reference fills CTAs black; Publeca keeps pink (user direction).
- **Signal blue for links:** links stay ink with a pink hover.
