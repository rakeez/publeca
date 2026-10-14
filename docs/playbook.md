# Publeca Play Book

How to write, structure, animate and brand a Publeca page so more of the right
readers book a growth diagnostic (or plan an event). It is built from a
teardown of **surge.cloud** (crawled 2026-10-08) and translated into Publeca's
own rules. The business and service context comes from the review site
(`publeca-review.vercel.app`, read 2026-10-14) and `docs/positioning.md`.

Surge Cloud is a Sri Lankan ERP, payments and point-of-sale product. It sells
to small and mid-sized Sri Lankan businesses with paid acquisition running, so
it competes for the same readers' attention as Publeca. Its site is worth
studying for one reason above the rest: **it lets the product demonstrate
itself.** The hero is a living diagram of its thesis, every capability card is
a scripted product demo, and every tab plays real UI.

That idea transfers directly to Publeca. Publeca's difference is that **one
firm owns the result**: it diagnoses, plans, executes with its own departments
and measures from day one (*Consulting that builds what it recommends*).
Showing the deliverables a reader would actually receive proves that better
than claiming it: the opportunity map, the 90-day plan, the weekly read-out, a
sale counted only when payment clears. The events arm already has a real
product, the ticketing platform, which maps onto Surge's demos one for one.

Most of the rest of Surge's site should not be copied: its dark-and-red look,
its logo wall, its absolute claims, its unexplained AI claim and its SEO. This
playbook says why in each case.

> **Version note (2026-10-14).** An earlier version of this file was written for
> a different business (Providence, a car exporter). It has been retargeted to
> Publeca. The Surge teardown (sections 2–6) is unchanged in substance.
> Everything after it is new, and **none of the earlier version's decisions or
> approvals carry over** (see section 15).
>
> **Applied (2026-10-14).** On the user's instruction to redo the website copy,
> animation and tools with this playbook, its proposed default for each open
> question was applied on the `repositioning-growth-firm` branch. The decisions,
> and the places where the build deliberately departs from a recipe, are recorded
> in section 15. Moved into the repo as `docs/playbook.md` (question 9).

---

## 0. How to use this playbook

**This is not a source-of-truth document, and it never overrides one.** It ranks
below `CLAUDE.md` (the Writing rule), `docs/positioning.md`, and the content
contract in `apps/web/src/lib/content/types.ts`. Where anything here disagrees
with them, they win. Raise the disagreement with the user instead of resolving
it here. If the user then changes the rule, update `CLAUDE.md`, `positioning.md`
and the change log in the same session.

1. **The Writing rule's order runs first, every time:** Who + Value → Problem →
   Details → CTA. Every Surge pattern below has to fit inside that order. Any
   pattern that would put features, process or "we" ahead of the reader's
   value is out, however good it looks on Surge.
2. **Patterns are tagged by status.** **Live** means the pattern was already on
   the review site before 2026-10-14. **Applied** means it was built on
   2026-10-14 as the playbook's proposed default (section 15) and is awaiting
   the user's confirmation: keep it, but raise it if the user's feedback touches
   it. `[Proposed]` means it has not been built: propose it, but don't ship it on
   your own initiative.
3. **Every example line uses only documented claims:** the departments,
   method, audiences, packages and service angles in `positioning.md` §1–§5, and
   copy already live on the review site. An example shows how a line is built.
   It is not approved copy for a specific page.
4. **Edit content, not templates.** Copy lives in `apps/web/src/lib/content/`.
   A new pattern that needs a new field (for example, a two-tone heading) is a
   change to `types.ts`, so every page type gets it at once and the type
   checker enforces it.
5. **The investor page is the exception to almost everything here.** Surge is
   a pitch. `/for/investors` must never read like one. Section 9.3 lists what
   is switched off there.

---

## 1. The short version

Surge sells by **showing the product working** and by **repeating one
mantra**. Publeca should take the first idea whole, because showing the work is
the strongest evidence that one firm really does own the result. It should take
the second idea in its own words.

Ranked by expected effect on booked diagnostics:

1. **Show the deliverables working; don't describe them.** Build short, looping
   micro-demos of what a client actually receives: opportunities ranking
   themselves by impact, effort and risk; a weekly read-out assembling; a click
   that only becomes a sale once payment is verified; cost per sale replacing
   cost per click. For events, demo the real ticketing platform. Pattern P3,
   recipe R5. **Applied**
2. **Animate the diagram the home hero already has.** The hero card already
   shows the thesis: a forward-deployed growth executive directing five
   departments through Diagnose → Prioritize → Deploy → Measure → Scale.
   Surge's hero is the same shape (many inputs, one backbone, modules lighting
   up). Pattern P1, recipe R3. **Applied**
3. **Say one line the same way everywhere.** Surge repeats its mantra in the
   hero, the footer and the meta description. Publeca's candidate is already
   the home eyebrow: *Consulting that builds what it recommends.* Section 8.2,
   construction 2. **Applied**
4. **Name the enemy as a situation, then repeat it.** "Growth stalls in the gaps
   between the firms you hire" is **Live** and is Publeca's strongest line.
   Surge puts its enemy in the footer too. Section 8.2, construction 3.
5. **Answer each reader's fear in a heading.** Each segment has a different one:
   the CEO fears funding the wrong bet; the technical founder fears giving up
   equity; the investor fears an outsider overriding the founder; the
   organizer fears ads that never sell tickets. Each has a documented answer.
   Section 8.2, construction 7.
6. **Lead the commercial block with the objection.** Surge's pricing heading
   answers the cost question. Publeca can't publish prices, so it publishes the
   shape: *Fixed fee. About three weeks. The plan is yours to keep.* **Live.**
7. **Make the CTA promise the reader's own answer.** "Review my Google Ads
   account" is **Live** and is the model. Section 8.2, construction 10.
8. **Use show-your-working microcopy.** Surge's configurator explains each
   suggestion. Publeca's read-outs already "state plainly where the data is
   incomplete" (**Live**, investors). Extend that to the ticketing platform's
   setup and to any intake. Section 8.2, construction 11.
9. **Two-tone headings.** One sentence, the resolving clause in muted ink.
   Recipe R1. **Applied** (needs one content-type field).
10. **Don't copy its look or its SEO.** Publeca's light pink-and-blue system
    stays; Surge's canonical points at the wrong host and it ships no
    structured data. Sections 10.1 and 13.

---

## 2. What was crawled

- **Site:** `https://surge.cloud/` (one long landing page, about 14,000 px tall
  at 1440 px wide), `https://surge.cloud/onboarding` (a multi-step
  configurator), and the demo-request dialog. `/sitemap.xml`,
  `/sitemap-index.xml` and `/robots.txt` all return 404, so those three
  surfaces are the whole site.
- **Method:** the rendered DOM and text, the section structure and heading
  outline, the shipped CSS (tokens, keyframes, transitions, media queries) and
  every page script (the hero canvas, the tab controller, the capability
  carousel and its per-card animation modules, the hardware cards, the dialog).
  Screenshots were taken at 1440 × 900.
- **Business:** ERP, payments and POS for small and mid-sized businesses, priced
  in Sri Lankan rupees on the home page, from Surge Global, a digital
  transformation group. Paid acquisition is live (Meta pixel with the
  Conversions API parameter builder, GA4 via GTM, HubSpot).

---

## 3. Teardown: the copy and the frameworks

Surge's copy is short, confident and mostly benefit-led. It is paraphrased
below rather than reproduced. The one direct quote is its mantra.

### 3.1 Section by section

