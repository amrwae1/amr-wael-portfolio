import Link from "next/link";
import { Reveal } from "./reveal";

/**
 * The end of a project page.
 *
 * Two exits, never a dead end: back to the index, and on to the next project.
 * A reader who finishes a case study has just spent real attention, and the
 * worst thing to hand them at that moment is a footer with nowhere to go.
 *
 * The contact action sits alongside rather than below, because someone who read
 * a whole project to the end is the most likely person on the site to write.
 */
export function ProjectFooter({
  next,
  contactHref,
  contactLabel,
}: {
  next: { slug: string; name: string };
  contactHref: string;
  contactLabel: string;
}) {
  return (
    <Reveal className="mt-[var(--space-section)] border-t border-rule pt-10">
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
        <Link href="/projects" className="link-rule text-[0.95rem]">
          <span aria-hidden="true" className="arrow-back">
            ←
          </span>
          All projects
        </Link>

        <Link href={`/projects/${next.slug}`} className="link-rule text-[0.95rem]">
          {`Next — ${next.name}`}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </Link>
      </div>

      <a href={contactHref} className="action action-primary mt-10">
        {contactLabel}
        <span aria-hidden="true" className="arrow">
          →
        </span>
      </a>
    </Reveal>
  );
}
