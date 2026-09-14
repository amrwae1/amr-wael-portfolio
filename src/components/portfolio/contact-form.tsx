"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/portfolio";

/**
 * The contact form.
 *
 * `direct` (the normal case): the message is posted to /api/contact and
 * delivered to Amr's inbox from the site itself. The visitor never leaves the
 * page. The success state appears only after the server confirms the email
 * service accepted the message — never on submit.
 *
 * `mail-app`: used only when the deployment has no email service configured
 * (no RESEND_API_KEY at build). The form then hands the message to the
 * visitor's mail app, and says so, rather than posting into nothing.
 *
 * On failure the form keeps everything the visitor typed, says plainly that
 * the message did not send, and offers the address as a fallback. Validation
 * is the browser's own, so required fields and the email format are enforced
 * and announced natively; the server checks the same rules again.
 */

type Mode = "direct" | "mail-app";
type Status = "idle" | "sending" | "sent" | "error";
type ErrorCode =
  "invalid" | "rate_limited" | "not_configured" | "send_failed" | "network";

const errorCopy: Record<ErrorCode, string> = {
  invalid:
    "Some details need another look — check your email address and that the message is at least a sentence long.",
  rate_limited:
    "Several messages were sent from here in a short time. Please try again in a few minutes.",
  not_configured: "Sending from the site is unavailable right now.",
  send_failed:
    "Your message didn’t send. Everything you wrote is still in the form.",
  network:
    "Your message didn’t send — the connection dropped. Everything you wrote is still in the form.",
};

export function ContactForm({ mode = "direct" }: { mode?: Mode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorCode | null>(null);
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  /* Move focus to the outcome, so keyboard and screen-reader users land on
     the result instead of on a button that no longer exists. */
  useEffect(() => {
    if (status === "sent") confirmationRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      problem: String(data.get("problem") ?? "").trim(),
      botcheck: String(data.get("botcheck") ?? ""),
    };

    if (mode === "mail-app") {
      const body = [
        fields.problem,
        "",
        "—",
        `${fields.name}${fields.company ? ` · ${fields.company}` : ""}`,
        fields.email,
      ].join("\n");
      window.location.href =
        `mailto:${site.email}` +
        `?subject=${encodeURIComponent(`A product problem — ${fields.name}`)}` +
        `&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: ErrorCode;
      };

      if (response.ok && result.ok) {
        setSentTo(fields.email);
        setStatus("sent");
        return;
      }

      setError(
        result.error && result.error in errorCopy
          ? result.error
          : "send_failed",
      );
      setStatus("error");
    } catch {
      setError("network");
      setStatus("error");
    }
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

  if (status === "sent") {
    return (
      <div role="status">
        <p className="meta" style={{ color: "var(--color-accent-strong)" }}>
          Message sent
        </p>
        <h2
          ref={confirmationRef}
          tabIndex={-1}
          className="measure-tight mt-4 font-serif text-title leading-[1.15] tracking-[-0.02em] text-text-strong outline-none"
        >
          Thank you — it’s in my inbox.
        </h2>
        <p className="measure mt-4 text-text">
          I’ll reply to <span className="text-text-strong">{sentTo}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-rule mt-8 text-[0.95rem]"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div>
      {/* method and action matter before hydration: without them a submit is
          a GET that puts the visitor's details in the URL. */}
      <form
        method="post"
        action="/api/contact"
        onSubmit={onSubmit}
        className="grid-12"
        aria-busy={sending}
      >
        {/* Honeypot: invisible to people and to assistive technology. A bot
            that fills every field fills this one too. */}
        <div aria-hidden="true" className="hidden">
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-5">
          <label htmlFor="name" className="meta block text-text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            readOnly={sending}
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
            maxLength={254}
            autoComplete="email"
            readOnly={sending}
            className="field mt-2"
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-11">
          <label htmlFor="company" className="meta block text-text-muted">
            Company or team{" "}
            <span className="normal-case tracking-normal text-text-muted">
              (optional)
            </span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={160}
            autoComplete="organization"
            readOnly={sending}
            className="field mt-2"
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-11">
          <label htmlFor="problem" className="meta block text-text-muted">
            What problem are you working on?
          </label>
          <textarea
            id="problem"
            name="problem"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            readOnly={sending}
            className="field mt-2"
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-11">
          <button
            type="submit"
            className="action action-primary"
            disabled={sending}
          >
            {sending
              ? "Sending…"
              : mode === "mail-app"
                ? "Continue in your mail app"
                : "Send message"}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </button>
        </div>
      </form>

      {status === "error" && error ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="measure mt-6 border-l pl-5 outline-none"
          style={{ borderColor: "var(--color-boundary)" }}
        >
          <p className="text-[0.95rem] leading-relaxed text-text-strong">
            {errorCopy[error]}
          </p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-text">
            Try again, or email me directly at{" "}
            <a href={`mailto:${site.email}`} className="link-rule">
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : (
        <p className="measure mt-6 text-[0.95rem] leading-relaxed text-text-muted">
          {mode === "mail-app"
            ? "This opens your own mail app with the message filled in."
            : "Your message goes straight to my inbox. Your email is used only to reply."}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-[0.95rem] text-text-muted">Prefer email?</span>
        <a href={`mailto:${site.email}`} className="link-rule text-[0.95rem]">
          {site.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="link-rule text-[0.95rem]"
        >
          {copied ? "Copied" : "Copy address"}
        </button>
      </div>
    </div>
  );
}
