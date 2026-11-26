import { create } from "zustand"

// Trạng thái giao diện cục bộ của storefront (không phải dữ liệu máy chủ).
interface UIState {
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
  toggleChat: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  chatOpen: false,
  setChatOpen: (chatOpen) => set({ chatOpen }),
  toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen })),
}))
