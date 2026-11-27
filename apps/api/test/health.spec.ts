import "reflect-metadata"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { AppModule } from "../src/app.module.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"

it("serves health without database or other infrastructure", async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
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
    const response = await request(app.getHttpServer())
      .get("/api/v1/health")
      .expect(200)
    expect(response.body).toEqual({
      status: "ok",
      uptime: expect.any(Number),
      timestamp: expect.any(String),
    })
  } finally {
    await app.close()
  }
})
