"use client"

import { useRouter, usePathname } from "next/navigation"
import { GlobalOutlined } from "@ant-design/icons"
import styles from "./language-switcher.module.css"

const LOCALES = ["vi", "en"] as const
type Locale = (typeof LOCALES)[number]

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()

  const getLocaleFromPath = (): Locale => {
    const segments = pathname.split("/").filter(Boolean)
    if (LOCALES.includes(segments[0] as Locale)) {
      return segments[0] as Locale
    }
    return "vi"
  }

  const currentLocale = getLocaleFromPath()
  const isEnglish = currentLocale === "en"

  const handleToggle = () => {
    const newLocale: Locale = currentLocale === "vi" ? "en" : "vi"

    const segments = pathname.split("/").filter(Boolean)
    const isLocaleSegment = LOCALES.includes(segments[0] as Locale)

    let newPath: string
    if (isLocaleSegment) {
      segments[0] = newLocale
      newPath = `/${segments.join("/")}`
    } else {
      newPath = `/${newLocale}${pathname}`
    }

    router.push(newPath)
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.toggleBtn} ${isEnglish ? styles.isEnglish : ""}`}
        onClick={handleToggle}
        title={`Switch to ${isEnglish ? "Vietnamese" : "English"}`}
        aria-label={`Chuyển sang ${isEnglish ? "Tiếng Việt" : "English"}`}
      >
        <span className={`${styles.langLabel} ${styles.labelLeft}`}>{isEnglish ? "EN" : ""}</span>
        <span className={styles.iconWrapper}>
          <GlobalOutlined className={styles.globeIcon} />
        </span>
        <span className={`${styles.langLabel} ${styles.labelRight}`}>{!isEnglish ? "VI" : ""}</span>
      </button>
    </div>
  )
}

export default LanguageSwitcher
