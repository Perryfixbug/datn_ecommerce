import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { HomepageController } from "./homepage.controller.js"
import { HomepageService } from "./homepage.service.js"
import { HomepagePermissionsGuard } from "./homepage-permissions.guard.js"
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [HomepageController],
  providers: [HomepageService, HomepagePermissionsGuard],
})
export class HomepageModule {}
