"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { Button } from "@shared/ui/components/button"

/** Ranh giới lỗi của segment, bắt lỗi render/dữ liệu bên dưới layout locale. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("errors")

  useEffect(() => {
    // Gửi lên hệ thống giám sát tại đây; digest dùng để đối chiếu log máy chủ.
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">{t("errorTitle")}</h1>
      <p className="max-w-md text-sm text-muted-foreground">{t("errorHint")}</p>
      {error.digest ? (
        <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
          {error.digest}
        </code>
      ) : null}
      <Button onClick={reset} className="h-11 rounded-full px-6 font-semibold">
        {t("retry")}
      </Button>
    </div>
  )
}