| Section | What the copy does | Framework |
|---|---|---|
| Hero H1 | Introduces the product as the reader's *new* ERP, payments and orchestration platform. The possessive implies the reader already has an old one that is being replaced. | Category claim + replacement framing |
| Hero support line | Names the three jobs (finance, selling, people), then the mantra: payments *"Built in, not bolted on"*. | Antithesis mantra |
| Industries | A two-line heading: stop the old behavior (several disconnected apps), start the new one (one coordinated business). Then five tabs, each with an identity name for the segment and a paragraph of concrete outcomes (batch and expiry tracking, margins by outlet, card payments reconciled to the ledger). | Stop/Start (compressed Problem-Agitate-Solve), named enemy, jobs-to-be-done segmentation |
| Core ERP | A heading that puts every capability on a single platform, then 17 cards. Each card title bolds the capability noun and follows it with three or four specifics. | Consolidation claim, specificity |
| Hardware | Everything from day one, hardware included. Short benefit notes per device, written with rhythm (a terminal that opens on the sale and closes the shift). | Completeness, risk reversal |
| Proof tile | Annual payment volume, then the same figure restated as monthly transactions. | Big number translated into a relatable unit |
| Expert guidance | The size of the parent group, a wall of enterprise logos, a marquee of services. | Borrowed authority |
| Pricing | Heading leads with the objection (transparent price, no setup fee). A row of three "zero" promises. A claim that the product pays for itself from day one. A real monthly price. | Objection-first, rule of three, ROI claim |
| Go-live journey | Four numbered steps from discovery to the first trading day, over a full-bleed photo. Proof stats repeated. | Process reassurance |
| Demo dialog | Promises a walkthrough on the reader's own numbers. A free-text field with a concrete example as its placeholder. A one-line privacy promise under the button. | Personalized outcome CTA |
| Onboarding | Eight questions, then a review screen that says nothing has been built yet, labels each suggestion with why it was made (for example, because of the country chosen), and isolates the handful of settings that cannot be changed later. Save and resume. | Show-your-working, commitment and consistency |
| Footer | Repeats the mantra and the enemy (businesses done with disconnected software). | Mantra repetition |
| Meta description | A list of what it runs, the mantra, the price objection, a call to action. | Compressed version of the whole page |

### 3.2 The frameworks, named

1. **Category claim with a possessive.** "Your new X" sells a replacement, not
   an addition. The reader is cast as someone who already has the problem.
2. **One mantra, three placements.** The antithesis appears in the hero, the
   meta description and the footer. Repetition is what makes a line a brand
   line rather than a headline.
3. **Stop/Start.** Problem and solution in two short sentences. The enemy is a
   behavior (juggling apps), not a competitor, so nobody is named and nobody
   is attacked.
4. **Two-tone heading.** The statement in near-black, the resolution in mid
   gray. The eye reads the first half, the gray half lands as the answer.
5. **Segment by job, name the segment.** Each audience gets an identity name and
   a paragraph of the specific things it does every day.
6. **Bold the noun.** In a long list of capabilities, the bolded noun lets the
   reader scan, and the rest of the sentence carries the specifics.
7. **Objection-first headings.** The pricing heading is the answer to the
   question the reader has at that point in the scroll.
8. **Proof with a translation.** A large number is followed by the same number in
   a unit the reader can picture.
9. **Process reassurance.** Numbered steps make the commitment feel finite.
10. **Personalized CTA.** The button promises the product applied to the
    reader's own situation, not a generic demo.
11. **Show-your-working microcopy.** The configurator explains itself: what it
    suggested, why, and what can still change. This is the best copy on the site.

### 3.3 Where Surge's copy is weak

These are habits Publeca's rules already ban (`CLAUDE.md`, "Banned"). They are
listed so they don't get copied along with the good patterns above.

- **An unexplained claim in the H1.** The headline calls the product an AI ERP,
  and nothing on the page shows or explains the AI. Publeca sells AI solutions
  on one condition: *chosen where payback is measurable* (`positioning.md` §4).
  "AI" never goes in a heading without saying what it does and how it is
  measured.
- **Adjective padding.** Sleek, lightning-fast, seamless. `seamless` and
  `cutting-edge` are on Publeca's banned list.
- **Absolute claims.** A promise of no risk at all, and a product that "pays for
  itself from day one". Publeca's Google Ads FAQ says plainly that a return on
  ad spend can't be guaranteed. Write what is measured and what happens if it
  doesn't work ("cut early, before it absorbs another quarter").
- **We-subject process steps.** One onboarding step says the company is set up
  for the customer end to end. The Writing rule bans leading with "we" before
  the reader's value.
- **Numbers that disagree.** The group is 600+ people in one section and 500+ in
  another; the price is a rupee monthly fee on the home page and a dollar
  licence in the configurator. Publeca publishes no figures today. When the
  user supplies one, it lives in one place and every page reads it from there
  (section 12).
- **Borrowed authority.** The logo wall shows the parent agency's clients, not
  customers of the product being sold. Publeca's rule is stricter: no client
  names, logos, testimonials, team sizes or years in business at all unless
  the user supplies them.
- **Unfinished edges.** A CTA contraction missing its apostrophe, and footer
  links that point at `#`.

---

## 4. Teardown: the UI and the animation

### 4.1 Stack

- **Astro 7**, statically rendered. Each section ships its own small vanilla
  script; there is no client framework runtime.
- Motion is built from four tools: **Canvas 2D** (the hero), the **Web
  Animations API** (`element.animate`) for choreography, **CSS keyframes** for
  ambient loops, and **Shadow DOM** to isolate each product demo.
- Icons: Phosphor (regular and duotone). Forms: native `<dialog>`. Analytics:
  GTM, GA4, Meta pixel plus the Conversions API parameter builder, HubSpot.

### 4.2 Design tokens

| Token | Value |
|---|---|
| Heading font | Inter Tight, weight 600, letter-spacing −0.004em to −0.03em, line-height 1.02–1.1 |
| Body font | Instrument Sans, 18–24 px, line-height 1.4–1.65 |
| Technical labels | JetBrains Mono, 11–12 px (inside the hero canvas) |
| Display sizes | `clamp(34px, 3.47vw, 66px)` for section H2s; up to 96 px |
| Brand color | Red `#E91D27`, hover `#C0161D` |
| Ink / dim | `#16111C` near-black; `#747474` for the dim half of a heading |
| Surfaces | Hero `#0D0D0D` with red radial glows in two corners; light sections in white and pale warm gray |
| Radius | 9 px on buttons, 10–24 px on cards |
| Buttons | 46 px tall, 24 px horizontal padding, 18 px text, weight 500 |
| Container | Max 1762 px |

### 4.3 Section rhythm

Dark hero → white → pale gray → white bento → white logo wall → tinted pricing
→ full-bleed photo under a dark scrim → dark footer. Light and dark alternate at
the two ends of the page, and the middle stays light so product UI reads on it.

### 4.4 The hero canvas

The hero is a single canvas that draws the company's thesis:

- **Five particle streams**, one per industry, each in its own tinted palette,
  travel along cubic Bézier curves from the left edge and **converge into one
  horizontal spine** labelled as the one shared system: a single sign-in and a
  single set of books. About 420 particles per stream on desktop and 600 on
  mobile.
- **Seven modules** sit along the spine as dot-matrix blocks, each with a 7 × 7
  pixel icon (sales, payments, inventory, purchasing, CRM, HR, finance).
- **Every three seconds the featured industry rotates.** Its stream brightens,
  the others dim to about 40%, and the modules that industry uses light up
  white. The industry's name swaps with a word-by-word animation: out upward
  with a 3 px blur over 420 ms, in from below over 680 ms, staggered 35–50 ms
  per word.
- **The particles part around the label**, so the text never sits on noise.
- **Pointer interaction:** particles within 96 px of the cursor are pushed away
  and recolored red; hovering a module highlights it and the industries that
  use it, and pauses the rotation for 2.5 s. A soft red radial glow and a
  masked red dot grid follow the cursor through two CSS custom properties.
- **Performance and access:** device-pixel ratio capped at 2; the loop stops
  when the canvas leaves the viewport (IntersectionObserver) or the tab is
  hidden; frame time is clamped to 48 ms and all easing is frame-rate
  independent; dots are batched by color into one path per fill; under
  `prefers-reduced-motion` it draws one static frame; on narrow screens the
  streams run top to bottom instead.

### 4.5 Tabs with product video

The industries section is a real ARIA tablist: arrow keys, Home and End move
between tabs; hovering switches tabs only on a fine pointer; each tab's short
video restarts from the first frame when it is selected. Videos load lazily
(900 px ahead of the viewport) and the remaining ones are preloaded only after
the first has buffered. Under reduced motion each video is parked on its
**final frame**, so the information is still there. Each video carries an
`aria-label` describing what it shows (for example, an occupancy chart peaking
midweek).

### 4.6 Product micro-demos

The 17 capability cards are each a small scripted demo of the product in use:

- Each runs inside its **own Shadow DOM**, so its CSS cannot leak.
- Each is **authored at a fixed size (570 × 660)** and scaled to the card with
  `transform: scale(var(--k))`, so the choreography never has to be responsive.
- The choreography is an `async` sequence of Web Animations: a fake cursor
  glides to a control, numbers count up, a kanban card is lifted and dropped
  into the next column, a button depresses to 97%, a spinner becomes a success
  tick, a progress bar fills. Then the card fades out and the sequence loops.
