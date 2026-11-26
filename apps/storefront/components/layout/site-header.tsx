import { Bell, Lock, ShoppingBasket } from "lucide-react"
import { useTranslations } from "next-intl"

import { AccountMenu } from "@/components/layout/account-menu"
import { CategoryMenu } from "@/components/layout/category-menu"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SearchForm } from "@/components/layout/search-form"
import { Link } from "@/i18n/navigation"
import { HEADER_BADGES } from "@/lib/catalog/mock-data"
import { routes } from "@/lib/routes"

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span
      aria-hidden
      className="absolute -top-1 -right-1 grid min-w-[17px] place-items-center rounded-full bg-highlight-muted px-1 text-[10px] leading-[17px] font-bold text-destructive"
    >
      {count > 99 ? "99+" : count}
    </span>
  )
}

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  const t = useTranslations("header")

  return (
    <header className="bg-header text-header-foreground">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-4 px-4 md:px-8 lg:h-28 lg:gap-8 xl:px-24">
        <MobileNav />

        <Link
          href={routes.home}
          aria-label={t("home")}
          className="shrink-0 text-[28px] leading-none font-bold tracking-tight text-foreground"
        >
          Anhà
        </Link>

        <nav
          aria-label={t("mainNav")}
          className="hidden items-center gap-6 text-sm lg:flex"
        >
          <CategoryMenu />
          <Link
            href={routes.livestream}
            className="whitespace-nowrap transition-colors hover:text-brand"
          >
            {t("livestream")}
          </Link>
          <Link
            href={routes.sellerChannel}
            className="whitespace-nowrap transition-colors hover:text-brand"
          >
            {t("sellerChannel")}
          </Link>
        </nav>

        <SearchForm className="hidden min-w-0 flex-1 md:block lg:max-w-[517px]" />

        <div className="ml-auto flex items-center gap-2">
          {signedIn ? (
            <>
              <Link
                href={routes.cart}
                aria-label={t("cartCount", { count: HEADER_BADGES.cart })}
                className="relative grid size-9 place-items-center rounded-full transition-colors hover:bg-accent"
              >
                <ShoppingBasket aria-hidden className="size-[22px]" />
                <CountBadge count={HEADER_BADGES.cart} />
              </Link>
              <Link
                href={routes.notifications}
                aria-label={t("notificationCount", {
                  count: HEADER_BADGES.notifications,
                })}
                className="relative grid size-9 place-items-center rounded-full transition-colors hover:bg-accent"
              >
                <Bell aria-hidden className="size-[22px]" />
                <CountBadge count={HEADER_BADGES.notifications} />
              </Link>
              <AccountMenu />
            </>
          ) : (
            <Link
              href={routes.login}
              className="inline-flex items-center gap-2.5 text-sm whitespace-nowrap transition-colors hover:text-brand"
            >
              {t("login")}
              <Lock aria-hidden className="size-[18px]" />
            </Link>
          )}
        </div>
      </div>

      <SearchForm className="mx-4 pb-4 md:hidden" />
    </header>
  )
}
