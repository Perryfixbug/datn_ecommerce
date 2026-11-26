import type { ReactNode } from "react"

/** Khung căn giữa cho các màn đăng nhập, đăng ký và quên mật khẩu. */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section className="mx-auto flex w-full max-w-[416px] flex-col gap-5 px-4 py-16 md:py-24">
      <div className="space-y-2 text-center">
        <h1 className="text-[28px] leading-tight font-bold md:text-[31px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export const AUTH_INPUT_CLASS =
  "h-11 rounded-lg border-input bg-white px-3.5 text-sm dark:bg-card"
export const AUTH_LABEL_CLASS = "text-[13px] font-semibold"
export const AUTH_SUBMIT_CLASS =
  "h-11 w-full rounded-full text-[15px] font-semibold"
