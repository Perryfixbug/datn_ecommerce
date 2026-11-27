import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { AdminReportsController } from "./admin-reports.controller.js"
import { AdminReportsService } from "./admin-reports.service.js"
import { ReportPermissionsGuard } from "./report-permissions.guard.js"

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AdminReportsController],
  providers: [AdminReportsService, ReportPermissionsGuard],
})
export class AdminReportsModule {}
