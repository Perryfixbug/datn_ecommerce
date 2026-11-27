import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import type { z } from "zod"
import {
  ReportsResolveAdminReportParams,
  ReportsResolveAdminReportBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import type { AuthRequest } from "../auth/auth.types.js"
import { AdminReportsService } from "./admin-reports.service.js"
import type { ReportResolutionInput } from "./admin-reports.service.js"
import {
  ReportPermissionsGuard,
  RequireReportPermission,
} from "./report-permissions.guard.js"

@Controller("admin/reports")
@UseGuards(AccessTokenGuard, ReportPermissionsGuard)
export class AdminReportsController {
  constructor(private readonly reports: AdminReportsService) {}

  @Post(":reportId/resolution")
  @HttpCode(200)
  @RequireReportPermission("write")
  resolve(
    @Param(new ZodValidationPipe(ReportsResolveAdminReportParams))
    params: z.infer<typeof ReportsResolveAdminReportParams>,
    @Body(new ZodValidationPipe(ReportsResolveAdminReportBody))
    body: ReportResolutionInput,
    @Req() request: AuthRequest
  ) {
    return this.reports.resolve(params.reportId, BigInt(request.user.id), body)
  }
}
