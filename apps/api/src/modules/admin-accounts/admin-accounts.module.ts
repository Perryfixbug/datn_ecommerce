import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { AdminAccountsController } from "./admin-accounts.controller.js"
import { AdminAccountsService } from "./admin-accounts.service.js"
import { AccountPermissionsGuard } from "./account-permissions.guard.js"

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AdminAccountsController],
  providers: [AdminAccountsService, AccountPermissionsGuard],
})
export class AdminAccountsModule {}
