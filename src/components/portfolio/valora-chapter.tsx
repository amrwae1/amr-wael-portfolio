import { valora } from "@/content/portfolio";
import { EvidenceFigure } from "./evidence-figure";
import { BoundaryNote, EvidenceLabel } from "./evidence-label";
import { Reveal } from "./reveal";
import { ValoraDecisionView } from "./valora-decision-view";

const [dashboard, evidence, plan, progress] = valora.figures;
const [foundations, components] = valora.systemFigures;

/**
 * The flagship chapter.
 *
 * Composed as a continuous chapter rather than a stack of cards: each figure
 * takes a different span and offset so the sequence reads as a narrative with
 * its own pacing, and no section repeats the left-copy / right-mockup pattern.
 */
export function ValoraChapter() {
  return (
    <section
      id={valora.id}
      className="shell scroll-mt-24 pb-[var(--spacing-chapter)]"
      aria-labelledby="valora-heading"
    >
      {/* Chapter head --------------------------------------------------- */}
      <Reveal className="border-t border-rule pt-8">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="folio">{valora.index}</span>
          <span className="meta">{valora.name}</span>
          <span className="meta">{valora.category}</span>
          <span className="rule-fill" aria-hidden="true" />
        </div>

        <div className="grid-12 mt-10">
          <h2
            id="valora-heading"
            className="col-span-4 text-chapter leading-[1.1] tracking-[-0.02em] md:col-span-8 lg:col-span-7"
          >
            {valora.proposition}
          </h2>
          <div className="col-span-4 self-end md:col-span-6 lg:col-span-4 lg:col-start-9">
            <p className="text-[0.95rem] leading-relaxed text-text-muted">{valora.status}</p>
            {/* A cautious client gets a route into the full case study. */}
            <a
              href={valora.caseStudy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule mt-4 text-[0.95rem]"
            >
              {valora.caseStudy.label}
              <span aria-hidden="true" className="arrow">
                ↗
              </span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* The problem ---------------------------------------------------- */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <h3 className="text-title leading-[1.2] tracking-[-0.01em]">
            {valora.problem.heading}
          </h3>
          <div className="measure mt-6 flex flex-col gap-4">
            {valora.problem.body.map((para, i) => (
              <p key={para} className={i === 0 ? "dropcap text-text" : "text-text"}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Offset right, and lower — an asymmetric second beat, no image. */}
        <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pt-16">
          <p className="meta">{valora.whyThisSignal.heading}</p>
          <p className="measure mt-4 text-lead leading-[1.4] text-text-strong">
            {valora.whyThisSignal.body}
          </p>
        </div>
      </Reveal>

      {/* Overview and prioritisation — widest plate in the chapter ------- */}
      <Reveal className="mt-[var(--spacing-chapter)]">
        <EvidenceFigure
          {...dashboard}
          sizes="(min-width: 1440px) 1296px, (min-width: 1024px) 90vw, 100vw"
        />
      </Reveal>

      {/* The comparison that carries the product logic ------------------- */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <h3 className="text-title leading-[1.2] tracking-[-0.01em]">
            {valora.decisionView.heading}
          </h3>
          <p className="measure mt-5 text-text">{valora.decisionView.body}</p>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
          <ValoraDecisionView />
        </div>
      </Reveal>

      {/* Evidence, with the reasoning beside the interface detail -------- */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)] items-end">
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <EvidenceFigure {...evidence} sizes="(min-width: 1024px) 62vw, 100vw" note={undefined} />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <EvidenceLabel kind="reasoning" />
          <p className="mt-3 text-[0.95rem] leading-relaxed text-text-muted">{evidence.note}</p>
        </div>
      </Reveal>

      {/* Translation into a plan — offset right -------------------------- */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
          <EvidenceFigure {...plan} sizes="(min-width: 1024px) 70vw, 100vw" />
        </div>
      </Reveal>

      {/* Follow-through — narrow, left, a deliberate change of pace ------ */}
      <Reveal className="grid-12 mt-[var(--spacing-chapter)] items-center">
        <div className="col-span-4 md:col-span-5 lg:col-span-5">
          <EvidenceFigure {...progress} sizes="(min-width: 1024px) 40vw, 100vw" note={undefined} />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-7">
          <p className="text-[0.95rem] leading-relaxed text-text-muted">{progress.note}</p>
        </div>
      </Reveal>

      {/* System foundation --------------------------------------------- */}
      <Reveal className="mt-[var(--spacing-chapter)] border-t border-rule pt-10">
        <p className="meta">System foundation</p>
        <p className="measure mt-4 text-lead leading-[1.4] text-text-strong">
          {valora.systemNote}
        </p>

        <div className="grid-12 mt-10">
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <EvidenceFigure
              {...foundations}
              evidence="solution"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <EvidenceFigure
              {...components}
              evidence="solution"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </Reveal>

      {/* Where the evidence stops -------------------------------------- */}
      <Reveal className="mt-16">
        <BoundaryNote>{valora.boundary}</BoundaryNote>
      </Reveal>
    </section>
  );
}
