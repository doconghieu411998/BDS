"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './video-hero-section.module.css';
import { withBasePath } from '@/services/commonService';

interface VideoHeroSectionProps {
    videoSrc?: string;
    youtubeUrl?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
}

const VideoHeroSection: React.FC<VideoHeroSectionProps> = ({
    videoSrc = 'videos/background-video.mp4', // Moved to public root
    youtubeUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    title = 'TRẢI NGHIỆM CUỘC SỐNG ĐỈNH CAO',
    subtitle = 'Khám phá không gian nghỉ dưỡng sang trọng bên bãi biển Quy Nhơn',
    ctaText = 'Khám Phá Ngay'
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        // Ensure video plays on mount (handles autoplay restrictions)
        const playVideo = async () => {
            try {
                await videoElement.play();
            } catch (error) {
                console.warn('Autoplay was prevented:', error);
            }
        };

        // Handle video loaded
        const handleLoadedData = () => {
            setIsVideoLoaded(true);
            playVideo();
        };

        videoElement.addEventListener('loadeddata', handleLoadedData);

        return () => {
            videoElement.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    const handleCTAClick = () => {
        // Open YouTube video in new tab
        window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className={styles.container} aria-label="Video Hero Section">
            {/* Background Video */}
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    className={`${styles.backgroundVideo} ${isVideoLoaded ? styles.loaded : ''}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                >
                    <source src={withBasePath(videoSrc)} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Gradient for Readability */}
                <div className={styles.overlay} aria-hidden="true"></div>
            </div>

            {/* Content on Top of Video */}
            <div className={styles.content}>
                <div className={styles.textWrapper}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>

                    {/* CTA Button */}
                    <button
                        className={styles.ctaButton}
                        onClick={handleCTAClick}
                        aria-label={`${ctaText} - Opens YouTube video in new tab`}
                    >
                        <span className={styles.ctaText}>{ctaText}</span>
                        <svg
                            className={styles.playIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M8 5.14v13.72L19 12 8 5.14z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>

                {/* Scroll Indicator (Optional) */}
                <div className={styles.scrollIndicator} aria-hidden="true">
                    <div className={styles.scrollLine}></div>
                    <span className={styles.scrollText}>Cuộn xuống</span>
                </div>
            </div>
        </section>
    );
};

export default VideoHeroSection;
