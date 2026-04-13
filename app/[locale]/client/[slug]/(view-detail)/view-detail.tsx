import Image from 'next/image';
import styles from './view-detail.module.css';
import ArticleTracker from './article-tracker';
import NewsList from '../../(common)/news-list';
import { NewsItem } from '@/models/news';
import { Link } from '@/i18n/navigation';
import { convertSlugUrl } from '@/services/commonService';
import { NEWS_DETAIL_KEYS } from '@/constants/localeKeys';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();
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

        </article>
      </div>

      <section className={styles.relatedSection}>
        <div className={styles.relatedWrapper}>
          <h2 className={styles.relatedTitle}>Bài viết liên quan</h2>

          {item.tags && item.tags.length > 0 && (
            <div className={styles.relatedTagContainer}>
              <span className={styles.tagPrefix}>{t(NEWS_DETAIL_KEYS.new_detail_tag)}:</span>
              <div className={styles.relatedTagList}>
                {item.tags.map((tag, index) => {
                  const tagSlug = `${convertSlugUrl(tag.tagName, locale)}-t${tag.id}.html`;
                  return (
                    <Link
                      key={index}
                      href={`/client/${tagSlug}` as any}
                      className={styles.relatedTagItem}
                    >
                      {tag.tagName}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <NewsList
            relatedTags={item.tags.map(t => t.id)}
            excludeId={item.id}
            limit={3}
            showPagination={false}
          />

          <div className={styles.seeMoreWrapper}>
            <Link href="/client/news" className={styles.seeMoreBtn}>
              {t(NEWS_DETAIL_KEYS.new_detail_more_btn_label)}
            </Link>
          </div>
        </div>
      </section>

      <ArticleTracker newsId={String(item.id)} locale={locale} />
    </main>
  );
}