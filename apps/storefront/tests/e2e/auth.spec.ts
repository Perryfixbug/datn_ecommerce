import { expect, test } from "@playwright/test"

test.describe("storefront công khai và cổng đăng nhập", () => {
  test("trang chủ xem được khi chưa đăng nhập", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveURL(/\/$/)
    // Khách chưa đăng nhập thấy liên kết đăng nhập ở đầu trang.
    await expect(
      page.getByRole("banner").getByRole("link", { name: /Đăng nhập/ })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Sản phẩm bán chạy" })
    ).toBeVisible()
  })

  test("tuyến tài khoản chuyển về /login khi chưa đăng nhập", async ({
    page,
  }) => {
    await page.goto("/account/orders")
    await expect(page).toHaveURL(/\/login\?next=%2Faccount%2Forders$/)
    await expect(page.getByLabel("Email")).toBeVisible()
  })

  test("form đăng nhập báo lỗi khi gửi rỗng", async ({ page }) => {
    await page.goto("/login")
    await page.locator('button[type="submit"]').click()
    // react-hook-form đánh dấu ô lỗi bằng aria-invalid — không phụ thuộc ngôn ngữ.
    await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible()
  })
})
