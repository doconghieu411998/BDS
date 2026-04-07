"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './video-hero-section.module.css';
import { withBasePath } from '@/services/commonService';
import { useTranslations } from 'next-intl';
import { VIDEO_KEYS } from '@/constants/localeKeys';

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
    title,
    subtitle,
    ctaText
}) => {
    const t = useTranslations();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Use translations for defaults
    const displayTitle = title || t(VIDEO_KEYS.HOME_VIDEO_TITLE);
    const displaySubtitle = subtitle || t(VIDEO_KEYS.HOME_VIDEO_DESCRIPTION);
    const displayCta = ctaText || t(VIDEO_KEYS.HOME_VIDEO_BTN_LABEL);

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
        <section className={styles.container} aria-label={t(VIDEO_KEYS.HOME_VIDEO_ARIA_LABEL)}>
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
                    {t(VIDEO_KEYS.HOME_VIDEO_ERR_BROWSER)}
                </video>

                {/* Overlay Gradient for Readability */}
                <div className={styles.overlay} aria-hidden="true"></div>
            </div>

            {/* Content on Top of Video */}
            <div className={styles.content}>
                <div className={styles.textWrapper}>
                    <h1 className={styles.title}>{displayTitle}</h1>
                    <p className={styles.subtitle}>{displaySubtitle}</p>

                    {/* CTA Button */}
                    <button
                        className={styles.ctaButton}
                        onClick={handleCTAClick}
                        aria-label={`${displayCta} - ${t(VIDEO_KEYS.HOME_VIDEO_ARIA_BTN)}`}
                    >
                        <span className={styles.ctaText}>{displayCta}</span>
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
            </div>
        </section>
    );
};

export default VideoHeroSection;
