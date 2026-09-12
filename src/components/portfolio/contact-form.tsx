"use client";

import { useState } from "react";
import { site } from "@/content/portfolio";

/**
 * The contact form.
 *
 * There is no backend and no form service configured in this project, so the
 * form composes a message and hands it to the visitor's mail client. That is a
 * real, working path — it is not a stub — but it is worth being precise about
 * what it does and does not do:
 *
 * - It cannot confirm delivery, so it never claims to. The success state says
 *   the mail client was opened and shows the address to use if it was not.
 * - It cannot send on the visitor's behalf, so the address stays visible the
 *   whole time rather than hidden behind the button.
 *
 * The alternative would be a form that looks complete, posts nowhere, and shows
 * a green tick. That is worse than no form at all, because the visitor believes
 * they have made contact and Amr never hears from them.
 *
 * Validation is the browser's own, with `noValidate` off, so required fields
 * and the email format are enforced natively and announced by the platform.
 */

type Status = "idle" | "opening" | "opened";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const problem = String(data.get("problem") ?? "").trim();

    const body = [
      problem,
      "",
      "—",
      `${name}${company ? ` · ${company}` : ""}`,
      email,
    ].join("\n");

    const href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(`A product problem — ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    setStatus("opening");
    window.location.href = href;
    /* The browser gives no event for "the mail client opened", so this reports
       what was actually done — the handover — rather than a delivery it cannot
       observe. */
    window.setTimeout(() => setStatus("opened"), 600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* Clipboard access can be refused; the address is on screen either way. */
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="grid-12">
        <div className="col-span-4 md:col-span-4 lg:col-span-5">
          <label htmlFor="name" className="meta block text-text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="field mt-2"
          />
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-7">
          <label htmlFor="email" className="meta block text-text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field mt-2"
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-11">
          <label htmlFor="company" className="meta block text-text-muted">
            Company or team{" "}
            <span className="normal-case tracking-normal text-text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="field mt-2"
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-11">
          <label htmlFor="problem" className="meta block text-text-muted">
            What problem are you working on?
          </label>
          <textarea id="problem" name="problem" required rows={5} className="field mt-2" />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-11">
          <button type="submit" className="action action-primary">
            {status === "opening" ? "Opening your mail app…" : "Send"}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </button>
        </div>
      </form>

      {/* The handover is reported, never a delivery. */}
      <p aria-live="polite" className="measure mt-6 text-[0.95rem] leading-relaxed text-text">
        {status === "opened" ? (
          <>
            Your mail app should have opened with the message ready to send. If nothing
            happened, the address is{" "}
            <a href={`mailto:${site.email}`} className="link-rule">
              {site.email}
            </a>
            .
          </>
        ) : (
          <span className="text-text-muted">
            This opens your own mail app with the message filled in — nothing is sent
            from this page, and nothing is stored here.
          </span>
        )}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={`mailto:${site.email}`} className="link-rule text-[0.95rem]">
          {site.email}
        </a>
        <button type="button" onClick={copyEmail} className="link-rule text-[0.95rem]">
          {copied ? "Copied" : "Copy address"}
        </button>
      </div>
    </div>
  );
}
