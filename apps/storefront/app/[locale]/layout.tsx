import type { Metadata } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Geist_Mono, Inter, Lora } from "next/font/google"
import { notFound } from "next/navigation"

import "../storefront.css"
import { cn } from "@shared/ui/lib/utils"

import { Providers } from "@/components/providers"
import { env } from "@/lib/env"
import { routing } from "@/i18n/routing"

const fontSans = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
})
const fontDisplay = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["600"],
  variable: "--font-display",
})
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })

  return {
    metadataBase: env.NEXT_PUBLIC_APP_URL
      ? new URL(env.NEXT_PUBLIC_APP_URL)
      : undefined,
    title: { default: t("title"), template: t("template") },
    description: t("description"),
    applicationName: "Anhà",
    // Storefront chưa mở công khai và đang dùng dữ liệu mẫu — chưa cho index.
    robots: { index: false, follow: false },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable,
        fontDisplay.variable
      )}
    >
      <body>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
