import axiosClient from '@/services/axiosClient';
import { Post, PostStatus, PostCategory, PaginationParams, PaginationResponse } from '@/types/common';

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
    async create(data: Partial<Post>): Promise<Post> {
        const response = await axiosClient.post<Post>(`${BASE_URL}`, data);
        return response.data;

        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         const newPost: Post = {
        //             id: String(Date.now()),
        //             title: data.title || '',
        //             content: data.content || '',
        //             excerpt: data.excerpt || '',
        //             thumbnail: data.thumbnail,
        //             category: data.category || PostCategory.NEWS,
        //             status: data.status || PostStatus.DRAFT,
        //             author: 'Admin',
        //             createdAt: new Date().toISOString(),
        //             updatedAt: new Date().toISOString(),
        //             publishedAt:
        //                 data.status === PostStatus.PUBLISHED ? new Date().toISOString() : undefined,
        //         };
        //         // mockPosts.unshift(newPost);
        //         resolve(newPost);
        //     }, 1000);
        // });
    },

    // Cập nhật bài viết
    // async update(id: string, data: Partial<Post>): Promise<Post> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             const index = mockPosts.findIndex((p) => p.id === id);
    //             if (index === -1) {
    //                 reject(new Error('Không tìm thấy bài viết'));
    //                 return;
    //             }

    //             const wasPublished = mockPosts[index].status === PostStatus.PUBLISHED;
    //             const isNowPublished = data.status === PostStatus.PUBLISHED;

    //             mockPosts[index] = {
    //                 ...mockPosts[index],
    //                 ...data,
    //                 updatedAt: new Date().toISOString(),
    //                 publishedAt:
    //                     !wasPublished && isNowPublished
    //                         ? new Date().toISOString()
    //                         : mockPosts[index].publishedAt,
    //             };

    //             resolve(mockPosts[index]);
    //         }, 1000);
    //     });
    // },

    // Xóa bài viết
    // async delete(id: string): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             const index = mockPosts.findIndex((p) => p.id === id);
    //             if (index === -1) {
    //                 reject(new Error('Không tìm thấy bài viết'));
    //                 return;
    //             }

    //             mockPosts.splice(index, 1);
    //             resolve();
    //         }, 800);
    //     });
    // },
};
