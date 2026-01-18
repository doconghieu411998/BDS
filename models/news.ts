export interface NewsItem {
    id: number;
    title: string;
    description: string;
    content: string;
    tags: string[];
    banner: string;
    createDate: string;
    viewCount: number;
    active: boolean;
}

export interface PaginatedNews {
    data: NewsItem[];
    total: number;
    currentPage: number;
    pageSize: number;
}