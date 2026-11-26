"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
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
import { Link, useRouter } from "@/i18n/navigation"
import { signUp } from "@/lib/auth-client"
import { routes } from "@/lib/routes"
import { createRegisterSchema, type RegisterInput } from "@/lib/validation/auth"

export function RegisterForm() {
  const t = useTranslations("auth")
  const tv = useTranslations("validation")
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const schema = useMemo(() => createRegisterSchema((key) => tv(key)), [tv])

  const form = useForm<RegisterInput>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", phone: "", password: "", confirmPassword: "" },
  })

  async function onSubmit(values: RegisterInput) {
    setSubmitting(true)
    // Better Auth bắt buộc `name`. Thiết kế đăng ký chưa có ô họ tên và hợp
    // đồng đăng ký (email, số điện thoại, OTP xác nhận — C-001/C-002) chưa có
    // trong TypeSpec, nên tạm dùng phần trước "@" và chưa gửi số điện thoại.
    const { error } = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.email.split("@")[0] ?? values.email,
    })
    setSubmitting(false)

    if (error) {
      toast.error(error.message ?? t("signUpFailed"))
      return
    }
    toast.success(t("accountCreated"))
    router.replace(routes.home)
    router.refresh()
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t("phone")}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder={t("phonePlaceholder")}
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>
                {t("password")}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  placeholder={t("createPasswordPlaceholder")}
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
                  placeholder={t("confirmPasswordPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={submitting}
          className={AUTH_SUBMIT_CLASS}
        >
          {submitting ? t("signingUp") : t("signUp")}
        </Button>
      </form>

      <p className="text-center text-sm">
        {t("haveAccount")}{" "}
        <Link
          href={routes.login}
          className="font-semibold text-brand hover:underline"
        >
          {t("signInLink")}
        </Link>
      </p>
    </Form>
  )
}
