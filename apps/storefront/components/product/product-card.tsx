import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import { ProductQuickActions } from "@/components/product/product-quick-actions"
import { Link } from "@/i18n/navigation"
import type { ProductSummary } from "@/lib/catalog/mock-data"
import { filledStars, formatRating, formatVnd, MAX_STARS } from "@/lib/format"
import { routes } from "@/lib/routes"

function RatingStars({ rating }: { rating: number }) {
  const filled = filledStars(rating)
  return (
    <span aria-hidden className="text-rating tracking-[0.12em]">
      {"★".repeat(filled)}
      <span className="text-rating/40">{"★".repeat(MAX_STARS - filled)}</span>
    </span>
  )
}

/** Thẻ sản phẩm dùng ở trang chủ, tìm kiếm và gian hàng (Figma "Thẻ sản phẩm"). */
export function ProductCard({
  product,
  priority = false,
}: {
  product: ProductSummary
  priority?: boolean
}) {
  const t = useTranslations("product")
  const locale = useLocale()
  const rating = formatRating(product.rating, locale)

  return (
    <article className="group relative overflow-hidden rounded-lg bg-card">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 294px, (min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.isNew ? (
          <span
            aria-hidden
            className="absolute top-0 right-0 size-[72px] bg-brand [clip-path:polygon(0_0,100%_0,100%_100%)]"
          >
            <span className="absolute top-[13px] right-[2px] rotate-45 text-[13px] font-semibold text-brand-foreground">
              {t("new")}
            </span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 px-4 pt-3.5 pb-4">
        <h3 className="line-clamp-1 text-[17px] font-semibold">
          <Link
            href={routes.product(product.slug)}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.name}
            {product.isNew ? (
              <span className="sr-only"> ({t("new")})</span>
            ) : null}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="text-[15px] font-semibold text-brand">
          {formatVnd(product.price)}
        </p>
        <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <RatingStars rating={product.rating} />
          <span className="sr-only">{t("ratingLabel", { rating })}</span>
          <span>{t("reviews", { rating, count: product.reviewCount })}</span>
        </p>
        <p className="text-[13px] text-muted-foreground">
          {t("sold", { count: product.soldCount })}
        </p>
      </div>

      {/* Trạng thái "Đã chọn" khi rê chuột hoặc focus bằng bàn phím: lớp phủ
          tối toàn thẻ và hai nút thao tác ở giữa vùng ảnh. Lớp phủ không chặn
          click nên bấm ngoài nút vẫn mở trang sản phẩm. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[#171713]/60 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
      />
      <div className="pointer-events-none invisible absolute inset-x-0 top-0 z-20 flex aspect-square items-center justify-center opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 [&>*]:pointer-events-auto">
        <ProductQuickActions slug={product.slug} name={product.name} />
      </div>
    </article>
  )
}
