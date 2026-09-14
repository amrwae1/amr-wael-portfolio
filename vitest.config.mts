import { defineConfig } from "vitest/config";

/**
 * Unit tests: server logic and content integrity. Rendering and interaction
 * are covered end to end by Playwright in `e2e/`, against a real build.
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
