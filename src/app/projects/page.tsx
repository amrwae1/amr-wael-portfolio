import type { Metadata } from "next";
import Link from "next/link";
import { projectCardEntries } from "@/content/project-cards";
import { ProjectCard } from "@/components/portfolio/project-card";
import { site } from "@/content/portfolio";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Reveal } from "@/components/portfolio/reveal";

export const metadata: Metadata = {
  title: "Projects — Amr Wael",
  description:
    "Four product-design projects: Valora, Noon, Booking.com and a live client engagement. What each one was, the hard part, and what it proves.",
  alternates: { canonical: "/projects" },
};

/**
 * The Project Center — the browse layer between the home page and a case study.
 *
 * The home page shows three projects at their single strongest moment. This
 * page shows all four at the level someone needs in order to choose one: what
 * the product was, whose work it is, the hard part, and the proof. The full
 * reasoning stays in the published case study, one click further on.
 *
 * Every card states its standing plainly. Three of these are self-directed
 * concepts and one is a real client engagement, and a reviewer who cannot tell
 * the difference at a glance will assume the least generous reading of all
 * four.
 */
export default function Projects() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main" className="shell pt-[calc(4rem+var(--space-section))]">
        <Reveal>
          <p className="meta text-text-muted">Project center</p>
          <h1 className="mt-6 max-w-[18ch] font-serif text-chapter leading-[1.02] tracking-[-0.03em] text-text-strong">
            Four projects, and what each one settles.
          </h1>
          <p className="measure mt-6 text-lead leading-[1.45] text-text">
            Three self-directed concepts and one live client engagement. Each card
            says which it is.
          </p>
        </Reveal>

        {/* An editorial grid of the same four cards. The deeper reasoning that
            used to sit beside each one has moved onto the project pages: this
            layer exists so someone can tell the four apart and choose, not so
            they can read a case study twice. */}
        <ul className="mt-[var(--space-section)] grid list-none gap-[var(--space-related)] md:grid-cols-2">
          {projectCardEntries.map((entry, i) => (
            <Reveal as="li" key={entry.slug} variant="plate" delay={Math.min(i, 3) * 0.05}>
              <ProjectCard entry={entry} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-[var(--space-section)] border-t border-rule pt-10">
          <h2 className="text-title leading-[1.15] tracking-[-0.02em] text-text-strong">
            Have a problem shaped like one of these?
          </h2>
          <Link href={site.contactHref} className="action action-primary mt-6">
            {site.contactLabel}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </Reveal>
      </main>

      <footer className="shell border-t border-rule py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="meta">
            Amr Wael — Product designer, Cairo · {new Date().getFullYear()}
          </p>
          <Link
            href="/"
            className="meta inline-flex min-h-11 items-center normal-case tracking-normal text-text-muted"
          >
            Back to home
          </Link>
        </div>
      </footer>
    </>
  );
}
