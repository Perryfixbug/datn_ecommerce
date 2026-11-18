import { rm } from "node:fs/promises"
import { resolve, relative, isAbsolute } from "node:path"

const allowed = new Set([".next", "dist", "coverage", ".turbo"])
for (const name of process.argv.slice(2)) {
  if (!allowed.has(name)) throw new Error("Unsupported clean target: " + name)
  const target = resolve(name)
  const path = relative(process.cwd(), target)
  if (path.startsWith("..") || isAbsolute(path) || !path) {
    throw new Error("Clean target must stay inside the current package")
  }
  await rm(target, { recursive: true, force: true })
}
