'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './pre-loading.module.css';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useLayoutEffect(() => {

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // Khi chạy xong timeline thì unmount component
        onComplete: () => {
          setIsActive(false);
          document.body.style.overflow = originalOverflow;
          if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto';
          }
        }
      });

      // BƯỚC 1: Hiện logo mượt mà
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      })

        // BƯỚC 2: Hiệu ứng Logo lơ lửng (Floating) trong lúc chờ
        .to(logoRef.current, {
          y: -15,
          duration: 1.5,
          yoyo: true, // Lên rồi xuống
          repeat: 1,  // Lặp lại 1 lần (tổng cộng khoảng 3s chờ)
          ease: "sine.inOut"
        })

        // BƯỚC 3: Màn hình kéo lên (ACTION CHÍNH)
        .to(containerRef.current, {
          yPercent: -100, // Kéo lên 100% chiều cao
          duration: 1.2,  // Thời gian kéo (hơi chậm chút để thấy độ mượt)

          // --- BÍ QUYẾT MƯỢT ---
          ease: "expo.inOut", // Easing này tạo cảm giác: Rất chậm lúc đầu -> Vút cực nhanh -> Phanh cực êm
          // --------------------

          force3D: true, // Ép trình duyệt dùng Card đồ họa (GPU)
        }, "-=0.5"); // Chạy sớm hơn một chút trước khi logo float xong hẳn

      // Hiệu ứng phụ: Logo bay vút lên nhanh hơn nền một chút (Parallax)
      tl.to(logoRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in"
      }, "<"); // Chạy cùng lúc với Bước 3

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isActive) return null;

  return (
    <div ref={containerRef} className={styles.preloader}>
      <div ref={logoRef} className={styles.logoContainer}>
        {/* Thay bằng SVG Logo của bạn */}
        <svg
          className={styles.logo}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}