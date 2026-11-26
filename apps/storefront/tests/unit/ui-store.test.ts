import { beforeEach, describe, expect, it } from "vitest"

import { useUIStore } from "@/lib/stores/ui-store"

describe("useUIStore", () => {
  beforeEach(() => {
    // Store là singleton của module — đặt lại trạng thái giữa các test.
    useUIStore.setState({ chatOpen: false })
  })

  it("mặc định đóng hộp chat", () => {
    expect(useUIStore.getState().chatOpen).toBe(false)
  })

  it("toggleChat đảo trạng thái đóng/mở", () => {
    useUIStore.getState().toggleChat()
    expect(useUIStore.getState().chatOpen).toBe(true)
    useUIStore.getState().toggleChat()
    expect(useUIStore.getState().chatOpen).toBe(false)
  })

  it("setChatOpen đặt trạng thái tường minh", () => {
    useUIStore.getState().setChatOpen(true)
    expect(useUIStore.getState().chatOpen).toBe(true)
    useUIStore.getState().setChatOpen(false)
    expect(useUIStore.getState().chatOpen).toBe(false)
  })
})
