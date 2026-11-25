import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { RedisService } from "../../infrastructure/redis/redis.service.js"
import { ACCESS_BLACKLIST_PREFIX } from "./auth.constants.js"
import { JwtService } from "./jwt.service.js"

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly redis: RedisService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>
      user?: unknown
      accessToken?: string
    }>()
    const value = request.headers.authorization
    if (!value?.startsWith("Bearer "))
      throw new UnauthorizedException({
        code: "MISSING_ACCESS_TOKEN",
        message: "Thiếu access token",
      })
    const token = value.slice(7)
    const claims = await this.jwt.verifyAccessToken(token)
    if (
      !claims.jti ||
      (await this.redis.isBlacklisted(ACCESS_BLACKLIST_PREFIX + claims.jti))
    )
      throw new UnauthorizedException({
        code: "REVOKED_ACCESS_TOKEN",
        message: "Access token đã bị thu hồi",
      })
    request.user = {
      id: claims.sub,
      email: claims.email,
      name: claims.name,
      role: claims.role,
    }
    request.accessToken = token
    return true
  }
}
