import type { projects } from "@/content/portfolio";
import { EvidenceFigure } from "./evidence-figure";
import { BoundaryNote, EvidenceLabel } from "./evidence-label";
import { MissingAssetGroup, MissingAssetRows } from "./missing-asset";

type Project = (typeof projects)[number];

/**
 * A focused project chapter — evidence first, copy second.
 *
 * Leading with the figures reverses the preceding chapter's composition and,
 * more usefully, gives portrait phone captures the width they need to stay
 * readable. Seniority against the chapters above is carried by heading size,
 * not by area.
 */
export function ProjectChapter({ project }: { project: Project }) {
  // Some projects have real figures; the rest reserve labelled slots.
  const figures = "figures" in project ? project.figures : undefined;

  return (
    <article
      id={project.id}
      className="scroll-mt-24 border-t border-rule pt-8"
      aria-labelledby={`${project.id}-heading`}
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="numeral text-title">{project.index}</span>
        <span className="meta">{project.name}</span>
        <span className="meta">{project.category}</span>
      </div>

      <div className="grid-12 mt-10">
        {/* Copy ---------------------------------------------------------- */}
        <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <h3
            id={`${project.id}-heading`}
            className="text-title leading-[1.12] tracking-[-0.02em]"
          >
            {project.proposition}
          </h3>

          <div className="measure mt-6 flex flex-col gap-4">
            {project.body.map((para) => (
              <p key={para} className="text-text">
                {para}
              </p>
            ))}
          </div>

          <ul className="mt-8 flex list-none flex-col gap-2.5 border-t border-rule p-0 pt-6">
            {project.focus.map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem] text-text">
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] size-[5px] shrink-0 rounded-full bg-rule"
                />
                {item}
              </li>
            ))}
          </ul>

          <p className="meta mt-8">{project.status}</p>

          {/* A cautious client gets a route into the full case study. */}
          {"caseStudy" in project ? (
            <a
              href={project.caseStudy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule mt-4 text-[0.95rem]"
            >
              {project.caseStudy.label}
              <span aria-hidden="true" className="arrow">
                ↗
              </span>
            </a>
          ) : null}
        </div>

        {/* Evidence ------------------------------------------------------- */}
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:row-start-1">
          {figures ? (
            <>
              {/* The pair is one piece of evidence, so it carries one evidence
                  label. Repeating it above each plate read as noise. */}
              <EvidenceLabel kind={project.evidence} />

              {/* Two portrait phone plates read as one comparison, so they sit
                  side by side from the tablet breakpoint up. */}
              <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {figures.map((figure) => (
                  <EvidenceFigure
                    key={figure.src}
                    {...figure}
                    // The pair's label is rendered once above, not per plate.
                    evidence={undefined}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 88vw"
                  />
                ))}
              </div>
              {project.missing.length > 0 ? (
                <MissingAssetRows assets={project.missing} className="mt-8" />
              ) : null}
            </>
          ) : (
            <>
              <EvidenceLabel kind={project.evidence} />
              <MissingAssetGroup assets={project.missing} className="mt-3" />
            </>
          )}
        </div>
      </div>

      <div className="mt-12">
        <BoundaryNote>{project.boundary}</BoundaryNote>
      </div>
    </article>
  );
}
