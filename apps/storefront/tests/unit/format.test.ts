import { describe, expect, it } from "vitest"

import { filledStars, formatRating, formatVnd, MAX_STARS } from "@/lib/format"

describe("formatVnd", () => {
  it("nhóm hàng nghìn bằng dấu chấm và thêm ký hiệu ₫", () => {
    expect(formatVnd(12_490_000)).toBe("12.490.000 ₫")
  })

  it("định dạng giá dưới một triệu và giá 0", () => {
    expect(formatVnd(990_000)).toBe("990.000 ₫")
    expect(formatVnd(0)).toBe("0 ₫")
  })

  it("làm tròn phần lẻ vì VND không có xu", () => {
    expect(formatVnd(1_499.6)).toBe("1.500 ₫")
  })

  it("từ chối giá trị không hữu hạn thay vì hiển thị NaN", () => {
    expect(() => formatVnd(Number.NaN)).toThrow(RangeError)
    expect(() => formatVnd(Number.POSITIVE_INFINITY)).toThrow(RangeError)
  })
})

describe("formatRating", () => {
  it("dùng dấu phẩy thập phân cho tiếng Việt", () => {
    expect(formatRating(4.7, "vi")).toBe("4,7")
  })

  it("dùng dấu chấm cho tiếng Anh và luôn giữ một chữ số thập phân", () => {
    expect(formatRating(5, "en")).toBe("5.0")
  })
})

describe("filledStars", () => {
  it.each([
    [4.7, 4],
    [4.75, 5],
    [4.8, 5],
    [4.9, 5],
    [5, 5],
    [3.2, 3],
    [0, 0],
  ])("đánh giá %s hiển thị %s sao", (rating, stars) => {
    expect(filledStars(rating)).toBe(stars)
  })

  it("kẹp giá trị ngoài thang 0–5", () => {
    expect(filledStars(7)).toBe(MAX_STARS)
    expect(filledStars(-1)).toBe(0)
  })

  it("trả 0 sao với giá trị không hợp lệ", () => {
    expect(filledStars(Number.NaN)).toBe(0)
  })
})
