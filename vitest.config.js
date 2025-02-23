import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enable global variables like describe, it, etc.
    environment: "node", // Use node environment (if you want to run tests in Node.js environment)
    coverage: {
      provider: "v8", // Use istanbul for coverage
      include: ["src/**/*.ts"], // Specify which files to include in coverage
      exclude: ["src/**/*.test.ts"], // Specify which files to exclude from coverage
    },
  },
});
