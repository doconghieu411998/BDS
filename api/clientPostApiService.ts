import axiosClient from '@/services/axiosClient';
import { Post, PaginationResponse, PostStatus } from '@/types/common';
import { NewsItem, PaginatedNews } from '@/models/news';
import { SESSION_KEYS } from '@/constants/help';

const BASE_URL = 'post';

// Backend response structure for landing page
interface PostListResponse {
    items: Post[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

// Helper to map API Post to Client NewsItem
const mapPostToNewsItem = (post: Post): NewsItem => {
    return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        tags: post.tags || [],  // Keep full Tag objects with id and tagName
        banner: post.media?.url || '',
        createDate: post.publishedAt || post.createdAt || new Date().toISOString(),
        viewCount: post.viewCount || 0,
        active: post.status === PostStatus.PUBLISHED,
    };
};

export const ClientPostApiService = {
    // Get List of Posts for Landing Page
    async getPosts(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedNews> {
        const response = await axiosClient.post<PostListResponse>(`${BASE_URL}/getalllanding`, {
            page,
            pageSize: limit
        });

        // Map posts to news items
        const newsItems = response.data.items.map(mapPostToNewsItem);

        return {
            data: newsItems,
            total: response.data.totalItems,
            currentPage: response.data.page,
            pageSize: response.data.pageSize
        };
    },

    // Get Detail
    async getPostDetail(id: string): Promise<NewsItem | null> {
        try {
            const response = await axiosClient.get<Post>(`${BASE_URL}/${id}`);
            return mapPostToNewsItem(response.data);
        } catch (error) {
            console.error("Error fetching post detail", error);
            return null;
        }
    },

    // Get by Tag - using tag ID as query parameter
    async getPostsByTag(tagId: string | number): Promise<NewsItem[]> {
        try {
            const id = typeof tagId === 'string' ? parseInt(tagId, 10) : tagId;
            const response = await axiosClient.put<Post[]>(`${BASE_URL}/getpostbytag?id=${id}`);
            return response.data.map(mapPostToNewsItem);
        } catch (error) {
            return [];
        }
    },

    // Boost View Count
    async increaseViewCount(id: string) {
        if (typeof window === 'undefined') return;

        const sessionKey = `${SESSION_KEYS.PAGE_VIEWS}_post_${id}`;
        const hasViewed = sessionStorage.getItem(sessionKey);

        if (!hasViewed) {
            try {
                await axiosClient.put(`${BASE_URL}/boostviews?id=${id}`);
                sessionStorage.setItem(sessionKey, 'true');
            } catch (error) {
                console.error("Failed to boost view count", error);
            }
        }
    }
};
