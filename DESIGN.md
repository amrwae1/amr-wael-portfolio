# DESIGN — Dark Modern Archivist

The design system behind Amr's portfolio homepage. Tokens live in
`src/app/globals.css` under `@theme` (Tailwind v4), which emits both the CSS
custom properties and the utility classes used in components.

---

## 1. Design read

> A business-first product-design portfolio for potential clients, in a dark
> classical-modern editorial language, with product evidence at the centre,
> controlled expression, and restrained purposeful motion.

**Classical** here means proportion, literary pacing, and typographic craft.
**Modern** means large scale, asymmetric composition, legible product imagery,
and concise interaction. It is deliberately *not* old paper, vintage print,
luxury fashion, brutalism, or a museum site.

The guiding balance: **strong presence at moments of value and evidence;
controlled calm where the visitor needs to understand and decide.**

---

## 2. The problem the art direction had to solve

Every real asset available is a **light interface** — Valora is a white UI with a
blue accent — and the portfolio is dark. Dropping white captures straight onto a
near-black canvas glares and reads as a floating screenshot.

The answer is the **evidence plate**: a warm mat (`--color-surface-2`) with a
1px rule and a 12px radius sits between canvas and capture, and a 6% inset
hairline stops the white bleeding into the mat. Each screen then reads as an
inspected archive plate rather than a pasted image. No drop shadows are used
anywhere on the page.

---

## 3. Colour

```css
--color-canvas:      #11110f;  /* warm near-black ground */
--color-surface-1:   #181815;  /* recessed panels, mobile sheet, placeholders */
--color-surface-2:   #20201c;  /* the evidence plate mat */
--color-surface-3:   #282721;  /* plate hover/focus state */

--color-text-strong: #f1eadf;  /* headings, key statements */
--color-text:        #d3ccc0;  /* body */
--color-text-muted:  #9f988c;  /* metadata, figure notes */

--color-rule:        #37352f;  /* hairlines, grouping, sequence */

--color-accent:      #8493c8;  /* muted lapis — primary action */
--color-accent-strong:#a8b5e6; /* hover, current state, links */
--color-reasoning:   #9790b8;  /* reasoning proof */
--color-intended:    #b89a63;  /* intended / unmeasured impact */
--color-boundary:    #bd897c;  /* evidence boundary, missing asset */
--color-focus:       #c8d2ff;  /* focus ring */
```

**The accent is scarce.** It marks the primary action, the current state, or the
strongest evidence connection — never a randomly coloured word.

**Semantic colours never carry meaning alone.** Every evidence label pairs its
dot with a written word ("Reasoning proof", "Solution proof"), every boundary
note is titled "Evidence boundary", and every placeholder says "Missing asset —
not evidence". The page survives greyscale and forced-colours mode intact.

### Contrast (verified, not assumed)

All pairs were computed against the real token values at the sizes used. Lowest
text ratio is **5.96:1** (boundary label on `surface-1`); body text is 11.85:1;
headings 15.82:1; the primary button label 6.29:1; the focus ring 12.71:1
against canvas. Every pair clears its WCAG AA threshold.

---

## 4. Typography

Two families, both self-hosted via `next/font` (no production `<link>`, no
layout shift):

- **`Source Serif 4`** — `--font-editorial`. Display and editorial voice, kept
  upright. Italic is reserved for genuine semantic emphasis; it is never used as
  an automatic personality trick.
- **`Public Sans`** — `--font-interface`. Body, metadata, UI.

### Scale

```css
--text-meta:    clamp(0.78rem, 0.75rem + 0.12vw, 0.86rem);  /* ≥12.5px */
--text-body:    clamp(1rem,    0.96rem + 0.18vw, 1.125rem);
--text-lead:    clamp(1.25rem, 1.1rem  + 0.62vw, 1.6rem);
--text-title:   clamp(1.7rem,  1.4rem  + 1.15vw, 2.4rem);
--text-project: clamp(2rem,    1.45rem + 1.95vw, 3.25rem);
--text-chapter: clamp(2.35rem, 1.7rem  + 2.6vw,  4rem);
--text-hero:    clamp(2rem,    1.35rem + 2.4vw,  3.75rem);
--text-folio:   clamp(1.7rem,  1.2rem  + 2vw,    3rem);
```

