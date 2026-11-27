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
import * as contract from "../../../../../packages/api-contract/src/generated/admin.js"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "../auth/access-token.guard.js"
import type { AuthRequest } from "../auth/auth.types.js"
import { HomepageService, validateHomepageId } from "./homepage.service.js"
import type { MediaInput, CategoryInput } from "./homepage.service.js"
import {
  HomepagePermissionsGuard,
  RequireHomepagePermission,
} from "./homepage-permissions.guard.js"

const changeSchema = contract.HomepagePublishHomepageBody.refine(
  (body) => Number.isInteger(body.version),
  { path: ["version"], message: "version phải là số nguyên" }
)
const mediaSchema = contract.HomepageCreateHomepageBannerBody.refine(
  (body) => Number.isInteger(body.version),
  { path: ["version"], message: "version phải là số nguyên" }
)
const categorySchema =
  contract.HomepageCreateHomepageCategorySectionBody.refine(
    (body) => Number.isInteger(body.version),
    { path: ["version"], message: "version phải là số nguyên" }
  )
const orderSchema = contract.HomepageReorderHomepageBody.refine(
  (body) => Number.isInteger(body.version),
  { path: ["version"], message: "version phải là số nguyên" }
)
const deleteSchema = z
  .preprocess((value) => {
    if (typeof value !== "object" || value === null) return value
    const query = { ...value } as Record<string, unknown>
    if (typeof query.version === "string" && query.version.trim())
      query.version = Number(query.version)
    return query
  }, contract.HomepageDeleteHomepageBannerQueryParams)
  .refine((body) => Number.isInteger(body.version), {
    path: ["version"],
    message: "version phải là số nguyên",
  })
type Params = z.infer<typeof contract.HomepageUpdateHomepageBannerParams>
type Change = z.infer<typeof changeSchema>
type Order = z.infer<typeof orderSchema>
@Controller("admin/homepage")
@UseGuards(AccessTokenGuard, HomepagePermissionsGuard)
export class HomepageController {
  constructor(private readonly homepage: HomepageService) {}
  @Get()
  @RequireHomepagePermission("read")
  get() {
    return this.homepage.get()
  }
  @Get("preview")
  @RequireHomepagePermission("read")
  preview(
    @Query(new ZodValidationPipe(contract.HomepagePreviewHomepageQueryParams))
    query: z.infer<typeof contract.HomepagePreviewHomepageQueryParams>
  ) {
    return this.homepage.preview(query.at)
  }

  @Post("banners")
  @HttpCode(200)
  @RequireHomepagePermission("edit")
  createBanner(@Body(new ZodValidationPipe(mediaSchema)) body: MediaInput) {
    return this.homepage.mutate(body.version, {
      action: "save",
      kind: "banner",
      input: body,
    })
  }
  @Patch("banners/:itemId")
  @RequireHomepagePermission("edit")
  updateBanner(
    @Param(new ZodValidationPipe(contract.HomepageUpdateHomepageBannerParams))
    params: Params,
    @Body(new ZodValidationPipe(mediaSchema)) body: MediaInput
  ) {
    validateHomepageId(params.itemId)
    return this.homepage.mutate(body.version, {
      action: "save",
      kind: "banner",
      id: params.itemId,
      input: body,
    })
  }
  @Delete("banners/:itemId")
  @RequireHomepagePermission("edit")
  deleteBanner(
    @Param(new ZodValidationPipe(contract.HomepageUpdateHomepageBannerParams))
    params: Params,
    @Query(new ZodValidationPipe(deleteSchema)) query: Change
  ) {
    validateHomepageId(params.itemId)
    return this.homepage.mutate(query.version, {
      action: "delete",
      kind: "banner",
      id: params.itemId,
    })
  }

  @Post("ads")
  @HttpCode(200)
  @RequireHomepagePermission("edit")
  createAd(@Body(new ZodValidationPipe(mediaSchema)) body: MediaInput) {
    return this.homepage.mutate(body.version, {
      action: "save",
      kind: "ad",
      input: body,
    })
  }
  @Patch("ads/:itemId")
  @RequireHomepagePermission("edit")
  updateAd(
    @Param(new ZodValidationPipe(contract.HomepageUpdateHomepageBannerParams))
    params: Params,
    @Body(new ZodValidationPipe(mediaSchema)) body: MediaInput
  ) {
    validateHomepageId(params.itemId)
    return this.homepage.mutate(body.version, {
      action: "save",
      kind: "ad",
      id: params.itemId,
      input: body,
    })
  }
  @Delete("ads/:itemId")
  @RequireHomepagePermission("edit")
  deleteAd(
    @Param(new ZodValidationPipe(contract.HomepageUpdateHomepageBannerParams))
    params: Params,
    @Query(new ZodValidationPipe(deleteSchema)) query: Change
  ) {
    validateHomepageId(params.itemId)
    return this.homepage.mutate(query.version, {
      action: "delete",
      kind: "ad",
      id: params.itemId,
    })
  }

  @Post("category-sections")
  @HttpCode(200)
  @RequireHomepagePermission("edit")
  createCategorySection(
    @Body(new ZodValidationPipe(categorySchema)) body: CategoryInput
  ) {
    return this.homepage.mutate(body.version, {
      action: "save",
      kind: "category-section",
      input: body,
    })
  }
  @Patch("category-sections/:itemId")
  @RequireHomepagePermission("edit")
  updateCategorySection(
    @Param(new ZodValidationPipe(contract.HomepageUpdateHomepageBannerParams))
    params: Params,
    @Body(new ZodValidationPipe(categorySchema)) body: CategoryInput
  ) {
    validateHomepageId(params.itemId)
    return this.homepage.mutate(body.version, {
      action: "save",
      kind: "category-section",
      id: params.itemId,
      input: body,
    })
  }
  @Delete("category-sections/:itemId")
  @RequireHomepagePermission("edit")
  deleteCategorySection(
    @Param(new ZodValidationPipe(contract.HomepageUpdateHomepageBannerParams))
    params: Params,
    @Query(new ZodValidationPipe(deleteSchema)) query: Change
  ) {
    validateHomepageId(params.itemId)
    return this.homepage.mutate(query.version, {
      action: "delete",
      kind: "category-section",
      id: params.itemId,
    })
  }

  @Post("order")
  @HttpCode(200)
  @RequireHomepagePermission("edit")
  reorder(@Body(new ZodValidationPipe(orderSchema)) body: Order) {
    return this.homepage.mutate(body.version, {
      action: "order",
      ids: body.itemIds,
    })
  }
  @Post("publish")
  @HttpCode(200)
  @RequireHomepagePermission("publish")
  publish(
    @Body(new ZodValidationPipe(changeSchema)) body: Change,
    @Req() request: AuthRequest
  ) {
    return this.homepage.mutate(body.version, {
      action: "publish",
      actorId: BigInt(request.user.id),
    })
  }
}
