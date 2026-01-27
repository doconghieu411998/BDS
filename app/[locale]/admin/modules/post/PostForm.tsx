'use client';

import React, { useEffect, useState } from 'react';
import { Post, PostFormData, PostStatus, PostCategory, Tag } from '@/types/common';
import { TagApiService } from '@/api/tagApiService';
import { t } from '@/utils/i18n';
import { AntForm } from '@/crema/components/AntForm';
import { AntInput } from '@/crema/components/AntInput';
import { AntButton } from '@/crema/components/AntButton';
import { AntSelect } from '@/crema/components/AntSelect';
import { AntUpload } from '@/crema/components/AntUpload';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@/crema/components/RichTextEditor'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đang tải editor...</div>,
});

import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, FormInstance } from 'antd';
import styles from './PostForm.module.css';

interface PostFormProps {
    initialData?: Post;
    isEdit?: boolean;
    onSubmit: (data: any) => Promise<void>;
}

export default function PostForm({ initialData, isEdit = false, onSubmit }: PostFormProps) {
    const [form] = AntForm.useForm();
    const [loading, setLoading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(initialData?.media?.url);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        TagApiService.getTags().then((data) => {
            setTags(data);
        }).catch((err) => {
            console.error("Failed to fetch tags", err);
        });
    }, []);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                title: initialData.title,
                content: initialData.content,
                description: initialData.description,
                category: initialData.tags?.map((t: any) => t.tagName || t) || [], // Handle both object and string if mix
                status: initialData.status,
            });
            setThumbnailUrl(initialData.media?.url);

            // Set fileList để hiển thị ảnh dạng list item khi edit
            if (initialData.media?.url) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.jpg',
                        status: 'done',
                        url: initialData.media.url,
                    },
                ]);
            }
        }
    }, [initialData, form]);

    const handleImageUpload = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);

            let thumbnailBase64 = null;

            // Nếu có file mới được upload
            if (fileList.length > 0 && fileList[0].originFileObj) {
                thumbnailBase64 = await handleImageUpload(fileList[0].originFileObj as File);
            }

            const formData: PostFormData = {
                id: initialData ? initialData.id : undefined,
                title: values.title,
                description: values.description,
                content: values.content,
                media: {
                    ...initialData?.media,
                    imageBase64: thumbnailBase64 || null,
                },
                tags: Array.isArray(values.category) ? values.category : [values.category],
                status: +values.status,
                viewCount: initialData ? initialData.viewCount : 0,
            };

            await onSubmit(formData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = tags.map(tag => ({ label: tag.tagName, value: tag.tagName }));

    const statusOptions = [
        { label: t('post.statusDraft'), value: PostStatus.DRAFT },
        { label: t('post.statusPublished'), value: PostStatus.PUBLISHED },
        { label: t('post.statusArchived'), value: PostStatus.ARCHIVED },
    ];

    return (
        <div className={styles.formContainer}>
            <AntForm
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    status: PostStatus.DRAFT,
                }}
            >
                <div className={styles.formGrid}>
                    {/* Tiêu đề */}
                    <AntForm.Item
                        name="title"
                        label={t('post.title')}
                        rules={[
                            {
                                required: true,
                                message: t('post.titleRequired'),
                            },
                        ]}
                    >
                        <AntInput placeholder={t('post.titlePlaceholder')} size="large" />
                    </AntForm.Item>

                    <AntForm.Item
                        name="description"
                        label={'Mô tả'}
                        rules={[
                            {
                                required: true,
                                message: ('Mô tả bài viết là bắt buộc'),
                            },
                        ]}
                    >
                        <AntInput.TextArea placeholder={'Nhập mô tả bài viết'} rows={3} />
                    </AntForm.Item>

                    {/* Danh mục và Trạng thái */}
                    <div className={styles.formRow}>
                        <AntForm.Item
                            name="category"
                            label={t('post.category')}
                            rules={[
                                {
                                    required: true,
                                    message: t('post.categoryRequired'),
                                },
                            ]}
                        >
                            <AntSelect
                                options={categoryOptions}
                                placeholder={t('post.categoryPlaceholder')}
                                size="large"
                                mode="tags"
                                maxCount={4}
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="status"
                            label={t('post.status')}
                            rules={[
                                {
                                    required: true,
                                    message: t('post.statusRequired'),
                                },
                            ]}
                        >
                            <AntSelect
                                options={statusOptions}
                                placeholder={t('post.statusPlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>
                    </div>

                    {/* Ảnh đại diện */}
                    <div className={styles.formItem}>
                        <label className={styles.label}>{t('post.thumbnail')}</label>
                        <AntUpload
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false}
                            maxCount={1}
                            accept="image/*"
                            listType="picture"
                        >
                            <AntButton icon={<UploadOutlined />}>
                                {t('common.uploadImage')}
                            </AntButton>
                        </AntUpload>
                    </div>

                    {/* Nội dung */}
                    <AntForm.Item
                        name="content"
                        label={t('post.content')}
                        rules={[
                            {
                                required: true,
                                message: t('post.contentRequired'),
                            },
                        ]}
                    >
                        <RichTextEditor
                            value={form.getFieldValue('content')}
                            onChange={(value) => form.setFieldValue('content', value)}
                        />
                    </AntForm.Item>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <AntButton type="default" size="large" onClick={() => window.history.back()}>
                        {t('common.cancel')}
                    </AntButton>
                    <AntButton type="primary" htmlType="submit" size="large" loading={loading}>
                        {isEdit ? t('common.update') : t('common.create')}
                    </AntButton>
                </div>
            </AntForm>
        </div>
    );
}
