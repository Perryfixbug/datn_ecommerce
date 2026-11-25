import { Module } from "@nestjs/common"
import { DatabaseModule } from "./infrastructure/database/database.module.js"
import { HealthModule } from "./modules/health/health.module.js"
import { RedisModule } from "./infrastructure/redis/redis.module.js"
import { AuthModule } from "./modules/auth/auth.module.js"

@Module({ imports: [DatabaseModule, RedisModule, HealthModule, AuthModule] })
export class AppModule {}
