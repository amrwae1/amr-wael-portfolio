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
import { FactRow } from "@/components/portfolio/fact-row";

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
 * One project, at full depth.
 *
 * This is where the reasoning that used to crowd the home page now lives. A
 * reader arrives here having already chosen the project, so the page can afford
 * the problem, the decisions with their evidence, the constraints, and an
 * honest account of what is still unknown.
 *
 * The order is deliberate: what it is, what was wrong, what was decided and on
 * what evidence, what limited it, what exists — and only then what the work
 * does not establish. Putting the boundary last means it reads as the end of an
 * argument rather than as a disclaimer attached to the front of one.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === karmaStatus.slug) return <KarmaShopPage />;

  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  const onward = nextProject(slug);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main" className="shell pt-[calc(4rem+var(--space-section))]">
        {/* Masthead ---------------------------------------------------- */}
        <Reveal>
          <div className="flex items-baseline gap-x-5">
            <p className="folio" aria-hidden="true">
              {study.index}
            </p>
            <p className="meta text-text-muted">{study.category}</p>
          </div>

          <h1 className="mt-6 max-w-[16ch] font-serif text-chapter leading-[1.02] tracking-[-0.03em] text-text-strong">
            {study.name}
          </h1>

          <p className="measure mt-7 text-lead leading-[1.45] text-text">{study.overview}</p>
        </Reveal>

        {/* The facts, before the argument ------------------------------- */}
        <Reveal className="mt-[var(--space-block)] border-t border-rule pt-8">
          <dl className="grid-12">
            <FactRow label="Role" value={study.role} />
            <FactRow label="Scope" value={study.scope} />
            <FactRow label="Type" value={study.type} />
            <FactRow label="Status" value={study.status} />
          </dl>
        </Reveal>

        {/* Problem and objective --------------------------------------- */}
        <section className="mt-[var(--space-section)]" aria-labelledby="problem-heading">
          <Reveal>
            <p className="meta text-text-muted">The problem</p>
            <h2
              id="problem-heading"
              className="measure-tight mt-5 font-serif text-title leading-[1.15] tracking-[-0.02em] text-text-strong"
            >
              {study.problem[0]}
            </h2>
            {study.problem.slice(1).map((p) => (
              <p key={p} className="measure mt-5 text-text">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-10 border-l pl-5" style={{ borderColor: "var(--color-accent)" }}>
            <p className="meta" style={{ color: "var(--color-accent-strong)" }}>
              Business objective
            </p>
            <p className="measure mt-2 text-text-strong">{study.objective}</p>
          </Reveal>

          {study.hypothesis ? (
            <Reveal
              className="mt-8 border-l pl-5"
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

        {/* Decisions ---------------------------------------------------- */}
        <section className="mt-[var(--space-section)]" aria-labelledby="decisions-heading">
          <Reveal>
            <div className="flex items-baseline gap-x-6">
              <p className="meta" id="decisions-heading">
                Key decisions
              </p>
              <span className="rule-fill" aria-hidden="true" />
            </div>
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
        </section>

        {/* Constraints -------------------------------------------------- */}
        <section className="mt-[var(--space-section)]" aria-labelledby="constraints-heading">
          <Reveal>
            <div className="flex items-baseline gap-x-6">
              <p className="meta" id="constraints-heading">
                Constraints and tradeoffs
              </p>
              <span className="rule-fill" aria-hidden="true" />
            </div>
          </Reveal>

          <ul className="mt-8 list-none">
            {study.constraints.map((c, i) => (
              <Reveal
                as="li"
                key={c}
                delay={Math.min(i, 3) * 0.05}
                className="border-t border-rule py-5 first:border-t-0 first:pt-0"
              >
                <p className="measure text-[0.95rem] leading-relaxed text-text">{c}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* What exists -------------------------------------------------- */}
        <section className="mt-[var(--space-section)]" aria-labelledby="delivered-heading">
          <Reveal>
            <div className="flex items-baseline gap-x-6">
              <p className="meta" id="delivered-heading">
                What was designed
              </p>
              <span className="rule-fill" aria-hidden="true" />
            </div>
          </Reveal>

          <ul className="measure mt-8 list-none">
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
        </section>

        {/* The boundary, last ------------------------------------------- */}
        <Reveal
          className="measure mt-[var(--space-section)] border-l pl-5"
          style={{ borderColor: "var(--color-boundary)" }}
        >
          <p className="meta" style={{ color: "var(--color-boundary)" }}>
            What this does not establish
          </p>
          <p className="measure mt-2.5 text-[0.95rem] leading-relaxed text-text-muted">
            {study.assumed}
          </p>

          <p className="meta mt-7 text-text-muted">Next validation step</p>
          <p className="measure mt-2.5 text-[0.95rem] leading-relaxed text-text">
            {study.validation}
          </p>
        </Reveal>

        {study.external ? (
          <Reveal className="mt-10">
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

        <ProjectFooter next={onward} contactHref={site.contactHref} contactLabel={site.contactLabel} />
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * Karma Shop — a status page, not a case study.
 *
 * It answers the one question a reader actually has about an in-progress
 * engagement (what stage is it at, and what will be shown) without inventing
 * client details, shipped work or results that do not exist yet.
 */
function KarmaShopPage() {
  const onward = nextProject(karmaStatus.slug);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main" className="shell pt-[calc(4rem+var(--space-section))]">
        <Reveal>
          <div className="flex items-baseline gap-x-5">
            <p className="folio" aria-hidden="true">
              {karmaStatus.index}
            </p>
            <p className="meta" style={{ color: "var(--color-accent-strong)" }}>
              {karmaStatus.category}
            </p>
          </div>

          <h1 className="mt-6 max-w-[16ch] font-serif text-chapter leading-[1.02] tracking-[-0.03em] text-text-strong">
            {karmaStatus.name}
          </h1>

          <p className="measure mt-7 text-lead leading-[1.45] text-text">
            {karmaStatus.overview}
          </p>
        </Reveal>

        <Reveal className="mt-[var(--space-block)] border-t border-rule pt-8">
          <dl className="grid-12">
            <FactRow label="Role" value={karmaStatus.role} />
            <FactRow label="Type" value={karmaStatus.type} />
            <FactRow label="Status" value={karmaStatus.status} />
          </dl>
        </Reveal>

        <section className="mt-[var(--space-section)]">
          <Reveal>
            <p className="meta text-text-muted">Current stage</p>
            <p className="measure mt-5 text-lead leading-[1.45] text-text">
              {karmaStatus.stage}
            </p>
          </Reveal>

          <Reveal className="mt-[var(--space-block)]">
            <p className="meta text-text-muted">Why it is here at all</p>
            <p className="measure mt-5 text-text">{karmaStatus.whyItMatters}</p>
          </Reveal>

          <Reveal className="mt-[var(--space-block)]">
            <p className="meta text-text-muted">It gets published when</p>
            <ul className="measure mt-5 list-none">
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

        <ProjectFooter next={onward} contactHref={site.contactHref} contactLabel={site.contactLabel} />
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
