"use client"

import { Bot, Mail, MessageSquare, Search, Store, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useId, useMemo, useState } from "react"
import { cn } from "@shared/ui/lib/utils"

import {
  CHAT_CONVERSATIONS,
  HEADER_BADGES,
  type ChatConversation,
} from "@/lib/catalog/mock-data"
import { filterConversations } from "@/lib/chat"
import { useUIStore } from "@/lib/stores/ui-store"

function ConversationAvatar({ kind }: { kind: ChatConversation["kind"] }) {
  const Icon = kind === "assistant" ? Bot : Store
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"
    >
      <Icon className="size-[18px]" />
    </span>
  )
}

/**
 * Nút "Chat" nổi và hộp thư (thiết kế "Chat nổi · Người Mua"). Nội dung từng
 * cuộc trò chuyện chưa có API nên khung bên phải chỉ hiển thị trạng thái chọn.
 */
export function ChatWidget() {
  const t = useTranslations("chat")
  const open = useUIStore((s) => s.chatOpen)
  const setOpen = useUIStore((s) => s.setChatOpen)
  const toggle = useUIStore((s) => s.toggleChat)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const panelId = useId()
  const searchId = useId()

  const conversations = useMemo(
    () => filterConversations(CHAT_CONVERSATIONS, query),
    [query]
  )
  const selected = CHAT_CONVERSATIONS.find((c) => c.id === selectedId) ?? null
  const unread = HEADER_BADGES.unreadChats

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section
          id={panelId}
          aria-label={t("title")}
          className="flex h-[min(728px,calc(100dvh-7rem))] w-[min(800px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
        >
          <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-border px-4">
            <h2 className="text-lg font-semibold text-highlight">
              {t("title")}
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("closeLabel")}
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-accent"
            >
              <X aria-hidden className="size-4" />
            </button>
          </header>

          <div className="flex min-h-0 flex-1">
            <div className="flex w-full flex-col border-r border-border sm:w-[280px] sm:shrink-0">
              <div className="flex items-center gap-2 p-3">
                <div className="relative min-w-0 flex-1">
                  <label htmlFor={searchId} className="sr-only">
                    {t("searchLabel")}
                  </label>
                  <Search
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id={searchId}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("searchPlaceholder")}
                    className="h-9 w-full rounded-md border border-border bg-white pr-2 pl-8 text-[13px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-card"
                  />
                </div>
                <span className="text-[13px] text-muted-foreground">
                  {t("filterAll")}
                </span>
              </div>

              <ul className="min-h-0 flex-1 overflow-y-auto px-1.5 pb-2">
                {conversations.length === 0 ? (
                  <li className="px-3 py-6 text-center text-[13px] text-muted-foreground">
                    {t("noResults")}
                  </li>
                ) : (
                  conversations.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(c.id)}
                        aria-pressed={c.id === selectedId}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition-colors hover:bg-accent/60",
                          c.id === selectedId && "bg-accent"
                        )}
                      >
                        <ConversationAvatar kind={c.kind} />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            {c.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {c.preview}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="hidden flex-1 flex-col items-center justify-center gap-2 bg-card p-6 text-center sm:flex">
              <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                <Mail aria-hidden className="size-5" />
              </span>
              <p className="text-base font-semibold">
                {selected ? selected.name : t("emptyTitle")}
              </p>
              <p className="max-w-xs text-[13px] text-muted-foreground">
                {selected ? t("notConnected") : t("emptyHint")}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t("closeLabel") : t("openLabel", { count: unread })}
        className="relative inline-flex h-[60px] items-center gap-3 rounded-lg bg-highlight px-6 text-xl font-semibold text-highlight-foreground shadow-lg transition-colors hover:bg-highlight/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <MessageSquare aria-hidden className="size-6 fill-current" />
        {t("toggle")}
        {unread > 0 && !open ? (
          <span
            aria-hidden
            className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full border-2 border-white bg-highlight text-xs font-bold"
          >
            {unread}
          </span>
        ) : null}
      </button>
    </div>
  )
}
