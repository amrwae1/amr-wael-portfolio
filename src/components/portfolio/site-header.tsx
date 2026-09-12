"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { site } from "@/content/portfolio";
import { motionTokens, standardEase } from "./motion-tokens";

/**
 * Persistent navigation.
 *
 * The contact action stays available at every scroll position but lives in the
 * header rather than a floating sales widget. The mobile sheet is built here
 * rather than pulled from a dialog library — see MobileMenu for why.
 *
 * The header also does two pieces of orientation work, which a page this long
 * genuinely needs: a hairline that reports how far through the page the reader
 * is, and a nav item that marks the section currently under them. Both are
 * orientation, not engagement — neither adds a destination or asks for a click.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  /* Stable identity, deliberately. As an inline arrow this handler was a new
     function on every render, which re-ran the sheet effect each time — and
     that effect restores focus on cleanup, so focus was pulled back out of the
     panel the instant it arrived. */
  const close = useCallback(() => setOpen(false), []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const current = useCurrentSection();
  const reduce = useReducedMotion();

  /* Reading position, drawn on the header's own rule. The spring only smooths
     a value the reader is already driving with their scroll; with reduced
     motion the raw progress is used so the line still tracks, without easing. */
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-canvas/85 backdrop-blur-md">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduce ? scrollYProgress : smoothed }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent-strong/70"
      />
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="inline-flex min-h-11 min-w-11 items-baseline gap-2 font-serif text-[1.4rem] leading-none tracking-[-0.03em] text-text-strong no-underline"
        >
          {site.name}
          <span aria-hidden="true" className="meta hidden text-text-muted sm:inline">
            {site.role}
          </span>
          <span className="sr-only"> — {site.role}, back to top</span>
        </a>

        {/* Desktop ------------------------------------------------------- */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={current === sectionId(item.href) ? "location" : undefined}
              className="nav-link text-[0.95rem]"
            >
              {item.label}
            </a>
          ))}
          <a href={site.contactHref} className="action action-primary">
            {site.contactLabel}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </a>
        </nav>

        {/* Mobile -------------------------------------------------------- */}
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="inline-flex size-11 items-center justify-center rounded-md border border-rule text-text-strong transition-colors duration-150 hover:border-text-muted hover:bg-surface-1 md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <MobileMenu
        open={open}
        onClose={close}
        current={current}
        reduce={Boolean(reduce)}
        triggerRef={triggerRef}
      />
    </header>
  );
}

/**
 * The mobile navigation sheet.
 *
 * This was a Radix Dialog. On the shipped site its state never flipped — the
 * trigger kept `data-state="closed"` through a real click, a programmatic
 * click, and a full pointer sequence, on production as well as locally, with
 * React demonstrably hydrated. Rather than ship navigation that could not be
 * verified, it is built here directly: the behaviour needed is a panel, an
 * escape key, a scroll lock and focus handling, all of which are short enough
 * to own outright and test.
 *
 * What it keeps from the Radix version: focus moves into the sheet on open and
 * returns to the trigger on close, Escape dismisses, the overlay dismisses,
 * background scroll is locked, and the panel is labelled as a modal dialog.
 */
function MobileMenu({
  open,
  onClose,
  current,
  reduce,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  current: string | null;
  reduce: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panel = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (!open) return;

    /* Captured now rather than read in the cleanup: by the time the cleanup
       runs the ref may point somewhere else. */
    const trigger = triggerRef.current;

    /* Background scroll is locked while the sheet is up. The padding swap keeps
       the header from shifting sideways as the scrollbar disappears. */
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      /* Keep Tab inside the sheet: a keyboard user must not land on the page
         behind a modal they cannot see past. */
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      /* Focus goes back to the control that opened the sheet, rather than to
         whatever happened to hold it beforehand. A pointer user opening the
         menu leaves focus on the body, and restoring that would strand a
         keyboard user at the top of the document with no idea where they are. */
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <>
      {open ? (
        <motion.div
            key="menu-overlay"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.12 : 0.2, ease: standardEase }}
            className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-sm md:hidden"
          />
      ) : null}

      {open ? (
        <motion.div
            key="menu-panel"
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            /* The sheet arrives from the edge it lives on. With reduced motion
               it simply appears. */
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            transition={{
              duration: reduce ? 0.12 : motionTokens.duration.state,
              ease: standardEase,
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-rule bg-surface-1 p-6 md:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="meta">Menu</p>
              <button
                type="button"
                autoFocus
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-md border border-rule text-text-strong transition-colors duration-150 hover:border-text-muted"
              >
                <span className="sr-only">Close menu</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <nav aria-label="Site" className="flex flex-col">
              {site.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={current === sectionId(item.href) ? "location" : undefined}
                  onClick={onClose}
                  className="flex min-h-[44px] items-center border-b border-rule py-3 font-serif text-[1.4rem] text-text-strong no-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a href={site.contactHref} onClick={onClose} className="action action-primary mt-6">
              {site.contactLabel}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </a>
        </motion.div>
      ) : null}
    </>
  );
}

/**
 * The id of the navigable section currently under the reader, or null when they
 * are in the hero or the closing invitation — neither of which is in the nav,
 * so marking one of them would be a lie.
 *
 * The root margin leaves a narrow band across the middle of the viewport: a
 * section becomes current when it crosses the reader's line of sight, not when
 * its first pixel appears. Sections are read from the nav so the two can never
 * drift apart.
 */
/** The element id a nav href points at, or null for a route link. */
function sectionId(href: string) {
  const hash = href.indexOf("#");
  return hash === -1 ? null : href.slice(hash + 1);
}

function useCurrentSection() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = site.navigation
      .map((item) => {
        const id = sectionId(item.href);
        return id ? document.getElementById(id) : null;
      })
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setCurrent((previous) => {
          const entering = entries.find((entry) => entry.isIntersecting);
          if (entering) return entering.target.id;

          // Only clear when the section that *was* current is the one leaving,
          // so scrolling past an unrelated section cannot blank the marker.
          const currentLeft = entries.some(
            (entry) => !entry.isIntersecting && entry.target.id === previous,
          );
          return currentLeft ? null : previous;
        });
      },
      /* A band across the middle third of the viewport. Narrower than this and
         the chapter gap between two sections falls outside it, which blanks the
         marker mid-transition; wider and two sections claim the reader at once. */
      { rootMargin: "-35% 0px -35% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return current;
}
