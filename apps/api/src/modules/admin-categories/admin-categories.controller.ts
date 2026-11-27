import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common"
import { z } from "zod"
import {
  CategoriesListAdminCategoriesQueryParams,
  CategoriesCreateAdminCategoryBody,
  CategoriesUpdateAdminCategoryBody,
  CategoriesUpdateAdminCategoryParams,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import type { AuthRequest } from "../auth/auth.types.js"
import {
  AdminCategoriesService,
  categoryId,
} from "./admin-categories.service.js"
import type {
  CategoryQuery,
  CategoryInput,
} from "./admin-categories.service.js"
import {
  CategoryPermissionsGuard,
  RequireCategoryPermission,
} from "./category-permissions.guard.js"

const querySchema = z
  .preprocess((value) => {
    if (typeof value !== "object" || value === null) return value
    const query = { ...value } as Record<string, unknown>
    if (typeof query.limit === "string") query.limit = Number(query.limit)
    if (typeof query.search === "string") query.search = query.search.trim()
    return query
  }, CategoriesListAdminCategoriesQueryParams)
  .refine((query) => Number.isInteger(query.limit), {
    path: ["limit"],
    message: "limit phải là số nguyên",
  })
type Params = z.infer<typeof CategoriesUpdateAdminCategoryParams>

@Controller("admin/catalog/categories")
@UseGuards(AccessTokenGuard, CategoryPermissionsGuard)
export class AdminCategoriesController {
  constructor(private readonly categories: AdminCategoriesService) {}
  @Get()
  @RequireCategoryPermission("read")
  list(@Query(new ZodValidationPipe(querySchema)) query: CategoryQuery) {
    return this.categories.list(query)
  }
  @Post()
  @HttpCode(200)
  @RequireCategoryPermission("write")
  create(
    @Body(new ZodValidationPipe(CategoriesCreateAdminCategoryBody))
    body: CategoryInput,
    @Req() request: AuthRequest
  ) {
    return this.categories.save(null, BigInt(request.user.id), body)
  }
  @Patch(":categoryId")
  @RequireCategoryPermission("write")
  update(
    @Param(new ZodValidationPipe(CategoriesUpdateAdminCategoryParams))
    params: Params,
    @Body(new ZodValidationPipe(CategoriesUpdateAdminCategoryBody))
    body: CategoryInput,
    @Req() request: AuthRequest
  ) {
    return this.categories.save(
      categoryId(params.categoryId),
      BigInt(request.user.id),
      body
    )
  }
  @Delete(":categoryId")
  @RequireCategoryPermission("write")
  remove(
    @Param(new ZodValidationPipe(CategoriesUpdateAdminCategoryParams))
    params: Params
  ) {
    return this.categories.remove(categoryId(params.categoryId))
  }
}
