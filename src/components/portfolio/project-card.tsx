import Link from "next/link";
import { paletteStyle, type ProjectCardEntry } from "@/content/project-cards";
import { CardArt } from "./card-art";

/**
 * One project card — a brand poster and a single link.
 *
 * The whole card is one link. Nothing inside it is separately focusable, so a
 * keyboard user tabs once per project and the accessible name is the card's own
 * words: category, name, intended impact and evidence status.
 *
 * Everything the card says, it says in text. The poster carries identity and
 * the palette carries recognition, but neither carries information, so the
 * card survives greyscale, forced colours and a failed SVG render intact.
 *
 * `scale` picks the composition:
 *   flagship  full width, 16:10 from tablet up, poster beside the type
 *   standard  4:5 stacked until wide screens, then 16:10 split
 *   quiet     full width and lower, a closing card rather than a headline
 * Below 48rem every card is 4:5 with the poster above the type.
 */
export function ProjectCard({
  entry,
  scale = "standard",
}: {
  entry: ProjectCardEntry;
  scale?: "flagship" | "standard" | "quiet";
}) {
  return (
    <Link
      href={entry.href}
      data-scale={scale}
      className="card"
      style={paletteStyle(entry.palette)}
    >
      <span className="card-wash" aria-hidden="true" />

      <CardArt art={entry.art} entry={entry} />

      <span className="card-body">
        <span className="card-category">{entry.category}</span>

        <span className="card-title">{entry.title}</span>

        <span className="card-impact">{entry.impact}</span>

        <span className="card-foot">
          <span className="card-status">
            <span className="sr-only">Evidence status: </span>
            {entry.status}
          </span>
          <span className="card-cue" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" className="size-4" focusable="false">
              <path
                d="M4 10h11M11.5 6.5 15 10l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </span>
    </Link>
  );
}
