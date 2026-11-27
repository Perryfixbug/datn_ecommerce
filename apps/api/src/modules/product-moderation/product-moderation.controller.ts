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
  ProductModerationListProductModerationQueryParams,
  ProductModerationGetProductModerationParams,
  ProductModerationApproveProductModerationBody,
  ProductModerationRejectProductModerationBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import type { AuthRequest } from "../auth/auth.types.js"
import {
  ProductModerationService,
  moderationId,
} from "./product-moderation.service.js"
import type { ModerationQuery } from "./product-moderation.service.js"
import {
  ModerationPermissionsGuard,
  RequireModerationPermission,
} from "./moderation-permissions.guard.js"

const querySchema = z
  .preprocess((value) => {
    if (typeof value !== "object" || value === null) return value
    const query = { ...value } as Record<string, unknown>
    if (typeof query.limit === "string") query.limit = Number(query.limit)
    if (typeof query.search === "string") query.search = query.search.trim()
    return query
  }, ProductModerationListProductModerationQueryParams)
  .refine((query) => Number.isInteger(query.limit), {
    path: ["limit"],
    message: "limit phải là số nguyên",
  })
type Params = z.infer<typeof ProductModerationGetProductModerationParams>
type Approval = z.infer<typeof ProductModerationApproveProductModerationBody>
type Rejection = z.infer<typeof ProductModerationRejectProductModerationBody>
const approvalSchema = ProductModerationApproveProductModerationBody.refine(
  (body) => Number.isInteger(body.version),
  { path: ["version"], message: "version phải là số nguyên" }
)
const rejectionSchema = ProductModerationRejectProductModerationBody.refine(
  (body) => Number.isInteger(body.version),
  { path: ["version"], message: "version phải là số nguyên" }
)

@Controller("admin/product-moderation")
@UseGuards(AccessTokenGuard, ModerationPermissionsGuard)
export class ProductModerationController {
  constructor(private readonly moderation: ProductModerationService) {}
  @Get()
  @RequireModerationPermission("read")
  list(@Query(new ZodValidationPipe(querySchema)) query: ModerationQuery) {
    return this.moderation.list(query)
  }
  @Get(":productId")
  @RequireModerationPermission("read")
  detail(
    @Param(new ZodValidationPipe(ProductModerationGetProductModerationParams))
    params: Params
  ) {
    return this.moderation.detail(moderationId(params.productId))
  }
  @Post(":productId/approval")
  @HttpCode(200)
  @RequireModerationPermission("review")
  approve(
    @Param(new ZodValidationPipe(ProductModerationGetProductModerationParams))
    params: Params,
    @Body(new ZodValidationPipe(approvalSchema)) body: Approval,
    @Req() request: AuthRequest
  ) {
    return this.moderation.decide(
      moderationId(params.productId),
      BigInt(request.user.id),
      body.version,
      "DaDuyet"
    )
  }
  @Post(":productId/rejection")
  @HttpCode(200)
  @RequireModerationPermission("review")
  reject(
    @Param(new ZodValidationPipe(ProductModerationGetProductModerationParams))
    params: Params,
    @Body(new ZodValidationPipe(rejectionSchema)) body: Rejection,
    @Req() request: AuthRequest
  ) {
    return this.moderation.decide(
      moderationId(params.productId),
      BigInt(request.user.id),
      body.version,
      "TuChoi",
      body.reason
    )
  }
}
