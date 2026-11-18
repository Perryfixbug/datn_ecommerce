import { config } from "../../packages/eslint-config/base.js"

export default [
  ...config,
  {
    languageOptions: { globals: { process: "readonly", console: "readonly" } },
  },
  {
    files: ["test/**/*.ts"],
    languageOptions: { globals: { it: "readonly", expect: "readonly" } },
  },
  { files: ["**/*.cjs"], languageOptions: { globals: { module: "readonly" } } },
]
