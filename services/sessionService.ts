/**
 * Session Service - Manages session lifecycle and view counting
 * 
 * Key behaviors:
 * - Session Creation: Created on first visit or after expiration
 * - Session Expiration: Fixed TTL (default 30 mins)
 * - Preloader: Shows only when no valid session exists
 * - View Count: Only recorded for valid sessions
 */
import { DEFAULT_VIEW_EXPIRATION_MS, SESSION_KEYS } from "@constants/help"

interface SessionData {
  id: string
  createdAt: number
  expiresAt: number
}

interface PageViewData {
  viewedAt: number
  expiresAt: number
}

interface PageViewsStore {
  [pageKey: string]: PageViewData
}

/**
 * Generate a unique session ID
 */
const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Get current session data if valid
 */
export const getSession = (): SessionData | null => {
  if (typeof window === "undefined") return null

  try {
    const stored = sessionStorage.getItem(SESSION_KEYS.SESSION_ID)
    if (!stored) return null
    return JSON.parse(stored) as SessionData
  } catch {
    return null
  }
}

/**
 * Check if the current session is valid (exists and not expired)
 * If expired, it clears the session data.
 */
export const isSessionValid = (): boolean => {
  const session = getSession()
  if (!session) return false

  if (Date.now() > session.expiresAt) {
    clearSessionData()
    return false
  }

  return true
}

/**
 * Create a new session
 * Call this when Preloader finishes or when a fresh session is needed
 */
export const createSession = (ttl: number = DEFAULT_VIEW_EXPIRATION_MS): SessionData => {
  if (typeof window === "undefined") return { id: "", createdAt: 0, expiresAt: 0 }

  const now = Date.now()
  const session: SessionData = {
    id: generateSessionId(),
    createdAt: now,
    expiresAt: now + ttl, // Absolute expiration time
  }

  sessionStorage.setItem(SESSION_KEYS.SESSION_ID, JSON.stringify(session))
  return session
}

/**
 * Get session ID, creating a new session if one doesn't exist or is expired
 * Note: Should use createSession() explicitly when controlling lifecycle (e.g. from Preloader)
 */
export const getOrInitSessionId = (): string => {
  if (isSessionValid()) {
    return getSession()!.id
  }
  return createSession().id
}


/**
 * Generate a unique key for a page/article
 */
export const generatePageKey = (pageId: string, locale?: string): string => {
  return locale ? `${locale}:${pageId}` : pageId
}

/**
 * Record a page view with expiration
 * 
 * Logic:
 * 1. If no session exists OR session is expired -> Create new session -> Call API -> Record view
 * 2. If session exists and is valid:
 *    - If page view doesn't exist OR page view is expired -> Call API -> Record/Extend view
 *    - If page view exists and is valid -> Skip (already counted)
 */
export const recordPageView = (pageKey: string, expirationMs: number = DEFAULT_VIEW_EXPIRATION_MS): boolean => {
  if (typeof window === "undefined") return false

  const now = Date.now()
  const sessionValid = isSessionValid()
  const store = getPageViewsStore()
  const viewData = store[pageKey]

  // Case 1: No valid session -> Create session and record view
  if (!sessionValid) {
    createSession(expirationMs)

    // Record new view
    store[pageKey] = {
      viewedAt: now,
      expiresAt: now + expirationMs,
    }
    savePageViewsStore(store)

    console.log("[Session] Created new session and recorded view", { pageKey, sessionId: getSession()?.id })
    return true
  }

  // Case 2: Session is valid, check if page view is valid
  // If page view doesn't exist or is expired -> Record/Extend view
  if (!viewData || viewData.expiresAt <= now) {

    // Record new view
    store[pageKey] = {
      viewedAt: now,
      expiresAt: now + expirationMs,
    }
    savePageViewsStore(store)

    console.log("[Session] Extended/Recorded page view", { pageKey, sessionId: getSession()?.id })
    return true
  }

  // Case 3: Both session and page view are valid -> Skip
  console.log("[Session] View already counted", { pageKey, sessionId: getSession()?.id })
  return false
}

/**
 * Hook-friendly function to handle page view logic
 */
export const handlePageView = (
  pageId: string,
  options?: {
    locale?: string
    expirationMs?: number
    onNewView?: (pageKey: string) => void
  },
): boolean => {
  const pageKey = generatePageKey(pageId, options?.locale)
  const isNewView = recordPageView(pageKey, options?.expirationMs)

  if (isNewView && options?.onNewView) {
    options.onNewView(pageKey)
  }

  return isNewView
}

/**
 * Clear all session data
 */
export const clearSessionData = (): void => {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(SESSION_KEYS.PRELOADER_SHOWN)
  sessionStorage.removeItem(SESSION_KEYS.PAGE_VIEWS)
  sessionStorage.removeItem(SESSION_KEYS.SESSION_ID)
}

/**
 * Clean up expired page views
 */
export const cleanupExpiredViews = (): number => {
  const store = getPageViewsStore()
  const now = Date.now()
  let cleanedCount = 0

  Object.keys(store).forEach((key) => {
    if (store[key].expiresAt < now) {
      delete store[key]
      cleanedCount++
    }
  })

  if (cleanedCount > 0) {
    savePageViewsStore(store)
  }

  return cleanedCount
}

const getPageViewsStore = (): PageViewsStore => {
  if (typeof window === "undefined") return {}

  try {
    const stored = sessionStorage.getItem(SESSION_KEYS.PAGE_VIEWS)
    if (!stored) return {}
    return JSON.parse(stored) as PageViewsStore
  } catch {
    return {}
  }
}

const savePageViewsStore = (store: PageViewsStore): void => {
  if (typeof window === "undefined") return
  sessionStorage.setItem(SESSION_KEYS.PAGE_VIEWS, JSON.stringify(store))
}
