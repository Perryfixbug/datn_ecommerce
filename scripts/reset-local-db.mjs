import { loadEnvFile } from "node:process"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"

const root = fileURLToPath(new URL("../", import.meta.url))
loadEnvFile(new URL("../apps/api/.env", import.meta.url))
const url = new URL(process.env.DATABASE_URL ?? "")
if (
  !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
  url.pathname !== "/furniture_ecommerce" ||
  (url.searchParams.get("schema") ?? "public") !== "public"
) {
  throw new Error(
    "Từ chối reset: đích không phải furniture_ecommerce/public local"
  )
}
console.log("Reset database local furniture_ecommerce/public; không chạy seed")
const manifest = JSON.parse(
  readFileSync(
    new URL("../apps/api/node_modules/prisma/package.json", import.meta.url),
    "utf8"
  )
)
const cli = fileURLToPath(
  new URL(
    "../apps/api/node_modules/prisma/" + manifest.bin.prisma,
    import.meta.url
  )
)
const result = spawnSync(
  process.execPath,
  [cli, "migrate", "reset", "--force"],
  { cwd: root + "/apps/api", env: process.env, stdio: "inherit" }
)
if (result.error) throw result.error
process.exitCode = result.status ?? 1
