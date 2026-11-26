"use client"

import { useTranslations } from "next-intl"
import { useState, type ComponentProps } from "react"
import { Input } from "@shared/ui/components/input"
import { cn } from "@shared/ui/lib/utils"

import { AUTH_INPUT_CLASS } from "@/components/auth/auth-shell"

/** Ô mật khẩu có nút "Hiện/Ẩn" bên trong theo thiết kế. */
export function PasswordInput({
  className,
  ...props
}: ComponentProps<"input">) {
  const t = useTranslations("auth")
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(AUTH_INPUT_CLASS, "pr-16", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t("hidePasswordLabel") : t("showPasswordLabel")}
        aria-pressed={visible}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded px-2 py-1 text-[13px] font-semibold text-brand hover:bg-accent"
      >
        {visible ? t("hidePassword") : t("showPassword")}
      </button>
    </div>
  )
}
