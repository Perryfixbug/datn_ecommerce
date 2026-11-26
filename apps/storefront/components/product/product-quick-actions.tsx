"use client"

import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Link } from "@/i18n/navigation"
import { routes } from "@/lib/routes"

/**
 * Hai nút hiện khi rê chuột/focus vào thẻ sản phẩm (Figma "Thẻ sản phẩm ·
 * Đã chọn"). "Mua ngay" mở trang sản phẩm để chọn phân loại; giỏ hàng chưa có
 * API nên "Thêm vào giỏ hàng" chỉ báo chưa kết nối, không giả lập thêm thành công.
 */
export function ProductQuickActions({
  slug,
  name,
}: {
  slug: string
  name: string
}) {
  const t = useTranslations("product")

  return (
    <div className="flex w-[73%] flex-col gap-3">
      <Link
        href={routes.product(slug)}
        aria-label={t("buyNowLabel", { name })}
        className="grid h-[43px] place-items-center rounded bg-primary text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-white/70 focus-visible:outline-none"
      >
        {t("buyNow")}
      </Link>
      <button
        type="button"
        onClick={() => toast.info(t("cartUnavailable"))}
        aria-label={t("addToCartLabel", { name })}
        className="h-[43px] rounded bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-white/90 focus-visible:ring-3 focus-visible:ring-white/70 focus-visible:outline-none dark:text-[#247456]"
      >
        {t("addToCart")}
      </button>
    </div>
  )
}
