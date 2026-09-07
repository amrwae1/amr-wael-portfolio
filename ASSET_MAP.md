# ASSET_MAP

Every image on the homepage, where it came from, what it proves, and what is
still missing.

Sources are untouched: the Valora originals in `D:\Velore\public\media\` were
**not modified**, and the Booking sources under `public/assets/booking/` are
**kept in place** (they are the only copies). All derivatives are new files
written to `public/media/valora/`, `public/media/booking/`, and
`public/media/noon/`.

Derivatives are cropped at native source resolution (no downscale) so 2× displays
stay sharp. `next/image` serves a smaller bucket to 1× devices, so this costs
them nothing. Total shipped media: **942 KB** across 14 WebP files.

---

## Valora — real assets in use

| Destination | Source | Source size | Crop (`w×h @ x,y`) | Output | Size | Section | Evidence | Optimisation |
|---|---|---|---|---|---|---|---|---|
| `opportunity-decision.webp` | `opportunity-details.png` | 2560×2214 | `2079×1450 @ 481,0` | 2079×1450 | 103 KB | Hero (≥768px) | Solution proof | Sidebar cropped out; WebP q82 |
| `opportunity-decision-detail.webp` | `opportunity-details.png` | 2560×2214 | `700×650 @ 515,190` | 700×650 | 27 KB | Hero (<768px) | Solution proof | Art-directed tight crop; WebP q88 |
| `dashboard-overview.webp` | `dashboard.png` | 2560×3336 | `2560×1600 @ 0,0` | 2560×1600 | 104 KB | Valora — overview & prioritisation | Solution proof | Sidebar kept for product context; WebP q82 |
| `opportunity-evidence.webp` | `opportunity-details.png` | 2560×2214 | `2079×884 @ 481,1330` | 2079×884 | 57 KB | Valora — evidence before recommendation | **Reasoning proof** | Lower region crop; WebP q82 |
| `coaching-plan.webp` | `coaching-plan.png` | 2560×4062 | `2079×1500 @ 481,0` | 2079×1500 | 95 KB | Valora — evidence into a plan | Solution proof | Sidebar cropped out; WebP q82 |
| `coaching-progress.webp` | `coaching-progress.png` | 1472×2207 | `1352×1180 @ 60,40` | 1352×1180 | 61 KB | Valora — follow-through & review | Solution proof | Dialog isolated from backdrop; WebP q82 |
| `system-foundations.webp` | `design-system-foundations.png` | 2160×1620 | full frame | 2160×1620 | 74 KB | Valora — system foundation | Solution proof | WebP q82 |
| `system-components.webp` | `design-system-components.png` | 2160×1620 | full frame | 2160×1620 | 59 KB | Valora — system foundation | Solution proof | WebP q82 |

## Booking.com — real assets in use

Provenance confirmed by Amr as his own work. Sources are the two files under
`public/assets/booking/` (786×1704 each); they are the only copies, so the
originals are **kept in place** and the derivatives are re-encodes at the same
resolution.

| Destination | Source | Source size | Crop | Output | Size | Section | Evidence | Optimisation |
|---|---|---|---|---|---|---|---|---|
| `listing-results.webp` | `assets/booking/listing.webp` | 786×1704 | full frame | 786×1704 | 79 KB | Booking — results, comparable in place | Solution proof | WebP q82 re-encode |
| `listing-expanded.webp` | `assets/booking/listing-detail.webp` | 786×1704 | full frame | 786×1704 | 59 KB | Booking — expanded, cost and flexibility | Solution proof | WebP q82 re-encode |

The two plates render side by side from 640px up, at ~327px each on a 1440px
desktop. Verified legible at that size: property name, review score and count,
nightly price, area, distance, the taxes-and-fees breakout, and the free
cancellation confirmation all read clearly. The pair carries **one** evidence
label between them, because collapsed-versus-expanded is a single piece of
evidence.

## Noon — real assets in use

**Two sources, deliberately.** The case study is the only place a genuine
before-state exists, so moves 01 and 02 come from it. But the case study embeds
an *older* screenshot of the evaluation and action sections, still carrying copy
errors that Amr has since fixed — so moves 03 and 04 come from the current
product-page export instead.

| Source | Where | Size |
|---|---|---|
| Case study | Behance `max_3840_webp` (higher-res than the chat copy) | 3131×16383 |
| Product page, full scroll | `Downloads\Poduct page- Full.png` | 1179×7194 |

| Destination | From | Crop (`w×h @ x,y`) | Output | Size | Evidence |
|---|---|---|---|---|---|
| `move-01-hero-price.webp` | Case study | `1670×1150 @ 1310,8470` | 1670×1150 | 62 KB | Solution proof (before/after, annotated) |
| `move-02-logistics.webp` | Case study | `1600×975 @ 200,9825` | 1600×975 | 57 KB | Solution proof (before/after, annotated) |
| `move-03-evaluation.webp` | Product page | `1090×1830 @ 45,3350` | 1090×1830 | 70 KB | Solution proof (redesign) |
| `move-04-confidence.webp` | Product page | `1179×910 @ 0,6270` | 1179×910 | 34 KB | Solution proof (redesign) |

Move 04 is cropped at the page's full width because the sticky action bar runs
edge to edge; insetting it clipped the quantity stepper and the save control.

### Rendered spans

Span follows each figure's own shape rather than a fixed rule:

| Move | Shape | Span | Rendered |
|---|---|---|---|
| 01, 02, 04 | landscape | 8 columns | 822 × 566 / 501 / 635 |
| 03 | portrait | 6 columns | 602 × 1011 |

The wide annotated comparisons need eight columns to keep their callout body
text readable. Move 03 is a portrait capture of the page; at eight columns it
would have towered over the chapter, so it takes six — still 602px, enough for
its own body text to hold up.

Because the first two crops come from the case study, their blue callouts are
its annotations rather than part of the product interface. The chapter says so
once above the list, and names the second source in the same line.

### Known copy errors, resolved

The case study's embedded screenshots contained five copy errors —
"discerption", "easy-t-clean", a truncated "Meta", "EGB 65", and "visability"
in one annotation. Amr corrected them in the product-page export. Moves 03 and
04 were therefore re-cropped from that export, and the shipped figures are
clean. Moves 01 and 02 were checked and never carried any of them.

**If the case study is re-published to Behance with the corrections**, moves 03
and 04 can go back to it to regain their before/after panels and annotations.
Until then the current split is the honest arrangement: real before-states where
they exist, corrected copy everywhere.

### Aspect ratios

Reserved via `width`/`height` on every `next/image`, and via `.plate-media-hero`
for the hero (which swaps ratio at 768px because it swaps crops). No CLS.

### Alt text

Full alt text lives beside each figure in `src/content/portfolio.ts`
(`valora.figures[].alt`, `valora.systemFigures[].alt`, and the `booking`
project's `figures[].alt`) and in
`src/components/portfolio/hero-evidence.tsx` (`ALT`). Each one describes the
specific content of the screen, not the fact that it is a screenshot. No
decorative images are present, so no empty `alt` is used.

### Available but not used

| Source | Why not used |
|---|---|
| `coaching-session.png` (2560×3477) | Real and usable, but the chapter already carries four Valora figures. A fifth made the sequence repetitive without adding a new step to the argument. Available if the follow-through beat should show the session itself rather than the review. |
| `design-system-control.png` (2160×1620) | Third system specimen; two already establish the token + component layer. |
| `design-system-reference.png` (2472×8415) | Extremely tall full-page sheet. Unusable at homepage scale without a dedicated scrollable treatment. |

---

## Missing assets — documented, never fabricated

Defined in `src/content/portfolio.ts` under each project's `missing[]`. Where a
project has no real evidence yet, the primary gap renders as a labelled slot
reading **"Missing asset — not evidence"** at the correct reserved aspect
ratio; further gaps render as compact "awaiting artifact" rows. Nothing is
fabricated, and no placeholder is allowed to read as evidence.

### Noon — resolved

Nothing is missing for Noon any more. All four comparisons are real files,
cropped from Amr's **published Behance case study** rather than from the
conversation attachments (which could be viewed but not read as bytes).

The case study is public at
`behance.net/gallery/249127589/Noons-products-page-redesign`. Behance serves
it in several size variants; `max_3840_webp` gave **3131×16383**, which is
higher resolution than the copy shared in chat, so the crops came from there.

See the Noon table above for each crop's source rectangle.

### Booking.com
The comparison / decision-flow screens now exist (above). One gap remains, and
it renders as a compact "awaiting artifact" row rather than a reserved box,
because a placeholder beside real screens would compete with them.

| Artifact | Reserved ratio |
|---|---|
| Honest before / after structure (only if real) | 16 / 9 |

### Karma Shop
**No artifact slots.** Karma Shop is presented as an *upcoming* engagement, not
as a case study awaiting evidence, so it reserves nothing and shows nothing —
one forthcoming line, marked "Upcoming". Reserved placeholders there would imply
an inspectable case study that does not exist yet. Artifacts become relevant
only when the work is ready to publish with its shipped and proposed parts
separated.

### Optional
- **Portrait of Amr** — only if supplied and only if it strengthens trust or
  collaboration context. Not currently referenced anywhere.

### Text details — resolved

Verified from Amr's CV (`Amr_Wael_Product_Designer_CV.pdf`) and from his live
Behance profile:

- **Email** `amrwael322@gmail.com` — the primary action is now a real `mailto:`.
- **LinkedIn**, **Behance**, **GitHub** — live links, `target="_blank"` with
  `rel="noopener noreferrer"`.
- **Case-study URLs** — all three published projects now link out to Behance
  from their chapter heads.
- The CV's **phone number is deliberately not published**: a public page invites
  scraping, and email plus LinkedIn is the normal route for a client enquiry.
  It is a one-line addition if wanted.

`robots: noindex` has been **removed** from the layout, since the two reasons
for it — unverified contact details and placeholder artifacts — are both gone.

