"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useRef, useState } from "react"

import { Link } from "@/i18n/navigation"
import type { RoomCategory } from "@/lib/catalog/mock-data"
import { routes } from "@/lib/routes"

/** Dải cuộn ngang "Khám phá danh mục sản phẩm" với nút chuyển trước/sau. */
export function RoomStrip({ rooms }: { rooms: RoomCategory[] }) {
  const t = useTranslations("home")
  const listRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = listRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = listRef.current
    if (!el) return
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  function scrollByPage(direction: 1 | -1) {
    const el = listRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" })
  }

  const arrowClass =
    "absolute top-[90px] z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white shadow-md transition-opacity hover:bg-accent md:grid dark:bg-card"

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold md:text-3xl">{t("exploreRooms")}</h2>
      <div className="relative">
        {canPrev ? (
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label={t("previousRooms")}
            className={`${arrowClass} -left-5`}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
        ) : null}
        <ul
          ref={listRef}
          // Inline vì quy tắc `* { scrollbar-width: thin }` của CSS dùng chung
          // nằm ngoài @layer và thắng mọi utility class.
          style={{ scrollbarWidth: "none" }}
          className="flex snap-x gap-6 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        >
          {rooms.map((room) => (
            <li key={room.slug} className="shrink-0 snap-start">
              <Link
                href={routes.room(room.slug)}
                className="group flex w-[140px] flex-col items-center gap-3 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:w-[204px]"
              >
                <span className="relative size-[140px] overflow-hidden rounded-full bg-muted md:size-[180px]">
                  <Image
                    src={room.image}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="text-sm font-semibold">{room.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Mép mờ báo hiệu còn danh mục phía sau (Figma "Vị trí=Đầu dải"). */}
        {canNext ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
          />
        ) : null}
        {canPrev ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
          />
        ) : null}
        {canNext ? (
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label={t("nextRooms")}
            className={`${arrowClass} -right-5`}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        ) : null}
      </div>
    </section>
  )
}
