import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common"
import { z } from "zod"
import {
  CasesListAdminCasesQueryParams,
  CasesGetAdminCaseParams,
  CasesResolveAdminCaseBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import type { AuthRequest } from "../auth/auth.types.js"
import { AdminCasesService } from "./admin-cases.service.js"
import type { CaseQuery, Resolution } from "./admin-cases.service.js"
import {
  CasePermissionsGuard,
  RequireCasePermission,
} from "./case-permissions.guard.js"

const querySchema = z
  .preprocess((value) => {
    if (typeof value !== "object" || value === null) return value
    const query = { ...value } as Record<string, unknown>
    if (typeof query.limit === "string") query.limit = Number(query.limit)
    return query
  }, CasesListAdminCasesQueryParams)
  .refine((query) => Number.isInteger(query.limit), {
    path: ["limit"],
    message: "limit phải là số nguyên",
  })
type Params = z.infer<typeof CasesGetAdminCaseParams>

@Controller("admin/cases")
@UseGuards(AccessTokenGuard, CasePermissionsGuard)
export class AdminCasesController {
  constructor(private readonly cases: AdminCasesService) {}

  @Get()
  @RequireCasePermission("read")
  list(@Query(new ZodValidationPipe(querySchema)) query: CaseQuery) {
    return this.cases.list(query)
  }

  @Get(":caseId")
  @RequireCasePermission("read")
  detail(
    @Param(new ZodValidationPipe(CasesGetAdminCaseParams)) params: Params
  ) {
    return this.cases.detail(params.caseId)
  }

  @Post(":caseId/resolution")
  @HttpCode(200)
  @RequireCasePermission("write")
  resolve(
    @Param(new ZodValidationPipe(CasesGetAdminCaseParams)) params: Params,
    @Body(new ZodValidationPipe(CasesResolveAdminCaseBody)) body: Resolution,
    @Req() request: AuthRequest
  ) {
    return this.cases.resolve(params.caseId, BigInt(request.user.id), body)
  }
}
