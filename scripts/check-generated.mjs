import { execFileSync } from "node:child_process"

const paths = [
  "packages/api-spec/generated",
  "packages/api-contract/src/generated",
  "packages/api-client/src/generated",
]
const changes = execFileSync(
  "git",
  ["status", "--porcelain", "--untracked-files=all", "--", ...paths],
  { encoding: "utf8" }
).trim()
if (changes) {
  console.error(
    "Generated artifacts differ from Git. Regenerate, review and commit them:\n" +
      changes
  )
  process.exitCode = 1
}
