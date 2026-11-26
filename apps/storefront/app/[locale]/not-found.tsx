import { useTranslations } from "next-intl"
import { Button } from "@shared/ui/components/button"

import { Link } from "@/i18n/navigation"
import { routes } from "@/lib/routes"

/** Trang 404 theo ngôn ngữ, hiển thị bên trong layout locale. */
export default function NotFound() {
  const t = useTranslations("errors")

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="font-display text-6xl font-semibold text-brand">404</p>
      <h1 className="text-lg font-semibold">{t("notFoundTitle")}</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {t("notFoundHint")}
      </p>
      <Button asChild className="h-11 rounded-full px-6 font-semibold">
        <Link href={routes.home}>{t("backHome")}</Link>
      </Button>
    </div>
  )
}
