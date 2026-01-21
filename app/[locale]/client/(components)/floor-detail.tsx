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

const LOCATIONS: Location[] = [
  {
    id: "1",
    x: 20,
    y: 25,
    title: "Bird Nest Museum",
    image: "images/luxury-museum-building-with-modern-architecture.jpg",
    description: "Bảo tàng kiến trúc độc đáo với thiết kế hiện đại, mang đến không gian nghệ thuật và văn hóa đẳng cấp cho cộng đồng cư dân.",
  },
  {
    id: "2",
    x: 45,
    y: 40,
    title: "Central Lake Park",
    image: "images/beautiful-lake-park-with-gardens-and-walkways.jpg",
    description: "Công viên hồ nước rộng lớn với lối đi bộ xanh mát, tạo không gian thư giãn lý tưởng giữa thiên nhiên trong lòng đô thị.",
  },
  {
    id: "3",
    x: 70,
    y: 30,
    title: "Wellness Spa Resort",
    image: "images/luxury-spa-resort-with-pool-and-palm-trees.jpg",
    description: "Khu nghỉ dưỡng spa cao cấp với hồ bơi vô cực và dịch vụ chăm sóc sức khỏe toàn diện, mang đến trải nghiệm thư giãn tuyệt vời.",
  },
  {
    id: "4",
    x: 30,
    y: 65,
    title: "Golf Course Clubhouse",
    image: "images/premium-golf-clubhouse-with-green-fairway.jpg",
    description: "Câu lạc bộ golf đẳng cấp với sân golf chuyên nghiệp, phục vụ nhu cầu giải trí và giao lưu của cư dân yêu thể thao.",
  },
  {
    id: "5",
    x: 75,
    y: 70,
    title: "Beachfront Villas",
    image: "images/luxury-beachfront-villas-with-ocean-view.jpg",
    description: "Biệt thự ven biển sang trọng với tầm nhìn toàn cảnh đại dương, mang đến không gian sống riêng tư và đẳng cấp bậc nhất.",
  },
]

export default function FloorDetail() {
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Interactive Master Plan</h2>

        <div className={styles.mapWrapper}>
          {/* Map Image */}
          <Image
            src={withBasePath("images/aerial-view-luxury-resort-master-plan-map-with-bui.jpg")}
            alt="Master Plan Map"
            fill
            className={styles.mapImage}
            priority
          />

          <div className={styles.overlay} />

          {/* Hotspot Pins */}
          {LOCATIONS.map((location) => (
            <div
              key={location.id}
              className={styles.pinContainer}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
              }}
              onMouseEnter={() => handleMouseEnter(location.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handlePinClick(location)} // Thêm sự kiện Click
            >
              <div className={styles.pin}>
                <span className={styles.pinOuterRing} />
                <span className={styles.pinMiddleRing} />
                <span className={styles.pinInnerDot} />
              </div>

              {/* Tooltip Card - Chỉ hiện trên Desktop (!isMobile) */}
              <AnimatePresence>
                {activeLocation === location.id && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={styles.tooltipWrapper}
                  >
                    <div className={styles.tooltipArrow} />
                    <div className={styles.tooltipCard}>
                      <div className={styles.thumbnailWrapper}>
                        <Image
                          src={withBasePath(location.image)}
                          alt={location.title}
                          fill
                          className={styles.thumbnailImage}
                        />
                      </div>
                      <div className={styles.tooltipContent}>
                        <h3 className={styles.tooltipTitle}>{location.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* --- ANT DESIGN MODAL CHO MOBILE --- */}
      <Modal
        open={!!modalLocation}
        onCancel={() => setModalLocation(null)}
        footer={null} // Ẩn footer mặc định
        centered
        className="custom-modal" // Class global nếu muốn override sâu hơn
        styles={{ body: { padding: 0, overflow: 'hidden', borderRadius: '8px' } }}
      >
        {modalLocation && (
          <div className={styles.modalContent}>
            <div className={styles.modalImageWrapper}>
              <Image
                src={withBasePath(modalLocation.image)}
                alt={modalLocation.title}
                fill
                className={styles.modalImage}
              />
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