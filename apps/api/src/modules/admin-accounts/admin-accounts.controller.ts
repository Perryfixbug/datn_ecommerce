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
  AccountsListAdminAccountsQueryParams,
  AccountsGetAdminAccountParams,
  AccountsLockAdminAccountBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import {
  AccountPermissionsGuard,
  RequireAccountPermission,
} from "./account-permissions.guard.js"
import type { AccountRequest } from "./account-permissions.guard.js"
import { AdminAccountsService, accountId } from "./admin-accounts.service.js"
import type { AccountQuery } from "./admin-accounts.service.js"

const querySchema = z
  .preprocess((value) => {
    if (typeof value !== "object" || value === null) return value
    const query = { ...value } as Record<string, unknown>
    if (typeof query.limit === "string") query.limit = Number(query.limit)
    if (typeof query.search === "string") query.search = query.search.trim()
    return query
  }, AccountsListAdminAccountsQueryParams)
  .refine((query) => Number.isInteger(query.limit), {
    path: ["limit"],
    message: "limit phải là số nguyên",
  })
type Params = z.infer<typeof AccountsGetAdminAccountParams>
type Reason = z.infer<typeof AccountsLockAdminAccountBody>

@Controller("admin/accounts")
@UseGuards(AccessTokenGuard, AccountPermissionsGuard)
export class AdminAccountsController {
  constructor(private readonly accounts: AdminAccountsService) {}
  @Get()
  @RequireAccountPermission("read")
  list(
    @Query(new ZodValidationPipe(querySchema)) query: AccountQuery,
    @Req() request: AccountRequest
  ) {
    return this.accounts.list(query, request.accountScope)
  }
  @Get(":accountId")
  @RequireAccountPermission("read")
  detail(
    @Param(new ZodValidationPipe(AccountsGetAdminAccountParams)) params: Params,
    @Req() request: AccountRequest
  ) {
    return this.accounts.detail(
      accountId(params.accountId),
      request.accountScope
    )
  }
  @Post(":accountId/lock")
  @HttpCode(200)
  @RequireAccountPermission("manage")
  lock(
    @Param(new ZodValidationPipe(AccountsGetAdminAccountParams)) params: Params,
    @Body(new ZodValidationPipe(AccountsLockAdminAccountBody)) body: Reason,
    @Req() request: AccountRequest
  ) {
    return this.accounts.change(
      accountId(params.accountId),
      accountId(request.user.id),
      "lock",
      body.reason
    )
  }
  @Post(":accountId/unlock")
  @HttpCode(200)
  @RequireAccountPermission("manage")
  unlock(
    @Param(new ZodValidationPipe(AccountsGetAdminAccountParams)) params: Params,
    @Body(new ZodValidationPipe(AccountsLockAdminAccountBody)) body: Reason,
    @Req() request: AccountRequest
  ) {
    return this.accounts.change(
      accountId(params.accountId),
      accountId(request.user.id),
      "unlock",
      body.reason
    )
  }
}
