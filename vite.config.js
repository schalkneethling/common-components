import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      "**/*.spec.ts",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/tests/**/*.spec.ts",
    ],
    globals: true,
    environment: "happy-dom",
  },
});
