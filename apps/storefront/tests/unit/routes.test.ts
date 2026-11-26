import { describe, expect, it } from "vitest"

import { isProtectedPath, routes } from "@/lib/routes"

describe("isProtectedPath", () => {
  it.each([
    "/account",
    "/account/orders",
    "/cart",
    "/checkout",
    "/notifications",
  ])("chặn %s khi chưa đăng nhập", (path) => {
    expect(isProtectedPath(path)).toBe(true)
  })

  it.each([
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/search",
    "/products/ghe-banh-om",
    "/livestream",
  ])("để công khai %s", (path) => {
    expect(isProtectedPath(path)).toBe(false)
  })

  it("không coi tuyến chỉ trùng phần đầu chữ là tuyến được bảo vệ", () => {
    expect(isProtectedPath("/accounting")).toBe(false)
    expect(isProtectedPath("/cartography")).toBe(false)
  })
})

describe("routes", () => {
  it("mã hóa slug khi dựng đường dẫn sản phẩm và danh mục", () => {
    expect(routes.product("ghe banh/om")).toBe("/products/ghe%20banh%2Fom")
    expect(routes.room("phong-khach")).toBe("/search?room=phong-khach")
  })
})