- It plays **only while at least 25% visible**, the modules load **one at a
  time in idle time** after the section comes within 800 px, and any failure
  falls back to a static WebP (with a `<noscript>` image as well).

### 4.7 Bento with hover reveal

The hardware grid mixes tall and short tiles. Each device tile plays a
turntable loop when 55% visible; on hover it pauses and cross-fades to a photo
of the device in use, while a one-line note slides up (opacity plus an 8 px
rise over 450–500 ms). One tile is solid brand red and carries a proof figure
instead of a product.

### 4.8 Ambient motion

A blurred hero aura drifts over 14 s; the services marquee runs at 34–38 s per
loop; the pricing card's glow breathes over 6 s and a highlight orbits it over
16 s. All of it is switched off under reduced motion.

### 4.9 Motion vocabulary

| Use | Surge's value |
|---|---|
| Entrances and reveals | `cubic-bezier(.16, 1, .3, 1)` and `cubic-bezier(.22, 1, .36, 1)`, 450–900 ms |
| Exits | `cubic-bezier(.4, 0, .6, 1)`, 350–500 ms |
| Hover color | 150–180 ms, default easing |
| Entrance offset | 12–16 px rise; media scale from 1.035 to 1 |
| Word swaps | 3 px blur plus a full-line vertical slide |
| Ambient loops | 6–38 s, linear or ease-in-out alternate |

Before 2026-10-14 Publeca's only motion token was `animate-fade-up` (a 12 px
rise over 600 ms with `ease-out`). It now uses Surge's entrance curve, and the
other tokens in section 10.3 sit beside it in `apps/web/tailwind.config.ts`.

### 4.10 Forms

The demo request is a native `<dialog>`: four required fields, one optional
free-text field whose placeholder is a concrete example request, inline errors
per field, a privacy line under the button, a success state that says what
happens next, hidden UTM fields, and a data attribute recording **which button
opened it** (hero, pricing or journey). A floating WhatsApp button sits on every
screen.

---

## 5. Teardown: how the landing page is structured

### 5.1 The order and the job of each section

| # | Section | Job in the argument |
|---|---|---|
| 1 | Hero | The claim, shown as a diagram |
| 2 | Industries | "This is for you": the reader finds their own business |
| 3 | Core ERP | Breadth, proven by demos |
| 4 | Hardware | Completeness: everything arrives on day one |
| 5 | Expert guidance | Who stands behind it |
| 6 | Pricing | The cost objection, answered |
| 7 | Go-live journey | How it starts, in four steps |
| 8 | Footer | The mantra once more |

The arc is: **claim → who it's for → what you get (shown) → what arrives → who
is behind it → what it costs → how it starts → act.**

### 5.2 CTA cadence

The same two buttons (request a demo; start the configurator) appear in the
hero, under pricing and in the journey section. No section introduces a third
action. Every repeat is the same decision offered again at the point the
reader has just been persuaded.

### 5.3 The configurator

The configurator replaces a long form with a guided build:

1. Who the account is for (name, contact, role, own business or on behalf).
2. The business, in eight questions, with the promise that the reader will check
   everything before anything is created.
3. A **blueprint** of the business as understood: each card shows a suggestion
   and the reason for it, and every card can be changed.
4. The few settings that cannot be changed later, isolated on their own screen
   and confirmed one by one.
5. Who else needs access.
6. Plain pricing.
7. A generated build plan, with the statement that nothing in it is invented
   and the team will confirm it before go-live. Save and resume at any step.

---

## 6. Teardown: the brand and the marketing

- **Position:** consolidation. One backbone in place of several tools. The enemy
  is a behavior (juggling disconnected software), named again in the footer.
- **Mantra:** one antithesis, repeated in three places.
- **Motif:** dots. The hero's particles, the modules' dot-matrix icons and the
  red dot grid under the cursor are one visual idea: transactions as points
  flowing into one system. The motif carries from the first screen into the
  interaction layer.
- **Proof stack:** payment volume, group size, client logos, the onboarding
  promise.
- **Price as a brand statement:** a real monthly figure in the reader's own
  currency, no setup fee, all features on.
- **Honesty where it matters most:** the configurator, which is the moment of
  commitment, is also where the copy is most candid.
- **Weak spots:** inconsistent numbers, borrowed logos, an unexplained AI claim
  and broken SEO fundamentals (section 13). Its brand is stronger in the
  interaction design than in the claims.

**Why the consolidation story matters to Publeca.** Surge's position and
Publeca's are the same argument in two markets. Surge says: stop juggling
disconnected apps, run one system. Publeca says: stop buying growth in three
pieces (strategy from consultants, marketing from agencies, software from
developers), and let one firm own the result. Surge's structure, enemy and
motif can be borrowed almost directly. Its claims can't.

---

## 7. What transfers to Publeca

| Surge pattern | Publeca equivalent | Governed by | Status |
|---|---|---|---|
| Product demonstrates itself (micro-demos) | The deliverables demonstrated: opportunity ranking, 90-day plan, weekly read-out, verified-sale tracking, cost per sale; the real ticketing platform for events | `positioning.md` §1–§2, §5; CLAUDE.md "Banned" (sample data only, labelled) | **Applied** |
| Hero as a diagram of the thesis | The existing hero card (executive → five departments → five stages), animated | `positioning.md` §1 point 3, §2 | Static: **Live**. Animated: **Applied** |
| One mantra, three placements | *Consulting that builds what it recommends.* in the home eyebrow, the footer and the meta descriptions of `/`, `/services/growth-consulting` and `/for/ceos` | `positioning.md` §1 | Eyebrow: **Live**. Repetition: **Applied** |
| Stop/Start with a named enemy | "The gaps between the firms you hire": strategy stops at the deck, the agency executes without the plan, developers build without the market | `positioning.md` §1 point 1 | **Live** on home; footer repeat **Applied** |
| Two-tone heading | One sentence, second clause in `slate-400`/`slate-500` | CLAUDE.md Writing rule (the value still comes first) | **Applied** |
| Eyebrow label with a dot | **Already in use** (`Eyebrow` in `ui.tsx`, and the pill on the home hero). Keep it a category label; never let it carry the value | Writing rule step 1 | **Live** |
| Lede under every heading | Only when it carries a fact or the reader's value | CLAUDE.md "Banned" (no filler) | Use with care |
| Industry tabs | Segment tabs (CEOs / technical founders / investors) or department tabs on Capabilities | `positioning.md` §3, §1 point 3 | Cards: **Live**. Tabs: **Applied** |
| Hardware bento | "Five departments, one growth plan" as a bento | `positioning.md` §1 point 3 | Grid: **Live**. Bento + reveal: **Applied** |
| Logo wall | **Do not use** unless the user supplies real clients with permission | CLAUDE.md "Banned" | Don't |
| Proof number with a translation | Translate *platform* metrics into *business* units (clicks → cost per sale). No Publeca proof numbers until the user supplies them | CLAUDE.md "Banned"; `positioning.md` §1 point 4 | Use (as mechanism) |
| Price card | Commercial shape only: fixed fee, about three weeks, ends with a 90-day plan, no equity | CLAUDE.md "Banned" (no invented prices) | **Live** |
| "Zero risk" promise row | Documented promises only: the plan is yours to keep; tracking before spend scales; no equity; renewed only by agreement | `positioning.md` §1, §3 | Use |
| Four-step journey | The five-stage method; investors' fifth stage is **Hand over** | `positioning.md` §2 | **Live** |
| Demo dialog | WhatsApp with a segment-specific prefilled message stays the default; email for investors | `positioning.md` §7 | **Live**; dialog only if asked |
| CTA-source attribution | Record which button led to the conversation | Section 11 | **Applied** |
| Configurator | (a) Growth diagnostic intake; (b) ticketing platform onboarding at `/signup` | `positioning.md` §3, §5 | **Applied** |
| Dark/red visual identity | **Do not adopt.** Keep the light pink-and-blue system; dark sections stay as accents | `tailwind.config.ts`, `ValueHero` | Don't |
| Ambient motion, marquee, glowing price card | Home, services and events only. **Never** on `/for/investors` | CLAUDE.md segment tone | Use with care |
| SEO setup | **Do not copy.** Publeca's standard is stricter | Section 13 | Don't |

---

## 8. The copy playbook for Publeca

### 8.1 The voice is already decided

Everything here sits inside the Writing rule in `CLAUDE.md`. The short form:

