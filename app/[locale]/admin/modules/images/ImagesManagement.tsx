'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Spin, Image as AntImage, Row, Col, Upload, message } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { IntroduceImage, IntroduceImageType, getTypeLabel, buildUpdatePayload } from '@/models/introduce-image';
import {
    getAllIntroduceImages,
    updateIntroduceImage,
    filterImagesByType,
} from '@/api/introduceImageApiService';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import {
    AntTable,
    AntButton,
    AntModal,
    AntForm,
    AntInput,
} from '@/crema/components';
import type { ColumnType } from 'antd/es/table';
import styles from './ImageListBase.module.css';

export default function ImagesManagement() {
    // All images state
    const [allImages, setAllImages] = useState<IntroduceImage[]>([]);
    const [loading, setLoading] = useState(false);

    // Filtered images by type
    const [utilitiesItems, setUtilitiesItems] = useState<IntroduceImage[]>([]);
    const [showHousesItems, setShowHousesItems] = useState<IntroduceImage[]>([]);
    const [mapPointsItems, setMapPointsItems] = useState<IntroduceImage[]>([]);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editingItem, setEditingItem] = useState<IntroduceImage | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [form] = AntForm.useForm();

    // Load all images and filter by type
    const loadAllImages = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllIntroduceImages();
            setAllImages(data);

            // Filter by type
            setUtilitiesItems(filterImagesByType(data, IntroduceImageType.CAROUSEL_UTILITY));
            setShowHousesItems(filterImagesByType(data, IntroduceImageType.CAROUSEL_SHOWHOUSE));
            setMapPointsItems(filterImagesByType(data, IntroduceImageType.MAP_POINT));
        } catch (error) {
            console.error('Error loading images:', error);
            notifyError('Không thể tải dữ liệu hình ảnh');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAllImages();
    }, [loadAllImages]);

    const handleEdit = (item: IntroduceImage) => {
        setEditingItem(item);
        setImageBase64(null); // Reset base64 when opening modal
        form.setFieldsValue({
            titleVi: item.titleVi || '',
            titleEn: item.titleEn || '',
            descriptionVi: item.descriptionVi || '',
            descriptionEn: item.descriptionEn || '',
            imageUrl: item.imageUrl || '',
        });
        setModalVisible(true);
    };

    // Convert file to base64
    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle image selection (convert to base64 for preview)
    const handleImageSelect = async (file: File) => {
        try {
            setUploading(true);

            // Convert to base64
            const base64String = await convertFileToBase64(file);
            setImageBase64(base64String);

            // Create preview URL for display
            const previewUrl = URL.createObjectURL(file);

            // Update preview
            if (editingItem) {
                setEditingItem({
                    ...editingItem,
                    imageUrl: previewUrl
                });
            }

            // Update form field (just to pass validation)
            form.setFieldsValue({ imageUrl: previewUrl });

            message.success('Đã chọn ảnh thành công');
            return false; // Prevent default upload behavior
        } catch (error) {
            console.error('Error processing image:', error);
            message.error('Lỗi khi xử lý ảnh');
            return false;
        } finally {
            setUploading(false);
        }
    };

    // Handle image URL change for realtime preview
    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        if (editingItem) {
            setEditingItem({
                ...editingItem,
                imageUrl: newUrl || null
            });
        }
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setEditingItem(null);
        setImageBase64(null); // Reset base64
        form.resetFields();
    };

    const handleModalSave = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            if (!editingItem) {
                notifyError('Không có mục nào được chọn để cập nhật');
                return;
            }

            // Build payload using helper function
            const payload = buildUpdatePayload(
                editingItem,
                {
                    titleVi: values.titleVi,
                    titleEn: values.titleEn,
                    descriptionVi: values.descriptionVi,
                    descriptionEn: values.descriptionEn
                },
                imageBase64
            );

            await updateIntroduceImage(editingItem.id, payload);
            notifySuccess('Cập nhật thành công');
            handleModalCancel();
            await loadAllImages();
        } catch (error) {
            if (error instanceof Error && error.message !== 'Validation failed') {
                console.error('Error updating image:', error);
                notifyError('Cập nhật thất bại');
            }
        } finally {
            setSaving(false);
        }
    };

    // Common columns generator
    const getColumns = (): ColumnType<IntroduceImage>[] => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            align: 'center',
        },
        {
            title: 'Tiêu đề (VI)',
            dataIndex: 'titleVi',
            key: 'titleVi',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Tiêu đề (EN)',
            dataIndex: 'titleEn',
            key: 'titleEn',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Mô tả (VI)',
            dataIndex: 'descriptionVi',
            key: 'descriptionVi',
            ellipsis: true,
        },
        {
            title: 'Mô tả (EN)',
            dataIndex: 'descriptionEn',
            key: 'descriptionEn',
            ellipsis: true,
        },
        {
            title: 'Ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: 100,
            align: 'center',
            render: (imageUrl: string | null) => {
                if (!imageUrl) {
                    return <span style={{ color: '#999' }}>Không có ảnh</span>;
                }
                return (
                    <AntImage
                        src={imageUrl}
                        alt="Preview"
                        className={styles.imagePreview}
                        preview={{
                            mask: 'Xem',
                        }}
                    />
                );
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 80,
            align: 'center',
            render: (_: unknown, record: IntroduceImage) => (
                <AntButton
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                />
            ),
        },
    ];

    const getModalTitle = () => {
        if (!editingItem) return 'Cập nhật hình ảnh';
        return `Cập nhật ${getTypeLabel(editingItem.type, 'vi')} #${editingItem.id}`;
    };

    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
                Quản lý Hình ảnh Giới thiệu
            </h1>

            {/* Carousel - Tiện ích */}
            <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                    Carousel - Tiện ích
                </h2>
                <Spin spinning={loading}>
                    <AntTable
                        columns={getColumns()}
                        dataSource={utilitiesItems}
                        rowKey="id"
                        pagination={false}
                        bordered
                    />
                </Spin>
            </div>

            {/* Carousel - Nhà mẫu */}
            <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                    Carousel - Nhà mẫu
                </h2>
                <Spin spinning={loading}>
                    <AntTable
                        columns={getColumns()}
                        dataSource={showHousesItems}
                        rowKey="id"
                        pagination={false}
                        bordered
                    />
                </Spin>
            </div>

            {/* Map Points */}
            <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                    Map Points
                </h2>
                <Spin spinning={loading}>
                    <AntTable
                        columns={getColumns()}
                        dataSource={mapPointsItems}
                        rowKey="id"
                        pagination={false}
                        bordered
                    />
                </Spin>
            </div>

            {/* Edit Modal */}
            <AntModal
                title={getModalTitle()}
                open={modalVisible}
                onCancel={handleModalCancel}
                keyboard={false}
                footer={[
                    <AntButton key="cancel" onClick={handleModalCancel}>
                        Hủy
                    </AntButton>,
                    <AntButton
                        key="save"
                        type="primary"
                        loading={saving}
                        onClick={handleModalSave}
                    >
                        Lưu
                    </AntButton>,
                ]}
                width={1000}
            >
                <Row gutter={24} style={{ marginTop: 20 }}>
                    {/* Image Preview - Left Side */}
                    <Col span={10}>
                        <div style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 8,
                            padding: 16,
                            backgroundColor: '#fafafa',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <label style={{
                                display: 'block',
                                marginBottom: 12,
                                fontWeight: 600,
                                fontSize: 14,
                                color: '#262626'
                            }}>
                                Xem trước ảnh
                            </label>
                            {editingItem?.imageUrl ? (
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: 400
                                }}>
                                    <AntImage
                                        src={editingItem.imageUrl}
                                        alt="Preview"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: 400,
                                            objectFit: 'contain',
                                            borderRadius: 4
                                        }}
                                        preview={{
                                            mask: 'Xem toàn màn hình',
                                        }}
                                    />
                                </div>
                            ) : (
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#8c8c8c',
                                    fontSize: 14,
                                    minHeight: 400
                                }}>
                                    Chưa có ảnh
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Form Fields - Right Side */}
                    <Col span={14}>
                        <AntForm
                            form={form}
                            layout="vertical"
                            initialValues={{
                                titleVi: '',
                                titleEn: '',
                                descriptionVi: '',
                                descriptionEn: '',
                                imageUrl: '',
                            }}
                        >
                            {/* Image Upload Field - Moved to top for better UX */}
                            <AntForm.Item
                                label="Upload Ảnh"
                                extra="Chỉ chấp nhận file ảnh (JPG, PNG, GIF). Tối đa 5MB."
                            >
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    showUploadList={false}
                                    beforeUpload={handleImageSelect}
                                    accept="image/*"
                                    disabled={uploading}
                                >
                                    {editingItem?.imageUrl ? (
                                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            <AntImage
                                                src={editingItem.imageUrl}
                                                alt="Current"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                preview={false}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: 0,
                                                transition: 'opacity 0.3s',
                                                cursor: 'pointer'
                                            }}
                                                className="upload-hover-overlay"
                                            >
                                                <UploadOutlined style={{ fontSize: 24, color: '#fff' }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <UploadOutlined style={{ fontSize: 24 }} />
                                            <div style={{ marginTop: 8 }}>
                                                {uploading ? 'Đang upload...' : 'Upload ảnh'}
                                            </div>
                                        </div>
                                    )}
                                </Upload>
                            </AntForm.Item>

                            {/* Hidden field for validation */}
                            <AntForm.Item
                                name="imageUrl"
                                rules={[
                                    { required: true, message: 'Vui lòng upload ảnh' },
                                ]}
                                hidden
                            >
                                <input type="hidden" />
                            </AntForm.Item>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <AntForm.Item
                                        label="Tiêu đề (Tiếng Việt)"
                                        name="titleVi"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tiêu đề tiếng Việt' },
                                            { whitespace: true, message: 'Tiêu đề không được để trống' },
                                        ]}
                                    >
                                        <AntInput placeholder="Nhập tiêu đề tiếng Việt" />
                                    </AntForm.Item>
                                </Col>
                                <Col span={12}>
                                    <AntForm.Item
                                        label="Tiêu đề (Tiếng Anh)"
                                        name="titleEn"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tiêu đề tiếng Anh' },
                                            { whitespace: true, message: 'Tiêu đề không được để trống' },
                                        ]}
                                    >
                                        <AntInput placeholder="Nhập tiêu đề tiếng Anh" />
                                    </AntForm.Item>
                                </Col>
                            </Row>

                            <AntForm.Item
                                label="Mô tả (Tiếng Việt)"
                                name="descriptionVi"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mô tả tiếng Việt' },
                                ]}
                            >
                                <AntInput.TextArea rows={3} placeholder="Nhập mô tả tiếng Việt" />
                            </AntForm.Item>

                            <AntForm.Item
                                label="Mô tả (Tiếng Anh)"
                                name="descriptionEn"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mô tả tiếng Anh' },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <AntInput.TextArea rows={3} placeholder="Nhập mô tả tiếng Anh" />
                            </AntForm.Item>
                        </AntForm>
                    </Col>
                </Row>
            </AntModal>
        </div>
    );
}
