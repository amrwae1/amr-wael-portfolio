import { expect, test, type Page } from "./fixtures";

/** Scroll position once smooth scrolling has come to rest. */
async function settledScrollY(page: Page) {
  let last = -1;
  let steady = 0;
  for (let i = 0; i < 60; i++) {
    const y = await page.evaluate(() => Math.round(window.scrollY));
    steady = y === last && y > 0 ? steady + 1 : 0;
    if (steady >= 3) return y;
    last = y;
    await page.waitForTimeout(150);
  }
  return last;
}

const projects = [
  {
    slug: "valora",
    title: "Valora",
    impact: "Help managers act on the coaching signal that matters most.",
    status: "Self-directed concept · Sample data · Untested",
  },
  {
    slug: "noon",
    title: "Noon",
    impact: "Help shoppers commit with fewer unanswered questions.",
    status: "Self-directed concept · Untested",
  },
  {
    slug: "booking",
    title: "Booking.com",
    impact: "Make the better stay easier to compare before checkout.",
    status: "Self-directed concept · Unaffiliated · Untested",
  },
  {
    slug: "karma-shop",
    title: "Karma Shop",
    impact:
      "Shape a focused commerce experience around real business constraints.",
    status: "Client engagement · In progress",
  },
];

test.describe("home", () => {
  test("presents each project once, as a card, with no screenshots", async ({
    page,
  }) => {
    await page.goto("/");

    const work = page.locator("#work");
    await expect(
      work.getByRole("heading", {
        name: "Four products. Four decisions made clearer.",
      }),
    ).toBeVisible();

    const cards = work.locator("a.card");
    await expect(cards).toHaveCount(4);
    expect(
      await cards.evaluateAll((els) => els.map((e) => e.getAttribute("href"))),
    ).toEqual(projects.map((p) => `/projects/${p.slug}`));

    await expect(work.locator("img")).toHaveCount(0);
    await expect(page.locator("article")).toHaveCount(0);

    for (const project of projects) {
      const card = work.locator(`a.card[href="/projects/${project.slug}"]`);
      await expect(card).toContainText(project.impact);
      await expect(card).toContainText(project.status);
      await expect(card.locator("a, button, input")).toHaveCount(0);
      await expect(card.locator(".card-art")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    }
  });

  test("moves from the cards to the projects link, About, then Contact", async ({
    page,
  }) => {
    await page.goto("/");
    const order = await page
      .locator("main > section")
      .evaluateAll((els) => els.map((e) => e.id));
    expect(order).toEqual(["top", "work", "about", "contact"]);
    await expect(
      page.locator("#work").getByRole("link", { name: /All four projects/ }),
    ).toHaveAttribute("href", "/projects");
  });

  test("opens a project from its card, and Back returns to the same place", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page.locator('a.card[href="/projects/noon"]');
    await card.scrollIntoViewIfNeeded();
    /* Smooth scrolling is still moving the page when scrollIntoView returns;
       record the position only once it has stopped. */
    const before = await settledScrollY(page);

    await card.click();
    await expect(page).toHaveURL(/\/projects\/noon$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Noon" }),
    ).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    /* The site scrolls smoothly, so restoration animates rather than jumps;
       wait for it to settle, within a couple of pixels of rounding. */
    await expect
      .poll(
        async () =>
          Math.abs(
            (await page.evaluate(() => Math.round(window.scrollY))) - before,
          ),
        {
          timeout: 15_000,
        },
      )
      .toBeLessThanOrEqual(2);
  });

  test("lands /#work on the Work section, clear of the header", async ({
    page,
  }) => {
    await page.goto("/#work");
    const label = page.locator("#work .meta").first();
    const viewportHeight = page.viewportSize()!.height;
    /* In view, and below the 64px sticky header. */
    await expect
      .poll(async () => {
        const y = (await label.boundingBox())?.y ?? -1;
        return y > 64 && y < viewportHeight;
      })
      .toBe(true);
  });
});

test.describe("project pages", () => {
  for (const project of projects) {
    test(`${project.title} opens with the card's title, impact and status`, async ({
      page,
    }) => {
      const res = await page.goto(`/projects/${project.slug}`);
      expect(res?.status()).toBe(200);

      const intro = page.locator(".project-intro");
      await expect(
        intro.getByRole("heading", { level: 1, name: project.title }),
      ).toBeVisible();
      await expect(intro).toContainText(project.impact);
      await expect(intro).toContainText(project.status);
      await expect(intro.locator("img")).toHaveCount(0);
    });
  }

  test("case studies show interface evidence only after the opening thesis", async ({
    page,
  }) => {
    await page.goto("/projects/valora");
    const firstImageTop = await page
      .locator("main img")
      .first()
      .evaluate((e) => e.getBoundingClientRect().top + scrollY);
    const responseTop = await page
      .locator("#response-heading")
      .evaluate((e) => e.getBoundingClientRect().top + scrollY);
    expect(firstImageTop).toBeGreaterThan(responseTop);
  });

  test("the Project Center lists all four projects", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.locator("a.card")).toHaveCount(4);
  });
});

test.describe("not found", () => {
  test("returns 404 on the site's own ground, with a way back", async ({
    page,
  }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);

    await expect(
      page.getByRole("heading", { level: 1, name: "This page doesn’t exist." }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      ),
    ).toBe("rgb(0, 0, 0)");

    await page.getByRole("link", { name: /See the projects/ }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });
});

test.describe("keyboard", () => {
  test("a focused card shows a focus ring and the same state as hover", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard focus is a desktop interaction");
    await page.goto("/");
    const card = page.locator('a.card[href="/projects/valora"]');
    await card.focus();
    await expect(card).toBeFocused();

    const state = await card.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        outline: cs.outlineStyle,
        hot: cs.getPropertyValue("--hot").trim(),
      };
    });
    expect(state).toEqual({ outline: "solid", hot: "1" });
  });
});
