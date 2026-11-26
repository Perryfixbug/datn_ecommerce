"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@shared/ui/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/components/form"
import { Input } from "@shared/ui/components/input"

import {
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_SUBMIT_CLASS,
} from "@/components/auth/auth-shell"
import { PasswordInput } from "@/components/auth/password-input"
import { Link } from "@/i18n/navigation"
import { routes } from "@/lib/routes"
import {
  createEmailSchema,
  createForgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validation/auth"

/**
 * Khôi phục mật khẩu bằng OTP qua email (C-004). Backend chưa có luồng gửi và
 * xác thực OTP nên form chỉ kiểm tra dữ liệu rồi báo chưa kết nối, không giả
 * lập gửi mã hay đặt lại mật khẩu thành công.
 */
export function ForgotPasswordForm() {
  const t = useTranslations("auth")
  const tv = useTranslations("validation")
  const schema = useMemo(
    () => createForgotPasswordSchema((key) => tv(key)),
    [tv]
  )
  const emailSchema = useMemo(() => createEmailSchema((key) => tv(key)), [tv])

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", otp: "", password: "", confirmPassword: "" },
  })

  function onSendOtp() {
    const result = emailSchema.safeParse(form.getValues("email"))
    if (!result.success) {
      form.setError("email", { message: result.error.issues[0]?.message })
      return
    }
    form.clearErrors("email")
    toast.info(t("notConnected"))
  }

  function onSubmit() {
    toast.info(t("notConnected"))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  className={AUTH_INPUT_CLASS}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t("otp")}</FormLabel>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder={t("otpPlaceholder")}
                    className={AUTH_INPUT_CLASS}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={onSendOtp}
                  className="shrink-0 rounded px-1 py-2 text-[13px] font-semibold whitespace-nowrap text-brand hover:underline"
                >
                  {t("sendOtp")}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>
                {t("newPassword")}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  placeholder={t("newPasswordPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>
                {t("confirmPassword")}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  placeholder={t("confirmNewPasswordPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={AUTH_SUBMIT_CLASS}>
          {t("resetPassword")}
        </Button>
      </form>

      <Link
        href={routes.login}
        className="mx-auto inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        <ChevronLeft aria-hidden className="size-4" />
        {t("backToLogin")}
      </Link>
    </Form>
  )
}
