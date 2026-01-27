import { NewsItem, PaginatedNews } from '@/models/news';
import newsData from '../services/mockData/news.json';

// Map mock data tags (string[]) to Tag objects (Tag[]) to match the NewsItem interface
const processedNewsData: NewsItem[] = (newsData as any[]).map(item => ({
    ...item,
    tags: item.tags.map((tagName: string, index: number) => ({
        id: index + 1,
        tagName: tagName
    }))
}));

export const getNews = async (page: number = 1, limit: number = 10): Promise<PaginatedNews> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = processedNewsData.slice(start, end);

            resolve({
                data: paginatedData,
                total: processedNewsData.length,
                currentPage: page,
                pageSize: limit
            });
        }, 500);
    });
};

export const getNewsDetail = async (id: string): Promise<NewsItem | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = processedNewsData.find(n => n.id === Number(id));
            resolve(item || null);
        }, 500);
    });
};

export const getNewsListByTag = async (tag: string): Promise<NewsItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items = processedNewsData.filter(item =>
                item.tags.some(t => t.tagName === tag)
            );
            resolve(items);
        }, 500);
    });
};
