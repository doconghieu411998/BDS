'use client';

import React, { useEffect, useState } from 'react';
import { Post, PostFormData, PostStatus, Tag } from '@/types/common';
import { TagApiService } from '@/api/tagApiService';
import { AntForm } from '@/crema/components/AntForm';
import { AntInput } from '@/crema/components/AntInput';
import { AntButton } from '@/crema/components/AntButton';
import { AntSelect } from '@/crema/components/AntSelect';
import { AntUpload } from '@/crema/components/AntUpload';
import { Image } from 'antd';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@/crema/components/RichTextEditor'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đang tải editor...</div>,
});

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
                category: initialData.tags?.map((t: Tag | string) => typeof t === 'string' ? t : t.tagName) || [],
                status: initialData.status,
                thumbnail: initialData.media?.url || '', // Set thumbnail for validation
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

    const handleSubmit = async (values: {
        title: string;
        description: string;
        content: string;
        category: string | string[];
        status: PostStatus;
    }) => {
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
        { label: 'Bản nháp', value: PostStatus.DRAFT },
        { label: 'Đã xuất bản', value: PostStatus.PUBLISHED },
        { label: 'Lưu trữ', value: PostStatus.ARCHIVED },
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
                        label={'Tiêu đề'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiêu đề!',
                            },
                        ]}
                    >
                        <AntInput placeholder={'Nhập tiêu đề bài viết'} size="large" />
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
                            label={'Tags'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn danh mục!',
                                },
                                {
                                    validator: async (_, value) => {
                                        if (value && value.length > 4) {
                                            return Promise.reject(new Error('Chỉ được chọn tối đa 4 tag'));
                                        }
                                    },
                                },
                            ]}
                        >
                            <AntSelect
                                options={categoryOptions}
                                placeholder={'Chọn danh mục'}
                                size="large"
                                mode="tags"
                                maxCount={4}
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="status"
                            label={'Trạng thái'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn trạng thái!',
                                },
                            ]}
                        >
                            <AntSelect
                                options={statusOptions}
                                placeholder={'Chọn trạng thái'}
                                size="large"
                            />
                        </AntForm.Item>
                    </div>

                    {/* Ảnh đại diện */}
                    <AntForm.Item
                        label="Ảnh đại diện"
                        extra="Click vào ảnh để xem toàn màn hình. Chỉ chấp nhận JPG, PNG, GIF (Tối đa 5MB)."
                    >
                        <div style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 8,
                            padding: 16,
                            backgroundColor: '#fafafa'
                        }}>
                            {thumbnailUrl ? (
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: 12
                                    }}>
                                        <Image
                                            src={thumbnailUrl}
                                            alt="Preview"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: 200,
                                                objectFit: 'contain',
                                                borderRadius: 4
                                            }}
                                            preview={{
                                                mask: 'Xem toàn màn hình',
                                            }}
                                        />
                                    </div>
                                    <AntUpload
                                        fileList={[]}
                                        onChange={({ fileList }) => {
                                            setFileList(fileList);
                                            if (fileList[0]?.originFileObj) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    const url = e.target?.result as string;
                                                    setThumbnailUrl(url);
                                                    form.setFieldValue('thumbnail', url);
                                                };
                                                reader.readAsDataURL(fileList[0].originFileObj as File);
                                            }
                                        }}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        accept="image/*"
                                        showUploadList={false}
                                    >
                                        <AntButton
                                            icon={<UploadOutlined />}
                                            block
                                        >
                                            Thay đổi ảnh
                                        </AntButton>
                                    </AntUpload>
                                </div>
                            ) : (
                                <AntUpload
                                    fileList={[]}
                                    onChange={({ fileList }) => {
                                        setFileList(fileList);
                                        if (fileList[0]?.originFileObj) {
                                            const reader = new FileReader();
                                            reader.onload = (e) => {
                                                const url = e.target?.result as string;
                                                setThumbnailUrl(url);
                                                form.setFieldValue('thumbnail', url);
                                            };
                                            reader.readAsDataURL(fileList[0].originFileObj as File);
                                        }
                                    }}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    accept="image/*"
                                    listType="picture-card"
                                    showUploadList={false}
                                    style={{ width: '100%' }}
                                >
                                    <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                                        <UploadOutlined style={{ fontSize: 40, color: '#8c8c8c' }} />
                                        <div style={{ marginTop: 12, fontSize: 14, color: '#595959' }}>
                                            Click để tải ảnh lên
                                        </div>
                                    </div>
                                </AntUpload>
                            )}
                        </div>
                    </AntForm.Item>

                    {/* Hidden field for validation */}
                    <AntForm.Item
                        name="thumbnail"
                        rules={[
                            { required: true, message: 'Vui lòng tải ảnh đại diện!' },
                        ]}
                        hidden
                    >
                        <input type="hidden" />
                    </AntForm.Item>

                    {/* Nội dung */}
                    <AntForm.Item
                        name="content"
                        label={'Nội dung'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập nội dung!',
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
                        {'Hủy'}
                    </AntButton>
                    <AntButton type="primary" htmlType="submit" size="large" loading={loading}>
                        {isEdit ? 'Cập nhật' : 'Tạo mới'}
                    </AntButton>
                </div>
            </AntForm>
        </div>
    );
}
