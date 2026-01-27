import Image from 'next/image';
import styles from './view-detail.module.css';
import ArticleTracker from './article-tracker';
import NewsList from '../../(common)/news-list';
import { NewsItem } from '@/models/news';
import { Link } from '@/i18n/navigation';
import { convertSlugUrl } from '@/services/commonService';

interface Props {
  item: NewsItem;
  slug: string;
  locale: string;
}

// Helper to auto-generate captions from alt text
const processContent = (content: string) => {
  if (!content) return '';
  return content.replace(
    /(<img\s[^>]*?alt=["']([^"']+)["'][^>]*?>)/gi,
    (match, imgTag, altText) => {
      if (!altText || altText.trim() === '') return match;
      return `${match}<p class="img-caption">${altText}</p>`;
    }
  );
};

export default async function NewsDetailView({ item, locale }: Props) {
  const processedContent = processContent(item.content);
  return (
    <main className={styles.container}>
      <section className={styles.bannerWrapper}>
        <Image
          src={item.banner || '/images/placeholder.jpg'}
          alt={item.title}
          fill
          priority
          className={styles.bannerImage}
        />
      </section>

      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          {item.tags?.length > 0 && (
            <span className={styles.categoryBadge}>{item.tags[0].tagName}</span>
          )}

          <h1 className={styles.title}>{item.title}</h1>

          <div className={styles.meta}>
            <span>Ngày đăng: {new Date(item.createDate).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}</span>
            <span className={styles.separator}>|</span>
            <span>Lượt xem: {item.viewCount}</span>
          </div>
        </header>

        <article className={styles.articleBody}>
          {item.description && (
            <p className={styles.description}>{item.description}</p>
          )}

          <div
            className={styles.htmlContent}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {item.tags && item.tags.length > 0 && (
            <div className={styles.tagSection}>
              <span className={styles.tagLabel}>CHỦ ĐỀ:</span>
              <div className={styles.tagList}>
                {item.tags.map((tag, index) => {
                  const tagSlug = `${convertSlugUrl(tag.tagName, locale)}-t${tag.id}.html`;
                  return (
                    <Link
                      key={index}
                      href={`/client/${tagSlug}` as any}
                      className={styles.tagItem}
                    >
                      {tag.tagName}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </article>

        {/* Pass tag IDs instead of tag names to NewsList */}
        <NewsList
          relatedTags={item.tags.map(t => t.id)}
          excludeId={item.id}
          limit={4}
          showPagination={true}
          className={styles.relatedNews}
        />
      </div>

      <ArticleTracker newsId={String(item.id)} locale={locale} />
    </main>
  );
}