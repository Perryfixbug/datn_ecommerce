import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  return { title: t("login") }
}

export default async function LoginPage() {
  const t = await getTranslations("auth")

  return (
    <AuthShell title={t("loginTitle")}>
      {/* LoginForm đọc `?next=` qua useSearchParams nên cần ranh giới Suspense. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  )
}