- **Who + Value first.** The first thing a reader sees names who the page is
  for, in their own terms, and the exact value they get. Value is an
  **outcome** (revenue, margin, cost per sale, time saved, risk removed,
  decisions made with confidence, control kept, **equity kept**), never an
  activity.
- **Then the problem, the way the reader feels it.** Then the details. Then one
  CTA.
- **Segment tone:**
  - **CEOs:** plain English, money and outcomes, zero jargon. Say what changes
    for the business.
  - **Technical founders:** direct and mechanism-level. Lead with "keep your
    equity".
  - **Investors:** understated, very low push. Insight over pitch. No urgency,
    no superlatives, no exclamation marks. CTAs are invitations.
  - **Event organizers:** practical and energetic. Selling out is the outcome.
- **Use the exact names.** The departments are Growth Consulting, Marketing &
  Brand, Engineering, Analytics & Data Science, and Events. The method is
  Diagnose → Prioritize → Deploy → Measure → Scale. The role is a
  *forward-deployed growth executive*.
- **American English** (optimize, color, modeling).
- **No invented proof or prices.** Mechanisms and deliverables instead.
- **Banned filler:** "in today's fast-paced digital world", "unlock your
  potential", "synergy", "cutting-edge", "game-changer", "leverage" as a verb,
  "seamless".

### 8.2 Eleven constructions, translated

Each construction names the Surge pattern, the Publeca rule it has to respect,
and an example built only from documented claims.

**1. Replacement framing, aimed at the reader's current setup.** Surge casts the
reader as replacing an old tool. Publeca's reader already has a consultant, an
agency, a developer, or all three. Cast them as someone who is about to stop
managing the gaps between them. Never name or attack a competitor.

> You stop managing three vendors and start reviewing one set of numbers.
> (**Live**, home.)

**2. One line, said everywhere it fits.** **Applied** Use the same line in the
home eyebrow (already **Live**), the footer on every page, and the meta
descriptions of `/`, `/services/growth-consulting` and `/for/ceos`:

> Consulting that builds what it recommends.

It is Publeca's antithesis, just as Surge's mantra is Surge's: consultants
recommend; Publeca builds. Keep it off `/for/investors` meta and headings,
where a slogan reads as a pitch. The footer can carry it there, because the
footer is site-wide and nobody reads it as a claim made to them.

**3. Stop/Start, with the enemy as a situation, not a competitor.** The enemy is
growth bought in three pieces. **Live** on home:

> Growth stalls in the gaps between the firms you hire.

Its three named gaps are the agitation, and each states a consequence rather
than an insult: the strategy stops at the deck; the agency executes without the
plan; the developers build without the market.

**4. Two-tone heading.** **Applied** One sentence. The first clause in ink, the
resolving clause in muted ink. The value still comes first. Never split the
reader's value across the two tones so that the outcome lands in the gray half.

> Five departments, one growth plan, *one firm accountable.*
>
> Know which growth bet pays *before you fund it.*

**5. Tabs (or cards) that name the reader.** Surge names each segment. Unlike a
single-proposition business, Publeca's segments each have their **own** core
value (`positioning.md` §3), so each tab opens on its own outcome:

> **Directors & CEOs:** know which growth opportunity is worth your money, then
> get a senior executive who delivers it and reports in plain English.
>
> **Technical founders:** keep 100% of your equity: a growth team that runs
> positioning, demand and tracking instead of a business co-founder.
>
> **Investors & VCs:** a senior growth team portfolio companies can call on:
> faster than a hire, more accountable than an agency, reported in plain terms.

(All three are **Live** as cards on home.)

**6. Bold the deliverable.** In a list of what the client receives, bold the
thing they hold, and follow it with the specifics that make it useful.

> **The opportunity map**, every option ranked by financial impact, effort and
> risk.
>
> **The 90-day plan**, with named owners and the numbers it should move.
>
> **The weekly read-out**, in plain language: what moved, what didn't, what
> changes next.
>
> **The partner brief**, in the same format each time, comparable across the
> portfolio. (Investors.)

**7. Answer the fear in the heading.** Each reader's fear, and the documented
answer already in `positioning.md` or on the review site:

| Reader | Fear | Documented answer |
|---|---|---|
| CEO | Funding the wrong bet | Opportunities sized in money and ranked by impact, effort and risk before anything is funded |
| CEO | Jargon, and reports full of clicks | A plain-language read-out every week; cost per sale and revenue by channel, not likes, reach and clicks |
| CEO | Another expensive senior hire that might not work | Senior growth leadership without the search, cost and risk of a full-time C-level hire |
| Technical founder | Giving away equity for go-to-market | No equity. A growth team instead of a business co-founder |
| Technical founder | Tracking they'll have to rebuild | Server-side, revenue-first events, deduplicated by an ID from the business record |
| Investor | An outsider overriding the founder | The founder keeps the decisions; the growth lead keeps the plan moving |
| Investor | Reporting that describes activity | A short brief in the same format each time: what was found, what changed, what it did to the commercial numbers |
| Organizer | Ads that get taps, not ticket sales | A purchase is reported to Meta and Google only when payment clears, with the ticket value attached |
| Organizer | Losing control of the money | Ticket money paid into the organizer's own merchant accounts |

Never write "guaranteed" or "zero risk". Write what is measured, and what
happens if it doesn't work: *what doesn't work is cut early, before it absorbs
another quarter* (**Live**).

**8. Proof, translated, without invented numbers.** Surge restates a yearly
figure as a monthly one. Publeca has no proof figures to restate, and must not
make any up. Two things transfer:

- **Translate the reader's metrics, not ours.** The whole value story is a
  translation: clicks → cost per sale; conversions in the dashboard → sales in
  the CRM; reach → revenue by channel. Use that move in headings.

  > Cost per sale by campaign, *not just cost per click.*

- **Prove by mechanism.** Name the thing that makes the result checkable:
  tracking set up by Publeca's own Analytics & Data Science team before spend
  scales; numbers that reconcile to the CRM, not only to the ad platform.

When the user supplies a real number, it goes in one config, every page reads
it from there, and it gets a translation only if the user supplies that too.

**9. The process, finite and reviewable.** The five stages, each ending in
something leadership can review and decide on (**Live**). Keep the stage names
exact. On investor pages the fifth stage is **Hand over**, because the point
there is that the company keeps what was built.

1. **Diagnose:** where the next growth will actually come from, sized in money.
2. **Prioritize:** a 90-day plan with named owners and the numbers it should move.
3. **Deploy:** a forward-deployed growth executive leads; the specialist teams execute.
4. **Measure:** tracking from day one; a plain-language read-out every week.
5. **Scale:** what works gets more budget and is built into systems; what doesn't is cut early.

**10. The personalized CTA.** The button promises the reader's own answer, in
the segment's tone. **Live** examples:

| Page | Primary | Secondary | Note under the button |
|---|---|---|---|
| Home, `/for/ceos` | Book a growth diagnostic | See how an engagement runs | Fixed fee. About three weeks. Ends with a 90-day plan. |
| `/services/google-ads` | Review my Google Ads account | How it works | Read-only access is enough for a first look. |
| `/for/investors` | Request a sample portfolio brief | Or simply compare notes | One or two pages per company: scorecard, prioritized fixes and the numbers behind them. |
| `/events` | Plan your event | Start free on the platform | Works before or after tickets go on sale. |

The WhatsApp prefilled message is Publeca's equivalent of Surge's free-text
placeholder. Write it in the reader's voice, with a concrete slot they can fill
in. For example: *Hi Publeca, I run a [type of business] and want to know where
our next growth will come from.* The note under the button removes the next
objection (cost shape, access needed, timing). It never adds urgency.

**11. Show-your-working microcopy.** Wherever the site, a demo or an intake
suggests or calculates something, say why and say what can still change:

> Every read-out states plainly where the data is incomplete. (**Live**, investors.)
>
> A purchase is sent to Meta and Google only after payment is verified, so an
> abandoned checkout never counts as a sale. (Events; mechanism **Live**.)
>
> Seats held during checkout never count as sold. (**Live**, events.)
>
> Suggested because your tracking can't yet tie spend to sales. You can change
> this. (Intake, **Applied**.)

### 8.3 Headline formulas

| Formula | Example |
|---|---|
| Outcome + mechanism + "not" the vanity metric | Google Ads that optimize to the sales in your CRM, not to clicks and form fills (**Live**) |
| Know + decision + before commitment | Know which growth bet pays before you fund it |
| Keep + what they fear losing | Keep 100% of your equity |
| Enemy as a situation | Growth stalls in the gaps between the firms you hire (**Live**) |
| Fear, answered | The founder keeps the decisions. (Investors) |
| Two-tone (statement / resolution) | Every capability the plan calls for, *built in-house.* |
| Keyword-first (SEO pages) | Event marketing, management and ticketing in Sri Lanka |

