"use client"

import { handlePageView } from "@/services/sessionService"
import { useEffect, useRef } from "react"

interface UsePageViewOptions {
  pageId: string
  locale?: string
  expirationMs?: number
  enabled?: boolean
  onNewView?: (pageKey: string) => void
}

/**
 * Hook to track page views with session-based deduplication
 *
 * Usage:
 * ```tsx
 * // In a page or article component
 * usePageView({
 *   pageId: "article-123",
 *   locale: "vi",
 *   onNewView: (pageKey) => {
 *     // Optional: additional logic when new view is recorded
 *   }
 * })
 * ```
 */
export const usePageView = ({ pageId, locale, expirationMs, enabled = true, onNewView }: UsePageViewOptions): void => {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only track once per mount and when enabled
    if (!enabled || hasTracked.current || !pageId) return

    hasTracked.current = true

    handlePageView(pageId, {
      locale,
      expirationMs,
      onNewView,
    })
  }, [pageId, locale, expirationMs, enabled, onNewView])
}

export default usePageView
