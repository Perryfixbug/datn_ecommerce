import { describe, expect, it } from "vitest"

import type { ChatConversation } from "@/lib/catalog/mock-data"
import { filterConversations, normalizeSearchText } from "@/lib/chat"

const CONVERSATIONS: ChatConversation[] = [
  { id: "a", name: "AI Chatbot", preview: "", kind: "assistant" },
  { id: "b", name: "Nhà Gỗ", preview: "", kind: "shop" },
  { id: "c", name: "Đèn Decor", preview: "", kind: "shop" },
]

describe("normalizeSearchText", () => {
  it("bỏ dấu, chuyển đ/Đ và chữ thường", () => {
    expect(normalizeSearchText("  Nhà Gỗ ĐẸP ")).toBe("nha go dep")
  })
})

describe("filterConversations", () => {
  it("trả toàn bộ danh sách khi từ khóa rỗng", () => {
    expect(filterConversations(CONVERSATIONS, "   ")).toHaveLength(3)
  })

  it("khớp tên không phân biệt dấu và hoa thường", () => {
    expect(
      filterConversations(CONVERSATIONS, "nha go").map((c) => c.id)
    ).toEqual(["b"])
    expect(filterConversations(CONVERSATIONS, "den").map((c) => c.id)).toEqual([
      "c",
    ])
  })

  it("trả mảng rỗng khi không có kết quả", () => {
    expect(filterConversations(CONVERSATIONS, "sofa")).toEqual([])
  })

  it("không sửa mảng đầu vào", () => {
    const result = filterConversations(CONVERSATIONS, "")
    expect(result).not.toBe(CONVERSATIONS)
  })
})
