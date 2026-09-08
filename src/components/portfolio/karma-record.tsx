import { karmaShop } from "@/content/portfolio";
import { Reveal } from "./reveal";

/**
 * Karma Shop — upcoming, not yet reviewable.
 *
 * Deliberately the quietest item in the section: a single forthcoming line
 * rather than a chapter. There is nothing to inspect, so nothing here should
 * carry the weight of evidence — no plate, no reserved placeholder, no
 * delivery record. Naming the engagement is honest; dressing it as an
 * inspectable case study would not be.
 *
 * This also completes the descending hierarchy of the section: full chapter,
 * large, medium, then a line.
 */
export function KarmaRecord() {
  return (
    <article
      id={karmaShop.id}
      className="scroll-mt-24 border-t border-rule pt-8"
      aria-labelledby="karma-heading"
    >
      <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="numeral text-title">{karmaShop.index}</span>
        <span className="meta">{karmaShop.name}</span>
        <span className="meta">{karmaShop.category}</span>
        <span className="meta" style={{ color: "var(--color-intended)" }}>
          {karmaShop.status}
        </span>
      </Reveal>

      <Reveal className="grid-12 mt-8">
        <h3
          id="karma-heading"
          className="col-span-4 text-lead leading-[1.3] tracking-[-0.01em] md:col-span-8 lg:col-span-4"
        >
          {karmaShop.proposition}
        </h3>

        <p className="measure col-span-4 text-text md:col-span-8 lg:col-span-6 lg:col-start-6">
          {karmaShop.intro}
        </p>
      </Reveal>
    </article>
  );
}
