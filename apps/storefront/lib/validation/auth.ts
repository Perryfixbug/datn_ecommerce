import { z } from "zod"

/**
 * Khóa thông báo lỗi trong namespace `validation` của messages. Schema nhận
 * hàm dịch để thông báo theo ngôn ngữ hiện tại mà không viết cứng chuỗi.
 */
export type ValidationMessageKey =
  | "emailInvalid"
  | "phoneInvalid"
  | "passwordMin"
  | "passwordRequired"
  | "passwordMismatch"
  | "otpInvalid"

export type ValidationTranslator = (key: ValidationMessageKey) => string

export const PASSWORD_MIN_LENGTH = 8
/** Số điện thoại Việt Nam 10 chữ số, bắt đầu bằng 0. */
export const PHONE_PATTERN = /^0\d{9}$/
export const OTP_PATTERN = /^\d{6}$/

export function createLoginSchema(t: ValidationTranslator) {
  return z.object({
    email: z.string().trim().email(t("emailInvalid")),
    password: z.string().min(1, t("passwordRequired")),
  })
}
export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>

function newPasswordFields(t: ValidationTranslator) {
  return {
    password: z.string().min(PASSWORD_MIN_LENGTH, t("passwordMin")),
    confirmPassword: z.string(),
  }
}

export function createRegisterSchema(t: ValidationTranslator) {
  return z
    .object({
      email: z.string().trim().email(t("emailInvalid")),
      phone: z.string().trim().regex(PHONE_PATTERN, t("phoneInvalid")),
      ...newPasswordFields(t),
    })
    .refine((v) => v.password === v.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    })
}
export type RegisterInput = z.infer<ReturnType<typeof createRegisterSchema>>

export function createForgotPasswordSchema(t: ValidationTranslator) {
  return z
    .object({
      email: z.string().trim().email(t("emailInvalid")),
      otp: z.string().trim().regex(OTP_PATTERN, t("otpInvalid")),
      ...newPasswordFields(t),
    })
    .refine((v) => v.password === v.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    })
}
export type ForgotPasswordInput = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>

/** Chỉ kiểm tra email trước khi gửi mã OTP. */
export function createEmailSchema(t: ValidationTranslator) {
  return z.string().trim().email(t("emailInvalid"))
}
