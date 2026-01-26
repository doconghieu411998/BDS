import NewsDetailView from "./(view-detail)/view-detail";
import { getIdFromSlug, getTagFromSlug } from "@/services/commonService";
import { ClientPostApiService } from "@/api/clientPostApiService";
import { notFound } from "next/navigation";
import TagArticleList from "./(tags-article)/tags-article";
import { getLocale } from "next-intl/server";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    const locale = await getLocale();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const { slug } = await params;

    const currentUrl = `${baseUrl}/${locale}${slug}`;

    const alternatesLanguages = {
        'vi': `${baseUrl}/vi${slug}`,
        'en': `${baseUrl}/en${slug}`,
    };

    const id = getIdFromSlug(slug);

    if (id) {
        const newsItem = await ClientPostApiService.getPostDetail(id);

        if (!newsItem) {
            return notFound();
        }

        return {
            title: `${newsItem?.title} | Greenhill Village Quy Nhon`,
            description: newsItem?.description,
            alternates: {
                canonical: currentUrl,
                languages: alternatesLanguages,
            },
            openGraph: {
                title: newsItem.title,
                description: newsItem?.description,
                url: currentUrl,
                siteName: 'Greenhill Village Quy Nhon',
                images: [
                    {
                        url: newsItem?.banner,
                        width: 1200,
                        height: 630,
                        alt: newsItem?.title,
                    },
                ],
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: newsItem?.title,
                description: newsItem?.description,
                images: [newsItem?.banner],
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    }

    const tag = getTagFromSlug(slug);

    if (!tag) {
        return notFound();
    }

    const url = `${baseUrl}/${locale}/${slug}`;

    return {
        title: `${tag} | Greenhill Village Quy Nhon`,
        description: tag,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: tag,
            description: tag,
            url: url,
            siteName: 'Greenhill Village Quy Nhon',
            locale: locale === 'vi' ? 'vi_VN' : 'en_US',
            type: 'article',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function SlugPage({ params }: Props) {

    const locale = await getLocale();

    const { slug } = await params;

    const id = getIdFromSlug(slug);

    if (id) {
        const newsItem = await ClientPostApiService.getPostDetail(id);

        if (!newsItem) {
            return notFound();
        }

        return (
            <>
                <NewsDetailView item={newsItem} slug={slug} locale={locale} />
            </>
        );
    }

    const tag = getTagFromSlug(slug);

    if (!tag) {
        return notFound();
    }

    const articles = await ClientPostApiService.getPostsByTag(tag);

    return (
        <>
            <TagArticleList tagSlug={tag} articles={articles} locale={locale} />
        </>
    );
}