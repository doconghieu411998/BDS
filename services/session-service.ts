/**
 * Session Service - Manages view count and preloader logic
 *
 * Key behaviors:
 * - Preloader: Runs on:
 *   1. Fresh visit (first time user enters the site in session)
 *   2. F5 reload
 *   3. Language switch
 * - View Count: Tracks page views per session with expiration
 */
import { DEFAULT_VIEW_EXPIRATION_MS, SESSION_KEYS } from "@constants/help"


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
 * Get or create session ID
 */
export const getSessionId = (): string => {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem(SESSION_KEYS.SESSION_ID)
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem(SESSION_KEYS.SESSION_ID, sessionId)
  }
  return sessionId
}

/**
 * Check if this is a fresh visit (first time entering the site in this browser session)
 * Returns true ONLY for fresh visits, NOT for:
 * - F5 reload
 * - Language switch
 * - Client-side navigation
 */
export const isFreshVisit = (): boolean => {
  if (typeof window === "undefined") return false

  // Check navigation type
  const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
  const navType = navEntries.length > 0 ? navEntries[0].type : "navigate"

  // If reload (F5) -> NOT fresh visit
  if (navType === "reload") {
    return false
  }

  // If back_forward navigation -> NOT fresh visit
  if (navType === "back_forward") {
    return false
  }

  // Check if session already exists (meaning user already visited)
  const hasSession = sessionStorage.getItem(SESSION_KEYS.PRELOADER_SHOWN)

  if (hasSession) {
    // Session exists -> NOT fresh visit
    return false
  }

  // No session + navigate type = FRESH VISIT
  return true
}

/**
 * Mark preloader as shown (call this after preloader animation completes)
 */
export const markPreloaderShown = (): void => {
  if (typeof window === "undefined") return
  sessionStorage.setItem(SESSION_KEYS.PRELOADER_SHOWN, "true")
}

/**
 * Check if preloader should run
 * Returns true for:
 * 1. Fresh visit (first time in session)
 * 2. F5 reload
 * 3. Language switch (triggered via triggerPreloaderForLanguageSwitch)
 */
export const shouldShowPreloader = (): boolean => {
  if (typeof window === "undefined") return false

  const languageSwitchTrigger = sessionStorage.getItem(SESSION_KEYS.LANGUAGE_SWITCH_TRIGGER)
  if (languageSwitchTrigger === "true") {
    // Clear the trigger immediately
    sessionStorage.removeItem(SESSION_KEYS.LANGUAGE_SWITCH_TRIGGER)
    return true
  }

  const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
  const navType = navEntries.length > 0 ? navEntries[0].type : "navigate"

  if (navType === "reload") {
    return true // F5 reload -> show preloader
  }

  // Check if session already exists (meaning user already visited)
  const hasSession = sessionStorage.getItem(SESSION_KEYS.PRELOADER_SHOWN)

  if (hasSession) {
    // Session exists and not reload -> NOT fresh visit
    return false
  }

  // No session + navigate type = FRESH VISIT
  return true
}

/**
 * Generate a unique key for a page/article
 */
export const generatePageKey = (pageId: string, locale?: string): string => {
  return locale ? `${locale}:${pageId}` : pageId
}

/**
 * Check if a page view has been recorded and is still valid
 */
export const hasValidPageView = (pageKey: string): boolean => {
  const store = getPageViewsStore()
  const viewData = store[pageKey]

  if (!viewData) return false

  // Check if expired
  if (Date.now() > viewData.expiresAt) {
    // Clean up expired entry
    delete store[pageKey]
    savePageViewsStore(store)
    return false
  }

  return true
}

/**
 * Record a page view with expiration
 * Returns true if this is a new view (API should be called)
 * Returns false if view already exists (no API call needed)
 */
export const recordPageView = (pageKey: string, expirationMs: number = DEFAULT_VIEW_EXPIRATION_MS): boolean => {
  if (typeof window === "undefined") return false

  // Check if valid view already exists
  if (hasValidPageView(pageKey)) {
    return false // No need to call API
  }

  // Record new view
  const store = getPageViewsStore()
  const now = Date.now()

  store[pageKey] = {
    viewedAt: now,
    expiresAt: now + expirationMs,
  }

  savePageViewsStore(store)

  // Simulate API call
  console.log("Call API Increase View Count", { pageKey, timestamp: now })

  return true // New view recorded, API was called
}

/**
 * Hook-friendly function to handle page view logic
 * Call this in useEffect when a page/article loads
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
 * Clear all session data (useful for testing or logout)
 */
export const clearSessionData = (): void => {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(SESSION_KEYS.PRELOADER_SHOWN)
  sessionStorage.removeItem(SESSION_KEYS.PAGE_VIEWS)
  sessionStorage.removeItem(SESSION_KEYS.SESSION_ID)
  sessionStorage.removeItem(SESSION_KEYS.LANGUAGE_SWITCH_TRIGGER)
}

/**
 * Clean up expired page views (call periodically if needed)
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
