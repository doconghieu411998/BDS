import axiosClient from '@/services/axiosClient';
import { Post, PaginationParams, PaginationResponse, PostFormData } from '@/types/common';

const BASE_URL = 'post';

// Backend response structure
interface PostListResponse {
    items: Post[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export const postService = {
    // Lấy danh sách bài viết
    async getList(params: PaginationParams & { search?: string }): Promise<PaginationResponse<Post>> {
        const { page, limit, search } = params;

        const response = await axiosClient.post<PostListResponse>(`${BASE_URL}/getall`, {
            page,
            pageSize: limit,
            title: search || ''
        });

        // Map backend response to frontend PaginationResponse format
        return {
            data: response.data.items,
            total: response.data.totalItems,
            page: response.data.page,
            limit: response.data.pageSize,
            totalPages: response.data.totalPages
        };
    },

    // Lấy chi tiết bài viết theo ID
    async getById(id: string): Promise<Post> {
        const response = await axiosClient.get<Post>(`${BASE_URL}/${id}`);
        return response.data;
    },

    // Thêm mới bài viết
    async create(data: PostFormData): Promise<Post> {
        const response = await axiosClient.post<Post>(`${BASE_URL}`, data);
        return response.data;
    },

    async update(id: string, data: PostFormData): Promise<Post> {
        const response = await axiosClient.put<Post>(`${BASE_URL}/${id}`, data);
        return response.data;
    },

    // Xoá bài viết
    async delete(id: string): Promise<void> {
        await axiosClient.delete(`${BASE_URL}/${id}`);
    },
};
