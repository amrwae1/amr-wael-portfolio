import { site } from "@/content/portfolio";

/**
 * POST /api/contact — delivers a contact-form message to Amr's inbox.
 *
 * Sending goes through Resend's HTTP API (no SDK, so no new dependency). The
 * visitor's address is set as `reply_to`, so answering the notification in
 * Gmail replies to the visitor, not to the sending service.
 *
 * Configuration (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  required. Without it this route answers 503 and the form
 *                   falls back to opening the visitor's mail app.
 *   CONTACT_TO      optional, defaults to the site email.
 *   CONTACT_FROM    optional, defaults to Resend's shared test sender, which
 *                   can only deliver to the address that owns the Resend
 *                   account. Set it once a domain is verified in Resend.
 *
 * Every response is honest about what happened: 200 only after Resend has
 * accepted the message. The one deliberate exception is the honeypot — a bot
 * that fills the hidden field is told "ok" so it has nothing to learn from.
 */

const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  problemMin: 10,
  problemMax: 5000,
};

/* Best-effort per-instance rate limit. Serverless instances do not share
   memory, so this slows a burst from one address rather than guaranteeing a
   global cap — enough for a portfolio, and it costs nothing. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";
/* Anything that ends up in a header-like field gets no line breaks. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (clean(payload.botcheck)) {
    return Response.json({ ok: true });
  }

  const name = oneLine(clean(payload.name));
  const email = oneLine(clean(payload.email));
  const company = oneLine(clean(payload.company));
  const problem = clean(payload.problem);

  const invalid =
    !name ||
    name.length > LIMITS.name ||
    !EMAIL.test(email) ||
    email.length > LIMITS.email ||
    company.length > LIMITS.company ||
    problem.length < LIMITS.problemMin ||
    problem.length > LIMITS.problemMax;

  if (invalid) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const signature = `${name}${company ? ` · ${company}` : ""}`;
  const text = `${problem}\n\n—\n${signature}\n${email}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p style="white-space:pre-wrap;margin:0 0 20px">${escapeHtml(problem)}</p>
      <p style="margin:0;color:#555">— ${escapeHtml(signature)}<br>
        <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p style="margin:24px 0 0;font-size:12px;color:#888">Sent from the contact form on ${escapeHtml(
        new URL(request.url).host,
      )}. Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM ||
          "Amr Wael portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || site.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      /* Logged server-side for Vercel's runtime logs; never echoed to the
         visitor, since it can describe the account configuration. */
      console.error(
        "contact: resend rejected the message",
        response.status,
        await response.text(),
      );
      return Response.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("contact: resend unreachable", error);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
