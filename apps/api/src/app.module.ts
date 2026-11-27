import { Module } from "@nestjs/common"
import { DatabaseModule } from "./infrastructure/database/database.module.js"
import { HealthModule } from "./modules/health/health.module.js"
import { RedisModule } from "./infrastructure/redis/redis.module.js"
import { AuthModule } from "./modules/auth/auth.module.js"
import { AdminStoresModule } from "./modules/admin-stores/admin-stores.module.js"
import { AdminAccountsModule } from "./modules/admin-accounts/admin-accounts.module.js"
import { ProductModerationModule } from "./modules/product-moderation/product-moderation.module.js"
import { AdminCategoriesModule } from "./modules/admin-categories/admin-categories.module.js"
import { HomepageModule } from "./modules/homepage/homepage.module.js"
import { AdminCasesModule } from "./modules/admin-cases/admin-cases.module.js"
import { AdminReportsModule } from "./modules/admin-reports/admin-reports.module.js"

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    HealthModule,
    AuthModule,
    AdminStoresModule,
    AdminAccountsModule,
    ProductModerationModule,
    AdminCategoriesModule,
    HomepageModule,
    AdminCasesModule,
    AdminReportsModule,
  ],
})
export class AppModule {}
