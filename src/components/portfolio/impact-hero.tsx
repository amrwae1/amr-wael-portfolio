import { hero } from "@/content/portfolio";
import { HeroEvidence } from "./hero-evidence";
import { EvidenceLabel } from "./evidence-label";

/**
 * Hero: the business claim and its strongest proof in the same view.
 *
 * The claim is stacked above a full-measure plate rather than set beside it.
 * A side-by-side split forced the headline into a narrow column — where it
 * either overflowed the viewport or shrank — and left the capture too small to
 * read. Stacking gives the claim a real display size and the evidence the full
 * grid, and it avoids opening the page on the left-copy / right-mockup cliché.
 *
 * The supporting paragraph is set in the upper right and baseline-aligned to
 * the foot of the headline, which fills what would otherwise be a dead corner
 * and makes the asymmetry deliberate rather than incidental.
 */
export function ImpactHero() {
  return (
    <section
      id="top"
      className="shell pt-12 pb-[var(--spacing-chapter)] lg:pt-16"
      aria-labelledby="hero-heading"
    >
      <p className="meta">Product designer · B2B product systems · Cairo</p>

      <div className="grid-12 mt-6 lg:gap-y-0">
        <h1
          id="hero-heading"
          className="col-span-4 text-hero leading-[0.98] tracking-[-0.025em] md:col-span-8 lg:col-span-7"
        >
          {hero.claim}
        </h1>

        <p className="col-span-4 self-end text-lead leading-[1.45] text-text md:col-span-6 lg:col-span-4 lg:col-start-9">
          {hero.support}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-9">
        <a href={hero.primary.href} className="action action-primary w-full sm:w-auto">
          {hero.primary.label}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </a>
        <a href={hero.secondary.href} className="action action-secondary w-full sm:w-auto">
          {hero.secondary.label}
        </a>
      </div>

      {/* Proof, opening in the same viewport as the claim ---------------- */}
      <div className="mt-9 lg:mt-11">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <EvidenceLabel kind="solution" />
          <span className="meta">Valora — one manager decision, in one screen</span>
        </div>

        <HeroEvidence />

        {/* What the screen above already demonstrates, in its own order. */}
        <ol className="mt-4 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0">
          {hero.sequence.map((step, i) => (
            <li key={step} className="meta flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden="true" className="text-rule">
                  →
                </span>
              ) : null}
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
