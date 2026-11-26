import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import { beforeEach, describe, expect, it } from "vitest"

import { ChatWidget } from "@/components/layout/chat-widget"
import { useUIStore } from "@/lib/stores/ui-store"
import messages from "@/messages/vi.json"

import { render, screen } from "../test-utils"

function Intl({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="vi" messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

describe("ChatWidget", () => {
  beforeEach(() => {
    useUIStore.setState({ chatOpen: false })
  })

  it("mở hộp thư khi bấm nút Chat và đóng bằng phím Escape", async () => {
    const user = userEvent.setup()
    render(<ChatWidget />, { wrapper: Intl })

    const toggle = screen.getByRole("button", {
      name: /Mở hộp chat, 1 tin nhắn/,
    })
    expect(toggle).toHaveAttribute("aria-expanded", "false")

    await user.click(toggle)
    expect(screen.getByRole("region", { name: "Chat" })).toBeInTheDocument()
    expect(screen.getByText("Tin nhắn Anhà")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    expect(
      screen.queryByRole("region", { name: "Chat" })
    ).not.toBeInTheDocument()
  })

  it("lọc cuộc trò chuyện theo tên không dấu và báo khi không có kết quả", async () => {
    const user = userEvent.setup()
    useUIStore.setState({ chatOpen: true })
    render(<ChatWidget />, { wrapper: Intl })

    const search = screen.getByLabelText("Tìm cuộc trò chuyện")
    await user.type(search, "nha go")
    expect(screen.getByRole("button", { name: /Nhà Gỗ/ })).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: /Vân Home/ })
    ).not.toBeInTheDocument()

    await user.clear(search)
    await user.type(search, "khong co")
    expect(
      screen.getByText("Không tìm thấy cuộc trò chuyện phù hợp.")
    ).toBeInTheDocument()
  })

  it("đánh dấu cuộc trò chuyện được chọn", async () => {
    const user = userEvent.setup()
    useUIStore.setState({ chatOpen: true })
    render(<ChatWidget />, { wrapper: Intl })

    const item = screen.getByRole("button", { name: /Nhà Gỗ/ })
    await user.click(item)
    expect(item).toHaveAttribute("aria-pressed", "true")
  })
})
