import Link from "next/link";
import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";

/**
 * The 404 page.
 *
 * Next's default not-found UI follows the visitor's OS colour scheme and
 * ignores the site's tokens. On a light-mode system that meant a white page
 * with the site's near-white text on it, readable by almost nobody, and no
 * navigation back. This one sits on the site's own ground, keeps the header,
 * and offers the two places a lost visitor most likely wanted.
 *
 * Next injects `noindex` for 404 responses, so it never enters search results.
 */
export default function NotFound() {
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
        <p className="meta text-text-muted">404</p>
        <h1 className="measure-tight mt-6 font-serif text-chapter leading-[1.04] tracking-[-0.03em] text-text-strong">
          This page doesn’t exist.
        </h1>
        <p className="measure mt-6 text-lead leading-[1.45] text-text">
          The link may be old, or the address mistyped. The work is one step
          away.
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
