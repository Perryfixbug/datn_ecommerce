import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { createHash, randomBytes } from "node:crypto"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"
import { RedisService } from "../../infrastructure/redis/redis.service.js"
import {
  ACCESS_BLACKLIST_PREFIX,
  REFRESH_TOKEN_TTL_SECONDS,
} from "./auth.constants.js"
import { JwtService } from "./jwt.service.js"
import { PasswordService } from "./password.service.js"
import type { AuthUser, TokenPair } from "./auth.types.js"

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
    private readonly password: PasswordService,
    private readonly config: ConfigService
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<TokenPair & { user: AuthUser }> {
    const users = await this.prisma.nguoiDung.findMany({ where: { email } })
    if (users.length !== 1)
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng",
      })
    const user = users[0]
    if (!user)
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng",
      })
    if (
      user.trangThai !== "HoatDong" ||
      !(await this.password.verify(password, user.matKhauHash))
    )
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng",
      })
    const publicUser = this.toAuthUser(user)
    const tokens = await this.issueTokens(publicUser)
    await this.prisma.nguoiDung.update({
      where: { idNguoiDung: user.idNguoiDung },
      data: { lanDangNhapCuoi: new Date() },
    })
    return { ...tokens, user: publicUser }
  }

  async refresh(refreshToken: string): Promise<TokenPair & { user: AuthUser }> {
    const tokenHash = this.hashRefreshToken(refreshToken)
    const current = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { nguoiDung: true },
    })
    if (
      !current ||
      current.revokedAt ||
      current.expiresAt <= new Date() ||
      current.nguoiDung.trangThai !== "HoatDong"
    )
      throw new UnauthorizedException({
        code: "INVALID_REFRESH_TOKEN",
        message: "Refresh token không hợp lệ",
      })
    const user = this.toAuthUser(current.nguoiDung)
    const nextRaw = this.createRefreshToken()
    const next = await this.prisma.$transaction(async (tx) => {
      const created = await tx.refreshToken.create({
        data: {
          id: this.nextId(),
          tokenHash: this.hashRefreshToken(nextRaw),
          idNguoiDung: current.idNguoiDung,
          expiresAt: this.refreshExpiry(),
        },
      })
      const updated = await tx.refreshToken.updateMany({
        where: { id: current.id, revokedAt: null },
        data: { revokedAt: new Date(), replacedById: created.id },
      })
      if (updated.count !== 1)
        throw new UnauthorizedException({
          code: "INVALID_REFRESH_TOKEN",
          message: "Refresh token không hợp lệ",
        })
      return created
    })
    const accessToken = await this.jwt.signAccessToken(user)
    void next
    return { accessToken, refreshToken: nextRaw, user }
  }

  async logout(
    refreshToken: string | undefined,
    accessToken: string | undefined
  ) {
    if (refreshToken)
      await this.prisma.refreshToken.updateMany({
        where: {
          tokenHash: this.hashRefreshToken(refreshToken),
          revokedAt: null,
        },
        data: { revokedAt: new Date() },
      })
    if (accessToken) {
      const claims = await this.jwt
        .verifyAccessToken(accessToken)
        .catch(() => undefined)
      if (claims?.jti && claims.exp)
        await this.redis.setBlacklist(
          ACCESS_BLACKLIST_PREFIX + claims.jti,
          Math.max(1, claims.exp - Math.floor(Date.now() / 1000))
        )
    }
    return { success: true }
  }

  async me(user: AuthUser) {
    return user
  }

  private async issueTokens(user: AuthUser): Promise<TokenPair> {
    const refreshToken = this.createRefreshToken()
    await this.prisma.refreshToken.create({
      data: {
        id: this.nextId(),
        tokenHash: this.hashRefreshToken(refreshToken),
        idNguoiDung: BigInt(user.id),
        expiresAt: this.refreshExpiry(),
      },
    })
    return { accessToken: await this.jwt.signAccessToken(user), refreshToken }
  }

  private toAuthUser(user: {
    idNguoiDung: bigint
    email: string
    hoTen: string
    vaiTro: string
  }): AuthUser {
    return {
      id: user.idNguoiDung.toString(),
      email: user.email,
      name: user.hoTen,
      role: user.vaiTro,
    }
  }
  private createRefreshToken() {
    return randomBytes(48).toString("base64url")
  }
  private hashRefreshToken(value: string) {
    return createHash("sha256").update(value).digest("hex")
  }
  private refreshExpiry() {
    return new Date(
      Date.now() +
        Number(
          this.config.get("JWT_REFRESH_TTL_SECONDS", REFRESH_TOKEN_TTL_SECONDS)
        ) *
          1000
    )
  }
  private nextId() {
    return BigInt(Date.now()) * 1000n + BigInt(Math.floor(Math.random() * 1000))
  }
}
