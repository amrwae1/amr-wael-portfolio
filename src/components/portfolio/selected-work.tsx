import { projects } from "@/content/portfolio";
import { NoonChapter } from "./noon-chapter";
import { ProjectChapter } from "./project-chapter";
import { KarmaRecord } from "./karma-record";

/**
 * Selected work, in deliberate order of weight.
 *
 * Valora is its own chapter above. What remains descends: Noon as a reasoning
 * chapter with its own composition, Booking as an evidence-led chapter, and
 * Karma Shop as a single upcoming line. Three equal cards would flatten exactly
 * the hierarchy this section exists to communicate.
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      className="shell scroll-mt-24 pb-[var(--spacing-chapter)]"
      aria-labelledby="work-heading"
    >
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>

      <div className="flex flex-col gap-[var(--spacing-chapter)]">
        <NoonChapter />
        {projects.map((project) => (
          <ProjectChapter key={project.id} project={project} />
        ))}
        <KarmaRecord />
      </div>
    </section>
  );
}