### 8.4 Meta descriptions

Surge compresses the whole page into one line: what it does, the mantra, the
objection, the call to action. Publeca's version, under 155 characters,
follows the Writing rule order:

> [Who + the value] + [the mechanism that makes it checkable] + [the commercial
> shape or the objection answered] + [the action].

> Growth consulting firm that builds what it recommends: a costed growth plan,
> then our own teams to deliver it. Fixed-fee diagnostic to start. (141)

> Event ticketing in Sri Lanka that tells Meta and Google who actually bought,
> so cost per ticket falls. Your own merchant accounts. Start free. (142)

Investor pages describe, they don't sell:

> A senior growth team for portfolio companies, with a short brief a partner
> can read in minutes. Scoped per company and agreed with the founder. (143)

### 8.5 Paid ads

The same constructions, held to the same rules: no invented numbers, no
guarantees, no prices. **No paid ads aimed at investors.** At most, distribute
the insights articles to them; the segment page itself is never pushed.

**Search (responsive search ads), headlines up to 30 characters:**

- Growth Consulting Firm
- One Firm Owns the Result
- Book a Growth Diagnostic
- Fixed Fee, About Three Weeks
- Keep 100% of Your Equity (technical founders)
- Google Ads Tied to Real Sales (service)
- Tracking for Sites and Apps (service)
- Ads That Learn Who Buys (events)

**Descriptions, up to 90 characters:**

- Get a costed answer to where growth comes from, then a senior exec to deliver it.
- Our own marketing, engineering and analytics teams. One plan, one firm accountable.
- Ticket money into your own accounts. Meta and Google told who actually bought. (events)

**Social (primary text), CEOs, Stop/Start plus the fear:**

> Most companies buy growth in three pieces: strategy from consultants,
> marketing from agencies, software from developers. Each can be done well
> and the result still belongs to nobody. A Growth Diagnostic gives you a
> costed answer to where your next growth comes from, and a 90-day plan your
> leadership can act on, with us or without us.

**Social, technical founders, mechanism-first:**

> You built the product. Go-to-market doesn't need a co-founder with a
> double-digit stake. It needs positioning, demand and tracking you'd trust in
> production. Keep 100% of your equity.

(Check the second one with the user: "double-digit stake" is a characterization
of a typical co-founder deal, not a Publeca claim, but it is still a number.)

### 8.6 Words Surge uses that we don't

seamless, sleek, lightning-fast, zero risk, pays for itself, AI-powered
(unexplained), end to end (as a promise), "your new [category]", "built in, not
bolted on" (Surge's own mantra; never borrow it, even though the ticketing
platform's tracking really is built in).

---

## 9. The landing-page structure playbook

### 9.1 The arc

Surge's order is claim first. Publeca's order is fixed by the Writing rule, and
the content types already enforce most of it (`ValueFirst`: `who`, `value`,
`valueDetail`, `problem`). Mapped against Surge:

| Step | Publeca content | Component / field | Surge equivalent |
|---|---|---|---|
| Who + Value | Who the page is for; the outcome they get; what changes | `ValueHero` (`who`, `value`, `valueDetail`) | Hero claim (but Surge leads with the category, not the reader) |
| Problem | The problem, as the reader feels it | `ProblemCallout` (`problem`) | Industries Stop/Start |
| What you get | Outcomes as a checklist | `CheckList` | Pricing promise row |
| Details: what's included | Deliverables, shown where possible | cards; P3 demos | Core ERP cards |
| How it runs | The five stages | `NumberedCards` | Go-live journey |
| Commercial shape | Packages, "Recommended start", fixed fee / monthly / no equity | `Package` | Pricing card |
| Who it's for / capabilities | Segment cards, related services | cards, `ScrollRow` | Industries tabs |
| Insights | Articles for this reader | post cards | none (Surge has no content) |
| Questions | Pre-engagement FAQ | `FaqList` (+ FAQPage JSON-LD) | none |
| CTA | The same primary action, repeated | `CtaBand` | Demo dialog |

### 9.2 The section pattern library

Propose from this list. Every pattern needs the user's go-ahead on that page.

**P1 — Hero with a living diagram.** **Applied** (home only). Keep the
`ValueHero` text exactly as it is: the who line, the value H1, the detail, the
CTA and the note. Animate the existing card beside it. The five departments
converge on the forward-deployed growth executive, and the five stages light in
turn. Recipe R3. The diagram illustrates the value; it never replaces it.

**P2 — Segment or department tabs.** **Applied** One tab per reader (home
"Who we help") or per department (home "Capabilities"). Each panel opens on
that reader's or department's value line, then three or four deliverables, then
its link. All panels are in the server HTML. Recipe R4.

**P3 — The deliverables, demonstrated.** **Applied** Three to five looping
micro-demos of things a client actually receives:

- **The opportunity map:** a handful of opportunity cards sorting themselves
  by financial impact, effort and risk, with the top three pulled into a
  90-day plan with owner slots.
- **The weekly read-out:** three lines writing themselves (what moved, what
  didn't, what changes next), with a "data incomplete" flag shown where it
  applies.
- **Click → verified sale:** an ad click, a checkout, payment verified, and
  only then a purchase event with value and order ID sent to Meta and Google.
  An abandoned checkout sends nothing. (This is the events platform's real
  behavior, and the same principle as the server-side tracking service.)
- **Cost per click → cost per sale:** a campaign table whose headline column
  changes from clicks to cost per sale once CRM outcomes flow back.
- **The partner brief:** a one-page scorecard filling in. (Investors only, and
  only as a static image, never animated; see 9.3.)

Rules: every demo shows **sample data, visibly labelled "Sample data"**. No
value may look like a client result: use round, obviously illustrative values
or relative bars without figures. A demo of something Publeca doesn't hand the
client isn't allowed, however good it looks. Recipe R5.

**P4 — Five departments, as a bento.** **Applied** The "Built like a firm"
grid as mixed tiles: Growth Consulting as the large tile (it directs the
rest), the other four around it. On fine pointers, hover reveals the
department's one-line outcome; on touch it is always visible. Recipe R6.

**P5 — Who is behind it.** Explain the forward-deployed growth executive's
role, and show that the five departments are Publeca's own (**Live** in the
copy). No team size, years, logos or headshots unless the user supplies them.

**P6 — The commercial shape.** **Live.** Packages with the recommended start
marked. Duration, fee shape (fixed fee / monthly / renewed only by agreement)
and what you walk away with, never a price.

**P7 — The five stages.** **Live** (`NumberedCards`). Each stage ends in
something reviewable. A line connecting the stages that draws itself as it
enters the viewport is the one motion it can take. **Applied**

**P8 — The conversation.** **Live.** WhatsApp, prefilled by segment, is the
primary channel; email for the investor brief. An inline intake form or dialog
is `[Proposed]` and only if the user asks (see P11).

**P9 — The FAQ.** **Live.** Pre-engagement questions only, answered plainly,
with FAQPage JSON-LD built from the same list (`FaqList withSchema`).

**P10 — One secondary CTA.** **Live.** "See how an engagement runs", "How it
works", "Or simply compare notes".

**P11 — The configurators.** **Applied**

- **(a) Growth diagnostic intake.** A tool page modeled on Surge's
  onboarding: six to eight questions (business type, who you answer to, where
  revenue comes from today, what's tracked, what's been tried, what's in the
  way). Then a short, readable summary of *what we'd look at first, and why*,
  with every item labelled with the answer that produced it. It ends in the
  same primary CTA. It never produces a score, a forecast or a number.
- **(b) Ticketing platform onboarding (`/signup`).** The closest Publeca
  surface to Surge's configurator, because it is a real self-serve product.
  Apply show-your-working microcopy to the steps that matter: which merchant
  account the money goes to, what the tracking will send and when, and which
  settings can't be changed after tickets go on sale.

### 9.3 By page family

- **Home (`/`):** P1, P2, P3 (two or three demos), P4, P7. The busiest page,
  and the only one where the hero diagram animates.
- **`/for/ceos`:** P3 limited to the read-out and cost-per-sale demos (the two a
  non-technical reader understands at a glance), P6, P7. Plain English in every
  demo label.
