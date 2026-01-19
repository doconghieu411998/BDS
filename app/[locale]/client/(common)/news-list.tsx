"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './news-list.module.css';
import { convertSlugUrl } from '@/services/commonService';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Pagination } from 'antd';
import { NewsItem } from '@/models/news';
import { getNews } from '@/api/newsApiService';

interface NewsListProps {
    relatedTags?: string[];
    excludeId?: number;
    limit?: number;
    showPagination?: boolean;
    title?: string;
}

const NewsList = ({
    relatedTags,
    excludeId,
    limit,
    showPagination = true,
    title
}: NewsListProps) => {
    const locale = useLocale();
    const [items, setItems] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const PAGE_SIZE = limit || 4;

    useEffect(() => {
        const fetchNews = async () => {
            // Giả sử API hỗ trợ truyền limit và page
            const response = await getNews(currentPage, PAGE_SIZE);
            let data = response.data;

            // 1. Nếu là mode "Bài liên quan": Lọc theo tags và loại trừ ID hiện tại
            // if (relatedTags && relatedTags.length > 0) {
            //     data = data.filter(item =>
            //         item.id !== excludeId &&
            //         item.tags.some(tag => relatedTags.includes(tag))
            //     );
            // }

            // 2. Nếu dùng cho Landing Page hoặc Detail, thường chỉ lấy 1 số lượng nhất định
            if (limit) {
                data = data.slice(0, limit);
            }

            setItems(data);
            setTotalItems(response.total);
        };

        fetchNews();
    }, [currentPage, relatedTags, excludeId, limit]);

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
                                    <Image src={item.banner} alt={item.title} fill className={styles.image} />
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