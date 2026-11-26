import Image from "next/image"
import { useTranslations } from "next-intl"

import { HERO_BANNER } from "@/lib/catalog/mock-data"

export function HeroBanner() {
  const t = useTranslations("home")

  return (
    <section className="relative aspect-[1440/408] max-h-[408px] min-h-[200px] w-full overflow-hidden bg-muted">
      <Image
        src={HERO_BANNER.image}
        alt={t("heroAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </section>
  )
}
