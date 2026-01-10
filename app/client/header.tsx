"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

const MENU_ITEMS = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { label: "TỔNG QUAN KHU PHỨC HỢP", href: "/tong-quan" },
  { label: "VỊ TRÍ", href: "/vi-tri" },
  { label: "CẢM HỨNG THIẾT KẾ", href: "/cam-hung" },
  { label: "TỔNG MẶT BẰNG", href: "/mat-bang" },
  { label: "TIN TỨC", href: "/tin-tuc" },
  { label: "LIÊN HỆ", href: "/lien-he" },
];

gsap.registerPlugin(ScrollTrigger);

const LOGO_SRC = "https://placehold.co/600x400.png"; // Logo header
const LOGO_WHITE = "https://placehold.co/600x400.png"; // Logo màu trắng trong menu
const MENU_BG_IMG = "https://placehold.co/1000x1000/d19f58/white?text=Arch+Bg";

const Header = () => {

  const headerRef = useRef<HTMLElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  const [isSticky, setIsSticky] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      menuTimeline.current = gsap.timeline({ paused: true })

        .fromTo(menuRef.current,
          { xPercent: -100, visibility: 'hidden' },
          {
            xPercent: 0,
            visibility: 'visible',
            duration: 0.8,
            ease: "power4.inOut"
          }
        )
        // --------------------

        .from(".menu-link-item", {
          x: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.4");

    }, menuRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      menuTimeline.current?.play();
    } else {
      document.body.style.overflow = 'auto';
      menuTimeline.current?.reverse();
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* --- HEADER CHÍNH --- */}
      <header ref={headerRef} className={styles.header}>
        <div className={styles.leftSection}>
          <button
            className={styles.menuBtn}
            type="button"
            onClick={() => setIsMenuOpen(true)} // Mở menu
          >
            <MenuOutlined className={styles.burgerIcon} />
            <div className={styles.menuTextOverflow}>
              {/* Hai dòng chữ nằm ngang hàng nhau trong code */}
              <span className={styles.menuTextPrimary}>MENU</span>
              <span className={styles.menuTextSecondary}>MENU</span>
            </div>
          </button>
        </div>

        <div className={styles.centerSection}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={LOGO_SRC}
              alt="Masteri Logo"
              width={120} height={50}
              className={styles.logo}
              priority
            />
          </Link>
        </div>
        <div className={styles.rightSection}></div>
      </header>


      {/* --- MENU OVERLAY FULL SCREEN --- */}
      <div ref={menuRef} className={styles.fullScreenMenu}>

        {/* Nút đóng (X) */}
        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
          <CloseOutlined style={{ fontSize: '24px', color: '#fff' }} />
        </button>

        {/* Logo Mờ giữa màn hình (nếu cần giống ảnh) */}
        <div className={styles.overlayLogo}>
          <Image src={LOGO_WHITE} alt="Masteri White" width={150} height={80} />
        </div>

        {/* Container chia cột */}
        <div className={styles.menuContainer}>

          {/* Cột trái: Danh sách link */}
          <nav className={styles.navLinks}>
            {MENU_ITEMS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${styles.navItem} menu-link-item`} // Class để GSAP target
                onClick={() => setIsMenuOpen(false)} // Click xong thì đóng menu
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cột phải: Hình ảnh trang trí mờ */}
          <div className={styles.bgDecoration}>
            <Image
              src={MENU_BG_IMG}
              alt="Background Architecture"
              fill
              style={{ objectFit: 'cover', opacity: 0.3 }}
            />
            {/* Lớp gradient phủ lên ảnh để tiệp màu nền */}
            <div className={styles.gradientOverlay}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;