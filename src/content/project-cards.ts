/**
 * The project cards — the first sentence of each project page.
 *
 * A card says what territory a project sits in, what it is called, the effect
 * it is designed to have, and how much of that is established — then stops.
 * The screens, the reasoning and the evidence live on the project page, which
 * repeats the same `impact` line in its opening so the two read as one thought.
 *
 * `impact` is an intended outcome, never a measured one. `status` is the honest
 * counterweight printed beside it on every card: none of the three concepts has
 * been tested, and the client engagement is still running.
 *
 * No product screenshots here on purpose. A cropped interface at card size
 * shows nothing legible; an abstract system built from the project's own idea
 * gives each one a recognisable identity at a glance.
 *
 * The palette is the project's world. It is never the only thing
 * distinguishing a card — the category, the title and the status say it in
 * words, so the cards survive greyscale and forced colours intact.
 */

import type { CSSProperties } from "react";

export type ProjectCardArt = "valora" | "noon" | "booking" | "karma";

export type ProjectPalette = {
  /** The deep ground colour: the wash, and the project page's opening tint. */
  tint: string;
  /** The active colour: the element that resolves on hover. */
  bright: string;
  /** A second hue of the same world, for supporting forms. */
  second: string;
  /** The project's light: never pure white, tuned warm or cool per world. */
  light: string;
};

export type ProjectCardEntry = {
  slug: string;
  href: string;
  category: string;
  title: string;
  /** Intended impact — what the design is for. Not a result. */
  impact: string;
  /** Evidence status, stated plainly. */
  status: string;
  art: ProjectCardArt;
  palette: ProjectPalette;
};

export const projectCardEntries: ProjectCardEntry[] = [
  {
    slug: "valora",
    href: "/projects/valora",
    category: "B2B · AI · Decision intelligence",
    title: "Valora",
    impact: "Help managers act on the coaching signal that matters most.",
    status: "Self-directed concept · Sample data · Untested",
    art: "valora",
    // Deep indigo, electric blue, mineral white.
    palette: { tint: "#2a2f9c", bright: "#4f7dff", second: "#3b46c9", light: "#e4e9ec" },
  },
  {
    slug: "noon",
    href: "/projects/noon",
    category: "Marketplace · Mobile commerce",
    title: "Noon",
    impact: "Help shoppers commit with fewer unanswered questions.",
    status: "Self-directed concept · Untested",
    art: "noon",
    // Warm yellow, amber, warm white.
    palette: { tint: "#a86a0c", bright: "#f5c518", second: "#e08a1e", light: "#f5eddc" },
  },
  {
    slug: "booking",
    href: "/projects/booking",
    category: "Travel · Comparison",
    title: "Booking.com",
    impact: "Make the better stay easier to compare before checkout.",
    status: "Self-directed concept · Unaffiliated · Untested",
    art: "booking",
    // Deep cobalt, cool blue, cool white.
    palette: { tint: "#123a9e", bright: "#6aa6ff", second: "#2459d6", light: "#e6effa" },
  },
  {
    slug: "karma-shop",
    href: "/projects/karma-shop",
    category: "Commerce · Client engagement",
    title: "Karma Shop",
    impact: "Shape a focused commerce experience around real business constraints.",
    status: "Client engagement · In progress",
    art: "karma",
    // Copper, muted red, sand.
    palette: { tint: "#8a4526", bright: "#c8703f", second: "#9c4436", light: "#dcc9a8" },
  },
];

export function cardBySlug(slug: string) {
  return projectCardEntries.find((c) => c.slug === slug);
}

/** The palette as CSS custom properties, shared by the card and the page intro. */
export function paletteStyle(palette: ProjectPalette): CSSProperties {
  return {
    "--tint": palette.tint,
    "--tint-bright": palette.bright,
    "--tint-second": palette.second,
    "--tint-light": palette.light,
  } as CSSProperties;
}
