import { expect, test } from "./fixtures";

test.describe("mobile", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, "mobile-only layout");
  });

  test("the menu opens as a dialog, locks scroll, and Escape closes it", async ({
    page,
  }) => {
    await page.goto("/projects/noon");
    const trigger = page.getByRole("button", { name: "Open menu" });

    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(
      "hidden",
    );
    await expect(
      dialog.getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "/projects");

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("no page scrolls sideways", async ({ page }) => {
    for (const path of [
      "/",
      "/projects",
      "/projects/valora",
      "/projects/karma-shop",
      "/about",
      "/contact",
    ]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });

  test("cards stack in a portrait ratio with the art above the text", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page.locator('a.card[href="/projects/booking"]');
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;
    expect(box.width / box.height).toBeLessThan(1);

    const artBottom = await card
      .locator(".card-art")
      .evaluate((e) => e.getBoundingClientRect().bottom);
    const titleTop = await card
      .locator(".card-title")
      .evaluate((e) => e.getBoundingClientRect().top);
    expect(artBottom).toBeLessThanOrEqual(titleTop);
  });
});
