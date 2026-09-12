import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/content/about";
import { contact, site } from "@/content/portfolio";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Reveal } from "@/components/portfolio/reveal";

export const metadata: Metadata = {
  title: "About — Amr Wael",
  description:
    "Product designer in Cairo working on B2B and AI interfaces. What the projects demonstrate, what is self-directed, and how to get in touch.",
  alternates: { canonical: "/about" },
};

/**
 * About.
 *
 * Ordered the way a hiring manager reads: who, then what the work demonstrates,
 * then whose work it actually is, then what he wants, then the plain facts.
 * Ownership gets its own section rather than a clause, because unclear personal
 * contribution is the most common reason a portfolio gets discounted and the
 * answer here — all of it, no team — is a genuine advantage worth stating.
 *
 * No portrait: no suitable photograph exists in the project. A placeholder
 * silhouette would be worse than the absence, so the page leads on type.
 */
export default function About() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main" className="shell pt-[calc(4rem+var(--space-block))]">
        <Reveal>
          <p className="meta text-text-muted">{about.eyebrow}</p>
          <h1 className="measure-tight mt-6 font-serif text-chapter leading-[1.06] tracking-[-0.03em] text-text-strong">
            {about.heading}
          </h1>
        </Reveal>

        <Reveal className="mt-[var(--space-related)]">
          {about.intro.map((p, i) => (
            <p
              key={p}
              className={
                i === 0
                  ? "measure text-lead leading-[1.45] text-text"
                  : "measure mt-5 text-text"
              }
            >
              {p}
            </p>
          ))}
        </Reveal>

        {/* What the work demonstrates ---------------------------------- */}
        <section className="mt-[var(--space-section)]" aria-labelledby="strengths-heading">
          <Reveal>
            <div className="flex items-baseline gap-x-6">
              <h2 className="meta" id="strengths-heading">
                What the projects demonstrate
              </h2>
              <span className="rule-fill" aria-hidden="true" />
            </div>
          </Reveal>

          <ul className="mt-[var(--space-related)] list-none">
            {about.strengths.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={Math.min(i, 3) * 0.05}
                className="grid-12 border-t border-rule py-8 first:border-t-0 first:pt-0"
              >
                <h3 className="col-span-4 text-title leading-[1.2] tracking-[-0.02em] text-text-strong md:col-span-8 lg:col-span-5">
                  {s.title}
                </h3>
                <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
                  <p className="measure text-text">{s.body}</p>
                  <Link href={s.project.href} className="link-rule mt-5 text-[0.95rem]">
                    {`Inside ${s.project.name}`}
                    <span aria-hidden="true" className="arrow">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Ownership, stated rather than implied ----------------------- */}
        <Reveal className="mt-[var(--space-section)] grid-12">
          <h2 className="col-span-4 text-title leading-[1.2] tracking-[-0.02em] text-text-strong md:col-span-8 lg:col-span-4">
            {about.ownership.heading}
          </h2>
          <p className="measure col-span-4 text-text md:col-span-8 lg:col-span-7 lg:col-start-6">
            {about.ownership.body}
          </p>
        </Reveal>

        <Reveal className="mt-[var(--space-block)] grid-12">
          <h2 className="col-span-4 text-title leading-[1.2] tracking-[-0.02em] text-text-strong md:col-span-8 lg:col-span-4">
            {about.looking.heading}
          </h2>
          <p className="measure col-span-4 text-text md:col-span-8 lg:col-span-7 lg:col-start-6">
            {about.looking.body}
          </p>
        </Reveal>

        {/* The plain facts --------------------------------------------- */}
        <section className="mt-[var(--space-section)]" aria-labelledby="background-heading">
          <Reveal>
            <div className="flex items-baseline gap-x-6">
              <h2 className="meta" id="background-heading">
                Background
              </h2>
              <span className="rule-fill" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal className="mt-[var(--space-related)]">
            <dl className="grid-12 gap-y-6">
              {about.background.map((row) => (
                <div key={row.label} className="col-span-4 md:col-span-4 lg:col-span-4">
                  <dt className="meta text-text-muted">{row.label}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-text">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Contact ------------------------------------------------------ */}
        <Reveal className="mt-[var(--space-section)] border-t border-rule pt-10">
          <h2 className="text-title leading-[1.2] tracking-[-0.02em] text-text-strong">
            {about.contact.heading}
          </h2>
          <p className="measure mt-4 text-text">{about.contact.body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={site.contactHref} className="action action-primary">
              {site.contactLabel}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </a>

            {contact.channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="link-rule text-[0.95rem]"
              >
                {channel.label}
                <span className="sr-only"> (opens in a new tab)</span>
                <span aria-hidden="true" className="arrow">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-[var(--space-block)]">
          <Link href="/projects" className="link-rule text-[0.95rem]">
            <span aria-hidden="true" className="arrow-back">
              ←
            </span>
            All projects
          </Link>
        </Reveal>
      </main>

      <footer className="shell mt-[var(--space-section)] border-t border-rule py-10">
        <p className="meta">
          Amr Wael — Product designer, Cairo · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