### Descending weight across the section

Selected work steps down deliberately, and each step is a different *kind* of
treatment rather than the same card at a smaller size:

| | Project | Treatment | Heading |
|---|---|---|---|
| 01 | Valora | Full chapter — four figures, a tabbed comparison, a system layer | `--text-chapter` |
| 02 | Noon | Reasoning chapter — four claim-and-proof rows | `--text-project` |
| 03 | Booking.com | Medium, reversed — evidence leads with two real screens | `--text-title` |
| 04 | Karma Shop | Upcoming — one forthcoming line, nothing shown | `--text-lead` |

Karma Shop shows nothing because there is nothing to review yet. It gets no
plate and no reserved placeholder: naming the engagement is honest, but a
reserved box would imply an inspectable case study that does not exist. Its
status reads "Upcoming" in the `--color-intended` role.

Noon gets its own component rather than the shared project template. Its
substance is a chain of reasoning — a diagnosed problem, four conclusions,
five principles, four moves, and a set of explicitly unmeasured outcomes — so
it is composed as an argument. It is the only chapter that reaches heading
level 5, for the four moves.

Each move is a row: the claim in four columns, its proof beside it. Span follows
the figure's shape — eight columns for the wide annotated comparisons, six for
the one portrait capture, which at eight would have towered over the chapter. Nothing there has to be taken on trust, which is the
brief's requirement that a claim meet its strongest proof in the same view.
Eight columns is not a compositional preference — those crops carry annotation
body text, and 822px is the width at which it stays readable.

Its two problem signals are named but never quantified (“High drop-off”,
“Time to decide”). The case study describes them qualitatively, so putting a
number beside them would be inventing a measurement.

Booking leads with its evidence rather than its copy, which gives two
portrait phone plates the width they need —
~327px each at 1440px, verified legible down to the taxes-and-fees line. The
pair carries **one** evidence label between them: collapsed-versus-expanded is
a single piece of evidence, and repeating the label above each plate read as
noise.

`--text-project` exists so hierarchy survives: the flagship chapter heading
(`--text-chapter`, 60px) stays visibly senior to the large secondary project
(`--text-project`, 48px), which stays senior to the medium one
(`--text-title`, 36px). Without that middle step Valora and Noon rendered at
the same size and the flagship distinction collapsed.

`--text-hero` is capped at 60px, not the 108px first tried. At 108px the claim
wrapped to seven lines and pushed the proof out of the first viewport, which
broke the one thing the hero has to do.

- Hero leading `0.98`; chapter headings `1.08–1.12`.
- Body leading `1.6`; measures `.measure` 62ch and `.measure-tight` 46ch.
- Metadata is uppercase with `0.06em` tracking, at readable size — never long
  uppercase paragraphs.

---

## 5. Grid and rhythm

```css
.shell    max-width 1440px; padding-inline clamp(1.5rem, 5vw, 4.5rem)
.grid-12  4 cols (<768px) → 8 cols (≥768px) → 12 cols (≥1024px)
          gutters 1rem → 1.5rem
--spacing-chapter  clamp(4rem, 9vw, 10rem)
```

The grid organises the page without ever appearing as a visual motif — there are
no decorative grid lines. Spans are unequal by design (7/5, 6/5, 9-from-4, 5/5)
and each Valora figure takes a different span and offset, so the chapter reads
as a paced narrative rather than a stack of cards.

### Geometry
- Radii 0–12px: 12px on plates and placeholders, 6px on media and actions.
- 1px rules only where they clarify grouping or sequence.
- No drop shadows. No card wrapping around individual text fragments.

---

## 6. Evidence vocabulary

Encoded as types in `src/content/portfolio.ts`, so a claim cannot drift from its
proof:

| State | Meaning |
|---|---|
| `reasoning` | Analysis, constraints, alternatives, logic supporting the approach |
| `solution` | Screens, flows, prototypes, systems, delivered artifacts |
| `outcome` | A measured or independently supported user/business result |
| `intended` | The expected effect where no outcome has been measured |

