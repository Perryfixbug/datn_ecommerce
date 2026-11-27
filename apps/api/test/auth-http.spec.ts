import "reflect-metadata"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { AuthController } from "../src/modules/auth/auth.controller.js"
import { AuthService } from "../src/modules/auth/auth.service.js"
import { AccessTokenGuard } from "../src/modules/auth/access-token.guard.js"
import { JwtService } from "../src/modules/auth/jwt.service.js"
import { PasswordService } from "../src/modules/auth/password.service.js"
import { PrismaService } from "../src/infrastructure/database/prisma.service.js"
import { RedisService } from "../src/infrastructure/redis/redis.service.js"
import { ApiExceptionFilter } from "../src/common/filters/api-exception.filter.js"

describe("Auth HTTP với JWT và mật khẩu thật, DB/Redis giả lập", () => {
  let app: INestApplication
  const user = {
    idNguoiDung: 2n,
    email: "buyer@example.test",
    hoTen: "Buyer",
    vaiTro: "NguoiMua",
    trangThai: "HoatDong",
    authVersion: 0,
    matKhauHash: "",
  }
  type Token = {
    id: bigint
    tokenHash: string
    idNguoiDung: bigint
    expiresAt: Date
    revokedAt: Date | null
    replacedById?: bigint
  }
  let tokens: Token[] = []
  let blacklist = new Set<string>()
  let duplicateEmail = false
  let failCreate = false
  const db = {
    nguoiDung: {
      findMany: async ({ where }: { where: { email: string } }) =>
        where.email !== user.email
          ? []
          : duplicateEmail
            ? [user, user]
            : [user],
      findUnique: async () => user,
      updateMany: async () => ({
        count: user.trangThai === "HoatDong" ? 1 : 0,
      }),
    },
    refreshToken: {
      findUnique: async ({ where }: { where: { tokenHash: string } }) => {
        const token = tokens.find((row) => row.tokenHash === where.tokenHash)
        return token ? { ...token, nguoiDung: user } : null
      },
      create: async ({ data }: { data: Omit<Token, "revokedAt"> }) => {
        if (failCreate) throw new Error("private SQL")
        const row = { ...data, revokedAt: null }
        tokens.push(row)
        return row
      },
      updateMany: async ({
        where,
        data,
      }: {
        where: { id?: bigint; tokenHash?: string }
        data: Partial<Token>
      }) => {
        const rows = tokens.filter(
          (row) =>
            row.revokedAt === null &&
            (where.id === undefined || row.id === where.id) &&
            (where.tokenHash === undefined || row.tokenHash === where.tokenHash)
        )
        rows.forEach((row) => Object.assign(row, data))
        return { count: rows.length }
      },
    },
    $transaction: async <T>(work: (tx: unknown) => Promise<T>) => {
      const before = tokens.map((row) => ({ ...row }))
      try {
        return await work(db)
      } catch (error) {
        tokens = before
        throw error
      }
    },
  }
  beforeAll(async () => {
    user.matKhauHash = await new PasswordService().hash("correct-password")
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        AccessTokenGuard,
        JwtService,
        PasswordService,
        {
          provide: ConfigService,
          useValue: {
            get: (name: string, fallback?: unknown) =>
              name === "JWT_SECRET"
                ? "test-secret-at-least-32-characters-long"
                : fallback,
          },
        },
        { provide: PrismaService, useValue: db },
        {
          provide: RedisService,
          useValue: {
            isBlacklisted: async (key: string) => blacklist.has(key),
            setBlacklist: async (key: string) => {
              blacklist.add(key)
            },
          },
        },
      ],
    }).compile()
    app = module.createNestApplication()
    app.setGlobalPrefix("api/v1")
    app.useGlobalFilters(new ApiExceptionFilter())
    await app.init()
  })
  beforeEach(() => {
    tokens = []
    blacklist = new Set()
    duplicateEmail = false
    failCreate = false
    user.trangThai = "HoatDong"
    user.authVersion = 0
  })
  afterAll(async () => {
    await app?.close()
  })
  const post = (path: string, body: unknown) =>
    request(app.getHttpServer())
      .post("/api/v1/auth/" + path)
      .send(body)
  const login = () =>
    post("login", { email: user.email, password: "correct-password" })
  const me = (token: string) =>
    request(app.getHttpServer())
      .get("/api/v1/auth/me")
      .auth(token, { type: "bearer" })

  it("kiểm tra đầu vào và từ chối thông tin đăng nhập sai/không rõ vai trò", async () => {
    await post("login", { email: "invalid", password: "x" }).expect(400)
    await post("login", { email: user.email, password: "" }).expect(400)
    await post("refresh", {}).expect(400)
    await post("logout", { refreshToken: 123 }).expect(400)
    await post("login", { email: user.email, password: "wrong" }).expect(401)
    await post("login", {
      email: "missing@example.test",
      password: "x",
    }).expect(401)
    duplicateEmail = true
    await login().expect(401)
    duplicateEmail = false
    user.trangThai = "BiKhoa"
    await login().expect(401)
    expect(tokens).toHaveLength(0)
  })
  it("đăng nhập, đọc hồ sơ và thu hồi JWT khi authVersion thay đổi", async () => {
    const response = await login().expect(201)
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
      user: { id: "2", email: user.email, role: "NguoiMua" },
    })
    expect(JSON.stringify(response.body)).not.toContain("matKhauHash")
    expect(tokens[0]!.tokenHash).not.toBe(response.body.refreshToken)
    const profile = await me(response.body.accessToken).expect(200)
    expect(profile.body).toEqual(response.body.user)
    await me("invalid").expect(401)
    await request(app.getHttpServer()).get("/api/v1/auth/me").expect(401)
    user.authVersion++
    await me(response.body.accessToken).expect(401)
  })
  it("xoay refresh token một lần, từ chối token cũ/hết hạn", async () => {
    const first = await login().expect(201)
    const rotated = await post("refresh", {
      refreshToken: first.body.refreshToken,
    }).expect(201)
    expect(rotated.body.refreshToken).not.toBe(first.body.refreshToken)
    expect(tokens).toHaveLength(2)
    expect(tokens[0]!.revokedAt).toBeInstanceOf(Date)
    await post("refresh", { refreshToken: first.body.refreshToken }).expect(401)
    await me(rotated.body.accessToken).expect(200)
    tokens[1]!.expiresAt = new Date(0)
    await post("refresh", { refreshToken: rotated.body.refreshToken }).expect(
      401
    )
    await post("refresh", { refreshToken: "unknown" }).expect(401)
    expect(tokens).toHaveLength(2)
  })
  it("logout thu hồi refresh token và access token, gọi lại không tạo lỗi", async () => {
    const first = await login().expect(201)
    const response = await post("logout", {
      refreshToken: first.body.refreshToken,
    })
      .auth(first.body.accessToken, { type: "bearer" })
      .expect(201)
    expect(response.body).toEqual({ success: true })
    await me(first.body.accessToken).expect(401)
    await post("refresh", { refreshToken: first.body.refreshToken }).expect(401)
    await post("logout", { refreshToken: first.body.refreshToken }).expect(201)
    await post("logout", {}).expect(201)
  })
  it("không phát token hoặc lộ lỗi DB khi lưu phiên thất bại", async () => {
    failCreate = true
    const response = await login().expect(500)
    expect(JSON.stringify(response.body)).not.toContain("SQL")
    expect(response.body).not.toHaveProperty("accessToken")
    expect(tokens).toHaveLength(0)
  })
})
