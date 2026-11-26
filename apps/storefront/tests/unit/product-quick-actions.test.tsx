import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import { Toaster } from "sonner"
import { describe, expect, it } from "vitest"

import { ProductQuickActions } from "@/components/product/product-quick-actions"
import messages from "@/messages/vi.json"

import { render, screen } from "../test-utils"

function renderActions() {
  return render(
    <NextIntlClientProvider locale="vi" messages={messages}>
      <ProductQuickActions slug="ghe-banh-om" name="Ghế bành Ôm" />
      <Toaster />
    </NextIntlClientProvider>
  )
}

describe("ProductQuickActions", () => {
  it("dẫn 'Mua ngay' tới trang sản phẩm và gắn tên sản phẩm vào nhãn", () => {
    renderActions()
    const buyNow = screen.getByRole("link", { name: "Mua ngay Ghế bành Ôm" })
    expect(buyNow).toHaveAttribute("href", "/products/ghe-banh-om")
  })

  it("báo giỏ hàng chưa kết nối thay vì giả lập thêm thành công", async () => {
    const user = userEvent.setup()
    renderActions()

    await user.click(
      screen.getByRole("button", { name: "Thêm Ghế bành Ôm vào giỏ hàng" })
    )
    expect(
      await screen.findByText("Giỏ hàng chưa được kết nối máy chủ.")
    ).toBeInTheDocument()
  })
})
