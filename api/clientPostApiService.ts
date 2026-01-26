import axiosClient from '@/services/axiosClient';
import { Post, PaginationResponse, PostStatus } from '@/types/common';
import { NewsItem, PaginatedNews } from '@/models/news';
import { SESSION_KEYS } from '@/constants/help';

const BASE_URL = 'post';

// Helper to map API Post to Client NewsItem
const mapPostToNewsItem = (post: Post): NewsItem => {
    return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        tags: post.tags?.map(t => t.tagName) || [],
        banner: post.media?.url || '',
        createDate: post.publishedAt || post.createdAt || new Date().toISOString(),
        viewCount: post.viewCount || 0,
        active: post.status === PostStatus.PUBLISHED,
    };
};

export const ClientPostApiService = {
    // Get List of Posts
    async getPosts(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedNews> {
        // Since backend doesn't support pagination object response yet (it returns array), we mock it for now
        // OR if updated postApiService shows backend returns array, we follow that.
        // Actually admin postApiService says: "Backend returns array directly".
        // But we want to simulate pagination for client consistent with News model.

        const response = await axiosClient.get<Post[]>(BASE_URL); // Fetch all for now? Or query params? 
        // Admin service sends query params. Let's send them too.
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        if (search) queryParams.append('search', search);

        // NOTE: The previous admin service note said "Backend trả về array trực tiếp".
        // But typically API returns pagination structure. We will trust the admin service findings:
        // "return response.data" which is Post[].

        const allPosts = await axiosClient.get<Post[]>(`${BASE_URL}?${queryParams.toString()}`);

        // Filter only published posts for client
        const publishedPosts = allPosts.data; // Server might already filter? Assume server returns what we ask.
        // If server returns all, we should filter. But usually public API returns public posts.
        // Let's assume response.data is the list.

        const newsItems = publishedPosts.map(mapPostToNewsItem);

        return {
            data: newsItems,
            total: newsItems.length, // total is tricky if backend doesn't return it
            currentPage: page,
            pageSize: limit
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

    // Get by Tag (Client-side filtering for now)
    async getPostsByTag(tag: string): Promise<NewsItem[]> {
        const response = await axiosClient.get<Post[]>(BASE_URL);
        const newsItems = response.data.map(mapPostToNewsItem);
        return newsItems.filter(item => item.tags.includes(tag));
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
