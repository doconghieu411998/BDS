"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "./header.module.css"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"
import VerticalCarousel from "./vertical-carousel"
import { withBasePath } from "@/services/commonService"
import { useTranslations } from "next-intl"
import { HEADER_KEYS } from "@/constants/localeKeys"

// Logo sources
const LOGO_SRC = "images/logo.png"
const LOGO_WHITE = "https://placehold.co/600x400.png"

const Header = () => {
  const t = useTranslations()
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Menu items configuration
  const MENU_ITEMS = useMemo(() => [
    { label: t(HEADER_KEYS.HEADER_MENU_HOME), href: "/", scrollTo: null },
    { label: t(HEADER_KEYS.HEADER_MENU_ABOUT), href: "#", scrollTo: "overview-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_OVERVIEW), href: "#", scrollTo: "location-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_LOCATION), href: "#", scrollTo: "highlight-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_DESIGN_INSPIRATION), href: "#", scrollTo: "highlight-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_FLOOR_PLAN), href: "#", scrollTo: "floor-detail-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_NEWS), href: "#", scrollTo: "news-section" },
    { label: t(HEADER_KEYS.HEADER_MENU_CONTACT), href: "/lien-he", scrollTo: null },
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
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      // Focus the close button when menu opens (accessibility)
      setTimeout(() => closeBtnRef.current?.focus(), 100)
    } else {
      // Restore scroll position
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

  // Keyboard navigation: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Fixed header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  // Handle menu item click
  const handleMenuClick = useCallback((item: typeof MENU_ITEMS[0], e: React.MouseEvent) => {
    if (item.scrollTo) {
      e.preventDefault()
      closeMenu()
      // Delay scroll slightly for smoother UX after menu closes
      setTimeout(() => scrollToSection(item.scrollTo!), 300)
    } else {
      closeMenu()
    }
  }, [scrollToSection])

  // Open menu handler
  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [])

  // Close menu handler
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      {/* HEADER BAR */}
      <header ref={headerRef} className={`${styles.header} ${isSticky ? styles.sticky : ""}`} role="banner">
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink} aria-label={t(HEADER_KEYS.HEADER_MENU_LOGO_ALT)}>
            <Image
              src={withBasePath(LOGO_SRC)}
              alt="Masteri Logo"
              width={120}
              height={50}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        <div className={styles.menuSection}>
          <button
            className={styles.menuBtn}
            type="button"
            onClick={openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="fullscreen-menu"
            aria-label={t(HEADER_KEYS.HEADER_ARIA_OPEN_MENU)}
          >
            <MenuOutlined className={styles.menuIcon} />
            {/* Sliding text effect */}
            <span className={styles.menuTextOverflow}>
              <span className={styles.menuTextPrimary}>{t(HEADER_KEYS.HEADER_MENU_TEXT)}</span>
              <span className={styles.menuTextSecondary}>{t(HEADER_KEYS.HEADER_MENU_TEXT)}</span>
            </span>
          </button>
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
        {/* Close button */}
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={closeMenu}
          aria-label={t(HEADER_KEYS.HEADER_ARIA_CLOSE_MENU)}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <CloseOutlined className={styles.closeIcon} />
        </button>

        {/* Overlay logo */}
        <div className={styles.overlayLogo}>
          <Image src={LOGO_WHITE || "/placeholder.svg"} alt="Masteri Logo" width={150} height={80} />
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
            <VerticalCarousel />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
