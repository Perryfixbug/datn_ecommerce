import type { ReactNode } from "react"

import { ChatWidget } from "@/components/layout/chat-widget"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { getServerSession } from "@/lib/auth-server"

/** Khung chung phía người mua: đầu trang, nội dung, chân trang và chat nổi. */
export default async function ShopLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession()
  const signedIn = Boolean(session)

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader signedIn={signedIn} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {signedIn ? <ChatWidget /> : null}
    </div>
  )
}
