"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './news-list.module.css';
import { convertSlugUrl } from '@/services/commonService';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Pagination } from 'antd';
import { NewsItem } from '@/models/news';
import { ClientPostApiService } from '@/api/clientPostApiService';

interface NewsListProps {
    relatedTags?: number[];  // Changed from string[] to number[] for tag IDs
    excludeId?: number;
    limit?: number;
    showPagination?: boolean;
    title?: string;
    sortByDate?: boolean;
    className?: string; // Support custom class
    variant?: 'grid' | 'horizontal';
}

const NewsList = ({
    relatedTags,
    excludeId,
    limit,
    showPagination = true,
    title,
    sortByDate = false,
    className,
    variant = 'grid'
}: NewsListProps) => {
    const locale = useLocale();
    const [items, setItems] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const PAGE_SIZE = limit || 3;

    useEffect(() => {
        const fetchNews = async () => {
            // If relatedTags is provided, fetch a larger set to find enough items after filtering/merging
            const fetchLimit = relatedTags && relatedTags.length > 0 ? 15 : PAGE_SIZE;
            const response = await ClientPostApiService.getPosts(currentPage, fetchLimit);
            let data = response.data;

            // Smart merging logic for related posts
            if (relatedTags && relatedTags.length > 0) {
                // Filter out current item first
                const available = data.filter(item => (excludeId ? item.id !== excludeId : true));

                // Find items with same tags
                const related = available.filter(item =>
                    item.tags.some(tag => relatedTags.includes(tag.id))
                );

                // Find items without same tags (fallback pool)
                const others = available.filter(item =>
                    !related.some(r => r.id === item.id)
                );

                // Prioritize related, then fill with newest general posts
                data = [...related, ...others].slice(0, PAGE_SIZE);
            } else if (excludeId) {
                data = data.filter(item => item.id !== excludeId).slice(0, PAGE_SIZE);
            }

            // Sort by date if requested (Newest First)
            if (sortByDate) {
                data.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
            }

            setItems(data);
            setTotalItems(response.total);
        };

        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, limit, relatedTags, excludeId, sortByDate]);

    if (!items || items.length === 0) return null;

    return (
        <div className={`${styles.newsSectionWrapper} ${className || ''}`}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}

            <div className={variant === 'grid' ? styles.newsGrid : styles.newsListHorizontal}>
                {items.map((item) => {
                    const urlSlug = `${convertSlugUrl(item.title, locale)}-${item.id}.html`;
                    const formattedDate = new Date(item.createDate).toLocaleDateString('vi-VN');

                    if (variant === 'horizontal') {
                        return (
                            <div key={item.id} className={styles.newsCardHorizontal}>
                                <div className={styles.imageWrapperHorizontal}>
                                    <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}>
                                        <Image src={item.banner || '/images/placeholder.jpg'} alt={item.title} fill className={styles.image} />
                                    </Link>
                                    {item.tags.length > 0 && (
                                        <span className={styles.floatingTag}>{item.tags[0].tagName}</span>
                                    )}
                                </div>

                                <div className={styles.cardBodyHorizontal}>
                                    <div className={styles.cardHeaderHorizontal}>
                                         {item.tags.length > 0 && (
                                            <span className={styles.categoryBadge}>{item.tags[0].tagName}</span>
                                        )}
                                        <h3 className={styles.cardTitleHorizontal}>
                                            <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                        <p className={styles.descriptionHorizontal}>{item.description}</p>
                                    </div>

                                    <div className={styles.cardFooterHorizontal}>
                                        <span className={styles.metaItem}>Ngày đăng: {formattedDate}</span>
                                        <span className={styles.separator}>|</span>
                                        <span className={styles.metaItem}>Lượt xem: {item.viewCount || 0}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={item.id} className={styles.newsCard}>
                            <div className={styles.imageWrapper}>
                                <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}>
                                    <Image src={item.banner || '/images/placeholder.jpg'} alt={item.title} fill className={styles.image} />
                                </Link>
                                {/* Hiển thị tag đầu tiên lên ảnh cho đẹp */}
                                {item.tags.length > 0 && (
                                    <span className={styles.floatingTag}>{item.tags[0].tagName}</span>
                                )}
                            </div>

                            <div className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>
                                    <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}>
                                        {item.title}
                                    </Link>
                                </h3>

                                <div className={styles.cardFooter}>
                                    <span className={styles.date}>{formattedDate}</span>
                                    <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }} className={styles.arrowBtn}>
                                        <div className={styles.circleArrow}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showPagination && totalItems > PAGE_SIZE && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={PAGE_SIZE}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
};

export default NewsList;