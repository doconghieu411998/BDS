"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import styles from "./floor-detail.module.css"
import { withBasePath } from "@/services/commonService"

interface Location {
  id: string
  x: number
  y: number
  title: string
  image: string
}

const LOCATIONS: Location[] = [
  {
    id: "1",
    x: 20,
    y: 25,
    title: "Bird Nest Museum",
    image: "images/luxury-museum-building-with-modern-architecture.jpg",
  },
  {
    id: "2",
    x: 45,
    y: 40,
    title: "Central Lake Park",
    image: "images/beautiful-lake-park-with-gardens-and-walkways.jpg",
  },
  {
    id: "3",
    x: 70,
    y: 30,
    title: "Wellness Spa Resort",
    image: "images/luxury-spa-resort-with-pool-and-palm-trees.jpg",
  },
  {
    id: "4",
    x: 30,
    y: 65,
    title: "Golf Course Clubhouse",
    image: "images/premium-golf-clubhouse-with-green-fairway.jpg",
  },
  {
    id: "5",
    x: 75,
    y: 70,
    title: "Beachfront Villas",
    image: "images/luxury-beachfront-villas-with-ocean-view.jpg",
  },
]

export default function FloorDetail() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

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

          {/* Overlay gradient */}
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
              onMouseEnter={() => setActiveLocation(location.id)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              {/* Pin with pulsing animation */}
              <div className={styles.pin}>
                <span className={styles.pinOuterRing} />
                <span className={styles.pinMiddleRing} />
                <span className={styles.pinInnerDot} />
              </div>

              {/* Tooltip Card */}
              <AnimatePresence>
                {activeLocation === location.id && (
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
    </section>
  )
}
