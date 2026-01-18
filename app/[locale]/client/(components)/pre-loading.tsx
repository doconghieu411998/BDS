"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import styles from "./pre-loading.module.css"

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(true)

  useLayoutEffect(() => {
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
  }, [])

  if (!isActive) return null

  return (
    <div ref={containerRef} className={styles.preloader}>
      <div ref={logoRef} className={styles.logoContainer}>
        <svg className={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
