/**
 * The project cards.
 *
 * These are entrances, not summaries. A card says what territory a project sits
 * in, what it is called, the one thing it is about, and how far along it is —
 * then stops. The screens, the reasoning and the evidence live on the project
 * page, which is where someone has actually chosen to read them.
 *
 * No product screenshots here on purpose. A cropped interface at thumbnail size
 * shows nothing legible and reads as the same grey rectangle four times over;
 * an abstract system built from the project's own idea gives each one a
 * recognisable identity at a glance, which is the only job a card has.
 *
 * `tint` is the project's colour, used for the art, the focus ring and the wash
 * that carries into the project page. It is never the only thing distinguishing
 * a card — the category, the title and the status all say it in words too.
 */

export type ProjectCardArt = "valora" | "noon" | "booking" | "karma";

export type ProjectCardEntry = {
  slug: string;
  href: string;
  category: string;
  title: string;
  value: string;
  status: string;
  art: ProjectCardArt;
  /** Drives the art, the hover wash, and the project page's opening tint. */
  tint: string;
  /** A second, lighter step of the same hue for highlights inside the art. */
  tintBright: string;
};

export const projectCardEntries: ProjectCardEntry[] = [
  {
    slug: "valora",
    href: "/projects/valora",
    category: "B2B · AI · Decision intelligence",
    title: "Valora",
    value: "Choosing which coaching signal deserves attention.",
    status: "Self-directed concept",
    art: "valora",
    tint: "#3f4bd8",
    tintBright: "#8fa8ff",
  },
  {
    slug: "noon",
    href: "/projects/noon",
    category: "Marketplace · Mobile commerce",
    title: "Noon",
    value: "Purchase-critical information, placed closer to commitment.",
    status: "Self-directed concept",
    art: "noon",
    tint: "#d4a017",
    tintBright: "#ffd977",
  },
  {
    slug: "booking",
    href: "/projects/booking",
    category: "Travel · Comparison",
    title: "Booking.com",
    value: "Keeping the comparison visible before checkout.",
    status: "Self-directed concept · Unaffiliated",
    art: "booking",
    tint: "#1b4fd8",
    tintBright: "#7fa9ff",
  },
  {
    slug: "karma-shop",
    href: "/projects/karma-shop",
    category: "Commerce · Client engagement",
    title: "Karma Shop",
    value: "Real business constraints. Work in progress.",
    status: "Client engagement · In progress",
    art: "karma",
    tint: "#b4643a",
    tintBright: "#e6a077",
  },
];

export function cardBySlug(slug: string) {
  return projectCardEntries.find((c) => c.slug === slug);
}
