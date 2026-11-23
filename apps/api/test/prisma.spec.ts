import "reflect-metadata"
import { jest } from "@jest/globals"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"

it.each([
  undefined,
  "secret",
  "https://user:secret@localhost/db",
  "postgresql://localhost/",
])("rejects invalid database configuration (%s)", (url) => {
  expect(
    () => new PrismaService(new ConfigService({ DATABASE_URL: url }))
  ).toThrow("DATABASE_URL must be a PostgreSQL URL with a database name")
})

it("connects on initialization and disconnects on shutdown", async () => {
  const service = new PrismaService(
    new ConfigService({ DATABASE_URL: "postgresql://user:secret@localhost/db" })
  )
  const connect = jest.spyOn(service, "$connect").mockResolvedValue(undefined)
  const disconnect = jest
    .spyOn(service, "$disconnect")
    .mockResolvedValue(undefined)
  await service.onModuleInit()
  expect(connect).toHaveBeenCalledTimes(1)
  await service.onModuleDestroy()
  expect(disconnect).toHaveBeenCalledTimes(1)
})

it("sanitizes startup errors and releases the pool", async () => {
  const service = new PrismaService(
    new ConfigService({ DATABASE_URL: "postgres://user:secret@localhost/db" })
  )
  jest.spyOn(service, "$connect").mockRejectedValue(new Error("secret"))
  const disconnect = jest
    .spyOn(service, "$disconnect")
    .mockResolvedValue(undefined)
  await expect(service.onModuleInit()).rejects.toThrow(
    "Cannot connect to PostgreSQL"
  )
  expect(disconnect).toHaveBeenCalledTimes(1)
})
