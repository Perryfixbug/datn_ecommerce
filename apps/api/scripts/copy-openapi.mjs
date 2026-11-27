import { copyFileSync, mkdirSync } from "node:fs"
import { URL } from "node:url"

const destination = new URL("../dist/openapi/", import.meta.url)
mkdirSync(destination, { recursive: true })
for (const audience of ["admin", "shop"]) {
  const filename = audience + "-openapi.yaml"
  copyFileSync(
    new URL(
      "../../../packages/api-spec/generated/" + filename,
      import.meta.url
    ),
    new URL(filename, destination)
  )
}
