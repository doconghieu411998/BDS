"use client"

import usePageView from "@/hook/use-page-view"
import { DEFAULT_VIEW_EXPIRATION_MS } from "@/constants/help"

interface ArticleTrackerProps {
    newsId: string
    locale: string
}

import { ClientPostApiService } from "@/api/clientPostApiService"

export default function ArticleTracker({ newsId, locale }: ArticleTrackerProps) {
    usePageView({
        pageId: newsId,
        locale: locale,
        expirationMs: DEFAULT_VIEW_EXPIRATION_MS,
        onNewView: (pageKey) => {
            // Call API to boost view count
            ClientPostApiService.increaseViewCount(newsId);
        }
    })

    return null
}
