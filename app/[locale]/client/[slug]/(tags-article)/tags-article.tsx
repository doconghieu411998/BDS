"use client";

// app/[locale]/tin-tuc/[slug]/views/tag-list-view.tsx
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import slugify from 'slugify';
import styles from './tags-article.module.css';
import { NewsItem } from '@/models/news';
import { withBasePath } from '@/services/commonService';
import { NEWS_DETAIL_KEYS } from '@/constants/localeKeys';
import { useTranslations } from 'next-intl';

interface TagListViewProps {
    tagSlug: string;
    tagName?: string;
    articles: NewsItem[];
    locale: string;
}

export default function TagArticleList({ tagSlug, tagName, articles, locale }: TagListViewProps) {
    const t = useTranslations();
    const displayName = tagName || tagSlug;

    return (
        <div className={styles.container}>
            {/* Top Banner */}
            <div className={styles.bannerWrapper}>
                <Image
                    src={withBasePath('images/home_bg_1.png')}
                    alt="Latest News"
                    fill
                    className={styles.bannerImage}
                    priority
                />
                <div className={styles.bannerOverlay}>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.headerWrapper}>
                    <h1 className={styles.heading}>
                        <span className={styles.tagLabel}>{t(NEWS_DETAIL_KEYS.new_detail_tag)}:</span> {displayName}
                    </h1>
                </div>

                {/* LIST ARTICLE */}
                <div className={styles.listWrapper}>
                    {articles && articles?.length > 0 ? (
                        articles.map((item) => {
                            const urlSlug = `${slugify(item.title, { lower: true, strict: true })}-${item.id}.html`;
                            return (
                                <article key={item.id} className={styles.articleItem}>
                                    {/* Cột trái: Hình ảnh */}
                                    <div className={styles.imageWrapper}>
                                        <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}>
                                            <Image
                                                src={item.banner || '/images/placeholder.jpg'} // Fallback ảnh
                                                alt={item.title}
                                                fill
                                                className={styles.thumbnail}
                                                sizes="(max-width: 768px) 100vw, 300px"
                                            />
                                        </Link>
                                    </div>

                                    {/* Cột phải: Nội dung */}
                                    <div className={styles.contentWrapper}>
                                        <div className={styles.metaRow}>
                                            <Link href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }} style={{ textDecoration: 'none' }}>
                                                <h3 className={styles.title}>{item.title}</h3>
                                            </Link>
                                        </div>

                                        <p className={styles.description}>
                                            {item.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Không có bài viết nào thuộc chủ đề này.</p>
                        </div>
                    )}
                </div>

                {/* Bạn có thể thêm component Pagination ở dưới đây nếu cần */}
            </div>
        </div>
    );
}