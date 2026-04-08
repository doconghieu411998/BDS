"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Modal } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import styles from "./floor-detail.module.css"
import { withBasePath } from "@/services/commonService"
import { useLocale, useTranslations } from "next-intl"
import { FLOOR_KEYS } from "@/constants/localeKeys"

interface Location {
  id: number
  x: number
  y: number
  label?: string
  title?: string
  image?: string
  description?: string
  refId?: number
}

import { IntroduceImage } from "@/models/introduce-image"

export default function FloorDetail({ images = [] }: { images?: IntroduceImage[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const [activeLocation, setActiveLocation] = useState<number | null>(null)
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
    setModalLocation(location)
  }

  const ALL_PINS: Location[] = [
    { id: 21, x: 43, y: 22, label: "1" },
    { id: 22, x: 2, y: 63, label: "1'" },
    { id: 23, x: 10, y: 45, label: "2" },
    { id: 24, x: 49, y: 56, label: "3" },
    { id: 25, x: 78, y: 60, label: "4" },
    { id: 26, x: 83, y: 66, label: "5" },
    { id: 27, x: 88, y: 39, label: "6" },
    { id: 28, x: 25, y: 67, label: "7" },
    { id: 29, x: 57, y: 55, label: "8" },
    { id: 30, x: 85, y: 55, label: "9" },
    { id: 31, x: 90, y: 61, label: "10" },
    { id: 32, x: 92, y: 53, label: "11" },
    { id: 33, x: 7, y: 70, label: "12" },
    { id: 34, x: 13, y: 77, label: "13" },
    { id: 35, x: 30, y: 83, label: "14" },
    { id: 36, x: 37, y: 70, label: "15" },
    { id: 37, x: 44, y: 89, label: "16" },
    { id: 38, x: 40, y: 76, label: "17" },
    { id: 39, x: 52, y: 73, label: "18" },
    { id: 40, x: 66, y: 54, label: "19" },
    { id: 41, x: 69, y: 61, label: "20" },
    { id: 42, x: 65, y: 82, label: "21" },
    { id: 43, x: 75, y: 80, label: "22" },
    { id: 44, x: 86, y: 74, label: "23" },
    { id: 45, x: 74, y: 44, label: "24" },
    { id: 46, x: 80, y: 46, label: "25" },
    { id: 47, x: 38, y: 35, label: "26" },
    { id: 48, x: 84, y: 25, label: "27" },
    { id: 49, x: 34, y: 54, label: "7", refId: 28 },
    { id: 50, x: 27, y: 23, label: "2", refId: 23 },
    { id: 51, x: 64, y: 44, label: "19", refId: 40 },
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

        {images.length > 0 && ALL_PINS.map((pin) => (
          <div
            key={pin.id}
            className={styles.pinContainer}
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              zIndex: activeLocation === pin.id ? 50 : 10
            }}
            onMouseEnter={() => handleMouseEnter(pin.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handlePinClick(pin)}
          >
            {(() => {
              const mappedId = pin.refId ?? pin.id;
              const item = images.find((img) => img.id === mappedId);
              const status = item?.status || 0;

              if (status === 2) {
                // 2: mở bán -> dùng pin to màu xanh lá
                return (
                  <div className={`${styles.pin} ${styles.green}`}>
                    <div className={styles.pinIcon}>{pin.label}</div>
                  </div>
                );
              } else if (status === 1) {
                // 1: chưa bán -> dùng pin to màu xanh dương
                return (
                  <div className={`${styles.pin} ${styles.blue}`}>
                    <div className={styles.pinIcon}>{pin.label}</div>
                  </div>
                );
              } else {
                // 0: chưa có trạng thái gì -> dùng chấm nhỏ mặc định
                return (
                  <div className={styles.simplePin}>
                    <span className={styles.pinLabel}>{pin.label}</span>
                  </div>
                );
              }
            })()}

            <AnimatePresence>
              {activeLocation === pin.id && !isMobile && (() => {
                const mappedId = pin.refId ?? pin.id;
                const item = images.find((img) => img.id === mappedId);
                const status = item?.status || 0;

                // Set color theme
                const colorBar = status === 2 ? 'greenBar' : (status === 1 ? 'blueBar' : '');

                // Status mapping string (Optional fallback for tooltip badge)
                const statusStr = status === 2 ? 'Mở Bán' : (status === 1 ? 'Chưa Bán' : null);

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className={styles.tooltipCard}
                  >
                    {statusStr && (
                      <div className={styles.statusBadge} style={status === 1 ? { background: '#2563eb' } : {}}>
                        {statusStr}
                      </div>
                    )}
                    <div className={styles.cardImage}>
                      <Image
                        src={item?.imageUrl}
                        alt={locale === 'en' ? String(item?.titleEn || '') : String(item?.titleVi || '')}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={`${styles.cardTitle} ${colorBar ? styles[colorBar] : ''}`}>
                      {locale === 'en' ? item?.titleEn : item?.titleVi}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className={styles.wrapper}>
        {/* Legend Grid Section */}
        <div className={styles.legendContainer}>
          <div className={styles.legendGrid}>
            {images.map((item, index) => {
              const pin = ALL_PINS.find(p => (p.refId ?? p.id) === item.id);
              return (
                <div key={index} className={styles.legendItem}>
                  <div className={styles.legendIcon}>
                    {pin?.label}
                  </div>
                  <span className={styles.legendText}>
                    {locale === 'en' ? item.titleEn : item.titleVi}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Modal
        open={!!modalLocation}
        onCancel={() => setModalLocation(null)}
        footer={null}
        centered
        closeIcon={
          <div className={styles.customCloseBtn}>
            <CloseOutlined />
          </div>
        }
        styles={{ body: { padding: 0, overflow: 'hidden', borderRadius: '12px' } }}
      >
        {modalLocation && (() => {
          const mappedId = modalLocation.refId ?? modalLocation.id;
          const item = images.find((img) => img.id === mappedId);
          const title = locale === 'en' ? item?.titleEn : item?.titleVi;
          const description = locale === 'en' ? item?.descriptionEn : item?.descriptionVi;

          return (
            <div className={styles.modalContent}>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={item?.imageUrl}
                  alt={title || ''}
                  fill
                  className={styles.modalImage}
                />
              </div>
              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>{title}</h3>
                {description && <p className={styles.modalDesc}>{description}</p>}
              </div>
            </div>
          );
        })()}
      </Modal>
    </section>
  )
}