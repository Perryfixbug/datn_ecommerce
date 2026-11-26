"use client"

import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/components/dropdown-menu"

import { Link } from "@/i18n/navigation"
import { HEADER_ROOMS } from "@/lib/catalog/mock-data"
import { routes } from "@/lib/routes"

const ITEM_CLASS =
  "rounded-md px-3.5 py-2.5 text-[15px] text-foreground focus:bg-accent focus:text-accent-foreground"

export function CategoryMenu() {
  const t = useTranslations("header")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-md whitespace-nowrap transition-colors outline-none hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:text-brand">
        {t("categories")}
        <ChevronDown aria-hidden className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={12}
        className="w-64 rounded-lg border-border bg-popover p-2 shadow-lg"
      >
        <DropdownMenuItem asChild className={`${ITEM_CLASS} font-semibold`}>
          <Link href={routes.allProducts}>{t("allProducts")}</Link>
        </DropdownMenuItem>
        {HEADER_ROOMS.map((room) => (
          <DropdownMenuItem key={room.slug} asChild className={ITEM_CLASS}>
            <Link href={routes.room(room.slug)}>{room.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
