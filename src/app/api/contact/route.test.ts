import { beforeEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/portfolio";

/* The route keeps its rate-limit window in module memory, so every test
   imports a fresh copy rather than sharing hits across cases. */
async function loadRoute() {
  vi.resetModules();
  return import("./route");
}

let ipCounter = 0;

function post(body: unknown, { ip, raw }: { ip?: string; raw?: string } = {}) {
  return new Request("https://amr-wael.vercel.app/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip ?? `10.0.0.${++ipCounter}`,
    },
    body: raw ?? JSON.stringify(body),
  });
}

const valid = {
  name: "Sara Hassan",
  email: "sara@example.com",
  company: "Acme",
  problem: "Our onboarding flow loses half of new accounts in week one.",
};

function mockResend(response: Response | Error) {
  const fetchMock = vi.fn(async () => {
    if (response instanceof Error) throw response;
    return response;
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("delivers a valid message through Resend and answers 200", async () => {
    const fetchMock = mockResend(
      new Response(JSON.stringify({ id: "1" }), { status: 200 }),
    );
    const { POST } = await loadRoute();

    const res = await POST(post(valid));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer re_test_key",
    );

    const sent = JSON.parse(init.body as string);
    expect(sent.to).toEqual([site.email]);
    expect(sent.reply_to).toBe(valid.email);
    expect(sent.subject).toBe(`Portfolio message from ${valid.name}`);
    expect(sent.text).toContain(valid.problem);
    expect(sent.text).toContain("Sara Hassan · Acme");
  });

  it("uses CONTACT_TO and CONTACT_FROM when they are set", async () => {
    vi.stubEnv("CONTACT_TO", "inbox@example.com");
    vi.stubEnv("CONTACT_FROM", "Portfolio <hello@example.com>");
    const fetchMock = mockResend(new Response("{}", { status: 200 }));
    const { POST } = await loadRoute();

    await POST(post(valid));

    const sent = JSON.parse(
      (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
        .body as string,
    );
    expect(sent.to).toEqual(["inbox@example.com"]);
    expect(sent.from).toBe("Portfolio <hello@example.com>");
  });

  it("escapes HTML the visitor typed and strips line breaks from the subject", async () => {
    const fetchMock = mockResend(new Response("{}", { status: 200 }));
    const { POST } = await loadRoute();

    await POST(
      post({
        ...valid,
        name: "Eve\r\nBcc: attacker@example.com",
        problem: '<script>alert("x")</script> and a real question here',
      }),
    );

    const sent = JSON.parse(
      (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
        .body as string,
    );
    expect(sent.subject).not.toMatch(/[\r\n]/);
    expect(sent.html).not.toContain("<script>");
    expect(sent.html).toContain(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });

  it.each([
    ["missing name", { ...valid, name: "" }],
    ["whitespace-only name", { ...valid, name: "   " }],
    ["malformed email", { ...valid, email: "not-an-email" }],
    ["message under 10 characters", { ...valid, problem: "too short" }],
    ["whitespace padding a short message", { ...valid, problem: "   hi   " }],
    ["message over 5000 characters", { ...valid, problem: "a".repeat(5001) }],
    ["name over 120 characters", { ...valid, name: "a".repeat(121) }],
    ["company over 160 characters", { ...valid, company: "a".repeat(161) }],
  ])("rejects %s with 400 and never calls Resend", async (_label, body) => {
    const fetchMock = mockResend(new Response("{}", { status: 200 }));
    const { POST } = await loadRoute();

    const res = await POST(post(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON with 400", async () => {
    const { POST } = await loadRoute();
    const res = await POST(post(null, { raw: "name=Sara" }));
    expect(res.status).toBe(400);
  });

  it("answers ok to a filled honeypot without sending anything", async () => {
    const fetchMock = mockResend(new Response("{}", { status: 200 }));
    const { POST } = await loadRoute();

    const res = await POST(
      post({ ...valid, botcheck: "https://spam.example" }),
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("answers 503 not_configured when no API key is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const fetchMock = mockResend(new Response("{}", { status: 200 }));
    const { POST } = await loadRoute();

    const res = await POST(post(valid));

    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("answers 502 send_failed when Resend rejects the message", async () => {
    mockResend(
      new Response('{"message":"API key is invalid"}', { status: 401 }),
    );
    const { POST } = await loadRoute();

    const res = await POST(post(valid));

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "send_failed" });
  });

  it("answers 502 send_failed when Resend cannot be reached", async () => {
    mockResend(new Error("getaddrinfo ENOTFOUND api.resend.com"));
    const { POST } = await loadRoute();

    const res = await POST(post(valid));

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "send_failed" });
  });

  describe("plain form posts (submitted before the page's JavaScript loads)", () => {
    function formPost(fields: Record<string, string>) {
      return new Request("https://amr-wael.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-forwarded-for": `10.1.0.${++ipCounter}`,
        },
        body: new URLSearchParams(fields).toString(),
      });
    }

    it("sends a valid message and redirects to the confirmation page", async () => {
      const fetchMock = mockResend(new Response("{}", { status: 200 }));
      const { POST } = await loadRoute();

      const res = await POST(formPost({ ...valid, botcheck: "" }));

      expect(res.status).toBe(303);
      expect(res.headers.get("location")).toBe(
        "https://amr-wael.vercel.app/contact/sent",
      );
      expect(fetchMock).toHaveBeenCalledOnce();
      const sent = JSON.parse(
        (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
          .body as string,
      );
      expect(sent.reply_to).toBe(valid.email);
    });

    it("redirects an invalid message to the not-sent page without sending", async () => {
      const fetchMock = mockResend(new Response("{}", { status: 200 }));
      const { POST } = await loadRoute();

      const res = await POST(formPost({ ...valid, email: "nope" }));

      expect(res.status).toBe(303);
      expect(res.headers.get("location")).toBe(
        "https://amr-wael.vercel.app/contact/not-sent",
      );
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("redirects to not-sent when the email service fails", async () => {
      mockResend(new Response("{}", { status: 500 }));
      const { POST } = await loadRoute();

      const res = await POST(formPost(valid));

      expect(res.headers.get("location")).toMatch(/\/contact\/not-sent$/);
    });

    it("treats a filled honeypot as sent, without sending", async () => {
      const fetchMock = mockResend(new Response("{}", { status: 200 }));
      const { POST } = await loadRoute();

      const res = await POST(formPost({ ...valid, botcheck: "spam" }));

      expect(res.headers.get("location")).toMatch(/\/contact\/sent$/);
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  it("allows 5 messages from one address in the window, then answers 429", async () => {
    const fetchMock = mockResend(new Response("{}", { status: 200 }));
    const { POST } = await loadRoute();

    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await POST(post(valid, { ip: "203.0.113.7" }))).status);
    }

    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect(fetchMock).toHaveBeenCalledTimes(5);

    /* A different address is not affected by someone else's burst. */
    expect((await POST(post(valid, { ip: "203.0.113.8" }))).status).toBe(200);
  });
});
