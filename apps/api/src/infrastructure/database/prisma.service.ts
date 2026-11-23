import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../../generated/prisma/client.js"

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const connectionString = config.get<string>("DATABASE_URL")
    try {
      const url = new URL(connectionString ?? "")
      if (
        !["postgres:", "postgresql:"].includes(url.protocol) ||
        !url.hostname ||
        url.pathname.length < 2
      ) {
        throw new Error()
      }
    } catch {
      throw new Error(
        "DATABASE_URL must be a PostgreSQL URL with a database name"
      )
    }
    super({
      adapter: new PrismaPg({
        connectionString,
        connectionTimeoutMillis: 5000,
      }),
    })
  }

  async onModuleInit() {
    try {
      await this.$connect()
    } catch {
      await this.$disconnect().catch(() => undefined)
      throw new Error("Cannot connect to PostgreSQL")
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
