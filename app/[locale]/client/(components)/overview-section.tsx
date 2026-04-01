import React from 'react';
import Image from "next/image"
import { RightOutlined } from "@ant-design/icons"
import styles from "./overview-section.module.css"
import { withBasePath } from '@/services/commonService'

const PANORAMA_IMG = "images/over-view.png"

const OverviewSection = () => {
  const overviewData = [
    { label: "Tên khu vực", value: "The Hera Resort Quy Nhon" },
    { label: "Vị trí", value: "Quốc lộ 1D tuyến đường Quy Nhơn – Sông Cầu, P. Ghềnh Ráng, TP. Quy Nhơn, T. Bình Định" },
    { label: "Nhà phát triển", value: "Công Ty Cổ Phần MST - MST Group" },
    { label: "Diện tích khu phức hợp", value: "81.940m²" },
    { label: "Quy mô dự án", value: "16,62 Ha chia thành 2 phân khu" },
    { label: "Số lượng nhà cửa", value: "143 căn Villa, 500 căn Condotel" },
    { label: "Số lượng tiện ích", value: "18 tiện ích" },
    { label: "Tiện ích nổi bật", value: "Nhà hàng, Khu phức hợp giải trí/cắm trại đa năng ngoài trời, Khu vực công viên chủ đề, Bến thuyền, Bể bơi giữa biển, Khu vực lưu trú, Cánh đồng hoa" },
  ]

  return (
    <section id="overview-section" className={styles.section}>
      <div className={styles.wrapper}>
        
        {/* Khối Hình Ảnh */}
        <div className={styles.imageBanner}>
          <Image
            src={withBasePath(PANORAMA_IMG)}
            alt="Tổng quan dự án"
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
            <h2 className={styles.titleInfo}>
              THÔNG TIN
            </h2>
            <h1 className={styles.titleOverview}>
              TỔNG QUAN
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewSection
