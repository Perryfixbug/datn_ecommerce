"use client"

import { User } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTransition } from "react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/components/dropdown-menu"

import { Link, useRouter } from "@/i18n/navigation"
import { signOut } from "@/lib/auth-client"
import { routes } from "@/lib/routes"

const ITEM_CLASS =
  "rounded-md px-3 py-2 text-sm text-foreground focus:bg-accent focus:text-accent-foreground"

const ACCOUNT_LINKS = [
  { key: "profile", href: routes.account.profile },
  { key: "addresses", href: routes.account.addresses },
  { key: "wallet", href: routes.account.wallet },
  { key: "orders", href: routes.account.orders },
  { key: "changePassword", href: routes.account.password },
] as const

export function AccountMenu() {
  const t = useTranslations("header")
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      const { error } = await signOut()
      if (error) {
        toast.error(error.message ?? t("accountMenu.signOutFailed"))
        return
      }
      router.replace(routes.home)
      router.refresh()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("account")}
        className="grid size-9 place-items-center rounded-full transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:bg-accent"
      >
        <User aria-hidden className="size-[22px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-48 rounded-lg border-border bg-popover p-1.5 shadow-lg"
      >
        {ACCOUNT_LINKS.map((item) => (
          <DropdownMenuItem key={item.key} asChild className={ITEM_CLASS}>
            <Link href={item.href}>{t(`accountMenu.${item.key}`)}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="my-1.5 bg-border" />
        <DropdownMenuItem
          disabled={pending}
          onSelect={(event) => {
            event.preventDefault()
            handleSignOut()
          }}
          className={`${ITEM_CLASS} font-semibold text-brand`}
        >
          {pending ? t("accountMenu.signingOut") : t("accountMenu.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
