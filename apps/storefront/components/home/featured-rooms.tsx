import {
  Award,
  BadgeCheck,
  Headset,
  Truck,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { cn } from "@shared/ui/lib/utils"

import { Link } from "@/i18n/navigation"
import { FEATURED_ROOMS, type FeaturedRoom } from "@/lib/catalog/mock-data"
import { routes } from "@/lib/routes"

const SERVICES: {
  key: "materials" | "warranty" | "delivery" | "support"
  icon: LucideIcon
}[] = [
  { key: "materials", icon: Award },
  { key: "warranty", icon: BadgeCheck },
  { key: "delivery", icon: Truck },
  { key: "support", icon: Headset },
]

function RoomTile({
  room,
  className,
  sizes,
}: {
  room: FeaturedRoom
  className?: string
  sizes: string
}) {
  return (
    <Link
      href={routes.room(room.slug)}
      className={cn(
        "group relative block overflow-hidden rounded-lg bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
    >
      <Image
        src={room.image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
      />
      <span className="font-display absolute bottom-3 left-4 text-[25px] font-semibold text-white">
        {room.name}
      </span>
    </Link>
  )
}

/** Dải dịch vụ và khối "Danh mục nổi bật" (Figma "Trang chủ · Danh mục nổi bật"). */
export function FeaturedRooms() {
  const t = useTranslations("home")
  const [first, second] = FEATURED_ROOMS.small

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-cream absolute inset-y-6 right-0 hidden w-[69%] lg:block"
      />
      <div className="relative mx-auto max-w-[1440px] px-4 py-6 md:px-8 xl:px-24">
        <ul
          aria-label={t("services.label")}
          className="grid grid-cols-2 gap-x-4 gap-y-5 py-4 lg:grid-cols-4"
        >
          {SERVICES.map(({ key, icon: Icon }) => (
            <li key={key} className="flex items-center gap-3">
              <Icon aria-hidden className="size-[30px] shrink-0 stroke-[1.5]" />
              <span className="min-w-0">
                <span className="block text-base font-semibold">
                  {t(`services.${key}Title`)}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {t(`services.${key}Hint`)}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-6 lg:grid-cols-[350px_minmax(0,1fr)]">
          <div className="grid grid-cols-2 gap-6 lg:order-none lg:grid-cols-1">
            {first ? (
              <RoomTile
                room={first}
                className="aspect-[350/220]"
                sizes="(min-width: 1024px) 350px, 50vw"
              />
            ) : null}
            {second ? (
              <RoomTile
                room={second}
                className="aspect-[350/220]"
                sizes="(min-width: 1024px) 350px, 50vw"
              />
            ) : null}
          </div>
          <div className="order-first flex flex-col gap-3 lg:order-none">
            <h2 className="font-display text-3xl font-semibold md:text-[42px] md:leading-[1.2]">
              {t("featuredRooms")}
            </h2>
            <RoomTile
              room={FEATURED_ROOMS.large}
              className="aspect-[874/390] flex-1"
              sizes="(min-width: 1024px) 874px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
