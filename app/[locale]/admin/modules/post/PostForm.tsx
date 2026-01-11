'use client';

import React, { useEffect, useState } from 'react';
import { Post, PostFormData, PostStatus, PostCategory } from '@/types/common';
import { t } from '@/utils/i18n';
import { AntForm } from '@/crema/components/AntForm';
import { AntInput } from '@/crema/components/AntInput';
import { AntButton } from '@/crema/components/AntButton';
import { AntSelect } from '@/crema/components/AntSelect';
import { AntUpload } from '@/crema/components/AntUpload';
import RichTextEditor from '@/crema/components/RichTextEditor';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import styles from './PostForm.module.css';

interface PostFormProps {
    initialData?: Post;
    isEdit?: boolean;
    onSubmit: (data: PostFormData) => Promise<void>;
}

export default function PostForm({ initialData, isEdit = false, onSubmit }: PostFormProps) {
    const [form] = AntForm.useForm();
    const [loading, setLoading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(initialData?.thumbnail);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                title: initialData.title,
                content: initialData.content,
                excerpt: initialData.excerpt,
                category: initialData.category,
                status: initialData.status,
            });
            setThumbnailUrl(initialData.thumbnail);

            // Set fileList để hiển thị ảnh dạng list item khi edit
            if (initialData.thumbnail) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'thumbnail.jpg',
                        status: 'done',
                        url: initialData.thumbnail,
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

    const handleSubmit = async (values: PostFormData) => {
        try {
            setLoading(true);

            let thumbnailBase64 = thumbnailUrl;

            // Nếu có file mới được upload
            if (fileList.length > 0 && fileList[0].originFileObj) {
                thumbnailBase64 = await handleImageUpload(fileList[0].originFileObj as File);
            }

            const formData: PostFormData = {
                title: values.title,
                content: values.content,
                excerpt: values.excerpt,
                thumbnail: thumbnailBase64,
                category: values.category,
                status: values.status,
            };

            await onSubmit(formData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = [
        { label: t('post.categoryNews'), value: PostCategory.NEWS },
        { label: t('post.categoryGuide'), value: PostCategory.GUIDE },
        { label: t('post.categoryMarket'), value: PostCategory.MARKET },
        { label: t('post.categoryTips'), value: PostCategory.TIPS },
    ];

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
                    category: PostCategory.NEWS,
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

                    {/* Tóm tắt */}
                    <AntForm.Item
                        name="excerpt"
                        label={t('post.excerpt')}
                        rules={[
                            {
                                required: true,
                                message: t('post.excerptRequired'),
                            },
                        ]}
                    >
                        <AntInput.TextArea placeholder={t('post.excerptPlaceholder')} rows={3} />
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
