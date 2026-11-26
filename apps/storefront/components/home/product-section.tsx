import { useTranslations } from "next-intl"

import { ProductCard } from "@/components/product/product-card"
import { Link } from "@/i18n/navigation"
import type { ProductSummary } from "@/lib/catalog/mock-data"
import { routes } from "@/lib/routes"

/** Lưới sản phẩm 4 cột kèm nút "Xem thêm" (Figma "Gợi ý sản phẩm"). */
export function ProductSection({
  title,
  products,
  priorityCount = 0,
}: {
  title: string
  products: ProductSummary[]
  priorityCount?: number
}) {
  const t = useTranslations("home")

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {products.map((product, index) => (
          <li key={product.slug}>
            <ProductCard product={product} priority={index < priorityCount} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Link
          href={routes.allProducts}
          className="inline-flex h-11 min-w-44 items-center justify-center rounded-md border border-brand px-6 text-sm font-semibold text-brand transition-colors hover:bg-accent"
        >
          {t("seeMore")}
        </Link>
      </div>
    </section>
  )
}
