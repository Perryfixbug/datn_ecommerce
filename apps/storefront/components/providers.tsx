"use client"

import type { ReactNode } from "react"
import { Toaster } from "@shared/ui/components/sonner"
import { TooltipProvider } from "@shared/ui/components/tooltip"

import { QueryProvider } from "@/components/query-provider"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Thiết kế storefront dùng nền sáng; chế độ tối vẫn bật được bằng phím D.
    <ThemeProvider defaultTheme="light">
      <QueryProvider>
        <TooltipProvider>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
