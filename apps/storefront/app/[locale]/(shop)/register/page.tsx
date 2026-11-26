import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  return { title: t("register") }
}

export default async function RegisterPage() {
  const t = await getTranslations("auth")

  return (
    <AuthShell title={t("registerTitle")}>
      <RegisterForm />
    </AuthShell>
  )
}
