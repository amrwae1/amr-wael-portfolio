import Link from "next/link";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { HeroStage } from "@/components/portfolio/hero-stage";
import { EvidenceBlock } from "@/components/portfolio/evidence-block";
import { ContactInvitation } from "@/components/portfolio/contact-invitation";
import { Reveal } from "@/components/portfolio/reveal";
import { ProjectCard } from "@/components/portfolio/project-card";
import { homeEvidence } from "@/content/projects";
import { projectCardEntries } from "@/content/project-cards";

/**
 * The home page: a landing page, not a collection of case studies.
 *
 * It used to run every project in full — problem, reasoning, four figures, a
 * tabbed comparison, a system layer and a boundary note, three times over. The
 * depth was real, but it was spent on a reader who had not yet decided to
 * spend anything, and the one real client engagement sat at the bottom of it.
 *
 * The order now answers four questions in the order a reviewer asks them: who
 * is this, what kind of designer, what proves it, and where do I look next.
 * Each project appears once, at its strongest moment; the full argument lives
 * in the Project Center and the published case studies.
 */
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main">
        <HeroStage />

        {/* Evidence ---------------------------------------------------------
            Three projects, one proof each. Sides alternate so the run does not
            read as the same block printed three times. */}
        <section id="work" className="scroll-mt-24 pt-[var(--space-section)]">
          <Reveal className="shell pb-12">
            <div className="flex items-baseline gap-x-6">
              <p className="meta">Selected work</p>
              <span className="rule-fill" aria-hidden="true" />
            </div>
            <h2 className="mt-6 max-w-[26ch] font-serif text-chapter leading-[1.04] tracking-[-0.03em] text-text-strong">
              Three decisions worth defending.
            </h2>

            {/* The honesty, kept — but once, and short.
                It used to run as a full Evidence boundary block after every
                project, which was the strongest thing on the old page and also
                three-quarters of its length. Moving the case studies out took
                it with them. One line holds the same position: these are
                concepts, nothing is measured, and the page says so before a
                reviewer has to work it out. */}
            <p className="measure mt-6 text-[0.95rem] leading-relaxed text-text-muted">
              All three are self-directed concepts. The screens are real design
              work; the data inside them is demonstration content, and nothing
              here has been tested with users — each project names the test that
              would settle it.
            </p>
          </Reveal>

          {/* The cards, weighted. Valora takes the full width because it is
              the flagship and the page should say so before any copy does;
              Noon and Booking.com share a row as peers; Karma Shop closes
              quietly, which is the right volume for work still in progress. */}
          <div className="shell">
            <Reveal variant="plate" className="pb-[var(--space-related)]">
              <ProjectCard entry={projectCardEntries[0]} scale="flagship" />
            </Reveal>

            <div className="grid gap-[var(--space-related)] pb-[var(--space-related)] md:grid-cols-2">
              {projectCardEntries.slice(1, 3).map((entry, i) => (
                <Reveal variant="plate" key={entry.slug} delay={i * 0.06}>
                  <ProjectCard entry={entry} />
                </Reveal>
              ))}
            </div>

            <Reveal variant="plate">
              <ProjectCard entry={projectCardEntries[3]} scale="quiet" />
            </Reveal>
          </div>

          {/* The evidence, after the cards. The cards are the invitation; these
              are the one thing each project actually shows. */}
          <div className="mt-[var(--space-section)]">
            {homeEvidence.map((block, i) => (
              <EvidenceBlock key={block.id} block={block} reversed={i % 2 === 1} />
            ))}
          </div>

          <Reveal className="shell pb-[var(--space-section)]">
            <Link href="/projects" className="action action-primary">
              All four projects
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
          </Reveal>
        </section>

        {/* About, in preview ------------------------------------------------
            Deliberately after the work and deliberately short. A reviewer who
            is still reading at this point has decided the projects are worth
            something; that is the moment a sentence about the person lands,
            and not before. The Approach section that used to sit here said the
            same thing at four times the length and is now the About page. */}
        <section
          id="about"
          aria-labelledby="about-preview-heading"
          className="shell scroll-mt-24 pb-[var(--space-section)]"
        >
          <Reveal className="border-t border-rule pt-8">
            <div className="flex items-baseline gap-x-6">
              <p className="meta">About</p>
              <span className="rule-fill" aria-hidden="true" />
            </div>

            <div className="grid-12 mt-[var(--space-related)]">
              <h2
                id="about-preview-heading"
                className="col-span-4 text-title leading-[1.2] tracking-[-0.02em] text-text-strong md:col-span-8 lg:col-span-5"
              >
                Two years watching people decide things under pressure, then
                designing for it.
              </h2>

              <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
                <p className="measure text-text">
                  I work in B2B sales and customer operations at Concentrix,
                  supporting US business customers through purchasing and account
                  decisions. It is not a design job. It is where the problem I
                  design for became obvious.
                </p>

                <Link href="/about" className="link-rule mt-7 text-[0.95rem]">
                  More about me
                  <span aria-hidden="true" className="arrow">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        <ContactInvitation />
      </main>

      <footer className="shell border-t border-rule py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="meta">
            Amr Wael — Product designer, Cairo · {new Date().getFullYear()}
          </p>
          <p className="meta normal-case tracking-normal text-text-muted">
            Set in Source Serif 4 &amp; Public Sans
          </p>
        </div>
      </footer>
    </>
  );
}
