import type { INestApplication } from "@nestjs/common"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import swaggerUi from "swagger-ui-express"

export function setupApiDocs(
  app: INestApplication,
  environment = process.env.NODE_ENV
) {
  if (environment === "production") return
  const directory = dirname(fileURLToPath(import.meta.url))
  for (const audience of ["admin", "shop"]) {
    const filename = audience + "-openapi.yaml"
    const candidates = [
      resolve(directory, "../../../openapi", filename),
      resolve(directory, "../../../packages/api-spec/generated", filename),
      resolve(directory, "../../../../packages/api-spec/generated", filename),
      resolve(process.cwd(), "packages/api-spec/generated", filename),
      resolve(process.cwd(), "../../packages/api-spec/generated", filename),
    ]
    const specificationPath = candidates.find((candidate) =>
      existsSync(candidate)
    )
    if (!specificationPath) {
      throw new Error("Không tìm thấy đặc tả OpenAPI: " + filename)
    }
    const specification = readFileSync(specificationPath, "utf8")
    const route = "/docs/" + audience
    app.use(
      route + "/openapi.yaml",
      (
        _request: unknown,
        response: { type: (value: string) => { send: (body: string) => void } }
      ) => {
        response.type("application/yaml").send(specification)
      }
    )
    const options = {
      swaggerOptions: {
        url: route + "/openapi.yaml",
        validatorUrl: null,
        persistAuthorization: false,
      },
      customSiteTitle: "Furniture API - " + audience,
    }
    app.use(
      route,
      swaggerUi.serveFiles(undefined, options),
      swaggerUi.setup(undefined, options)
    )
  }
}
