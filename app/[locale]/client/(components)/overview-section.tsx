import React from 'react';
import Image from "next/image"
import { RightOutlined } from "@ant-design/icons"
import styles from "./overview-section.module.css"
import { withBasePath } from '@/services/commonService'
import { useTranslations } from 'next-intl'
import { INTRO_KEYS, FLOOR_KEYS, OVERVIEW_KEYS } from '@/constants/localeKeys'

const PANORAMA_IMG = "images/overview.png"

const OverviewSection = () => {
  const t = useTranslations()

  const overviewData = [
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_NAME), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_NAME_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_LOCATION), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_LOCATION_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_DEVELOPER), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_DEVELOPER_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_OPERATOR), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_OPERATOR_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_SCALE), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_SCALE_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_INVENTORY), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_INVENTORY_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_AMENITIES_COUNT), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_AMENITIES_COUNT_VALUE) },
    { label: t(OVERVIEW_KEYS.HOME_OVERVIEW_HIGHLIGHTS), value: t(OVERVIEW_KEYS.HOME_OVERVIEW_HIGHLIGHTS_VALUE) },
  ]

  return (
    <section id="overview-section" className={styles.section}>
      <div className={styles.wrapper}>

        {/* Khối Hình Ảnh */}
        <div className={styles.imageBanner}>
          <Image
            src={withBasePath(PANORAMA_IMG)}
            alt={t(FLOOR_KEYS.HOME_FLOOR_ALT_MAP)}
            fill
            className={styles.image}
            unoptimized
          />
        </div>

      </div>

      <div className={styles.infoStrip}>
        <div className={styles.contentBox}>
          {/* Trái: Danh sách */}
          <div className={styles.leftCol}>
            <ul className={styles.infoList}>
              {overviewData.map((item, index) => (
                <li key={index} className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <RightOutlined />
                  </div>
                  <div className={styles.textGroup}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.value}>{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Phải: Tiêu đề */}
          <div className={styles.rightCol}>
            <h2 className={`${styles.titleInfo} global-title`}>
              {t(OVERVIEW_KEYS.HOME_OVERVIEW_TITLE_INFO)}
            </h2>
            <h1 className={`${styles.titleOverview} global-title`}>
              {t(OVERVIEW_KEYS.HOME_OVERVIEW_TITLE_OVERVIEW)}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewSection
