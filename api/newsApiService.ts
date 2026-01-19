import { NewsItem, PaginatedNews } from '@/models/news';
import newsData from '../services/mockData/news.json';

export const getNews = async (page: number = 1, limit: number = 10): Promise<PaginatedNews> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = (newsData as NewsItem[]).slice(start, end);

            resolve({
                data: paginatedData,
                total: newsData.length,
                currentPage: page,
                pageSize: limit
            });
        }, 500);
    });
};

export const getNewsDetail = async (id: string): Promise<NewsItem | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = (newsData as NewsItem[]).find(n => n.id === Number(id));
            resolve(item || null);
        }, 500);
    });
};

export const getNewsListByTag = async (tag: string): Promise<NewsItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items = newsData;
            resolve(items);
        }, 500);
    });
};
