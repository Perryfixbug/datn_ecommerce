"use client"

import type { ReactNode } from "react"
import { Toaster } from "@shared/ui/components/sonner"
import { TooltipProvider } from "@shared/ui/components/tooltip"

import { QueryProvider } from "@/components/query-provider"
import { StoreHydration } from "@/components/store-hydration"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider>
          <StoreHydration />
          {children}
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
