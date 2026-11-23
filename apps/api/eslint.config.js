import { config } from "../../packages/eslint-config/base.js"

export default [
  ...config,
  { ignores: ["generated/prisma/**"] },
  {
    files: ["prisma.config.ts"],
    rules: {
      "turbo/no-undeclared-env-vars": ["warn", { allowList: ["DATABASE_URL"] }],
    },
  },
  {
    languageOptions: { globals: { process: "readonly", console: "readonly" } },
  },
  {
    files: ["test/**/*.ts"],
    languageOptions: { globals: { it: "readonly", expect: "readonly" } },
  },
  { files: ["**/*.cjs"], languageOptions: { globals: { module: "readonly" } } },
]
