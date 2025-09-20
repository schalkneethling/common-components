import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/**/*.spec.js"],
    globals: true,
    environment: "happy-dom",
  },
});
