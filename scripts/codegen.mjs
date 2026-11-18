import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../", import.meta.url))
function run(name, args, cwd = root) {
  const directory = resolve(root, "node_modules", name)
  const manifest = JSON.parse(
    readFileSync(resolve(directory, "package.json"), "utf8")
  )
  const bin =
    typeof manifest.bin === "string"
      ? manifest.bin
      : manifest.bin[Object.keys(manifest.bin)[0]]
  const result = spawnSync(
    process.execPath,
    [resolve(directory, bin), ...args],
    { cwd, stdio: "inherit" }
  )
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
for (const audience of ["shop", "admin"]) {
  run(
    "@typespec/compiler",
    [
      "compile",
      "typespec/" + audience + ".tsp",
      "--config",
      "typespec/tspconfig." + audience + ".yaml",
    ],
    resolve(root, "packages/api-spec")
  )
}
for (const folder of ["api-contract", "api-client"]) {
  run(
    "orval",
    ["--config", "orval.config.ts"],
    resolve(root, "packages", folder)
  )
  run(
    "prettier",
    ["--write", "src/generated"],
    resolve(root, "packages", folder)
  )
}
