import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { randomUUID } from "node:crypto"
import { ACCESS_TOKEN_TTL_SECONDS } from "./auth.constants.js"
import type { AuthUser } from "./auth.types.js"

export type AccessClaims = JWTPayload & {
  sub: string
  email: string
  name: string
  role: string
  authVersion: number
}

@Injectable()
export class JwtService {
  private readonly secret: Uint8Array
  private readonly issuer = "furniture-api"

  constructor(config: ConfigService) {
    const value = config.get<string>("JWT_SECRET")
    if (!value || value.length < 32)
      throw new Error("JWT_SECRET must be at least 32 characters")
    this.secret = new TextEncoder().encode(value)
  }

  async signAccessToken(user: AuthUser, authVersion = 0) {
    return new SignJWT({
      email: user.email,
      name: user.name,
      role: user.role,
      authVersion,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(user.id)
      .setJti(randomUUID())
      .setIssuer(this.issuer)
      .setIssuedAt()
      .setExpirationTime(`${ACCESS_TOKEN_TTL_SECONDS}s`)
      .sign(this.secret)
  }

  async verifyAccessToken(token: string): Promise<AccessClaims> {
    try {
      const { payload } = await jwtVerify(token, this.secret, {
        issuer: this.issuer,
        algorithms: ["HS256"],
      })
      if (
        typeof payload.sub !== "string" ||
        typeof payload.jti !== "string" ||
        typeof payload.email !== "string" ||
        typeof payload.name !== "string" ||
        typeof payload.role !== "string" ||
        !Number.isInteger(payload.authVersion) ||
        Number(payload.authVersion) < 0
      )
        throw new Error()
      return payload as AccessClaims
    } catch {
      throw new UnauthorizedException({
        code: "INVALID_ACCESS_TOKEN",
        message: "Access token không hợp lệ",
      })
    }
  }
}
