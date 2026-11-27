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
  StoresListAdminStoresQueryParams,
  StoresGetAdminStoreParams,
  StoresLockAdminStoreBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import type { AuthRequest } from "../auth/auth.types.js"
import { AdminStoresService, storeId } from "./admin-stores.service.js"
import type { StoreQuery } from "./admin-stores.service.js"
import {
  RequireStorePermission,
  StorePermissionsGuard,
} from "./store-permissions.guard.js"

// Chỉ chuyển biểu diễn query HTTP; ràng buộc vẫn lấy từ schema generated.
const querySchema = z
  .preprocess((value) => {
    if (typeof value !== "object" || value === null) return value
    const query = { ...value } as Record<string, unknown>
    if (typeof query.limit === "string") query.limit = Number(query.limit)
    if (typeof query.search === "string") query.search = query.search.trim()
    return query
  }, StoresListAdminStoresQueryParams)
  .superRefine((query, context) => {
    if (!Number.isInteger(query.limit))
      context.addIssue({
        code: "custom",
        path: ["limit"],
        message: "limit phải là số nguyên",
      })
  })
type Params = z.infer<typeof StoresGetAdminStoreParams>
type Reason = z.infer<typeof StoresLockAdminStoreBody>

@Controller("admin/stores")
@UseGuards(AccessTokenGuard, StorePermissionsGuard)
export class AdminStoresController {
  constructor(private readonly stores: AdminStoresService) {}

  @Get()
  @RequireStorePermission("stores.read")
  list(@Query(new ZodValidationPipe(querySchema)) query: StoreQuery) {
    return this.stores.list(query)
  }

  @Get(":storeId")
  @RequireStorePermission("stores.read")
  detail(
    @Param(new ZodValidationPipe(StoresGetAdminStoreParams)) params: Params
  ) {
    return this.stores.detail(storeId(params.storeId))
  }

  @Post(":storeId/approval")
  @HttpCode(200)
  @RequireStorePermission("stores.review")
  approve(
    @Param(new ZodValidationPipe(StoresGetAdminStoreParams)) params: Params,
    @Req() request: AuthRequest
  ) {
    return this.stores.change(
      storeId(params.storeId),
      storeId(request.user.id),
      "approval"
    )
  }

  @Post(":storeId/rejection")
  @HttpCode(200)
  @RequireStorePermission("stores.review")
  reject(
    @Param(new ZodValidationPipe(StoresGetAdminStoreParams)) params: Params,
    @Body(new ZodValidationPipe(StoresLockAdminStoreBody)) body: Reason,
    @Req() request: AuthRequest
  ) {
    return this.stores.change(
      storeId(params.storeId),
      storeId(request.user.id),
      "rejection",
      body.reason
    )
  }

  @Post(":storeId/lock")
  @HttpCode(200)
  @RequireStorePermission("stores.manage-status")
  lock(
    @Param(new ZodValidationPipe(StoresGetAdminStoreParams)) params: Params,
    @Body(new ZodValidationPipe(StoresLockAdminStoreBody)) body: Reason,
    @Req() request: AuthRequest
  ) {
    return this.stores.change(
      storeId(params.storeId),
      storeId(request.user.id),
      "lock",
      body.reason
    )
  }

  @Post(":storeId/unlock")
  @HttpCode(200)
  @RequireStorePermission("stores.manage-status")
  unlock(
    @Param(new ZodValidationPipe(StoresGetAdminStoreParams)) params: Params,
    @Req() request: AuthRequest
  ) {
    return this.stores.change(
      storeId(params.storeId),
      storeId(request.user.id),
      "unlock"
    )
  }
}
