"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Modal } from "antd"
import styles from "./floor-detail.module.css"
import { withBasePath } from "@/services/commonService"
import { useTranslations } from "next-intl"
import { FLOOR_KEYS } from "@/constants/localeKeys"

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
  const t = useTranslations()
  // State cho Tooltip (Desktop hover)
  const [activeLocation, setActiveLocation] = useState<number | null>(null)

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
  const handleMouseEnter = (id: number) => {
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
    { id: 1, x: 2, y: 63, label: "1", title: "Lối Vào Chính", description: "Lối vào chính của dự án, kết nối trực tiếp với trục đường lớn.", image: "images/intro.png" },
    { id: 2, x: 10, y: 24, label: "1'", title: "Lối Vào Phụ", description: "Lối vào phụ dành cho cư dân và xe dịch vụ.", image: "images/intro.png" },
    { id: 3, x: 10, y: 45, label: "2", title: "Bãi Đỗ Xe A", description: "Khu vực đỗ xe rộng rãi, an ninh 24/7.", image: "images/intro.png" },
    { id: 4, x: 43, y: 22, label: "2", title: "Bãi Đỗ Xe B", description: "Bãi đỗ xe lộ thiên gần khu vực tiện ích.", image: "images/intro.png" },
    { id: 5, x: 49, y: 56, label: "3", title: "Sảnh Đón Condotel", description: "Không gian đón tiếp sang trọng cho khách hàng Condotel.", image: "images/intro.png" },
    { id: 6, x: 79, y: 60, label: "4", title: "Nhà Hàng Biển", description: "Thưởng thức ẩm thực đẳng cấp với tầm nhìn panorama biển Quy Nhơn.", image: "images/intro.png" },
    { id: 7, x: 83, y: 65, label: "5", title: "Bến Du Thuyền", description: "Nơi neo đậu của những du thuyền hạng sang.", image: "images/intro.png" },
    { id: 8, x: 88, y: 39, label: "6", title: "Khu Biệt Thự", description: "Những căn biệt thự đơn lập với thiết kế hiện đại.", image: "images/intro.png" },
    { id: 9, x: 25, y: 67, label: "7", title: "Công Viên Nội Khu", description: "Lá phổi xanh của dự án với hệ thực vật phong phú.", image: "images/intro.png" },
    { id: 10, x: 34, y: 54, label: "7", title: "Đường Dạo Bộ", description: "Con đường rợp bóng cây cho những buổi tối lãng mạn.", image: "images/intro.png" },
    { id: 11, x: 57, y: 55, label: "8", title: "THE HERA RESORT QUY NHON", description: "Biểu tượng kiến trúc của dự án với đầy đủ tiện ích 5 sao.", image: "images/intro.png", special: true, color: "blue" },
    { id: 12, x: 85, y: 53, label: "9", title: "Khu Vui Chơi", description: "Khu vui chơi trẻ em an toàn và sáng tạo.", image: "images/intro.png" },
    { id: 13, x: 90, y: 60, label: "10", title: "Bể Bơi Vô Cực", description: "Bể bơi tràn bờ nối liền bầu trời và mặt biển.", image: "images/intro.png" },
    { id: 14, x: 92, y: 53, label: "11", title: "Bar Bãi Biển", description: "Tận hưởng những ly cocktail dưới ánh hoàng hôn.", image: "images/intro.png" },
    { id: 15, x: 7, y: 70, label: "12", title: "Sân Tennis", description: "Sân tennis tiêu chuẩn quốc tế phục vụ cư dân.", image: "images/intro.png" },
    { id: 16, x: 13, y: 77, label: "13", title: "Khu Gym & Spa", description: "Trung tâm chăm sóc sức khỏe và làm đẹp hiện đại.", image: "images/intro.png" },
    { id: 17, x: 30, y: 83, label: "14", title: "Khu BBQ", description: "Khu vực nướng ngoài trời cho những buổi tụ tập gia đình.", image: "images/intro.png" },
    { id: 18, x: 37, y: 70, label: "15", title: "Vườn Thiền", description: "Không gian yên tĩnh để tĩnh tâm và tái tạo năng lượng.", image: "images/intro.png" },
    { id: 19, x: 44, y: 89, label: "16", title: "Cổng Phụ", description: "Lối vào phụ từ phía công viên.", image: "images/intro.png" },
    { id: 20, x: 40, y: 76, label: "17", title: "Chốt Bảo Vệ", description: "Bảo vệ túc trực 24/7 đảm bảo an toàn tuyệt đối.", image: "images/intro.png" },
    { id: 21, x: 52, y: 73, label: "18", title: "Đài Phun Nước", description: "Điểm nhấn cảnh quan tại trung tâm quảng trường.", image: "images/intro.png" },
    { id: 22, x: 66, y: 54, label: "19", title: "Công Viên Ánh Sáng", description: "Bữa tiệc ánh sáng mỗi tối tại khu vực trung tâm.", image: "images/intro.png" },
    { id: 23, x: 64, y: 44, label: "19", title: "Vòng Quay Mặt Trời", description: "Ngắm nhìn toàn cảnh dự án từ trên cao.", image: "images/intro.png" },
    { id: 24, x: 69, y: 61, label: "20", title: "Khu Yoga", description: "Không gian mở lý tưởng cho các bài tập yoga buổi sáng.", image: "images/intro.png" },
    { id: 25, x: 65, y: 82, label: "21", title: "Suối Cảnh Quan", description: "Dòng suối nhân tạo mang lại sự tươi mát.", image: "images/intro.png" },
    { id: 26, x: 75, y: 80, label: "22", title: "Tháp Cảnh Quan", description: "Điểm check-in không thể bỏ qua tại dự án.", image: "images/intro.png" },
    { id: 27, x: 86, y: 74, label: "23", title: "Khu Lưu Trú", description: "Khu vực lưu trú dành cho khách tham quan.", image: "images/intro.png" },
    { id: 28, x: 74, y: 44, label: "24", title: "Central Lake Park", description: "Công viên hồ trung tâm với diện tích mặt nước rộng lớn.", image: "images/intro.png", special: true, color: "green", status: "Mở bán" },
    { id: 29, x: 78, y: 71, label: "25", title: "Đồi Vọng Cảnh", description: "Nơi lý tưởng để ngắm nhìn bình minh trên biển.", image: "images/intro.png" },
    { id: 30, x: 40, y: 35, label: "26", title: "Vườn Hoa", description: "Vườn hoa bốn mùa khoe sắc thắm.", image: "images/intro.png" },
    { id: 31, x: 84, y: 25, label: "27", title: "Khu Camping", description: "Trải nghiệm kỳ nghỉ thú vị cùng gia đình tại khu cắm trại.", image: "images/intro.png" },
  ]

  return (
    <section id="floor-detail-section" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>{t(FLOOR_KEYS.HOME_FLOOR_TITLE_SUB)}</span>
        <h2 className={`${styles.title} global-title`}>{t(FLOOR_KEYS.HOME_FLOOR_TITLE_MAIN)}</h2>
      </div>

      <div className={styles.mapWrapper}>
        <Image
          src={withBasePath("images/floor-plan.png")}
          alt={t(FLOOR_KEYS.HOME_FLOOR_ALT_MAP)}
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
            onMouseEnter={() => handleMouseEnter(pin.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handlePinClick({
              ...pin,
              title: t(`${FLOOR_KEYS.HOME_FLOOR_PIN_TITLE}${pin.id + 1}_TTL`),
              description: t(`${FLOOR_KEYS.HOME_FLOOR_PIN_DESCRIPTION}${pin.id + 1}_DSC`),
            } as any)}
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
              {activeLocation === pin.id && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className={styles.tooltipCard}
                >
                  {pin.status && <div className={styles.statusBadge}>{pin.status}</div>}
                  <div className={styles.cardImage}>
                    <Image src={withBasePath(pin.image || '')} alt={t(`${FLOOR_KEYS.HOME_FLOOR_PIN_TITLE}${pin.id + 1}`)} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={`${styles.cardTitle} ${styles[(pin.color || 'blue') + 'Bar']}`}>
                    {t(`${FLOOR_KEYS.HOME_FLOOR_PIN_TITLE}${pin.id + 1}`)}
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
                <span className={styles.legendText}>
                  {t(`${FLOOR_KEYS.HOME_FLOOR_LEG}${index + 1}`)}
                </span>
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