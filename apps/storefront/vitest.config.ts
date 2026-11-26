import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
    server: {
      deps: {
        // next-intl import `next/navigation` không kèm đuôi .js; để Vite xử lý
        // gói này thì component dùng `Link` của i18n mới render được trong test.
        inline: ["next-intl"],
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      // Gate the pure-logic surface only; wiring and UI are covered by e2e.
      // Thresholds are a ratchet — widen `include` and raise them as tests grow.
      include: [
        "lib/validation/**/*.ts",
        "lib/stores/**/*.ts",
        "lib/locale-path.ts",
        "lib/format.ts",
        "lib/routes.ts",
        "lib/chat.ts",
        "lib/proxy-headers.ts",
        "lib/session-cookie.ts",
      ],
      exclude: [
        "tests/**",
        ".next/**",
        "playwright.config.ts",
        "vitest.config.ts",
        "next.config.ts",
        "instrumentation.ts",
        "**/*.d.ts",
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        statements: 90,
        branches: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@shared/api-contract": resolve(
        __dirname,
        "../../packages/api-contract/src/index.ts"
      ),
      "@": resolve(__dirname, "./"),
      "@shared/ui": resolve(__dirname, "../../packages/ui/src"),
      "@shared/api-client": resolve(__dirname, "../../packages/api-client/src"),
    },
  },
})