- **`/for/technical-founders`:** P3's click → verified-sale demo can show
  real mechanism (event names, dedup by order ID), because this reader wants
  the mechanism. P6, P7.
- **`/for/investors`:** **Quiet page.** Entrances only (a short fade). No
  animated diagrams, no count-ups, no marquee, no cursor spotlight, no glowing
  cards, no floating badges. A static sample of the partner brief is the one
  visual that earns its place, and only when the user supplies or approves it.
  It must look like the other pages, just calmer, not like a different site.
- **`/services/[slug]`:** one P3 demo where the service has a natural one
  (Google Ads, social media ads, tracking & analytics, AI solutions). Others
  stay text and checklist.
- **`/events` and the ticketing platform:** the most energetic family. The
  real event-page, checkout, QR ticket and scanner UI can be demoed directly
  (P3, R5), and the "Live / Your event page" card already on `/events` is the
  seed of it.
- **`/blog/[slug]`:** no motion beyond entrance. Content is the product.

### 9.4 CTA cadence

One primary action per page. Repeat it at the points the reader has just been
persuaded: after the hero, after "what you get" or the demos, after the
commercial shape, and in the closing `CtaBand`. Never add a different action
between them. The floating WhatsApp button is the same route as the primary
CTA, not a second funnel. On `/for/investors` the CTA appears only at the top
and the end.

---

## 10. The UI and animation system for Publeca

### 10.1 Keep the Publeca look

