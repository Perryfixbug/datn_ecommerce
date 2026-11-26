import { getTranslations, setRequestLocale } from "next-intl/server"

import { FeaturedRooms } from "@/components/home/featured-rooms"
import { HeroBanner } from "@/components/home/hero-banner"
import { ProductSection } from "@/components/home/product-section"
import { RoomStrip } from "@/components/home/room-strip"
import {
  BEST_SELLING_PRODUCTS,
  RECOMMENDED_PRODUCTS,
  ROOM_CATEGORIES,
} from "@/lib/catalog/mock-data"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("home")

  return (
    <>
      <HeroBanner />
      <FeaturedRooms />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-4 pt-14 pb-16 md:px-8 xl:px-24">
        <ProductSection
          title={t("bestSellers")}
          products={BEST_SELLING_PRODUCTS}
          priorityCount={4}
        />
        <hr className="border-border" />
        <RoomStrip rooms={ROOM_CATEGORIES} />
        <hr className="border-border" />
        <ProductSection
          title={t("recommended")}
          products={RECOMMENDED_PRODUCTS}
        />
      </div>
    </>
  )
}
