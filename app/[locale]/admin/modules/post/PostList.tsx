'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Post, PostStatus, PostCategory } from '@/types/common';
import { postService } from './postApiService';
import { t } from '@/utils/i18n';
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
            // setTotal(result.total);
        } catch {
            notifyError(t('common.error'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPosts(currentPage, searchText);
    }, [currentPage, searchText, loadPosts]);

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
            // await postService.delete(deleteId);
            notifySuccess(t('post.deleteSuccess'));
            loadPosts(currentPage, searchText);
            setDeleteId(null);
        } catch {
            notifyError(t('common.error'));
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            [PostStatus.PUBLISHED]: {
                text: t('post.statusPublished'),
                className: styles.statusPublished,
            },
            [PostStatus.DRAFT]: {
                text: t('post.statusDraft'),
                className: styles.statusDraft,
            },
            [PostStatus.ARCHIVED]: {
                text: t('post.statusArchived'),
                className: styles.statusArchived,
            },
        };

        const statusInfo = statusMap[status];
        return (
            <span className={`${styles.statusBadge} ${statusInfo.className}`}>
                {statusInfo.text}
            </span>
        );
    };

    const getCategoryBadge = (category: PostCategory) => {
        const categoryMap = {
            [PostCategory.NEWS]: t('post.categoryNews'),
            [PostCategory.GUIDE]: t('post.categoryGuide'),
            [PostCategory.MARKET]: t('post.categoryMarket'),
            [PostCategory.TIPS]: t('post.categoryTips'),
        };

        return <span className={styles.categoryBadge}>{categoryMap[category]}</span>;
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
            title: t('post.title'),
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t('post.category'),
            dataIndex: 'category',
            key: 'category',
            width: 120,
            render: (_: unknown, record: Post) => getCategoryBadge(record.category),
        },
        {
            title: t('post.status'),
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
            title: t('post.publishedAt'),
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            width: 130,
            render: (_: unknown, record: Post) => formatDate(record.publishedAt),
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
                    placeholder: t('post.searchPlaceholder'),
                    onSearch: handleSearch,
                }}
                title={t('menu.postList')}
                onAdd={handleCreate}
                addButtonText={t('post.createPost')}
                onEdit={(record) => handleEdit(record.id)}
                onDelete={(record) => setDeleteId(record.id)}
            />

            <DialogConfirm
                open={!!deleteId}
                title={t('post.deletePost')}
                content={t('post.deleteConfirm')}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
}
