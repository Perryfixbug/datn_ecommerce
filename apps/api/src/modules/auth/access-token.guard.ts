import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { RedisService } from "../../infrastructure/redis/redis.service.js"
import { ACCESS_BLACKLIST_PREFIX } from "./auth.constants.js"
import { JwtService } from "./jwt.service.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly db: PrismaService
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
      !/^[1-9][0-9]{0,18}$/.test(claims.sub) ||
      BigInt(claims.sub) > 9223372036854775807n
    )
      throw new UnauthorizedException({
        code: "INVALID_ACCESS_TOKEN",
        message: "Access token không hợp lệ",
      })
    const account = await this.db.nguoiDung.findUnique({
      where: { idNguoiDung: BigInt(claims.sub) },
      select: { trangThai: true, authVersion: true, vaiTro: true },
    })
    if (
      !account ||
      account.trangThai !== "HoatDong" ||
      account.authVersion !== claims.authVersion ||
      account.vaiTro !== claims.role ||
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
