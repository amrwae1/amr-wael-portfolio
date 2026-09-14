import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/portfolio";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";

export const metadata: Metadata = {
  title: "Message not sent — Amr Wael",
  robots: { index: false, follow: false },
};

/**
 * Where a contact form post lands when it was submitted without the page's
 * JavaScript and could not be delivered: a detail was missing, too many
 * messages came from one address, or the email service failed.
 *
 * It never implies the message arrived, and it gives the direct address so
 * the visitor is not left without a way through.
 */
export default function ContactNotSent() {
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
        <p className="meta" style={{ color: "var(--color-boundary)" }}>
          Not sent
        </p>
        <h1 className="measure-tight mt-6 font-serif text-chapter leading-[1.04] tracking-[-0.03em] text-text-strong">
          Your message didn’t go through.
        </h1>
        <p className="measure mt-6 text-lead leading-[1.45] text-text">
          Check that your email address is complete and the message is at least
          a sentence, then try again. Or write to me directly at{" "}
          <a href={`mailto:${site.email}`} className="link-rule">
            {site.email}
          </a>
          .
        </p>

        <div className="mt-10">
          <Link href="/contact" className="action action-primary">
            Back to the form
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
