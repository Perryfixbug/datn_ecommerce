import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import { describe, expect, it } from "vitest"

import { PasswordInput } from "@/components/auth/password-input"
import messages from "@/messages/vi.json"

import { render, screen } from "../test-utils"

describe("PasswordInput", () => {
  it("chuyển giữa ẩn và hiện mật khẩu", async () => {
    const user = userEvent.setup()
    render(
      <NextIntlClientProvider locale="vi" messages={messages}>
        <label htmlFor="pw">Mật khẩu</label>
        <PasswordInput id="pw" />
      </NextIntlClientProvider>
    )

    const input = screen.getByLabelText("Mật khẩu")
    expect(input).toHaveAttribute("type", "password")

    await user.click(screen.getByRole("button", { name: "Hiện mật khẩu" }))
    expect(input).toHaveAttribute("type", "text")

    await user.click(screen.getByRole("button", { name: "Ẩn mật khẩu" }))
    expect(input).toHaveAttribute("type", "password")
  })
})
