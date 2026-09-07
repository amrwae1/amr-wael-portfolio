"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { site } from "@/content/portfolio";

/**
 * Persistent navigation.
 *
 * The contact action stays available at every scroll position but lives in the
 * header rather than a floating sales widget. Radix Dialog supplies the mobile
 * sheet so focus trapping, escape handling, and scroll locking are correct;
 * the styling is entirely ours.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-canvas/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-serif text-[1.35rem] leading-none tracking-[-0.02em] text-text-strong no-underline"
        >
          {site.name}
          <span className="sr-only"> — {site.role}, back to top</span>
        </a>

        {/* Desktop ------------------------------------------------------- */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-rule border-b-transparent text-[0.95rem]"
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
