"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGO_SRC = "https://placehold.co/600x400.png";

const Header = () => {

  const headerRef = useRef<HTMLElement>(null);

  const [isSticky, setIsSticky] = useState(false);

  useLayoutEffect(() => {
    // Tạo context để dễ dàng dọn dẹp (cleanup) khi component unmount
    const ctx = gsap.context(() => {

      // Định nghĩa Animation
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: document.body, // Lấy body làm điểm mốc cuộn
          start: "top -50",       // Bắt đầu khi cuộn xuống quá 50px
          end: 99999,             // Kết thúc (vô tận)
          toggleActions: "play none none reverse",
          // Logic: 
          // - play: khi cuộn xuống qua điểm start -> Chạy animation
          // - reverse: khi cuộn ngược lại lên trên điểm start -> Tua ngược animation
        },
        // Các thuộc tính CSS sẽ thay đổi
        backgroundColor: "#ffffff",
        height: "80px", // Co nhỏ chiều cao header (nếu cần)
        padding: "15px 40px", // Thu nhỏ padding
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Thêm bóng đổ
        duration: 0.4, // Thời gian chuyển đổi (0.4s)
        ease: "power2.inOut" // Kiểu chuyển động mượt
      });

    }, headerRef);

    return () => ctx.revert(); // Dọn dẹp animation khi unmount
  }, []);

  return (
    <header ref={headerRef} className={`${styles.header} ${isSticky ? styles.sticky : ''}`} >

      <div className={styles.leftSection}>
        <button
          className={styles.menuBtn}
          type="button"
          aria-label="Mở danh mục điều hướng chính"
        >
          <span className={styles.burgerIcon} aria-hidden="true">
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </span>
          MENU
        </button>
      </div>

      <div className={styles.centerSection}>
        <Link href="/" className={styles.logoLink} aria-label="Về trang chủ Masteri">
          <Image
            src={LOGO_SRC}
            alt="Masteri Thảo Điền - Căn hộ cao cấp"
            width={120}
            height={50}
            className={styles.logo}
            priority
          />
        </Link>
      </div>

      <div className={styles.rightSection}></div>
    </header>
  );
};

export default Header;