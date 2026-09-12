import { noon } from "@/content/portfolio";
import { EvidenceFigure } from "./evidence-figure";
import { BoundaryNote, EvidenceLabel } from "./evidence-label";
import { Reveal } from "./reveal";

/**
 * Noon — the second chapter.
 *
 * Given its own composition rather than the shared project template: unlike
 * Booking, this project's substance is a chain of reasoning (a diagnosed
 * problem, four conclusions, five principles, four moves, and a set of
 * explicitly unmeasured outcomes), so it is laid out as an argument rather than
 * as copy beside a figure.
 *
 * Each of the four moves is a row: the claim on the left, the annotated
 * before/after that supports it on the right. The comparisons are cropped from
 * the published case study, so the callouts in them are its annotations rather
 * than part of the product interface — said once above the list.
 */
export function NoonChapter() {
  return (
    <article
      id={noon.id}
      className="scroll-mt-24 border-t border-rule pt-8"
      aria-labelledby="noon-heading"
    >
      {/* Chapter head --------------------------------------------------- */}
      <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="folio">{noon.index}</span>
        <span className="meta">{noon.name}</span>
        <span className="meta">{noon.category}</span>
        <span className="rule-fill" aria-hidden="true" />
      </Reveal>

      <Reveal className="grid-12 mt-10">
        <h3
          id="noon-heading"
          className="col-span-4 text-project leading-[1.12] tracking-[-0.02em] md:col-span-8 lg:col-span-7"
        >
          {noon.proposition}
        </h3>
        <div className="col-span-4 self-end md:col-span-6 lg:col-span-4 lg:col-start-9">
          <p className="measure text-[0.95rem] leading-relaxed text-text-muted">{noon.summary}</p>
          {/* A cautious client gets a route into the full case study. */}
          <a
            href={noon.caseStudy.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule mt-4 text-[0.95rem]"
          >
            {noon.caseStudy.label}
            <span aria-hidden="true" className="arrow">
              ↗
            </span>
          </a>
        </div>
      </Reveal>

      {/* The problem ---------------------------------------------------- */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <h4 className="font-serif text-title leading-[1.2] tracking-[-0.01em] text-text-strong">
            {noon.problem.heading}
          </h4>
          <div className="measure mt-6 flex flex-col gap-4">
            {noon.problem.body.map((para, i) => (
              <p key={para} className={i === 0 ? "dropcap text-text" : "text-text"}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Where the loss showed up. Named, not quantified — no measurement
            exists, so no number is implied. */}
        <dl className="col-span-4 m-0 self-end md:col-span-6 lg:col-span-4 lg:col-start-9">
          {noon.problem.signals.map((signal) => (
            <div key={signal.label} className="border-t border-rule py-4">
              <dt className="meta" style={{ color: "var(--color-boundary)" }}>
                {signal.label}
              </dt>
              <dd className="m-0 mt-1.5 measure text-[0.95rem] leading-relaxed text-text">
                {signal.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* What the redesign concluded ------------------------------------ */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <EvidenceLabel kind="reasoning" />
          <dl className="mt-6 grid gap-x-6 gap-y-0 sm:grid-cols-2">
            {noon.insights.map((insight) => (
              <div key={insight.title} className="border-t border-rule py-5">
                <dt className="font-serif text-lead leading-[1.3] text-text-strong">
                  {insight.title}
                </dt>
                <dd className="m-0 mt-2 measure text-[0.95rem] leading-relaxed text-text-muted">
                  {insight.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
          <p className="meta">Principles it set</p>
          <ul className="mt-5 flex list-none flex-col gap-3 p-0">
            {noon.principles.map((principle) => (
              <li key={principle} className="flex gap-3 text-[0.95rem] leading-snug text-text">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] size-[5px] shrink-0 rounded-full bg-rule"
                />
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* The four moves ------------------------------------------------- */}
      <Reveal className="mt-[var(--spacing-chapter)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="meta">Redesigning the decision flow</p>
          <p className="meta max-w-[52ch] normal-case tracking-normal">
            {noon.figureNote}
          </p>
        </div>

        {/*
          One row per move: the claim and the comparison that supports it sit
          side by side, so no move has to be taken on trust. The figures are
          landscape and dense with annotation text, so they take eight columns
          — at that width the callouts stay readable.
        */}
        <ol className="m-0 mt-10 flex list-none flex-col gap-[var(--spacing-chapter)] p-0">
          {noon.moves.map((move) => {
            /*
              Span follows the figure's own shape. The wide annotated
              comparisons want eight columns to keep their callout text
              readable; a portrait capture of the page at that width would tower
              over the chapter, so it takes six — still 618px, enough for its
              body text to hold up.
            */
            const portrait = move.figure.height > move.figure.width;

            return (
              <Reveal variant="plate" as="li" key={move.index} className="grid-12 items-start border-t border-rule pt-8">
                <div className="col-span-4 md:col-span-8 lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="numeral text-[0.95rem]">{move.index}</span>
                    <h5 className="font-serif text-lead leading-[1.3] font-normal text-text-strong">
                      {move.title}
                    </h5>
                  </div>
                  <p className="measure mt-4 text-[0.98rem] leading-relaxed text-text">
                    {move.body}
                  </p>
                </div>

                <div
                  className={
                    portrait
                      ? "col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-6"
                      : "col-span-4 md:col-span-8 lg:col-span-8"
                  }
                >
                  <EvidenceFigure
                    {...move.figure}
                    evidence="solution"
                    sizes={
                      portrait
                        ? "(min-width: 1024px) 46vw, (min-width: 768px) 68vw, 88vw"
                        : "(min-width: 1024px) 62vw, (min-width: 768px) 90vw, 88vw"
                    }
                  />
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Reveal>

      {/* Expected, not measured ----------------------------------------- */}
      <Reveal className="mt-[var(--spacing-chapter)] border-t border-rule pt-10">
        <EvidenceLabel kind="intended" />
        <p className="measure mt-4 text-lead leading-[1.4] text-text-strong">
          What the redesign is built to produce. None of it has been measured.
        </p>

        <ul className="mt-8 grid list-none gap-x-6 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {noon.expectedOutcomes.map((outcome) => (
            <li
              key={outcome}
              className="border-t border-rule py-4 text-[0.98rem] leading-snug text-text"
            >
              {outcome}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
        <BoundaryNote test={noon.boundaryTest}>{noon.boundary}</BoundaryNote>
      </Reveal>
    </article>
  );
}
