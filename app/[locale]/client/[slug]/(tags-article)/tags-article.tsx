// app/[locale]/tin-tuc/[slug]/views/tag-list-view.tsx
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import styles from './tags-article.module.css';
import { NewsItem } from '@/models/news';

interface TagListViewProps {
    tagSlug: string;
    tagName?: string;
    articles: NewsItem[];
    locale: string;
}

export default function TagArticleList({ tagSlug, tagName, articles, locale }: TagListViewProps) {
    const displayName = tagName || tagSlug;

    return (
        <div className={styles.container}>
            {/* HEADER: TAG: HLV LÊ HUỲNH ĐỨC */}
            <div className={styles.headerWrapper}>
                <h1 className={styles.heading}>
                    <span className={styles.tagLabel}>TAG:</span> {displayName}
                </h1>
            </div>

            {/* LIST ARTICLE */}
            <div className={styles.listWrapper}>
                {articles && articles?.length > 0 ? (
                    articles.map((item) => (
                        <article key={item.id} className={styles.articleItem}>
                            {/* Cột trái: Hình ảnh */}
                            <div className={styles.imageWrapper}>
                                <Link href={`/${locale}/client/${slugify(item.title, { lower: true, strict: true })}-${item.id}.html`}>
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
                                    <Link href={`/${locale}/client/${slugify(item.title, { lower: true, strict: true })}-${item.id}.html`} style={{ textDecoration: 'none' }}>
                                        <h3 className={styles.title}>{item.title}</h3>
                                    </Link>
                                </div>

                                <p className={styles.description}>
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>Không có bài viết nào thuộc chủ đề này.</p>
                    </div>
                )}
            </div>

            {/* Bạn có thể thêm component Pagination ở dưới đây nếu cần */}
        </div>
    );
}