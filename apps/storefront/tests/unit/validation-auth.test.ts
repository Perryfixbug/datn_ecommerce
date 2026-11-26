import { describe, expect, it } from "vitest"

import {
  createEmailSchema,
  createForgotPasswordSchema,
  createLoginSchema,
  createRegisterSchema,
  type ValidationMessageKey,
} from "@/lib/validation/auth"

// Trả nguyên khóa để kiểm tra đúng thông báo được gắn cho từng lỗi.
const t = (key: ValidationMessageKey) => key

function issues(result: {
  success: boolean
  error?: { issues: { path: PropertyKey[]; message: string }[] }
}) {
  return (result.error?.issues ?? []).map((i) => [i.path.join("."), i.message])
}

describe("createLoginSchema", () => {
  const schema = createLoginSchema(t)

  it("chấp nhận email hợp lệ và mật khẩu bất kỳ khác rỗng", () => {
    expect(
      schema.safeParse({ email: "lan@anha.vn", password: "x" }).success
    ).toBe(true)
  })

  it("báo lỗi email sai và mật khẩu trống", () => {
    expect(issues(schema.safeParse({ email: "lan", password: "" }))).toEqual([
      ["email", "emailInvalid"],
      ["password", "passwordRequired"],
    ])
  })
})

describe("createRegisterSchema", () => {
  const schema = createRegisterSchema(t)
  const valid = {
    email: "lan@anha.vn",
    phone: "0912345678",
    password: "matkhau123",
    confirmPassword: "matkhau123",
  }

  it("chấp nhận dữ liệu hợp lệ", () => {
    expect(schema.safeParse(valid).success).toBe(true)
  })

  it.each(["912345678", "09123456789", "0912 345 678", "+84912345678"])(
    "từ chối số điện thoại %s",
    (phone) => {
      expect(issues(schema.safeParse({ ...valid, phone }))).toEqual([
        ["phone", "phoneInvalid"],
      ])
    }
  )

  it("yêu cầu mật khẩu tối thiểu 8 ký tự", () => {
    const result = schema.safeParse({
      ...valid,
      password: "1234567",
      confirmPassword: "1234567",
    })
    expect(issues(result)).toEqual([["password", "passwordMin"]])
  })

  it("gắn lỗi không khớp vào ô xác nhận mật khẩu", () => {
    const result = schema.safeParse({ ...valid, confirmPassword: "khac12345" })
    expect(issues(result)).toEqual([["confirmPassword", "passwordMismatch"]])
  })
})

describe("createForgotPasswordSchema", () => {
  const schema = createForgotPasswordSchema(t)
  const valid = {
    email: "lan@anha.vn",
    otp: "123456",
    password: "matkhau123",
    confirmPassword: "matkhau123",
  }

  it("chấp nhận dữ liệu hợp lệ", () => {
    expect(schema.safeParse(valid).success).toBe(true)
  })

  it.each(["12345", "1234567", "12a456"])("từ chối mã OTP %s", (otp) => {
    expect(issues(schema.safeParse({ ...valid, otp }))).toEqual([
      ["otp", "otpInvalid"],
    ])
  })

  it("báo lỗi khi mật khẩu mới không khớp", () => {
    expect(
      issues(schema.safeParse({ ...valid, confirmPassword: "x" }))
    ).toEqual([["confirmPassword", "passwordMismatch"]])
  })
})

describe("createEmailSchema", () => {
  it("bỏ khoảng trắng đầu cuối trước khi kiểm tra", () => {
    expect(createEmailSchema(t).safeParse("  lan@anha.vn ").success).toBe(true)
    expect(createEmailSchema(t).safeParse("lan@").success).toBe(false)
  })
})
