"use client";

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './pin-space-section.module.css';

// Đăng ký plugin (chỉ chạy ở client)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Danh sách ảnh từ thư mục public
const BG_ITEMS = [
  "/images/location-bg-1.png",
  "/images/location-bg-2.png",
  "/images/location-bg-3.png",
];

const PinSpace = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // SỬ DỤNG MATCHMEDIA: Chìa khóa để tắt animation trên Mobile
      ScrollTrigger.matchMedia({
        
        // CHỈ CHẠY TRÊN DESKTOP (Màn hình lớn hơn 1024px)
        "(min-width: 1024px)": function() {
          const horizontalContainer = horizontalRef.current;
          const sectionElement = sectionRef.current;

          if (!horizontalContainer || !sectionElement) return;

          // Tính toán độ dài cần cuộn ngang
          const totalScrollWidth = horizontalContainer.scrollWidth - window.innerWidth;

          gsap.to(horizontalContainer, {
            x: -totalScrollWidth, // Di chuyển sang trái
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: sectionElement,
              pin: true,     // Ghim chặt section lại
              scrub: 1,      // Cuộn mượt (có độ trễ 1s)
              anticipatePin: 1,
              fastScrollEnd: true,
              preventOverlaps: true,
              start: "top top", 
              // Kết thúc sau khi cuộn hết chiều dài của tất cả các ảnh
              end: () => `+=${horizontalContainer.scrollWidth}`,
              invalidateOnRefresh: true, // Tính lại khi resize trình duyệt
              
            }
          });
        },

        // MOBILE (Dưới 1024px): Không làm gì cả (GSAP tự dọn dẹp), CSS sẽ lo phần xếp dọc
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.sectionWrapper}>
      {/* Container chứa các ảnh */}
      <div ref={horizontalRef} className={styles.horizontalContainer}>
        {BG_ITEMS.map((src, index) => (
          <div key={index} className={styles.imageCard}>
            <div className={styles.imageInner}>
              <Image
                src={src}
                alt={`Location Background ${index + 1}`}
                fill
                className={styles.image}
                priority={index === 0} // Load nhanh ảnh đầu
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              {/* Overlay text demo (tùy chọn) */}
              <div className={styles.overlayContent}>
                <h3>VIEW {index + 1}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinSpace;