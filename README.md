# Amr Wael — portfolio homepage

A business-first product-design portfolio. Live at
**[amr-wael.vercel.app](https://amr-wael.vercel.app)**.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Radix UI primitives. The page prerenders fully static.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## How it is organised

```
src/content/portfolio.ts          all copy + the evidence layer
src/components/portfolio/         one component per chapter
src/app/globals.css               design tokens (@theme)
```

Content and claims live in **one file** — `src/content/portfolio.ts`. Editing
copy, swapping a figure, or adding a project happens there, not in the
components.

## The two rules this page is built on

**1. Every claim meets its proof.** Each figure is typed with what it actually
demonstrates:

| State | Means |
|---|---|
| `reasoning` | Analysis and logic behind the approach |
| `solution` | Screens, flows, systems actually designed |
| `outcome` | A measured, independently supported result |
| `intended` | The effect the work is built to produce, not yet measured |

**Nothing on this page is labelled `outcome`.** No measured result exists for any
project, so none is claimed. Every project ends with an explicit evidence
boundary saying where its proof stops.

**2. No invented content.** No metric, client, testimonial, date, or contact
detail appears unless it came from a verified source. Where an artifact is
missing, the page says so in as many words rather than filling the gap.

## Documentation

- **[DESIGN.md](DESIGN.md)** — the design system: tokens, type scale, grid,
  motion, accessibility, and the reasoning behind each decision.
- **[ASSET_MAP.md](ASSET_MAP.md)** — every image, its source, its crop
  rectangle, what it proves, and anything still outstanding.

## Deploying

The project is linked to Vercel, so:

```bash
vercel deploy --prod
```
