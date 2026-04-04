"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Modal } from "antd" // Import Modal từ Ant Design
import styles from "./floor-detail.module.css"
import { withBasePath } from "@/services/commonService"

interface Location {
  id: string
  x: number
  y: number
  title: string
  image: string
  description: string
}

import { IntroduceImage } from "@/models/introduce-image"

export default function FloorDetail({ images = [] }: { images?: IntroduceImage[] }) {
  // State cho Tooltip (Desktop hover)
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

  // State cho Modal (Mobile click)
  const [modalLocation, setModalLocation] = useState<Location | null>(null)

  // State check màn hình mobile
  const [isMobile, setIsMobile] = useState(false)

  // Hook detect màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check ngay khi mount
    checkMobile()

    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Xử lý sự kiện
  const handleMouseEnter = (id: string) => {
    if (!isMobile) setActiveLocation(id)
  }

  const handleMouseLeave = () => {
    if (!isMobile) setActiveLocation(null)
  }

  const handlePinClick = (location: Location) => {
    // Cả desktop và mobile đều mở modal khi click
    setModalLocation(location)
  }

  const LEGEND_ITEMS = [
    "LỐI VÀO", "LỐI VÀO HẦM ĐI BỘ", "BÃI ĐỖ XE", "LỐI VÀO CONDOTEL", "LỐI XUỐNG BẾN THUYỀN", "LỐI VÀO NHÀ HÀNG",
    "BẾN THUYỀN", "KHU BIỆT THỰ NGHỈ DƯỠNG", "CONDOTEL", "NHÀ HÀNG", "BUNGALOW", "VILLA BỜ ĐÔNG",
    "SÂN CHƠI GIẢI TRÍ ĐA NĂNG", "KHU CHỜI NGHỈ + CẮM TRẠI", "CÔNG VIÊN GLAMPING & CAMPING", "MÔ HÌNH CHECK IN CHỦ ĐỀ 1",
    "MÔ HÌNH CHECK IN CHỦ ĐỀ 2", "BÃI ĐÁP KINH KHÍ CẦU", "CÔNG VIÊN THUỢNG NGUỒN SUỐI", "BÃI ĐÁP CONDOTEL",
    "CÔNG VIÊN DỌC SUỐI", "ĐÀI PHUN NƯỚC CẢNH QUAN", "KHU LƯU TRÚ", "THÁP VỌNG CẢNH", "CÔNG VIÊN HẠ NGUỒN SUỐI",
    "HỒ CHỨA HẠ NGUỒN", "CÁNH ĐỒNG HOA", "BỂ BƠI NỐI GIỮA BIỂN"
  ]

  const ALL_PINS = [
    { id: "1", x: 2, y: 63, label: "1" },
    { id: "1prime", x: 10, y: 24, label: "1'" },
    { id: "2a", x: 10, y: 45, label: "2" },
    { id: "2b", x: 43, y: 22, label: "2" },
    { id: "3", x: 49, y: 56, label: "3" },
    { id: "4", x: 79, y: 60, label: "4" },
    { id: "5", x: 83, y: 65, label: "5" },
    { id: "6", x: 88, y: 39, label: "6" },
    { id: "7a", x: 25, y: 67, label: "7" },
    { id: "7b", x: 34, y: 54, label: "7" },
    { id: "8", x: 57, y: 55, label: "8", title: "THE HERA RESORT", image: "images/design-sample-1.png", special: true, color: "blue" },
    { id: "9", x: 85, y: 53, label: "9" },
    { id: "10", x: 90, y: 60, label: "10" },
    { id: "11", x: 92, y: 53, label: "11" },
    { id: "12", x: 7, y: 70, label: "12" },
    { id: "13", x: 13, y: 77, label: "13" },
    { id: "14", x: 30, y: 83, label: "14" },
    { id: "15", x: 37, y: 70, label: "15" },
    { id: "16", x: 44, y: 89, label: "16" },
    { id: "17", x: 40, y: 76, label: "17" },
    { id: "18", x: 52, y: 73, label: "18" },
    { id: "19a", x: 66, y: 54, label: "19" },
    { id: "19b", x: 64, y: 44, label: "19" },
    { id: "20", x: 60, y: 70, label: "20" },
    { id: "21", x: 65, y: 82, label: "21" },
    { id: "22", x: 75, y: 80, label: "22" },
    { id: "23", x: 86, y: 74, label: "23" },
    { id: "24", x: 74, y: 44, label: "24", title: "Central Lake Park", image: "images/design-sample-2.png", special: true, color: "green", status: "Mở bán" },
    { id: "25", x: 78, y: 71, label: "25" },
    { id: "26", x: 40, y: 35, label: "26" },
    { id: "27", x: 84, y: 25, label: "27" },
  ]

  return (
    <section id="floor-detail-section" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Giới Thiệu</span>
        <h2 className={`${styles.title} global-title`}>Chi Tiết Mặt Bằng</h2>
      </div>

      <div className={styles.mapWrapper}>
        <Image
          src={withBasePath("images/floor-plan.png")}
          alt="Master Plan Map"
          fill
          className={styles.mapImage}
          priority
        />

        <div className={styles.overlay} />

        {/* Dynamic Pins based on the image */}
        {ALL_PINS.map((pin) => (
          <div
            key={pin.id}
            className={styles.pinContainer}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onMouseEnter={() => pin.special && handleMouseEnter(pin.id)}
            onMouseLeave={handleMouseLeave}
          >
            {pin.special ? (
              <div className={`${styles.pin} ${styles[pin.color || 'blue']}`}>
                <div className={styles.pinIcon}>{pin.label}</div>
              </div>
            ) : (
              <div className={`${styles.simplePin} ${styles.blue}`}>
                <span className={styles.pinLabel}>{pin.label}</span>
              </div>
            )}

            <AnimatePresence>
              {activeLocation === pin.id && !isMobile && pin.special && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className={styles.tooltipCard}
                >
                  {pin.status && <div className={styles.statusBadge}>{pin.status}</div>}
                  <div className={styles.cardImage}>
                    <Image src={withBasePath(pin.image || '')} alt={pin.title || ''} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={`${styles.cardTitle} ${styles[(pin.color || 'blue') + 'Bar']}`}>
                    {pin.title}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className={styles.wrapper}>
        {/* Legend Grid Section */}
        <div className={styles.legendContainer}>
          <div className={styles.legendGrid}>
            {LEGEND_ITEMS.map((item, index) => (
              <div key={index} className={styles.legendItem}>
                <div className={styles.legendIcon}>
                  {index === 0 ? "1" : index === 1 ? "1'" : index}
                </div>
                <span className={styles.legendText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={!!modalLocation}
        onCancel={() => setModalLocation(null)}
        footer={null}
        centered
        styles={{ body: { padding: 0, overflow: 'hidden', borderRadius: '12px' } }}
      >
        {modalLocation && (
          <div className={styles.modalContent}>
            <div className={styles.modalImageWrapper}>
              <Image src={withBasePath(modalLocation.image)} alt={modalLocation.title} fill className={styles.modalImage} />
            </div>
            <div className={styles.modalInfo}>
              <h3 className={styles.modalTitle}>{modalLocation.title}</h3>
              <p className={styles.modalDesc}>{modalLocation.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}