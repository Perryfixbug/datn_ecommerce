import "reflect-metadata"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"
import { AppModule } from "./app.module.js"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.setGlobalPrefix("api/v1")
  app.enableShutdownHooks()
  await app.listen(
    Number(process.env.PORT ?? 4000),
    process.env.HOST ?? "127.0.0.1"
  )
}

bootstrap().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
