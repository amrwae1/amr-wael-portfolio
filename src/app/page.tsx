import Link from "next/link";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { HeroStage } from "@/components/portfolio/hero-stage";
import { ContactInvitation } from "@/components/portfolio/contact-invitation";
import { Reveal } from "@/components/portfolio/reveal";
import { ProjectCard } from "@/components/portfolio/project-card";
import { cardBySlug, type ProjectCardEntry } from "@/content/project-cards";

/* The home page selects four of the projects; the Project Center shows all of
   them. Picked by slug, so reordering the full list cannot reshuffle this one. */
function pick(slug: string): ProjectCardEntry {
  const entry = cardBySlug(slug);
  if (!entry) throw new Error(`Home page selects unknown project "${slug}"`);
  return entry;
}
const flagship = pick("mazboot");
const peers = [pick("valora"), pick("noon")];
const quiet = pick("karma-shop");

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

        {/* Selected work ----------------------------------------------------
            The only place the projects appear on this page. Each card is the
            first sentence of its project page: what it is for, how much of
            that is established, and a way in. The screens and the reasoning
            live one click further on, where someone has chosen to read them. */}
        <section
          id="work"
          aria-labelledby="work-heading"
          className="-scroll-mt-6 pt-[var(--space-section)] pb-[var(--space-section)]"
        >
          <Reveal className="shell">
            <div className="flex items-baseline gap-x-6">
              <p className="meta">Selected work</p>
              <span className="rule-fill" aria-hidden="true" />
            </div>
            <h2
              id="work-heading"
              className="mt-7 max-w-[20ch] font-serif text-chapter leading-[1.04] tracking-[-0.03em] text-text-strong"
            >
              Four products. Four decisions made clearer.
            </h2>
            <p className="measure mt-7 max-w-[52ch] text-lead leading-[1.45] text-text">
              One live product of my own, two self-directed concepts and one client
              engagement. Each project shows the intended effect, the evidence
              behind it, and what remains untested.
            </p>
          </Reveal>

          {/* Weighted, not uniform. Mazboot leads at full width as the one live
              product; Valora and Noon are peers; Karma Shop closes lower and
              quieter, the right volume for work still in progress. */}
          <ul className="shell mt-[var(--space-block)] grid list-none grid-cols-1 gap-x-[var(--space-related)] gap-y-[calc(var(--space-related)*1.35)] md:grid-cols-2 lg:mt-[calc(var(--space-block)*1.4)]">
            <Reveal as="li" variant="plate" className="md:col-span-2">
              <ProjectCard entry={flagship} scale="flagship" />
            </Reveal>

            {peers.map((entry, i) => (
              <Reveal as="li" variant="plate" key={entry.slug} delay={i * 0.06}>
                <ProjectCard entry={entry} />
              </Reveal>
            ))}

            <Reveal as="li" variant="plate" className="md:col-span-2">
              <ProjectCard entry={quiet} scale="quiet" />
            </Reveal>
          </ul>

          <Reveal className="shell mt-[var(--space-block)]">
            <Link href="/projects" className="action action-primary">
              All six projects
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
                Two and a half years watching people decide things under
                pressure. Now building for it.
              </h2>

              <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
                <p className="measure text-text">
                  I spent two and a half years in B2B sales and customer operations
                  at Concentrix, supporting US business customers through
                  purchasing and account decisions. It was not a design job; it is
                  where the problem I design for became obvious. Now I am building
                  Mazboot, a profit monitor for online stores in Egypt.
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
            Amr Wael — Product builder, Cairo · {new Date().getFullYear()}
          </p>
          <p className="meta normal-case tracking-normal text-text-muted">
            Set in Source Serif 4 &amp; Public Sans
          </p>
        </div>
      </footer>
    </>
  );
}
