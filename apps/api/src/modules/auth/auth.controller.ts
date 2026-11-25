import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe.js"
import { AccessTokenGuard } from "./access-token.guard.js"
import { AuthService } from "./auth.service.js"
import type { AuthRequest } from "./auth.types.js"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
const refreshSchema = z.object({ refreshToken: z.string().min(1) })
const logoutSchema = z.object({ refreshToken: z.string().min(1).optional() })

type AuthBody = z.infer<typeof loginSchema>

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  login(@Body(new ZodValidationPipe(loginSchema)) body: AuthBody) {
    return this.auth.login(body.email, body.password)
  }

  @Post("refresh")
  refresh(
    @Body(new ZodValidationPipe(refreshSchema))
    body: z.infer<typeof refreshSchema>
  ) {
    return this.auth.refresh(body.refreshToken)
  }

  @Post("logout")
  logout(
    @Body(new ZodValidationPipe(logoutSchema))
    body: z.infer<typeof logoutSchema>,
    @Headers("authorization") authorization?: string
  ) {
    return this.auth.logout(
      body.refreshToken,
      authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined
    )
  }

  @Get("me")
  @UseGuards(AccessTokenGuard)
  me(@Req() request: AuthRequest) {
    return this.auth.me(request.user)
  }
}
