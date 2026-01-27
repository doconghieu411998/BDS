import { Tag } from '@/types/common';

export interface NewsItem {
    id: number;
    title: string;
    description: string;
    content: string;
    tags: Tag[];  // Changed from string[] to Tag[] to preserve tag IDs
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