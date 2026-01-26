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
    relatedTags?: string[];
    excludeId?: number;
    limit?: number;
    showPagination?: boolean;
    title?: string;
    sortByDate?: boolean;
}

const NewsList = ({
    relatedTags,
    excludeId,
    limit,
    showPagination = true,
    title,
    sortByDate = false
}: NewsListProps) => {
    const locale = useLocale();
    const [items, setItems] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const PAGE_SIZE = limit || 4;

    useEffect(() => {
        const fetchNews = async () => {
            // Use Client Service
            const response = await ClientPostApiService.getPosts(currentPage, PAGE_SIZE);
            let data = response.data;

            // 1. Filter by related tags and exclude current ID
            if (relatedTags && relatedTags.length > 0) {
                // Not modifying existing related tags logic
                if (relatedTags[0]) {
                    const related = await ClientPostApiService.getPostsByTag(relatedTags[0]);
                    data = related;
                }
            }

            if (excludeId) {
                data = data.filter(item => item.id !== excludeId);
            }

            // Sort by date if requested (Newest First)
            if (sortByDate) {
                data.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
            }

            // 2. Limit if needed
            if (limit) {
                data = data.slice(0, limit);
            }

            setItems(data);
            setTotalItems(response.total);
        };

        fetchNews();
    }, [currentPage, relatedTags, excludeId, limit, PAGE_SIZE, sortByDate]);

    if (!items || items.length === 0) return null;

    return (
        <div className={styles.newsSectionWrapper}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}

            <div className={styles.newsGrid}>
                {items.map((item) => {
                    const urlSlug = `${convertSlugUrl(item.title, locale)}-${item.id}.html`;
                    const formattedDate = new Date(item.createDate).toLocaleDateString('vi-VN');

                    return (
                        <div key={item.id} className={styles.newsCard}>
                            <div className={styles.imageWrapper}>
                                <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}>
                                    <Image src={item.banner || '/images/placeholder.jpg'} alt={item.title} fill className={styles.image} />
                                </Link>
                                {/* Hiển thị tag đầu tiên lên ảnh cho đẹp */}
                                {item.tags.length > 0 && (
                                    <span className={styles.floatingTag}>{item.tags[0]}</span>
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
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
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