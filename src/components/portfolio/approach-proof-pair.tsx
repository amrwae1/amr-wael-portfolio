import { approach } from "@/content/portfolio";
import { Reveal } from "./reveal";

/**
 * Approach, read back out of the work.
 *
 * Not a Discover/Define/Design/Deliver diagram: each step names the project on
 * this page that already demonstrates it and links straight to that evidence,
 * so the section stays accountable to the work rather than describing a method
 * in the abstract.
 */
export function ApproachProofPair() {
  return (
    <section
      id="approach"
      className="shell scroll-mt-24 pb-[var(--spacing-chapter)]"
      aria-labelledby="approach-heading"
    >
      <Reveal className="border-t border-rule pt-8">
        <div className="flex items-baseline gap-x-6">
          <p className="meta">Approach</p>
          <span className="rule-fill" aria-hidden="true" />
        </div>

        <div className="grid-12 mt-10">
          <h2
            id="approach-heading"
            className="col-span-4 text-chapter leading-[1.1] tracking-[-0.02em] md:col-span-8 lg:col-span-7"
          >
            {approach.heading}
          </h2>
          <p className="col-span-4 self-end measure text-[0.95rem] leading-relaxed text-text-muted md:col-span-6 lg:col-span-4 lg:col-start-9">
            {approach.body}
          </p>
        </div>
      </Reveal>

      <ol className="mt-16 flex list-none flex-col p-0">
        {approach.steps.map((step, i) => (
          /* A short stagger — the five steps are one argument in sequence, and
             they arrive in that order. Capped so a reader who scrolls quickly
             never waits on a row already in front of them. */
          <Reveal
            as="li"
            key={step.index}
            delay={Math.min(i, 3) * 0.05}
            className="border-t border-rule"
          >
            <div className="grid-12 py-10 lg:py-12">
              <span className="folio col-span-4 md:col-span-1 lg:col-span-1">
                {step.index}
              </span>

              <h3 className="col-span-4 text-lead leading-[1.3] tracking-[-0.01em] md:col-span-7 lg:col-span-4">
                {step.title}
              </h3>

              <p className="measure col-span-4 text-[0.98rem] leading-relaxed text-text md:col-span-8 lg:col-span-5">
                {step.body}
              </p>

              <div className="col-span-4 md:col-span-8 lg:col-span-2">
                <a href={step.href} className="link-rule border-b-transparent text-[0.9rem]">
                  {step.project}
                  <span aria-hidden="true" className="arrow">
                    ↓
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
