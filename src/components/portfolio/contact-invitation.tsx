import { contact, site } from "@/content/portfolio";
import Link from "next/link";
import { Reveal } from "./reveal";

/**
 * The closing invitation.
 *
 * Written as the conclusion of the page rather than a conversion banner. Every
 * channel is a real, verified destination taken from Amr's CV, so the primary
 * action opens a mail composer rather than scrolling to an explanation of why
 * there is nothing to click.
 */
export function ContactInvitation() {
  return (
    <section
      id="contact"
      className="shell scroll-mt-24 pb-[var(--spacing-chapter)]"
      aria-labelledby="contact-heading"
    >
      <Reveal className="border-t border-rule pt-8">
        <div className="flex items-baseline gap-x-6">
          <span className="folio" aria-hidden="true">
            &mdash;
          </span>
          <p className="meta">Contact</p>
          <span className="rule-fill" aria-hidden="true" />
        </div>
      </Reveal>

      <Reveal className="grid-12 mt-12 md:mt-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <h2 id="contact-heading" className="text-chapter leading-[1.08] tracking-[-0.02em]">
            {contact.heading}
          </h2>

          <p className="measure mt-7 text-lead leading-[1.45] text-text">{contact.body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={site.contactHref} className="action action-primary">
              {site.contactLabel}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
            <a href={`mailto:${contact.email}`} className="link-rule text-[0.95rem]">
              {contact.email}
            </a>
          </div>
        </div>

        {/* Channels ------------------------------------------------------- */}
        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
          <p className="meta">Elsewhere</p>
          <ul className="mt-4 flex list-none flex-col p-0">
            {contact.channels.map((channel) => (
              <li key={channel.label} className="border-b border-rule">
                <a
                  href={channel.href}
                  className="flex min-h-[52px] flex-wrap items-center justify-between gap-x-4 gap-y-1 no-underline"
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="text-[0.95rem] text-text-strong">{channel.label}</span>
                  <span className="meta normal-case tracking-normal text-text-muted">
                    {channel.value}
                    <span aria-hidden="true" className="ml-2">
                      {channel.href.startsWith("http") ? "↗" : "→"}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
