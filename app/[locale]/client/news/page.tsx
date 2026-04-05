"use client";
import React from 'react';
import Image from 'next/image';
import styles from './news.module.css';
import NewsList from '../(common)/news-list';
import { withBasePath } from '@/services/commonService';

const NewsListingPage = () => {
    return (
        <div className={styles.container}>
            {/* Top Banner */}
            <div className={styles.bannerWrapper}>
                <Image 
                    src={withBasePath('images/home.png')} 
                    alt="Latest News"
                    fill
                    className={styles.bannerImage}
                    priority
                />
                <div className={styles.bannerOverlay}>
                </div>
            </div>

            {/* News List Section */}
            <div className={styles.contentWrapper}>
                <div className={styles.newsListContainer}>
                    <NewsList 
                        variant="horizontal" 
                        limit={4} 
                        showPagination={true}
                        sortByDate={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsListingPage;
