"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { site } from "@/content/portfolio";

/**
 * Persistent navigation.
 *
 * The contact action stays available at every scroll position but lives in the
 * header rather than a floating sales widget. Radix Dialog supplies the mobile
 * sheet so focus trapping, escape handling, and scroll locking are correct;
 * the styling is entirely ours.
 *
 * The header also does two pieces of orientation work, which a page this long
 * genuinely needs: a hairline that reports how far through the page the reader
 * is, and a nav item that marks the section currently under them. Both are
 * orientation, not engagement — neither adds a destination or asks for a click.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
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
              aria-current={current === item.href.slice(1) ? "location" : undefined}
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
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-rule text-text-strong md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-canvas/70 backdrop-blur-sm md:hidden" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-rule bg-surface-1 p-6 md:hidden">
              <div className="mb-4 flex items-center justify-between">
                <Dialog.Title className="meta">Menu</Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center rounded-md border border-rule text-text-strong"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none">
                      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>

              <nav aria-label="Site" className="flex flex-col">
                {site.navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={current === item.href.slice(1) ? "location" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center border-b border-rule py-3 font-serif text-[1.4rem] text-text-strong no-underline"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <a
                href={site.contactHref}
                onClick={() => setOpen(false)}
                className="action action-primary mt-6"
              >
                {site.contactLabel}
                <span aria-hidden="true" className="arrow">
                  →
                </span>
              </a>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
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
function useCurrentSection() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = site.navigation
      .map((item) => document.getElementById(item.href.slice(1)))
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