**Nothing on this page is labelled `outcome`.** No measured result exists for any
project, so none is claimed. Reasoning proof can show that an approach is
credible; it cannot establish that a business result occurred, and the copy
never blurs the two.

`intended` earns its place in the Noon chapter. That case study's own results
section is titled “Expected Outcomes”, so the four outcomes are rendered under
an **Intended impact** label above the line “What the redesign is built to
produce. None of it has been measured.” The distinction between an intended
effect and a demonstrated one is load-bearing here, not decorative.

Every project closes with an explicit **evidence boundary**. The numbers visible
inside the Valora screens are in-product demonstration data, and the Valora
boundary says so in as many words.

---

## 7. Motion

Tokens in `src/components/portfolio/motion-tokens.ts`:

```ts
duration: { feedback: 0.16, state: 0.24, reveal: 0.42, signature: 0.62 }
ease:     { standard: [0.22, 1, 0.36, 1], exit: [0.4, 0, 1, 1] }
```

1. **Hero → Valora progression.** Scroll-linked: the plate rises 22px and
   resolves (scale 1.02 → 1, opacity 0.9 → 1) across the first ~520px. Driven
   entirely by MotionValues and `transform`; no React state is subscribed to the
   scroll and no layout property animates. The scale is intentionally shallow —
   anything deeper sliced words off the capture's edges, which read as a defect
   at rest rather than as a restrained crop.
2. **Navigation and action feedback.** 160ms, CSS only: colour shift, rule
   colour, and a 3px arrow translation. Layout never moves.
3. **Project entry feedback.** The plate mat warms one surface step on
   hover/focus-within. Feedback only — the figure note is always rendered, so
   nothing is hidden behind hover.
4. **Valora decision view.** Radix Tabs + a crossfade with an 10px shift at
   240ms. It earns its place because the comparison *is* the product logic.
5. **Chapter transition.** Used exactly once, between the flagship chapter and
   the shorter selected work. Repeating it at every section would turn
   progression into decoration.

Scroll is never hijacked; there are no custom cursors, marquees, particles, or
continuous pointer listeners.

### Reduced motion
Handled twice over: `useReducedMotion()` skips the scroll subscription and
transforms entirely in JS, and a CSS `prefers-reduced-motion` block collapses
transitions and animations. **Verified:** under `reduce` the hero plate renders
at `transform: none; opacity: 1` with all content present. No information is
carried by motion, so removing it costs nothing.

---

## 8. Accessibility

- Skip link to `#main`, visible on focus.
- One focus treatment page-wide: 2px `--color-focus` at 3px offset. The tab
  panel keeps its ring at 8px offset — Radix gives `Tabs.Content`
  `tabIndex={0}`, so suppressing it would strand keyboard users.
- Logical heading order, verified: `h1 → h2 → h3` with no skipped levels.
- `<header>`, `<main>`, `<footer>`, `<section aria-labelledby>`, `<article>`,
  `<ol>`/`<dl>` where the content is genuinely a sequence or a record.
- All interactive targets ≥44px, verified 0 violations at all five widths.
- Mobile sheet via Radix Dialog: focus moves inside on open, traps, and Escape
  closes — verified.
- Sticky header cleared by `scroll-padding-top: 5.5rem`; verified that
  `#approach` lands below the header rather than under it.
- `overflow-x: clip` on body plus per-element auditing: 0 horizontal overflow at
  1440 / 1024 / 768 / 390 / 320.

---

## 9. Component structure

```
src/content/portfolio.ts              content + evidence data layer
src/components/portfolio/
  site-header.tsx        client — nav + Radix Dialog mobile sheet
  impact-hero.tsx        server — claim, support, actions
  hero-evidence.tsx      client — art-directed plate + scroll motion
  evidence-figure.tsx    server — the archive plate
  evidence-label.tsx     server — EvidenceLabel + BoundaryNote
  missing-asset.tsx      server — labelled placeholder slots
  valora-chapter.tsx     server — flagship chapter
  valora-decision-view.tsx client — Radix Tabs + crossfade
  chapter-transition.tsx client — used once
  noon-chapter.tsx       server — Noon, composed as an argument
  project-chapter.tsx    server — Booking, evidence-led
  karma-record.tsx       server — Karma Shop, upcoming (one line)
  approach-proof-pair.tsx server — approach read from the work
  contact-invitation.tsx server — closing invitation
```

