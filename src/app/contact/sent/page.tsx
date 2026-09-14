import type { Metadata } from "next";
import Link from "next/link";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";

export const metadata: Metadata = {
  title: "Message sent — Amr Wael",
  robots: { index: false, follow: false },
};

/**
 * Where a contact form post lands when it was sent without the page's
 * JavaScript (see /api/contact). With JavaScript the form shows this outcome
 * in place and nobody ever sees this page.
 *
 * Reached only by a 303 from the route after the email service accepted the
 * message, so it can say "sent" honestly.
 */
export default function ContactSent() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main
        id="main"
        className="shell pt-[calc(4rem+var(--space-section))] pb-[var(--space-section)]"
      >
        <p className="meta" style={{ color: "var(--color-accent-strong)" }}>
          Message sent
        </p>
        <h1 className="measure-tight mt-6 font-serif text-chapter leading-[1.04] tracking-[-0.03em] text-text-strong">
          Thank you — it’s in my inbox.
        </h1>
        <p className="measure mt-6 text-lead leading-[1.45] text-text">
          I’ll reply to the email address you gave.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/projects" className="action action-primary">
            See the projects
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
          <Link href="/" className="link-rule text-[0.95rem]">
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
