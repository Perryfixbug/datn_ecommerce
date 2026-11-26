"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
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
import { signIn } from "@/lib/auth-client"
import { getSafeNext } from "@/lib/locale-path"
import { routes } from "@/lib/routes"
import { createLoginSchema, type LoginInput } from "@/lib/validation/auth"

export function LoginForm() {
  const t = useTranslations("auth")
  const tv = useTranslations("validation")
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = getSafeNext(searchParams.get("next"))
  const [submitting, setSubmitting] = useState(false)
  const schema = useMemo(() => createLoginSchema((key) => tv(key)), [tv])

  const form = useForm<LoginInput>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginInput) {
    setSubmitting(true)
    const { error } = await signIn.email(values)
    setSubmitting(false)

    if (error) {
      toast.error(t("signInFailed"))
      return
    }
    router.replace(next)
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>
                {t("password")}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="current-password"
                  placeholder={t("passwordPlaceholder")}
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
          {submitting ? t("signingIn") : t("signIn")}
        </Button>
      </form>

      <div className="space-y-3 text-center text-sm">
        <Link
          href={routes.forgotPassword}
          className="inline-block font-semibold text-brand hover:underline"
        >
          {t("forgotPassword")}
        </Link>
        <p>
          {t("noAccount")}{" "}
          <Link
            href={routes.register}
            className="font-semibold text-brand hover:underline"
          >
            {t("signUpLink")}
          </Link>
        </p>
      </div>
    </Form>
  )
}
