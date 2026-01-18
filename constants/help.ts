export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const DEFAULT_LOCALE = 'vi';
// Default expiration time: 30 minutes
export const DEFAULT_VIEW_EXPIRATION_MS = 30 * 60 * 1000

export const SESSION_KEYS = {
  PRELOADER_SHOWN: "app_preloader",
  PAGE_VIEWS: "app_page_views",
  SESSION_ID: "app_session_id",
} as const