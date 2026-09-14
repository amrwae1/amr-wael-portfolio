import { expect, test, type Page } from "./fixtures";

/* Nothing in this file may reach the real email service. Every request to
   the contact route is intercepted; an unexpected one fails the test. */
async function interceptContact(
  page: Page,
  reply: { status: number; body: unknown } | "abort",
) {
  const calls: unknown[] = [];
  await page.route("**/api/contact", async (route) => {
    calls.push(route.request().postDataJSON());
    if (reply === "abort") return route.abort("connectionreset");
    await route.fulfill({
      status: reply.status,
      contentType: "application/json",
      body: JSON.stringify(reply.body),
    });
  });
  return calls;
}

/* Next renders its own empty role="alert" route announcer; scope to the form's. */
const formAlert = (page: Page) =>
  page.locator('[role="alert"]:not(#__next-route-announcer__)');

/* A real visitor can submit before React attaches (that path is covered
   below with JavaScript off). These tests are about the in-page behaviour,
   so they wait until the form is hydrated before touching it. */
async function openContact(page: Page) {
  await page.goto("/contact");
  await page.waitForFunction(() => {
    const form = document.querySelector("form");
    return !!form && Object.keys(form).some((k) => k.startsWith("__react"));
  });
}

async function fillValid(page: Page) {
  await page.getByLabel("Name").fill("Sara Hassan");
  await page.getByLabel("Email").fill("sara@example.com");
  await page.getByLabel("Company or team").fill("Acme");
  await page
    .getByLabel("What problem are you working on?")
    .fill("Our onboarding loses half of new accounts.");
}

test.describe("contact form", () => {
  test("sends in the page, never opening a mail app", async ({ page }) => {
    const calls = await interceptContact(page, {
      status: 200,
      body: { ok: true },
    });
    await openContact(page);
    await fillValid(page);

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toContainText("Message sent");
    await expect(
      page.getByRole("heading", { name: "Thank you — it’s in my inbox." }),
    ).toBeFocused();
    await expect(page.getByRole("status")).toContainText("sara@example.com");
    await expect(page).toHaveURL(/\/contact$/);

    expect(calls).toEqual([
      {
        name: "Sara Hassan",
        email: "sara@example.com",
        company: "Acme",
        problem: "Our onboarding loses half of new accounts.",
        botcheck: "",
      },
    ]);

    await page.getByRole("button", { name: "Send another message" }).click();
    await expect(page.getByLabel("Name")).toHaveValue("");
  });

  test("blocks an empty or invalid form before any request", async ({
    page,
  }) => {
    const calls = await interceptContact(page, {
      status: 200,
      body: { ok: true },
    });
    await openContact(page);

    await page.getByRole("button", { name: "Send message" }).click();
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByRole("button", { name: "Send message" }).click();

    expect(
      await page
        .getByLabel("Email")
        .evaluate((el: HTMLInputElement) => el.validity.valid),
    ).toBe(false);
    await expect(page.getByRole("status")).toHaveCount(0);
    expect(calls).toHaveLength(0);
  });

  test("says plainly when sending fails and keeps what was typed", async ({
    page,
  }) => {
    await interceptContact(page, {
      status: 502,
      body: { ok: false, error: "send_failed" },
    });
    await openContact(page);
    await fillValid(page);

    await page.getByRole("button", { name: "Send message" }).click();

    const alert = formAlert(page);
    await expect(alert).toContainText("Your message didn’t send.");
    await expect(alert.getByRole("link", { name: /@/ })).toHaveAttribute(
      "href",
      /^mailto:/,
    );
    await expect(page.getByText("Message sent")).toHaveCount(0);
    await expect(page.getByLabel("Name")).toHaveValue("Sara Hassan");
    await expect(
      page.getByLabel("What problem are you working on?"),
    ).toHaveValue("Our onboarding loses half of new accounts.");
  });

  test("reports a dropped connection as not sent", async ({ page }) => {
    await interceptContact(page, "abort");
    await openContact(page);
    await fillValid(page);

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(formAlert(page)).toContainText("the connection dropped");
    await expect(
      page.getByRole("button", { name: "Send message" }),
    ).toBeEnabled();
  });

  test.describe("before the page's JavaScript loads", () => {
    test.use({ javaScriptEnabled: false });

    test("posts the message instead of putting it in the URL", async ({
      page,
    }) => {
      let request: { method: string; body: string } | null = null;
      await page.route("**/api/contact", async (route) => {
        request = {
          method: route.request().method(),
          body: route.request().postData() ?? "",
        };
        await route.fulfill({
          status: 303,
          headers: { location: "/contact/sent" },
        });
      });

      await page.goto("/contact");
      await fillValid(page);
      /* Enter in a text field submits natively, as it does on a phone keyboard. */
      await page.getByLabel("Email").press("Enter");

      await expect(page).toHaveURL(/\/contact\/sent$/);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Thank you — it’s in my inbox.",
        }),
      ).toBeVisible();
      expect(page.url()).not.toContain("sara");
      expect(request).not.toBeNull();
      expect(request!.method).toBe("POST");
      expect(request!.body).toContain("email=sara%40example.com");
    });

    test("the not-sent page offers the form again and the direct address", async ({
      page,
    }) => {
      await page.goto("/contact/not-sent");
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Your message didn’t go through.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Back to the form" }),
      ).toHaveAttribute("href", "/contact");
      await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(1);
    });
  });

  test("reports rate limiting in its own words", async ({ page }) => {
    await interceptContact(page, {
      status: 429,
      body: { ok: false, error: "rate_limited" },
    });
    await openContact(page);
    await fillValid(page);

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(formAlert(page)).toContainText("try again in a few minutes");
  });
});
