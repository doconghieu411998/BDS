import Image from "next/image"
import { RightOutlined } from "@ant-design/icons"
import styles from "./overview-section.module.css"

const PANORAMA_DEMO = "https://placehold.co/1400x600/f0e6d2/6d4c41?text=Greenhill+Village+Quy+Nhon"

const OverviewSection = () => {
  const overviewData = [
    { label: "Tên khu vực", value: "Lorem Ipsum is simply dummy" },
    { label: "Vị trí", value: "Lorem Ipsum is simply dummy" },
    { label: "Nhà phát triển", value: "Lorem Ipsum is simply dummy" },
    { label: "Diện tích khu phức hợp", value: "Lorem Ipsum is simply dummy" },
    { label: "Quy mô dự án", value: "Lorem Ipsum is simply dummy" },
    { label: "Mật độ xây dựng", value: "Lorem Ipsum is simply dummy" },
    { label: "Số lượng tiện ích", value: "Lorem Ipsum is simply dummy" },
    { label: "Tiện ích nổi bật", value: "Lorem Ipsum is simply dummy" },
  ]

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftCol}>
          <h2 className={styles.title}>
            THÔNG TIN <br /> TỔNG QUAN
          </h2>
          <div className={styles.decorShape}></div>
        </div>

        <div className={styles.rightCol}>
          <ul className={styles.infoList}>
            {overviewData.map((item, index) => (
              <li key={index} className={styles.infoItem}>
                <span className={styles.icon}>
                  <RightOutlined />
                </span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={PANORAMA_DEMO || "/placeholder.svg"}
          alt="Demo Panorama Masteri"
          width={1400}
          height={600}
          className={styles.panoramaImage}
          unoptimized
        />
      </div>
    </section>
  )
}

export default OverviewSection
