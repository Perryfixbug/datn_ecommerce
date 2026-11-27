import "reflect-metadata"
import { Test } from "@nestjs/testing"
import request from "supertest"
import helmet from "helmet"
import { setupApiDocs } from "../src/api-docs.js"

it("phục vụ Swagger UI và đặc tả TypeSpec riêng cho admin/shop", async () => {
  const module = await Test.createTestingModule({}).compile()
  const app = module.createNestApplication()
  app.use(helmet())
  setupApiDocs(app, "development")
  await app.init()
  try {
    for (const audience of ["admin", "shop"]) {
      const base = "/docs/" + audience
      const html = await request(app.getHttpServer())
        .get(base + "/")
        .expect(200)
      expect(html.text).toContain("swagger-ui")
      const spec = await request(app.getHttpServer())
        .get(base + "/openapi.yaml")
        .expect(200)
      expect(spec.text).toContain("openapi: 3.0.0")
      expect(spec.text).toContain("Furniture " + audience + " API")
      const initializer = await request(app.getHttpServer())
        .get(base + "/swagger-ui-init.js")
        .expect(200)
      expect(initializer.text).toContain(base + "/openapi.yaml")
      await request(app.getHttpServer())
        .get(base + "/swagger-ui-bundle.js")
        .expect(200)
    }
  } finally {
    await app.close()
  }
})

it("không công khai UI hay đặc tả trong production", async () => {
  const module = await Test.createTestingModule({}).compile()
  const app = module.createNestApplication()
  setupApiDocs(app, "production")
  await app.init()
  try {
    for (const audience of ["admin", "shop"]) {
      await request(app.getHttpServer())
        .get("/docs/" + audience + "/")
        .expect(404)
      await request(app.getHttpServer())
        .get("/docs/" + audience + "/openapi.yaml")
        .expect(404)
    }
  } finally {
    await app.close()
  }
})
