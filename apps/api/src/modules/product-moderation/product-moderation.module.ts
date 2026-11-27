import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { ProductModerationController } from "./product-moderation.controller.js"
import { ProductModerationService } from "./product-moderation.service.js"
import { ModerationPermissionsGuard } from "./moderation-permissions.guard.js"

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProductModerationController],
  providers: [ProductModerationService, ModerationPermissionsGuard],
})
export class ProductModerationModule {}
