import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, caseStudyBySlug, karmaStatus, nextProject } from "@/content/case-studies";
import { site } from "@/content/portfolio";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { EvidenceFigure } from "@/components/portfolio/evidence-figure";
import { Reveal } from "@/components/portfolio/reveal";
import { ProjectFooter } from "@/components/portfolio/project-footer";
import { ProjectIntro } from "@/components/portfolio/project-intro";
import { cardBySlug } from "@/content/project-cards";

export function generateStaticParams() {
  return [...caseStudies.map((c) => ({ slug: c.slug })), { slug: karmaStatus.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === karmaStatus.slug) {
    return {
      title: `${karmaStatus.name} — Amr Wael`,
      description: karmaStatus.overview,
      alternates: { canonical: `/projects/${slug}` },
    };
  }

  const study = caseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.name} — Amr Wael`,
    description: study.overview,
    alternates: { canonical: `/projects/${slug}` },
  };
}


/**
 * One project, at full depth — opened by its card.
 *
 * The page begins where the card left off: same palette, same poster, same
 * intended-impact line and evidence status, centred as a title page. Then the
 * argument, in the order a reviewer needs it:
 *
 *   1. the tension          what is actually hard here
 *   2. the decision         what the product has to help someone decide
 *   3. the design response  what was designed, with the screens as evidence
 *   4. the intended effect  what it is for — stated as intent, never result
 *   5. visible evidence     what exists and can be checked by looking
 *   6. limitations          what the work does not establish
 *   7. the next test        the test that could change the answer
 *
 * Interface screenshots appear only from step 3, after the thesis is stated.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === karmaStatus.slug) return <KarmaShopPage />;

  const study = caseStudyBySlug(slug);
  const entry = cardBySlug(slug);
  if (!study || !entry) notFound();

  const onward = nextProject(slug);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main">
        <ProjectIntro
          entry={entry}
          facts={[
            { label: "Role", value: study.role },
            { label: "Scope", value: study.scope },
            { label: "Type", value: study.type },
            { label: "Status", value: study.status },
          ]}
        />

        <div className="shell">
          {/* 1. Tension --------------------------------------------------- */}
          <section className="mt-[var(--space-section)]" aria-labelledby="tension-heading">
            <Reveal>
              <SectionHead id="tension-heading">The tension</SectionHead>
              <p className="measure-tight mt-6 font-serif text-title leading-[1.18] tracking-[-0.02em] text-text-strong">
                {study.problem[0]}
              </p>
              {study.problem.slice(1).map((p) => (
                <p key={p} className="measure mt-5 text-text">
                  {p}
                </p>
              ))}
            </Reveal>
          </section>

          {/* 2. The decision to support ----------------------------------- */}
          <section className="mt-[var(--space-block)]" aria-labelledby="decision-heading">
            <Reveal className="border-l-2 pl-6" style={{ borderColor: entry.palette.bright }}>
              <SectionHead id="decision-heading" rule={false}>
                The decision to support
              </SectionHead>
              <p className="measure mt-4 text-lead leading-[1.45] text-text-strong">
                {study.decisionToSupport}
              </p>
            </Reveal>
          </section>

          {/* 3. Design response ------------------------------------------- */}
          <section className="mt-[var(--space-section)]" aria-labelledby="response-heading">
            <Reveal>
              <SectionHead id="response-heading">Design response</SectionHead>
            </Reveal>

            {study.decisions.map((decision, i) => (
              <div key={decision.heading} className="mt-[var(--space-block)]">
                <Reveal>
                  <h3 className="measure-tight font-serif text-title leading-[1.15] tracking-[-0.02em] text-text-strong">
                    {decision.heading}
                  </h3>
                  <p className="measure mt-4 text-text">{decision.body}</p>
                </Reveal>

                {decision.figure ? (
                  <Reveal variant="plate" className="mt-8">
                    <EvidenceFigure
                      {...decision.figure}
                      sizes="(min-width: 1024px) 78vw, 100vw"
                      priority={i === 0}
                    />
                  </Reveal>
                ) : null}
              </div>
            ))}

            {/* Constraints stay, but only as the reasons behind the decisions. */}
            <Reveal className="mt-[var(--space-block)]">
              <p className="meta">What shaped these decisions</p>
              <ul className="mt-6 list-none">
                {study.constraints.map((c) => (
                  <li key={c} className="border-t border-rule py-5 first:border-t-0 first:pt-0">
                    <p className="measure text-[0.95rem] leading-relaxed text-text">{c}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* 4. Intended effect ------------------------------------------- */}
          <section className="mt-[var(--space-section)]" aria-labelledby="effect-heading">
            <Reveal>
              <SectionHead id="effect-heading">Intended effect</SectionHead>
              <p className="measure mt-6 text-lead leading-[1.45] text-text-strong">
                {study.objective}
              </p>
              <p className="meta mt-4">Intended, not measured</p>
            </Reveal>

            {study.hypothesis ? (
              <Reveal
                className="mt-10 border-l pl-5"
                style={{ borderColor: "var(--color-intended)" }}
              >
                <p className="meta" style={{ color: "var(--color-intended)" }}>
                  Hypothesis — not an established finding
                </p>
                <p className="measure mt-2 text-[0.95rem] leading-relaxed text-text-muted">
                  {study.hypothesis}
                </p>
              </Reveal>
            ) : null}
          </section>

          {/* 5. Visible evidence ------------------------------------------ */}
          <section className="mt-[var(--space-section)]" aria-labelledby="evidence-heading">
            <Reveal>
              <SectionHead id="evidence-heading">Visible evidence</SectionHead>
              <p className="measure mt-6 text-[0.95rem] leading-relaxed text-text-muted">
                What exists and can be checked in the screens above.
              </p>
            </Reveal>

            <ul className="measure mt-6 list-none">
              {study.delivered.map((d, i) => (
                <Reveal
                  as="li"
                  key={d}
                  delay={Math.min(i, 3) * 0.04}
                  className="flex gap-x-3 py-2 text-text"
                >
                  <span aria-hidden="true" className="text-text-muted">
                    —
                  </span>
                  <span>{d}</span>
                </Reveal>
              ))}
            </ul>

            {study.external ? (
              <Reveal className="mt-8">
                <a
                  href={study.external.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-rule text-[0.95rem]"
                >
                  {study.external.label}
                  <span aria-hidden="true" className="arrow">
                    ↗
                  </span>
                </a>
              </Reveal>
            ) : null}
          </section>

          {/* 6 + 7. Limits, then the test that would settle them ---------- */}
          <section
            className="mt-[var(--space-section)] grid gap-[var(--space-block)] lg:grid-cols-2 lg:gap-[var(--space-related)]"
            aria-label="Evidence limitations and next test"
          >
            <Reveal className="border-l pl-5" style={{ borderColor: "var(--color-boundary)" }}>
              <h2 className="meta" style={{ color: "var(--color-boundary)" }}>
                What this does not establish
              </h2>
              <p className="measure mt-3 text-[0.95rem] leading-relaxed text-text-muted">
                {study.assumed}
              </p>
            </Reveal>

            <Reveal className="border-l border-rule pl-5">
              <h2 className="meta text-text-strong">Next test</h2>
              <p className="measure mt-3 text-[0.95rem] leading-relaxed text-text">
                {study.validation}
              </p>
            </Reveal>
          </section>

          <ProjectFooter
            next={onward}
            contactHref={site.contactHref}
            contactLabel={site.contactLabel}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/** A section label that is also the section's heading. */
function SectionHead({
  id,
  children,
  rule = true,
}: {
  id: string;
  children: React.ReactNode;
  rule?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-x-6">
      <h2 id={id} className="meta text-text-strong">
        {children}
      </h2>
      {rule ? <span className="rule-fill" aria-hidden="true" /> : null}
    </div>
  );
}

/**
 * Karma Shop — a status page, not a case study.
 *
 * It opens exactly like the others, from its card, and then answers the one
 * question a reader has about an in-progress engagement — what stage it is at
 * and what will be shown — without inventing client details, a logo, shipped
 * work or results that do not exist yet.
 */
function KarmaShopPage() {
  const onward = nextProject(karmaStatus.slug);
  const entry = cardBySlug(karmaStatus.slug);
  if (!entry) notFound();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main">
        <ProjectIntro
          entry={entry}
          facts={[
            { label: "Role", value: karmaStatus.role },
            { label: "Type", value: karmaStatus.type },
            { label: "Status", value: karmaStatus.status },
          ]}
        />

        <div className="shell">
          <section className="mt-[var(--space-section)]" aria-labelledby="stage-heading">
            <Reveal>
              <SectionHead id="stage-heading">Current stage</SectionHead>
              <p className="measure mt-6 text-lead leading-[1.45] text-text">{karmaStatus.stage}</p>
            </Reveal>
          </section>

          <section className="mt-[var(--space-block)]" aria-labelledby="why-heading">
            <Reveal>
              <SectionHead id="why-heading">Why it is here</SectionHead>
              <p className="measure mt-6 text-text">{karmaStatus.whyItMatters}</p>
            </Reveal>
          </section>

          <section className="mt-[var(--space-block)]" aria-labelledby="publish-heading">
            <Reveal>
              <SectionHead id="publish-heading">It gets published when</SectionHead>
              <ul className="measure mt-6 list-none">
                {karmaStatus.publishWhen.map((item, i) => (
                  <li key={item} className="flex gap-x-3 py-2 text-text">
                    <span aria-hidden="true" className="text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <ProjectFooter
            next={onward}
            contactHref={site.contactHref}
            contactLabel={site.contactLabel}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}


function SiteFooter() {
  return (
    <footer className="shell border-t border-rule py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="meta">
          Amr Wael — Product designer, Cairo · {new Date().getFullYear()}
        </p>
        <Link
          href="/projects"
          className="meta inline-flex min-h-11 items-center normal-case tracking-normal text-text-muted"
        >
          All projects
        </Link>
      </div>
    </footer>
  );
}
