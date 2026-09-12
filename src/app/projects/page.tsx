import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projectCards } from "@/content/projects";
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

        <ul className="mt-[var(--space-section)] list-none">
          {projectCards.map((project, i) => (
            <Reveal
              as="li"
              key={project.id}
              delay={Math.min(i, 3) * 0.05}
              className="border-t border-rule py-10 first:border-t-0 first:pt-0"
            >
              <article id={project.id} className="grid-12 scroll-mt-24 items-start">
                {/* Identity ------------------------------------------------ */}
                <div className="col-span-4 md:col-span-8 lg:col-span-4">
                  <div className="flex items-baseline gap-x-4">
                    <p className="folio" aria-hidden="true">
                      {project.index}
                    </p>
                    <h2 className="text-title leading-[1.1] tracking-[-0.02em] text-text-strong">
                      {project.name}
                    </h2>
                  </div>

                  <p className="meta mt-3 text-text-muted">{project.category}</p>

                  {/* Stated plainly, never inferred. */}
                  <p
                    className="meta mt-4"
                    style={{
                      color:
                        project.standing === "Real client engagement"
                          ? "var(--color-accent-strong)"
                          : "var(--color-text-muted)",
                    }}
                  >
                    {project.standing}
                  </p>
                  <p className="measure mt-1.5 text-[0.95rem] leading-relaxed text-text-muted">
                    {project.role}
                  </p>
                </div>

                {/* Substance ----------------------------------------------- */}
                <div className="col-span-4 mt-6 md:col-span-8 lg:col-span-5 lg:mt-0">
                  <p className="measure text-text">{project.description}</p>

                  <dl className="mt-6">
                    <dt className="meta text-text-muted">The hard part</dt>
                    <dd className="measure mt-1.5 text-[0.95rem] leading-relaxed text-text">
                      {project.challenge}
                    </dd>

                    <dt className="meta mt-5 text-text-muted">What it proves</dt>
                    <dd className="measure mt-1.5 text-[0.95rem] leading-relaxed text-text">
                      {project.proof}
                    </dd>
                  </dl>

                  {/* The boundary, kept but compressed.
                      This used to be a full block on the home page after every
                      project. It is the strongest thing on the site and also
                      the most repetitive, so it now sits here, where someone is
                      deciding what to trust — and names the test rather than
                      only the gap. */}
                  {project.limit ? (
                    <div
                      className="measure mt-6 border-l pl-4"
                      style={{ borderColor: "var(--color-boundary)" }}
                    >
                      <p className="meta" style={{ color: "var(--color-boundary)" }}>
                        What this does not establish
                      </p>
                      <p className="measure mt-1.5 text-[0.95rem] leading-relaxed text-text-muted">
                        {project.limit}
                      </p>
                      {project.limitTest ? (
                        <p className="measure mt-2.5 text-[0.95rem] leading-relaxed text-text">
                          <span className="text-text-muted">What would settle it: </span>
                          {project.limitTest}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {project.href ? (
                    <Link href={project.href} className="action action-primary mt-7">
                      View project
                      <span aria-hidden="true" className="arrow">
                        →
                      </span>
                    </Link>
                  ) : null}
                </div>

                {/* Thumbnail ----------------------------------------------- */}
                {project.figure ? (
                  <div className="col-span-4 mt-6 md:col-span-8 lg:col-span-3 lg:mt-0">
                    <figure className="plate">
                      <div className="plate-media">
                        <Image
                          src={project.figure.src}
                          alt={project.figure.alt}
                          width={project.figure.width}
                          height={project.figure.height}
                          sizes="(min-width: 1024px) 24vw, 100vw"
                          className="block h-auto w-full"
                        />
                      </div>
                    </figure>
                  </div>
                ) : null}
              </article>
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
