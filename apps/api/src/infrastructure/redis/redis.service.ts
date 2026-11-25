import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Redis } from "ioredis"

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client: InstanceType<typeof Redis>

  constructor(config: ConfigService) {
    const url = config.get<string>("REDIS_URL")
    if (!url) throw new Error("REDIS_URL is required")
    this.client = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 1 })
  }

  async onModuleInit() {
    await this.client.connect()
    await this.client.ping()
  }

  async onModuleDestroy() {
    await this.client.quit()
  }

  async setBlacklist(key: string, ttlSeconds: number) {
    if (ttlSeconds <= 0) return
    await this.client.set(key, "1", "EX", ttlSeconds)
  }

  async isBlacklisted(key: string) {
    return (await this.client.exists(key)) === 1
  }
}
