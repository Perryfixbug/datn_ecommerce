"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useId, type FormEvent } from "react"
import { cn } from "@shared/ui/lib/utils"

import { useRouter } from "@/i18n/navigation"
import { routes } from "@/lib/routes"

/**
 * Ô tìm kiếm ở đầu trang. Điều hướng qua router của next-intl để giữ tiền tố
 * ngôn ngữ (`/en/search`) thay vì submit form HTML thô.
 */
export function SearchForm({ className }: { className?: string }) {
  const t = useTranslations("header")
  const router = useRouter()
  const inputId = useId()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get("q")
    const keyword = typeof query === "string" ? query.trim() : ""
    router.push({
      pathname: routes.search,
      query: keyword ? { q: keyword } : {},
    })
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      <label htmlFor={inputId} className="sr-only">
        {t("searchLabel")}
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted-foreground"
      />
      <input
        id={inputId}
        type="search"
        name="q"
        enterKeyHint="search"
        placeholder={t("searchPlaceholder")}
        className="h-11 w-full rounded-lg bg-white pr-4 pl-11 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-card"
      />
    </form>
  )
}
