import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { AdminCasesController } from "./admin-cases.controller.js"
import { AdminCasesService } from "./admin-cases.service.js"
import { CasePermissionsGuard } from "./case-permissions.guard.js"

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AdminCasesController],
  providers: [AdminCasesService, CasePermissionsGuard],
})
export class AdminCasesModule {}
