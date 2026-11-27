import "reflect-metadata"
import { jest } from "@jest/globals"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import { AuthService } from "../src/modules/auth/auth.service.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PasswordService } from "../src/modules/auth/password.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"

it("rejects revoked/locked refresh tokens and serializes issuance with account changes", async () => {
  const user = {
    idNguoiDung: 2n,
    hoTen: "Buyer",
    email: "buyer@example.test",
    vaiTro: "NguoiMua",
    trangThai: "HoatDong",
    authVersion: 4,
    matKhauHash: "hash",
  }
  const token = {
    id: 10n,
    idNguoiDung: 2n,
    revokedAt: null as Date | null,
    expiresAt: new Date(Date.now() + 60000),
    nguoiDung: user,
  }
  let active = true
  const created = jest.fn(async () => ({ id: 11n }))
  const updateAccount = jest.fn(async () => ({
    count: active ? 1 : 0,
  }))
  const db = {
    nguoiDung: { findMany: async () => [user], updateMany: updateAccount },
    refreshToken: {
      findUnique: async () => token,
      create: created,
      updateMany: async () => ({ count: 1 }),
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => work(db),
  }
  const sign = jest.fn(async () => "access")
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: PrismaService, useValue: db },
      { provide: RedisService, useValue: {} },
      { provide: JwtService, useValue: { signAccessToken: sign } },
      { provide: PasswordService, useValue: { verify: async () => true } },
      {
        provide: ConfigService,
        useValue: { get: (_name: string, fallback: number) => fallback },
      },
    ],
  }).compile()
  try {
    const service = module.get(AuthService)
    token.revokedAt = new Date()
    await expect(service.refresh("refresh")).rejects.toMatchObject({
      status: 401,
    })
    token.revokedAt = null
    user.trangThai = "BiKhoa"
    await expect(service.refresh("refresh")).rejects.toMatchObject({
      status: 401,
    })
    await expect(service.login(user.email, "password")).rejects.toMatchObject({
      status: 401,
    })
    expect(created).not.toHaveBeenCalled()
    user.trangThai = "HoatDong"
    active = false
    await expect(service.refresh("refresh")).rejects.toMatchObject({
      status: 401,
    })
    await expect(service.login(user.email, "password")).rejects.toMatchObject({
      status: 401,
    })
    expect(created).not.toHaveBeenCalled()
    active = true
    await expect(service.refresh("refresh")).resolves.toMatchObject({
      accessToken: "access",
    })
    expect(updateAccount).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: { idNguoiDung: 2n, trangThai: "HoatDong", authVersion: 4 },
      })
    )
    expect(sign).toHaveBeenCalledWith(expect.objectContaining({ id: "2" }), 4)
    await expect(service.login(user.email, "password")).resolves.toMatchObject({
      accessToken: "access",
    })
  } finally {
    await module.close()
  }
})
