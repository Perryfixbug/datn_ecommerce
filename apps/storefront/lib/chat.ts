import type { ChatConversation } from "@/lib/catalog/mock-data"

/** Bỏ dấu tiếng Việt và chữ hoa để tìm "nha go" vẫn khớp "Nhà Gỗ". */
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
}

/** Lọc danh sách trò chuyện theo tên; chuỗi rỗng trả về toàn bộ. */
export function filterConversations(
  conversations: readonly ChatConversation[],
  query: string
): ChatConversation[] {
  const keyword = normalizeSearchText(query)
  if (!keyword) return [...conversations]
  return conversations.filter((c) =>
    normalizeSearchText(c.name).includes(keyword)
  )
}
