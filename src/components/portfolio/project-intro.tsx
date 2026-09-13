import { paletteStyle, type ProjectCardEntry } from "@/content/project-cards";
import { CardArt } from "./card-art";

/**
 * The opening of a project page — the card, continued.
 *
 * It takes the card's own entry rather than restating it: the same palette, the
 * same poster (now resolved), the same category, name and intended-impact line,
 * and the same evidence status. Someone who opened a card should recognise the
 * page as that card widening, not as somewhere new.
 *
 * Centred because it is a title page. The argument below it returns to the
 * left-aligned editorial measure, and the interface evidence waits until the
 * thesis has been stated.
 *
 * Only decoration animates — the wash expanding from the top and the poster
 * fading in. The title and text are present on the first paint, so nothing
 * here delays reading, and reduced motion drops both animations.
 */
export function ProjectIntro({
  entry,
  facts,
}: {
  entry: ProjectCardEntry;
  facts: { label: string; value: string }[];
}) {
  return (
    <header className="project-intro" style={paletteStyle(entry.palette)}>
      <span className="project-intro-wash" aria-hidden="true" />

      <div className="shell">
        <p className="meta text-text">{entry.category}</p>

        <h1 className="mx-auto mt-6 max-w-[14ch] font-serif text-[clamp(3rem,1.9rem+5vw,6.5rem)] leading-[0.98] tracking-[-0.035em] text-text-strong">
          {entry.title}
        </h1>

        <p className="mx-auto mt-8 max-w-[28ch] text-lead leading-[1.4] text-text-strong text-balance">
          {entry.impact}
        </p>

        <p className="meta mt-6 text-text">
          <span className="sr-only">Evidence status: </span>
          {entry.status}
        </p>

        <CardArt art={entry.art} entry={entry} className="intro-art mt-[var(--space-block)]" />

        <dl
          className={`mx-auto mt-[var(--space-block)] grid max-w-6xl gap-x-10 gap-y-6 border-t border-rule pt-8 text-left sm:grid-cols-2 ${
            facts.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="meta">{fact.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-text">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
