import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { AdminCategoriesController } from "./admin-categories.controller.js"
import { AdminCategoriesService } from "./admin-categories.service.js"
import { CategoryPermissionsGuard } from "./category-permissions.guard.js"

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService, CategoryPermissionsGuard],
})
export class AdminCategoriesModule {}
