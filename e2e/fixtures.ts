import { test as base } from "@playwright/test";

/**
 * Shared test setup.
 *
 * The hero's background video is several megabytes and decodes continuously.
 * Nothing in the suite asserts on it, and with several browsers open at once
 * it saturates the CPU and turns ordinary waits into timeouts. Every test
 * gets it blocked; the stage's own fallback ground renders instead.
 */
export const test = base.extend<{ blockHeroVideo: void }>({
  blockHeroVideo: [
    async ({ page }, use) => {
      await page.route("**/*.mp4", (route) => route.abort());
      await use();
    },
    { auto: true },
  ],
});

export { expect, type Page } from "@playwright/test";
