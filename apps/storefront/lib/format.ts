// Helper định dạng hiển thị dùng chung cho storefront. Hàm thuần, không phụ
// thuộc React để kiểm thử độc lập.

const VND_GROUPING = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
})

/** Giá VND theo thiết kế: `12.490.000 ₫` (nhóm hàng nghìn bằng dấu chấm). */
export function formatVnd(value: number): string {
  if (!Number.isFinite(value)) {
    throw new RangeError("Giá trị tiền phải là số hữu hạn")
  }
  return `${VND_GROUPING.format(Math.round(value))} ₫`
}

/** Điểm đánh giá một chữ số thập phân theo locale: `4,7` (vi) hoặc `4.7` (en). */
export function formatRating(rating: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating)
}

export const MAX_STARS = 5

/**
 * Số sao tô đầy trên thang 5. Thiết kế làm tròn xuống, chỉ lên sao kế tiếp
 * khi còn thiếu dưới 0,25 (4,7 → 4 sao; 4,8 → 5 sao). Giá trị ngoài [0, 5]
 * được kẹp lại.
 */
export function filledStars(rating: number): number {
  if (!Number.isFinite(rating)) return 0
  const clamped = Math.min(Math.max(rating, 0), MAX_STARS)
  return Math.min(Math.floor(clamped + 0.25), MAX_STARS)
}
