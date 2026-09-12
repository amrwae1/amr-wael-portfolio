import Link from "next/link";
import type { ProjectCardEntry } from "@/content/project-cards";
import { CardArt } from "./card-art";

/**
 * One project card.
 *
 * The whole card is a single link. Nothing inside it is separately focusable —
 * no nested button for the arrow, no second link on the title — so a keyboard
 * user tabs once per project rather than three times, and the accessible name
 * is the whole card rather than the word "explore".
 *
 * Everything the card says, it says in text: the category, the title, the value
 * and the status are all real content. The art carries identity and the colour
 * carries recognition, but neither carries information, so the card survives
 * greyscale, forced colours, and a failed SVG render intact.
 *
 * `scale` picks the composition. The flagship gets more room for the art and a
 * larger title; the others share one grid. The mobile layout is a different
 * arrangement rather than the desktop one squeezed — the art moves above the
 * type and the ratio changes from 16:10 to roughly 4:5.
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
      className="card group"
      style={
        {
          "--tint": entry.tint,
          "--tint-bright": entry.tintBright,
        } as React.CSSProperties
      }
    >
      {/* The wash that lifts on hover and carries into the project page. */}
      <span className="card-wash" aria-hidden="true" />

      <CardArt art={entry.art} entry={entry} />

      <span className="card-body">
        <span className="card-category">{entry.category}</span>

        <span className="card-title">{entry.title}</span>

        <span className="card-value">{entry.value}</span>

        <span className="card-foot">
          <span className="card-status">{entry.status}</span>
          <span className="card-cue" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" className="size-4">
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
