"use client"

import { Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { useId, useState, type FormEvent } from "react"
import { toast } from "sonner"
import { cn } from "@shared/ui/lib/utils"
import { z } from "zod"

const emailSchema = z.string().trim().email()

/**
 * Ô "Bạn cần hỗ trợ?" ở chân trang. Chưa có endpoint tiếp nhận nên chỉ kiểm
 * tra định dạng và báo rõ chức năng chưa kết nối, không giả lập gửi thành công.
 */
export function SupportEmailForm({ className }: { className?: string }) {
  const t = useTranslations("footer")
  const inputId = useId()
  const errorId = useId()
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get("email")
    if (!emailSchema.safeParse(value).success) {
      setError(t("newsletterInvalid"))
      return
    }
    setError(null)
    toast.info(t("newsletterUnavailable"))
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("max-w-[340px]", className)}
    >
      <div className="flex">
        <label htmlFor={inputId} className="sr-only">
          {t("emailLabel")}
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={() => error && setError(null)}
          className="h-11 min-w-0 flex-1 rounded-l-md bg-muted px-3.5 text-[13px] outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/30"
        />
        <button
          type="submit"
          aria-label={t("send")}
          className="grid size-11 shrink-0 place-items-center rounded-r-md bg-primary text-white transition-colors hover:bg-primary/85"
        >
          <Send aria-hidden className="size-[18px]" />
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  )
}
