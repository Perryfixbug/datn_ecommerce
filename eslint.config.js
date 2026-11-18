import { config } from "./packages/eslint-config/base.js"
import { config as reactConfig } from "./packages/eslint-config/react-internal.js"

export default [
  {
    ignores: [
      "apps/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/dist/**",
      "**/src/generated/**",
    ],
  },
  ...config,
  ...reactConfig.map((entry) => ({
    ...entry,
    files: ["packages/ui/src/**/*.{ts,tsx}"],
  })),
  {
    files: ["scripts/**/*.{mjs,js,cjs}", "packages/api-client/**/*.ts"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        URL: "readonly",
        Buffer: "readonly",
      },
    },
  },
]
