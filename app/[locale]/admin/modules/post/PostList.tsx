'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Post, PostStatus, PostCategory } from '@/types/common';
import { postService } from './postApiService';
import { ROUTES } from '@/constants/routes';
import DataTable from '@/crema/core/DataTable';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import DialogConfirm from '@/crema/core/DialogConfirm';
import type { ColumnType } from '@/crema/core/DataTable/types';
import styles from './PostList.module.css';

export default function PostList() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const loadPosts = useCallback(async (page: number, search: string) => {
        setLoading(true);
        try {
            const result = await postService.getList({
                page,
                limit: 10,
                search,
            });
            setPosts(result.data);
            setTotal(result.total);
        } catch {
            notifyError('Lỗi');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPosts(currentPage, searchText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, searchText]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCreate = () => {
        router.push(ROUTES.POST.CREATE);
    };

    const handleEdit = (id: string) => {
        router.push(ROUTES.POST.EDIT(id));
    };

    const handleDeleteConfirm = async () => {
        if (!deleteId) return;

        try {
            await postService.delete(deleteId);
            notifySuccess('Xóa bài viết thành công!');
            loadPosts(currentPage, searchText);
            setDeleteId(null);
        } catch {
            notifyError('Lỗi');
        }
    };

    const getStatusBadge = (status: PostStatus) => {
        const statusMap = {
            [PostStatus.PUBLISHED]: {
                text: 'Đã xuất bản',
                className: styles.statusPublished,
            },
            [PostStatus.DRAFT]: {
                text: 'Bản nháp',
                className: styles.statusDraft,
            },
            [PostStatus.ARCHIVED]: {
                text: 'Lưu trữ',
                className: styles.statusArchived,
            },
        };

        const statusInfo = statusMap[status] || statusMap[PostStatus.DRAFT];
        return (
            <span className={`${styles.statusBadge} ${statusInfo.className}`}>
                {statusInfo.text}
            </span>
        );
    };

    const getTagsBadge = (tags: any[]) => {
        if (!tags || !Array.isArray(tags)) return null;

        return (
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {tags.map((tag, index) => (
                    <span key={index} className={styles.categoryBadge}>
                        {tag.tagName || tag}
                    </span>
                ))}
            </div>
        );
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const columns: ColumnType<Post>[] = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'media',
            key: 'media',
            width: 100,
            render: (media: any) => (
                media?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={media.url}
                        alt="banner"
                        style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }}
                    />
                ) : null
            ),
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 200,
            render: (_: unknown, record: Post) => getTagsBadge(record.tags),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (_: unknown, record: Post) => getStatusBadge(record.status),
        },
        {
            title: 'ViewCount',
            dataIndex: 'viewCount',
            key: 'viewCount',
            width: 120,
        },
        {
            title: 'Ngày xuất bản',
            dataIndex: 'createDate',
            key: 'createDate',
            width: 130,
            render: (_: unknown, record: Post) => formatDate(record.createDate),
        },
    ];

    return (
        <div className={styles.container}>
            <DataTable<Post>
                columns={columns}
                dataSource={posts}
                loading={loading}
                pagination={{
                    current: currentPage,
                    pageSize: 10,
                    total,
                    onChange: handlePageChange,
                }}
                searchConfig={{
                    placeholder: 'Tìm kiếm bài viết...',
                    onSearch: handleSearch,
                }}
                title={'Danh sách bài viết'}
                onAdd={handleCreate}
                addButtonText={'Tạo bài viết'}
                onEdit={(record) => handleEdit(record.id?.toString())}
                onDelete={(record) => setDeleteId(record.id?.toString())}
            />

            <DialogConfirm
                open={!!deleteId}
                title={'Xóa bài viết'}
                content={'Bạn có chắc chắn muốn xóa bài viết này?'}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
}
