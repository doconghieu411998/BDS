"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "./header.module.css"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { MenuOutlined, CloseOutlined, FileTextOutlined } from "@ant-design/icons"
import VerticalCarousel from "./vertical-carousel"
import { withBasePath } from "@/services/commonService"
import { useTranslations } from "next-intl"
import { HEADER_KEYS, HOME_KEYS } from "@/constants/localeKeys"
import LanguageSwitcher from "./language-switcher"
import ConsultationPopup from "./consultation-popup"
import { usePathname } from "next/navigation"

// Logo sources
const LOGO_WHITE = "images/logo-white-text.png"
const LOGO_BLACK = "images/logo-black-text.png"

const Header = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Pages that have white backgrounds and need a dark logo by default
  const isLightPage = useMemo(() => {
    return pathname.includes("/tin-tuc") || 
           pathname.includes("/news") || 
           pathname.includes("/tags-article");
  }, [pathname]);

  // Menu items configuration
  const MENU_ITEMS = useMemo(() => [
    { label: t(HEADER_KEYS.HEADER_MENU_ABOUT), href: "#", scrollTo: "intro-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_OVERVIEW), href: "#", scrollTo: "overview-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_CURATED_ANEMITIES), href: "#", scrollTo: "curated-anemities" },
    { label: t(HEADER_KEYS.HEADER_MENU_ARCHITECTURE), href: "#", scrollTo: "regional-architecture" },
    { label: t(HEADER_KEYS.HEADER_MENU_DESIGN_COLLECTIONS), href: "#", scrollTo: "design-collections" },
    { label: t(HEADER_KEYS.HEADER_MENU_NEWS), href: "#", scrollTo: "news-section" },
  ], [t])

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      setTimeout(() => closeBtnRef.current?.focus(), 100)
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const handleMenuClick = useCallback((item: typeof MENU_ITEMS[0], e: React.MouseEvent) => {
    if (item.scrollTo) {
      e.preventDefault()
      closeMenu()
      setTimeout(() => scrollToSection(item.scrollTo!), 300)
    } else {
      closeMenu()
    }
  }, [scrollToSection, MENU_ITEMS]) // Corrected dependencies

  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Use dark logo if sticky OR if on a light-background page
  const displayLogo = isSticky || isLightPage ? LOGO_BLACK : LOGO_WHITE;

  return (
    <>
      {/* HEADER BAR */}
      <header ref={headerRef} className={`${styles.header} ${isSticky ? styles.sticky : ""} ${isLightPage ? styles.lightPageHeader : ""}`} role="banner">
        <div className={styles.headerWrapper}>
          {/* LEFT: Menu button */}
          <div className={styles.leftSection}>
            <button
              className={styles.menuBtn}
              type="button"
              onClick={openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-menu"
              aria-label={t(HEADER_KEYS.HEADER_ARIA_OPEN_MENU)}
            >
              <MenuOutlined className={styles.menuIcon} />
              <span className={styles.menuTextOverflow}>
                <span className={styles.menuTextPrimary}>{t(HEADER_KEYS.HEADER_MENU_TEXT)}</span>
                <span className={styles.menuTextSecondary}>{t(HEADER_KEYS.HEADER_MENU_TEXT)}</span>
              </span>
            </button>
          </div>

          {/* CENTER: Logo section - Using displayLogo for adaptive visibility */}
          <div className={styles.logoSection}>
            <Link href="/" className={styles.logoLink} aria-label={t(HEADER_KEYS.HEADER_MENU_LOGO_ALT)}>
              <Image
                src={withBasePath(displayLogo)}
                alt="Masteri Logo"
                width={160}
                height={65}
                className={styles.logo}
                priority
              />
            </Link>
          </div>

          {/* RIGHT: Language Switcher and Subscribe button */}
          <div className={styles.rightSection}>
            <button
              className={styles.subscribeBtnMobile}
              onClick={() => setIsPopupOpen(true)}
              aria-label={t(HOME_KEYS.HEADER_BTN_SUBSCRIBE_LABEL)}
            >
              <FileTextOutlined className={styles.subscribeIcon} />
            </button>
            <LanguageSwitcher isSticky={isSticky || isLightPage} />
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU OVERLAY */}
      <div
        ref={menuRef}
        id="fullscreen-menu"
        className={`${styles.fullScreenMenu} ${isMenuOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.menuWrapper}>
          {/* Official Branding Logo for Menu - Restricted to Mobile via CSS */}
          <div className={styles.overlayLogo}>
             <Image 
                src={withBasePath("images/logo-preloading.png")} 
                alt="Masteri Branding" 
                width={180} 
                height={50} 
                className={styles.menuBrandingImg}
                priority
             />
          </div>

          {/* Close button */}
          <div className={styles.closeBtnWrapper}>
            <button
              ref={closeBtnRef}
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label={t(HEADER_KEYS.HEADER_ARIA_CLOSE_MENU)}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <CloseOutlined className={styles.closeIcon} />
            </button>
          </div>

          {/* Menu container */}
          <div className={styles.menuContainer}>
            {/* Navigation links */}
            <nav className={styles.navLinks} aria-label={t(HEADER_KEYS.HEADER_MENU_ARIA_LABEL)}>
              {MENU_ITEMS.map((item, index) => (
                <Link
                  key={item.label}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className={styles.navItem}
                  onClick={(e) => handleMenuClick(item, e)}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.bgDecoration} aria-hidden="true">
              <VerticalCarousel isActive={isMenuOpen} />
            </div>
          </div>
        </div>
      </div>
      <ConsultationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}

export default Header
