import axiosClient from '@/services/axiosClient';
import { Post, PaginationParams, PaginationResponse, PostFormData } from '@/types/common';

const BASE_URL = 'post';

export const postService = {
    // Lấy danh sách bài viết
    async getList(params: PaginationParams & { search?: string }): Promise<PaginationResponse<Post>> {
        const { page, limit, search } = params;
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (search) {
            queryParams.append('search', search);
        }

        // Backend trả về array trực tiếp, không có pagination wrapper
        const response = await axiosClient.get<Post[]>(
            `${BASE_URL}?${queryParams.toString()}`
        );

        // Wrap response vào pagination format cho frontend
        return {
            data: response.data,
            total: response.data.length, // Backend không trả total, dùng length tạm
            page,
            limit,
            totalPages: Math.ceil(response.data.length / limit),
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
};
