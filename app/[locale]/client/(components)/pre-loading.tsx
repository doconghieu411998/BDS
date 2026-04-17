"use client"

import { useLayoutEffect, useRef, useState, useEffect } from "react"
import gsap from "gsap"
import styles from "./pre-loading.module.css"
import { withBasePath } from "@/services/commonService"
import Image from "next/image"
import { SESSION_KEYS } from "@/constants/help"

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  
  // Start as active to show immediately on SSR
  const [isActive, setIsActive] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    // Check if preloader has already been shown in this session
    const hasBeenShown = sessionStorage.getItem(SESSION_KEYS.PRELOADER_SHOWN)
    if (hasBeenShown) {
      setIsActive(false)
    }
  }, [])

  // Safety fallback: Ensure preloader always hides after a timeout
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false)
      }, 5000) // 5 second maximum
      return () => clearTimeout(timer)
    }
  }, [isActive])

  useLayoutEffect(() => {
    // Only run animation/lock if we are hydrated and active
    if (!isHydrated || !isActive) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    // Scroll về đầu trang
    window.scrollTo(0, 0)

    // Lưu lại style cũ
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPosition = document.body.style.position
    const originalBodyTop = document.body.style.top
    const originalBodyLeft = document.body.style.left
    const originalBodyRight = document.body.style.right

    // Lock scroll hoàn toàn - áp dụng cho cả html và body
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = "0"
    document.body.style.left = "0"
    document.body.style.right = "0"

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = originalHtmlOverflow
          document.body.style.overflow = originalBodyOverflow
          document.body.style.position = originalBodyPosition
          document.body.style.top = originalBodyTop
          document.body.style.left = originalBodyLeft
          document.body.style.right = originalBodyRight

          if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "auto"
          }

          window.scrollTo(0, 0)

          // Record that preloader has been shown in this session
          sessionStorage.setItem(SESSION_KEYS.PRELOADER_SHOWN, "true")

          setIsActive(false)
        },
      })

      // BƯỚC 1: Hiện logo mượt mà
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      })

        // BƯỚC 2: Hiệu ứng Logo lơ lửng (Floating) trong lúc chờ
        .to(logoRef.current, {
          y: -15,
          duration: 1.5,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        })

        // BƯỚC 3: Màn hình kéo lên
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
            force3D: true,
          },
          "-=0.5",
        )

      // Hiệu ứng phụ: Logo bay vút lên nhanh hơn nền
      tl.to(
        logoRef.current,
        {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
        },
        "<",
      )
    }, containerRef)

    return () => {
      ctx.revert()
      // Cleanup: khôi phục scroll nếu component unmount sớm
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overflow = originalBodyOverflow
      document.body.style.position = originalBodyPosition
      document.body.style.top = originalBodyTop
      document.body.style.left = originalBodyLeft
      document.body.style.right = originalBodyRight
    }
  }, [isHydrated, isActive])

  if (isHydrated && !isActive) return null

  return (
    <div ref={containerRef} className={styles.preloader}>
      <div ref={logoRef} className={styles.logoContainer}>
        <Image
          src={withBasePath("images/logo-preloading.png")}
          alt="Masteri Logo"
          width={280}
          height={80}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  )
}
