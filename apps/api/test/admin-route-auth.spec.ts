import "reflect-metadata"
import { Test } from "@nestjs/testing"
import { PATH_METADATA, METHOD_METADATA } from "@nestjs/common/constants"
import { RequestMethod } from "@nestjs/common"
import {
  DiscoveryModule,
  DiscoveryService,
  MetadataScanner,
} from "@nestjs/core"
import request from "supertest"
import { AppModule } from "../src/app.module.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"

it("mọi route quản trị đã đăng ký đều yêu cầu access token trước khi gọi DB", async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule, DiscoveryModule],
  })
    .overrideProvider(PrismaService)
    .useValue({})
    .overrideProvider(RedisService)
    .useValue({})
    .overrideProvider(JwtService)
    .useValue({})
    .compile()
  const app = module.createNestApplication()
  app.setGlobalPrefix("api/v1")
  await app.init()
  try {
    const scanner = new MetadataScanner()
    const checked: string[] = []
    for (const wrapper of module.get(DiscoveryService).getControllers()) {
      const prefix: unknown = Reflect.getMetadata(
        PATH_METADATA,
        wrapper.metatype!
      )
      if (typeof prefix !== "string" || !prefix.startsWith("admin/")) continue
      const prototype = Object.getPrototypeOf(wrapper.instance) as object
      for (const name of scanner.getAllMethodNames(prototype)) {
        const handler = Reflect.get(prototype, name) as object
        const method: unknown = Reflect.getMetadata(METHOD_METADATA, handler)
        if (typeof method !== "number") continue
        const suffix = String(Reflect.getMetadata(PATH_METADATA, handler) ?? "")
        const path = [
          "",
          "api",
          "v1",
          ...prefix.split("/"),
          ...suffix.split("/"),
        ]
          .filter((part, index) => index === 0 || part !== "")
          .join("/")
          .replace(/:[A-Za-z]+/g, "1")
        const client = request(app.getHttpServer())
        const response =
          method === RequestMethod.GET
            ? await client.get(path)
            : method === RequestMethod.POST
              ? await client.post(path).send({})
              : method === RequestMethod.PATCH
                ? await client.patch(path).send({})
                : method === RequestMethod.DELETE
                  ? await client.delete(path)
                  : null
        expect(response).not.toBeNull()
        expect({
          route: RequestMethod[method] + " " + path,
          status: response!.status,
        }).toEqual({ route: RequestMethod[method] + " " + path, status: 401 })
        checked.push(RequestMethod[method] + " " + path)
      }
    }
    expect(checked).toHaveLength(35)
  } finally {
    await app.close()
  }
})