Motion lives only in small client leaves; all narrative and layout is
server-rendered. The page prerenders fully static.

### Deviation from the brief: no `shadcn init`

The brief asked for shadcn/ui primitives. **Radix UI is used directly instead**
(`@radix-ui/react-dialog`, `@radix-ui/react-tabs`), with the components authored
here and styled entirely by this system.

The reason: `shadcn init` rewrites `globals.css` with its own oklch token layer,
which would have fought the palette above for control of the same variables.
shadcn/ui *is* owned components over Radix, and the brief's own instruction was
to treat it "as owned, accessible component source rather than as the visual
identity" — so taking Radix directly honours the intent while keeping the design
system intact. Accessibility behaviour (focus trap, roving tabindex, escape
handling, ARIA wiring) is identical, because it is the same primitives.

`Button`, `Separator`, and `Tooltip` were not needed: actions are semantic
`<a>`/`<button>` with an `.action` class, rules are borders, and no label was
compressed to the point of needing a tooltip.

### Deviation: `<picture>` for the hero, not `next/image`

`next/image` can rescale one source but cannot swap crops at a breakpoint. The
full opportunity screen is 2079px of desktop interface; at a 342px mobile
measure its text renders about two pixels tall, which is not evidence of
anything. The hero therefore uses `<picture>` with a tight mobile crop below
768px and the wide crop above. Both files are pre-optimised WebP, it is the LCP
image so it loads eagerly at high priority, and aspect ratio is pinned per
breakpoint in `.plate-media-hero` so neither crop shifts layout. Every other
figure uses `next/image` with accurate `sizes`.

---

## 10. What the design deliberately avoids

AI-purple, neon, glow, aurora and mesh gradients; beige-and-red editorial
clichés; oversized italic serif as instant personality; thin rectangular
wireframe blocks; visible decorative grid lines; bento layouts and three equal
cards; repeated left-copy/right-mockup sections; pill-heavy UI; fake browser
chrome and device frames; excessive uppercase monospace; generic black CTAs;
decorative charts, invented metrics, testimonials and client logos; perpetual
marquees; and motion on every object.

---

## 11. Departures from §10, and what bounds them

Three things this document originally ruled out now ship. They were added
deliberately and each is fenced, but an undocumented departure is
indistinguishable from drift — and a design system that contradicts the running
product is worse than none, because it stops being a thing anyone can trust.
Recorded here so the boundary is inspectable rather than remembered.

**Glassmorphism — one element.** `.glass` / `.glass-soft` are used on exactly
one surface: the small evidence-preview card in the hero stage. It is a plate
seen through the stage's atmosphere, which is the one place in the page where a
translucent material is describing something real. A second, more elaborate
`.liquid-glass` system exists only under `/lab`, which is `noindex` and is not
part of the portfolio's vocabulary. If glass appears on a third surface, that is
drift and this clause has failed.

**Custom cursor — pointer devices only.** `cursor-mark` replaces the pointer
with a ring, a caret and a precise dot that change state over plates, prose and
controls. It is a reading instrument for a page built around inspecting
evidence, not decoration. It is gated on `(pointer: fine)`, `(hover: hover)` and
no `prefers-reduced-motion`, and it restores the native cursor if any of those
fail or if it does not mount. The native cursor is the fallback, never nothing.

**Particles — one figure, one purpose.** The hero's standing figure is a point
cloud. §10's objection was to floating particles as ambient decoration; this is
a single subject, lit by a sweeping key light, standing behind the claim it
belongs to. It pauses when the tab is hidden or the hero scrolls away, drops to
a lower count on coarse pointers, steps back to 42% opacity below 768px so type
wins, and degrades to the CSS light field when WebGL is unavailable.

The common bound: each is one element, gated, with a working fallback, and
carries no information. Remove any of them and the page loses nothing it needs.
