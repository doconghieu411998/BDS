import { Post, PostStatus, PostCategory } from '@/types/common';

// Mock data cho danh sách bài viết
export const mockPosts: Post[] = [
    {
        id: '1',
        title: 'Xu hướng thị trường bất động sản 2026',
        content: `<h2>Tổng quan thị trường</h2><p>Thị trường bất động sản năm 2026 đang có những chuyển biến tích cực...</p><h3>Phân khúc chung cư</h3><p>Giá chung cư tại các thành phố lớn tiếp tục tăng nhẹ, dao động 5-7% so với năm trước.</p>`,
        excerpt:
            'Phân tích chi tiết về xu hướng và biến động của thị trường bất động sản trong năm 2026',
        thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        category: PostCategory.MARKET,
        status: PostStatus.PUBLISHED,
        author: 'Admin',
        createdAt: '2026-01-01T10:00:00Z',
        updatedAt: '2026-01-01T10:00:00Z',
        publishedAt: '2026-01-01T10:00:00Z',
    },
    {
        id: '2',
        title: 'Hướng dẫn mua nhà lần đầu',
        content: `<h2>Chuẩn bị tài chính</h2><p>Trước khi mua nhà, bạn cần có kế hoạch tài chính rõ ràng...</p><ul><li>Đánh giá khả năng tài chính</li><li>Chuẩn bị vốn tự có</li><li>Xem xét các khoản vay</li></ul>`,
        excerpt: 'Các bước cần thiết và lưu ý quan trọng cho người mua nhà lần đầu',
        thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
        category: PostCategory.GUIDE,
        status: PostStatus.PUBLISHED,
        author: 'Admin',
        createdAt: '2026-01-05T14:30:00Z',
        updatedAt: '2026-01-05T14:30:00Z',
        publishedAt: '2026-01-05T14:30:00Z',
    },
    {
        id: '3',
        title: '5 mẹo đầu tư bất động sản hiệu quả',
        content: `<h2>Chọn vị trí chiến lược</h2><p>Vị trí là yếu tố quan trọng nhất khi đầu tư BĐS...</p><h2>Nghiên cứu thị trường</h2><p>Cần theo dõi và phân tích kỹ xu hướng thị trường.</p>`,
        excerpt: 'Những mẹo đầu tư bất động sản thông minh để tối ưu lợi nhuận',
        thumbnail: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400',
        category: PostCategory.TIPS,
        status: PostStatus.PUBLISHED,
        author: 'Admin',
        createdAt: '2026-01-08T09:15:00Z',
        updatedAt: '2026-01-08T09:15:00Z',
        publishedAt: '2026-01-08T09:15:00Z',
    },
    {
        id: '4',
        title: 'Chính sách mới về thuế bất động sản',
        content: `<h2>Điểm mới trong chính sách thuế</h2><p>Chính phủ vừa ban hành quy định mới về thuế BĐS...</p>`,
        excerpt: 'Cập nhật các chính sách thuế mới nhất ảnh hưởng đến thị trường BĐS',
        thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
        category: PostCategory.NEWS,
        status: PostStatus.DRAFT,
        author: 'Admin',
        createdAt: '2026-01-09T16:00:00Z',
        updatedAt: '2026-01-09T16:00:00Z',
    },
];

// Hàm giả lập API call
export const postService = {
    // Lấy danh sách bài viết
    async getList(params?: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{ data: Post[]; total: number }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filtered = [...mockPosts];

                // Filter by search
                if (params?.search) {
                    const searchLower = params.search.toLowerCase();
                    filtered = filtered.filter(
                        (p) =>
                            p.title.toLowerCase().includes(searchLower) ||
                            p.excerpt.toLowerCase().includes(searchLower)
                    );
                }

                // Pagination
                const page = params?.page || 1;
                const limit = params?.limit || 10;
                const start = (page - 1) * limit;
                const end = start + limit;

                resolve({
                    data: filtered.slice(start, end),
                    total: filtered.length,
                });
            }, 800);
        });
    },

    // Lấy chi tiết bài viết theo ID
    async getById(id: string): Promise<Post> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const post = mockPosts.find((p) => p.id === id);
                if (!post) {
                    reject(new Error('Không tìm thấy bài viết'));
                    return;
                }
                resolve(post);
            }, 500);
        });
    },

    // Thêm mới bài viết
    async create(data: Partial<Post>): Promise<Post> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPost: Post = {
                    id: String(Date.now()),
                    title: data.title || '',
                    content: data.content || '',
                    excerpt: data.excerpt || '',
                    thumbnail: data.thumbnail,
                    category: data.category || PostCategory.NEWS,
                    status: data.status || PostStatus.DRAFT,
                    author: 'Admin',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    publishedAt:
                        data.status === PostStatus.PUBLISHED ? new Date().toISOString() : undefined,
                };
                mockPosts.unshift(newPost);
                resolve(newPost);
            }, 1000);
        });
    },

    // Cập nhật bài viết
    async update(id: string, data: Partial<Post>): Promise<Post> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockPosts.findIndex((p) => p.id === id);
                if (index === -1) {
                    reject(new Error('Không tìm thấy bài viết'));
                    return;
                }

                const wasPublished = mockPosts[index].status === PostStatus.PUBLISHED;
                const isNowPublished = data.status === PostStatus.PUBLISHED;

                mockPosts[index] = {
                    ...mockPosts[index],
                    ...data,
                    updatedAt: new Date().toISOString(),
                    publishedAt:
                        !wasPublished && isNowPublished
                            ? new Date().toISOString()
                            : mockPosts[index].publishedAt,
                };

                resolve(mockPosts[index]);
            }, 1000);
        });
    },

    // Xóa bài viết
    async delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockPosts.findIndex((p) => p.id === id);
                if (index === -1) {
                    reject(new Error('Không tìm thấy bài viết'));
                    return;
                }

                mockPosts.splice(index, 1);
                resolve();
            }, 800);
        });
    },
};
