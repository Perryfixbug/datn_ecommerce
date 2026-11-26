"use client"

import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shared/ui/components/sheet"

import { Link } from "@/i18n/navigation"
import { HEADER_ROOMS } from "@/lib/catalog/mock-data"
import { routes } from "@/lib/routes"

const LINK_CLASS =
  "block rounded-md px-3 py-2.5 text-[15px] transition-colors hover:bg-accent hover:text-accent-foreground"

/** Điều hướng chính cho màn hình nhỏ, nơi thanh menu ngang bị ẩn. */
export function MobileNav() {
  const t = useTranslations("header")

  return (
    <Sheet>
      <SheetTrigger
        aria-label={t("mainNav")}
        className="-ml-1 grid size-9 place-items-center rounded-md hover:bg-accent lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-background">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Anhà</SheetTitle>
        </SheetHeader>
        <nav aria-label={t("mainNav")} className="flex flex-col gap-1 px-4">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t("categories")}
          </p>
          <SheetClose asChild>
            <Link
              href={routes.allProducts}
              className={`${LINK_CLASS} font-semibold`}
            >
              {t("allProducts")}
            </Link>
          </SheetClose>
          {HEADER_ROOMS.map((room) => (
            <SheetClose key={room.slug} asChild>
              <Link href={routes.room(room.slug)} className={LINK_CLASS}>
                {room.name}
              </Link>
            </SheetClose>
          ))}
          <div className="my-2 h-px bg-border" />
          <SheetClose asChild>
            <Link href={routes.livestream} className={LINK_CLASS}>
              {t("livestream")}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={routes.sellerChannel} className={LINK_CLASS}>
              {t("sellerChannel")}
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