Light surfaces, slate text, pink `brand-500` (#ff0066) as the primary, blue
`accent-500` (#635bff) as the accent, and the `ValueHero`'s soft pink and blue
radial glows. Dark sections (`tone="light"`) are allowed as accents in the
middle of a page, as Surge alternates its own. Surge's dark hero with red
glows doesn't transfer: Publeca's pink is already close to Surge's red, and a
dark hero would make the two sites look alike. A dark hero variant is a
question for the user (section 15), not a default. Never recreate the logo;
use `apps/web/public/publeca-logo.png`.

### 10.2 Type

The site uses **Sora** for display (`font-display`, −0.02em) and **Inter** for
body, both via `next/font` in `apps/web/src/app/layout.tsx`. Take Surge's heading
treatment, not its fonts:

- Display headings at `font-bold` (as today) with `tracking-tight` to
  `tracking-tighter` (−0.02 to −0.03em), line-height 1.05–1.1. `ValueHero`
  already uses `leading-[1.08]`.
- The dim half of a two-tone heading in `slate-400` on white, `slate-500` on
  pale backgrounds. Check contrast (`slate-400` on white is below 4.5:1, which
  is acceptable only at heading sizes).
- Technical labels inside demos (stage names, event names, "Sample data"): no
  mono font is loaded. Use Inter with `tabular-nums` and uppercase tracking, as
  `Eyebrow` does, rather than adding a third font. Loading Geist Mono or
  JetBrains Mono for demos only is `[Proposed]`.

### 10.3 Motion tokens

As of 2026-10-14 (still **no motion library**): the tokens below live in
`tailwind.config.ts` (`ease-out-expo`, `ease-exit`, `animate-fade-up`,
`animate-word-in`, `animate-marquee`, `animate-aura-drift`), the reveal,
spotlight, bento and reduced-motion CSS in `globals.css`, and the runtime
(`MarketingMotion`, `usePlayable`, `useSequence`, `Spotlight`) in
`components/marketing/motion.tsx`:

| Token | Value | Status |
|---|---|---|
| Entrance easing | `cubic-bezier(.16, 1, .3, 1)` (replace `ease-out` in `fade-up`) | **Applied** |
| Exit easing | `cubic-bezier(.4, 0, .6, 1)` | **Applied** |
| Entrance | 12–16 px rise, 600 ms | **Exists** (12 px) |
| Media entrance | scale 1.035 → 1, 780 ms | `[Proposed]` |
| Word swap | out: −105% Y, 3 px blur, 420 ms, 35 ms stagger; in: from +105% Y, 680 ms, 50 ms stagger | **Applied** (hero only) |
| Hover color | 150–180 ms | Tailwind `transition-colors` |
| Ambient loops | 14–38 s, never synchronized | **Applied** (home and events only) |
| Reduced motion | One global `@media (prefers-reduced-motion: reduce)` block that removes every animation and transition | **Required before any motion ships** |

### 10.4 Existing components, and where each pattern uses them

All in `apps/web/src/components/marketing/ui.tsx` unless noted.

| Component | Use for |
|---|---|
| `ValueHero` | Every page's opening: Who + Value + detail + CTA. P1 sits beside it, never inside the H1 |
| `Eyebrow` | Category label above a heading (Surge's dotted eyebrow) |
| `SectionHeading` | Every section heading; R1 extends it |
| `ProblemCallout` | The problem block, straight after the hero |
| `CheckList` | "What you get" outcomes |
| `NumberedCards` | The five stages (P7) |
| `ScrollRow`, `scrollItem` | Mobile card carousels (snap rows) |
| `FaqList` | P9, with FAQPage JSON-LD |
| `CtaButton`, `CtaBand` | Every CTA; `CtaBand` closes the page |
| `Breadcrumbs` | Service, segment, post pages |
| `components/whatsapp.tsx` | The floating consultant route |
| `components/json-ld.tsx` | Structured data |

### 10.5 New recipes

**R1 — Two-tone heading.** **Applied** One `<h2>` (or `<h1>`) with two spans;
the second takes the dim color. Implementation: add an optional
`headingDim?: string` beside each heading field in `types.ts`, and render it in
`SectionHeading` and `ValueHero`. It is still one heading and one sentence, and
screen readers read it as such. The reader's value never sits only in the dim
half.

**R2 — Cursor spotlight.** **Applied** (home and events heroes only). On
`pointermove`, write the pointer position to two CSS custom properties on the
section inside a `requestAnimationFrame`. A pseudo-element draws a soft radial
glow at that point in `brand-200`/`accent-200` at low opacity, and a second
layer shows a dot grid through a radial mask. Fine pointers only
(`@media (hover: hover) and (pointer: fine)`), and off under reduced motion.

**R3 — Convergence diagram.** **Applied** Five streams, one per department
(read from the same content list the "Built like a firm" section uses, never
typed twice), flow into one node labelled *Forward-deployed growth executive*,
then along a spine of the five stages. Every three seconds the featured
department rotates: its stream brightens, its label swaps with the word-swap
token, and the stages it contributes to light in turn. SVG plus CSS is enough
at this scale and keeps the text real and indexable. Use Canvas 2D only if the
particle effect is wanted, and then follow Surge's rules: DPR capped at 2; stop
on IntersectionObserver exit and `visibilitychange`; clamp frame time; batch
fills by color; one static frame under reduced motion; a vertical layout below
`md`. Put the geometry in `src/lib/` as pure functions.

**R4 — Tabs with media.** **Applied** A real ARIA tablist (arrow keys, Home,
End, roving `tabindex`). Hover switches tabs on fine pointers only. All panels
are in the server HTML, so their text is indexed. Any video is muted,
`playsinline`, `preload="none"` until near the viewport, restarts on
selection, and rests on its final frame under reduced motion, with an
`aria-label` that says what it shows.

**R5 — Deliverable micro-demo card.** **Applied** A stage authored at a fixed
size and scaled to its card with `transform: scale()`. The sequence is an
`async` function of Web Animations (cursor glide, row reorder, line writes
itself, tick), looping only while at least 25% visible, loaded in idle time,
and falling back to a static image. **Every value in a demo comes from one
sample-data module** (for example `src/lib/content/demo-samples.ts`), never from
literals scattered in components, and the card shows a visible "Sample data"
label. For the ticketing platform, prefer rendering the real components with
sample props over a recording.

**R6 — Bento with hover reveal.** **Applied** A CSS grid of mixed tile sizes.
On fine pointers, hover reveals the tile's one-line outcome (opacity and an 8 px
rise, 450–500 ms). On touch it is always visible. No stock photos of
handshakes or meetings; use the department's own deliverable as the tile's
visual.

**R7 — Marquee.** **Applied** (services list, home only). A CSS transform
loop over a duplicated list; the duplicate is `aria-hidden`. Pause on hover
and under reduced motion. Never on `/for/investors`.

### 10.6 Performance and accessibility rules

From Surge's code, and from this repository's setup:

- Stop every loop off-screen and when the tab is hidden.
- Honor `prefers-reduced-motion` everywhere. Add the global block first (10.3);
  any hand-written canvas or Web Animation has to check it itself as well. The
  finished state is the information; the motion is only the delivery.
- Gate hover behavior on `(hover: hover) and (pointer: fine)`.
- Server HTML must contain the finished state and the full text of every demo,
  tab and diagram label, so it is indexed and readable without JavaScript.
- Pre-size images; keep eager loading to the first screen.
- Check every page at 375 px with no horizontal scroll (`Container` is
  `px-6`, a 24 px gutter).
- The preview pane may not run animation frames: check frame-driven behavior in
  a real browser or with unit tests, and check the deploy against the served
  HTML (curl), not the DOM. Logic is unit-tested with Node's built-in
  runner (`npm test` in `apps/web`, files `*.test.ts`); keep motion and intake
  logic in pure functions so it can be.

---

## 11. Conversion mechanics

- **The conversation is the end of the page.** WhatsApp (+94 75 365 0002) with
  a segment-specific prefilled message is the default; email
  (hello@publeca.com) for the investor brief. Every prefilled message reads
  like something the reader would actually send.
- **CTA-source attribution.** **Applied** Surge records which button opened
  its dialog. Publeca can do the same by tagging the CTA's location (hero,
  demos, packages, closing band) and page, either as a short reference in the
  prefilled message or as an analytics event on click. Either one would show
  which section persuades.
- **One consultant route.** The floating WhatsApp button and the in-page CTAs go
  to the same place.
- **The intake** (P11a) is the configurator's equivalent for consulting. The
  **ticketing signup** (P11b) is its direct equivalent for events, and already
  exists as a product surface.
- **The success state matters.** Whatever replaces or supplements WhatsApp
  (a form, the intake) must say who replies, roughly when, and what the reader
  will get first.

---

## 12. The brand-building playbook

1. **One position, the same words everywhere.** `positioning.md` §1: a
   full-stack growth consulting firm that finds where the next growth comes
   from and executes it itself. Strategy and execution in one firm, so one
   firm answers for the result.
2. **One repeated line.** **Applied** *Consulting that builds what it
   recommends.* In the home eyebrow (**Live**), the footer on every page, and
   the meta descriptions named in 8.2.
3. **One motif: the verified sale.** Surge's dots stand for transactions
   converging into one system. Publeca's equivalent is the thing it measures:
   activity (clicks, reach, taps) converging into **one number the business
   recognizes**, a sale that is counted only once it is real. The hero
   diagram, the click → verified-sale demo, the cost-per-sale table and the
   events platform's tracking are all that same idea. Every new animation
   should be something a client would recognize from their own reporting, not
   decoration.
4. **One set of numbers.** Publeca publishes none yet. When the user supplies
   one, it lives in one config file, every page reads it from there, and
   nothing is derived from it without the user's say-so.
5. **Proof we own.** Mechanisms, deliverables and insights articles, never
   borrowed logos or invented testimonials. Real client proof is a question
   for the user each time.
6. **Honesty at the moment of commitment.** Surge is most candid in its
   configurator. Publeca is already candid at the point of booking: *the plan
   is yours to keep*, *with us or without us*, *renewed only by agreement*,
   *read-only access is enough for a first look*. Keep every CTA note in that
   register.
7. **The events arm keeps its own energy, under the same brand.** Same colors,
   type and honesty rules; louder tone and more motion. It is "the events arm
   Publeca started with", not a separate company.

---

## 13. SEO: where Surge fails, and the standard Publeca keeps

| Surge | Publeca standard |
|---|---|
| Canonical and `og:url` point at the Railway host, not `surge.cloud` | Canonical on the production domain; non-production builds kept out of search indexes |
| No JSON-LD | JSON-LD via `components/json-ld.tsx` (Organization, Service, FAQPage, Article as fits the page) |
| No sitemap or robots file | Both, generated (`app/sitemap.ts`, `app/robots.ts`) |
| One page, no keyword pages | One page per service, segment and article, each with a unique title, description and H1 |
| H1 is a category claim nobody searches | H1 is the reader's value, with the page's primary keyword in the H1 and first paragraph. Home's H1 contains "growth consulting firm"; its title and description cover marketing, management consulting and events |
| No FAQ | Pre-engagement FAQ in the served HTML, with FAQPage JSON-LD |
| No content | Insights articles written for each segment, unique and non-commodity |

And the AEO/GEO rule Publeca sells: follow Google's guidance. No llms.txt for
Google, no content chunking, no writing *for* AI, no bought mentions. Expert,
citable content and sound technicals only.

---

## 14. Checklists

### 14.1 Before proposing a page or section

- [ ] Page family and segment settled; tone matches the segment table.
- [ ] Primary keyword, intent and the questions buyers ask researched.
- [ ] Section list follows the Writing rule order, drawn from the pattern
      library, each with its job and its source of facts.
- [ ] Every `[Proposed]` pattern flagged as a question, not assumed.
- [ ] Every claim listed for the user to confirm before copy is written.

### 14.2 Before shipping copy (the `CLAUDE.md` self-check, plus Surge habits)

- [ ] The first line names **who** and the **exact value**.
- [ ] The value is an outcome tied to the reader's problem, not an activity.
- [ ] Details come after value; one CTA comes last and fits the segment's tone.
- [ ] Zero invented numbers, clients, testimonials or prices.
- [ ] Investor copy would not read as a pitch to a skeptical partner.
- [ ] No Surge habit carried over: no "zero risk", no unexplained AI, no
      adjective padding, no "we" before the reader's value.
- [ ] Department, method and role names exact; American English.

### 14.3 Before shipping motion

- [ ] The global reduced-motion block exists, and reduced motion shows the
      finished state.
- [ ] Stops off-screen and on a hidden tab.
- [ ] Hover behavior gated to fine pointers.
- [ ] Demos show "Sample data", read values from the one sample module, and
      nothing looks like a client result.
- [ ] No motion beyond entrances on `/for/investors` or `/blog`.
- [ ] Server HTML shows the finished state and the full text (curl the deploy).
- [ ] Checked at 375 px with no horizontal scroll.

---

## 15. Open questions for Publeca (2026-10-14)

These were the open questions; section 15.1 records how each was applied. The decisions in
the earlier version of this file (2026-10-09) were made for Providence and are
**void here**. That includes its repeated line, its approval of two-tone
headings and tool demos, its dark-hero A/B ruling and its attribution decision.

Questions for the user, in order of impact:

1. **Deliverable demos with sample data (P3, R5).** Is a clearly labelled
   "Sample data" demo acceptable under the no-invented-numbers rule? If not,
   should the demos use bars and orderings with no figures at all?
2. **The repeated line.** Is *Consulting that builds what it recommends.* the
   line for the footer and meta descriptions, and should it appear on
   `/for/investors` at all (footer only is the proposal)?
3. **The animated hero diagram (P1, R3)** on home: SVG and CSS (proposed), or
   a particle canvas like Surge's?
4. **Two-tone headings (R1).** Yes or no? A yes means adding `headingDim` to
   the content types.
5. **Motion budget.** Add the proposed tokens and the global reduced-motion
   block? Confirm that `/for/investors` and `/blog` stay at entrances only.
6. **CTA-source attribution.** By a reference in the WhatsApp message, or by
   an analytics event on click?
7. **The intake (P11a)** and **show-your-working copy on `/signup` (P11b).**
   Scope either now?
8. **A dark hero variant.** No change by default. Worth an A/B test on any
   page?
9. **Where this playbook lives.** Move it into `docs/` in the repo and point to
   it from `CLAUDE.md`, ranked below the Writing rule and `positioning.md`?

When the user answers, record each decision here with its date. Update the
status tags in sections 1, 7 and 9, and, where the answer changes copy rules,
update `CLAUDE.md` and `positioning.md` in the same session.

### 15.1 Decisions applied (2026-10-14)

The user asked for the website copy, animation and tools to be redone with this
playbook. Each question above was answered with the playbook's own proposed
default. These stand until the user confirms or reverses them; a reversal is
recorded here with its date.

| # | Decision applied | Where it lives |
|---|---|---|
| 1 | Demos use labelled sample data **with no figures at all**: 1–5 dots and relative bars only, so nothing can read as a client result. | `lib/content/demos.ts` (copy + every sample value), `components/marketing/demos.tsx` |
| 2 | *Consulting that builds what it recommends.* in the home eyebrow, the footer on every page (with the enemy line), and the meta descriptions of `/`, `/services/growth-consulting` and `/for/ceos`. Investors: footer only. | `lib/content/site.ts`, `(marketing)/layout.tsx` |
| 3 | Hero diagram in HTML + CSS (no canvas): departments converge on the growth executive; featured department rotates every 3 s; outcome word-swaps; stages light in turn; hover pauses. | `components/marketing/growth-diagram.tsx` |
| 4 | Two-tone headings: yes. `Heading.headingDim` in `types.ts`, rendered by `SectionHeading`. | `types.ts`, `ui.tsx` |
| 5 | Motion tokens and the global reduced-motion block added. `/for/investors` and `/blog` stay at entrances only (verified in served HTML: no demos, connectors, spotlight, marquee or loops on investors). | `tailwind.config.ts`, `globals.css`, `components/marketing/motion.tsx` |
| 6 | CTA-source attribution by **analytics event on click** (`data-cta` → `dataLayer.push({event:"cta_click"})`), not a reference in the WhatsApp message. **Note:** no analytics tag is installed on the marketing pages yet, so the events are queued but not collected until GA4/GTM is added. | `motion.tsx` (`MarketingMotion`), `CtaButton source` |
| 7 | Both scoped. (a) Intake at `/diagnostic`: six questions → what a diagnostic would look at first, each item labelled with the answer(s) behind it, no score; answers leave the browser only in a WhatsApp message the reader can edit. (b) Show-your-working copy on `/signup`, event tracking settings, per-event payment methods and ticket types. | `lib/content/intake.ts` (+ `intake.test.ts`), `components/marketing/intake-planner.tsx`, dashboard pages |
| 8 | No dark hero. No A/B test set up. | — |
| 9 | Playbook moved to `docs/playbook.md`, pointed to from `CLAUDE.md`, ranked below the Writing rule and `positioning.md`. | this file |

**Where the build departs from a recipe, and why**

- **Dim heading color (R1):** `slate-500` on light backgrounds, not `slate-400`.
  `slate-400` on white is about 2.6:1, below WCAG's 3:1 even for large text.
  `slate-400` is kept for the dim half on dark sections.
- **Demo stages (R5):** responsive CSS, not a fixed 570 × 660 stage scaled with
  `transform`. The choreography is rows, chips and bars, which reflow cleanly, and
  the server-rendered finished state is then correct before any script runs.
  Demos stack full-width on phones.
- **Demo loops** are React state steps with CSS transitions rather than Web
  Animations; they run only while ≥25% visible, the tab is visible and motion is
  allowed (`usePlayable`, `useSequence`).
- **Bento (R6):** the outcome line is always visible; on fine pointers hover lifts
  the tile and brings the outcome into full ink. Hiding it until hover would hide
  the reader's value from touch and keyboard readers.
- **Scroll reveal:** content is hidden only after the motion runtime has mounted,
  and anything already on screen at load is never hidden, so a failed script can't
  leave a section blank. Reveals are one-shot animations, not transitions, so they
  never delay hover effects.
- **Not built:** media entrance token, mono font for demos, tab videos, the
  investor partner-brief image (needs a user-supplied or approved sample), and an
  inline intake dialog.

**Copy accuracy fixes found while building**

- The events FAQ said buyers pay "into your accounts, not ours". The platform
  offers Publeca's own PayHere account on every event unless the organizer
  unticks it (`lib/payment-config.ts`), so the FAQ and the dashboard now say so.
- "Most clients start with the first and grow from there" (package intro) implied
  a client base; replaced with why the first package is the recommended start.

### 15.2 User direction: redesign (2026-10-14, later the same day)

The user reviewed the first preview and directed a redesign. These are **user
decisions**, not defaults, and they override the matching rows of 15.1.

- **Hero eyebrow pill removed.** *Consulting that builds what it recommends.* no
  longer sits above the home H1. It stays in the footer on every page and in the
  three meta descriptions (15.1 row 2, otherwise unchanged).
- **Visual system: the ClickUp style reference, keeping Publeca's pink** as brand
  and primary CTA color. Codified in `docs/design-system.md`. Section 10.1–10.2 of
  this playbook (light pink-and-blue system with radial glows, Sora display) is
  superseded by it: Plus Jakarta Sans display, neutral grayscale, flat 1px-border
  cards, pills, mono meta labels, one rotating conic border per page.
- **Information architecture: services pooled into value buckets**
  (`lib/content/buckets.ts`): *Know where to grow*, *Turn spend into sales*, *Be
  found and chosen*, *Remove what caps growth*, *Sell out the room*. Each bucket
  leads with who + value + problem + outcomes, then a **"How we do it"** breakdown
  of the capabilities (service pages) and the in-house department behind each. The
  home page, `/services`, the nav menu, the footer and each service page's eyebrow
  and "more ways to …" row all read from the buckets.
- **Hero card = who → what → how** (user direction, same day). The "For directors and
  CEOs …, technical founders …, and the investors who back them" line moved off the hero
  and into the card (`components/marketing/hero-card.tsx`, content `home.hero.audiences`):
  01 who it's for (the three readers, each need in their words), 02 what you get, 03 how
  it's done (the growth executive, the teams involved, the package it starts with). It
  rotates through the readers; it replaces the department/stage diagram (R3). The card
  follows the H1 directly on phones, so the reader still finds themselves first.
- **Patterns retired by the redesign:** R2 cursor spotlight, R6 bento, R7 services
  marquee, the hero aura and the home "value" and "capabilities" sections (folded
  into the buckets). P2 tabs now switch between buckets instead of readers; "Who we
  help" is three cards.

---

## Appendix A — Implementation notes for Claude Code

Paths verified on 2026-10-14 against the `repositioning-growth-firm` branch.

- **Where copy lives:** `apps/web/src/lib/content/`. `types.ts` is the
  contract (`ValueFirst`, `Service`, `Segment`, `Package`, `Post`,
  `HomeContent`, `EventsHubContent`, `FAQ`, `Cta`, `SeoMeta`). One file per
  service in `services/` (15), per segment in `segments/` (`ceos`,
  `technical-founders`, `investors`), and per article in `posts/`. Home is
  `home.ts`; events is `events-hub.ts`. Register new pages in `index.ts`.
- **Templates:** `apps/web/src/app/(marketing)/` (`page.tsx` for home,
  `services/`, `for/`, `blog/`, `events/`, `contact/`). The footer is in
  `(marketing)/layout.tsx`, which is where the repeated line goes.
- **UI primitives:** `apps/web/src/components/marketing/ui.tsx` (section 10.4).
- **Brand and contact:** `apps/web/src/lib/brand.ts` (`WHATSAPP_NUMBER`,
  `whatsappUrl`, `mailtoUrl`, `ctaHref`, `CONTACT`). Colors in
  `apps/web/tailwind.config.ts` (`brand`, `accent`); fonts in
  `apps/web/src/app/layout.tsx` (Inter, Sora); base styles in
  `apps/web/src/app/globals.css`.
- **Motion:** see section 10.3 and `components/marketing/motion.tsx`. Mark an
  element `data-reveal` (optionally `style={{"--reveal-i": i}}` to stagger) for a
  scroll entrance; `data-reveal="line"` draws a line. No framer-motion.
  Tailwind 3.4, Next 15, React 19.
- **Demos:** `lib/content/demos.ts` (copy + sample values) →
  `components/marketing/demos.tsx` → `DemoSection` in `demo-section.tsx`. Add
  `demos` to a service, segment or the events hub content to show them.
- **Tracking:** `apps/web/src/lib/tracking.tsx` (`MetaPixel`, `GoogleGtag`),
  `lib/meta-capi.ts`, `lib/fire-conversion.tsx`. These are the events
  platform's real purchase tracking, and the source of truth for anything the
  click → verified-sale demo shows.
- **Events platform surfaces worth demoing:** the event page and checkout under
  `apps/web/src/app/(landing)/e/[slug]/` (including `seat-picker.tsx` and
  `checkout/checkout-form.tsx`), `scan/` (door check-in), and the dashboard.
  Inventory rule: `quantitySold` counts confirmed sales only; holds never touch
  it (`packages/db/src/inventory.ts`). That is the mechanism behind "seats held
  during checkout never count as sold."
- **SEO:** `app/robots.ts`, `app/sitemap.ts`, `components/json-ld.tsx`.
- **Build and deploy:** `cd apps/web && npx next build`; deploy with
  `vercel deploy --prod --scope publeca` from the repo root (not
  git-connected). The review site is `publeca-review.vercel.app`.
- **Verification:** curl the deploy and check the served HTML for the finished
  state and full text of anything animated.
