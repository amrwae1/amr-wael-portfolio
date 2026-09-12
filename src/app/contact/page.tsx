import type { Metadata } from "next";
import Link from "next/link";
import { contact, site } from "@/content/portfolio";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { ContactForm } from "@/components/portfolio/contact-form";
import { Reveal } from "@/components/portfolio/reveal";

export const metadata: Metadata = {
  title: "Contact — Amr Wael",
  description:
    "Start a conversation about a B2B, enterprise or AI product problem. Email, LinkedIn and résumé.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact.
 *
 * Every call to action on the site now lands here instead of opening a blank
 * mail window. A mailto asks the visitor to compose a message from nothing,
 * which is where most of them stop; a form with four fields asks them to answer
 * four questions, which is a much smaller thing to do.
 *
 * The page keeps the direct address visible throughout rather than hiding it
 * behind the button, because some people would simply rather write their own
 * email — and because the form hands off to a mail client, so the address is
 * the honest fallback if that handover fails.
 */
export default function Contact() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main" className="shell pt-[calc(4rem+var(--space-block))]">
        <Reveal>
          <p className="meta text-text-muted">Contact</p>
          <h1 className="measure-tight mt-6 font-serif text-chapter leading-[1.06] tracking-[-0.03em] text-text-strong">
            Tell me what you are trying to decide.
          </h1>
          <p className="measure mt-6 text-lead leading-[1.45] text-text">
            The conversations worth having start with a product or business problem that
            has consequences attached — B2B, enterprise, or anything where someone has to
            make a hard call with incomplete information.
          </p>
        </Reveal>

        <Reveal className="mt-[var(--space-block)]">
          <ContactForm />
        </Reveal>

        {/* Everything else, in one quiet row ---------------------------- */}
        <Reveal className="mt-[var(--space-section)] border-t border-rule pt-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={site.resume.href}
              target="_blank"
              rel="noreferrer"
              className="link-rule text-[0.95rem]"
            >
              {site.resume.label}
              <span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden="true" className="arrow">
                ↗
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
