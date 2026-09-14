import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;

/**
 * End-to-end tests against a real production build.
 *
 * Runs in the Chrome already installed on the machine (`channel: "chrome"`),
 * so no Playwright browser download is needed.
 *
 * The build gets a placeholder RESEND_API_KEY so the contact form renders in
 * direct-send mode. Every test that submits the form intercepts
 * /api/contact, so no email is ever sent from the suite.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  /* Each worker is a full Chrome; more than a few on a laptop starve each other. */
  workers: process.env.CI ? 2 : 4,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  forbidOnly: !!process.env.CI,
  /* Scroll restoration is timing-sensitive under heavy parallel load; a retry
     that passes is reported as flaky, not silently green. */
  retries: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], channel: "chrome" },
    },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    env: { RESEND_API_KEY: "re_e2e_placeholder_never_sent" },
  },
});
