'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Spin, Image as AntImage, Row, Col, Upload, App } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import {
    IntroduceImage,
    IntroduceStatus,
    getStatusLabel,
    getTypeLabel,
    buildUpdatePayload,
} from '@/models/introduce-image';
import {
    getAllIntroduceImages,
    updateIntroduceImage,
} from '@/api/introduceImageApiService';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import {
    AntTable,
    AntButton,
    AntModal,
    AntForm,
    AntInput,
    AntSelect,
} from '@/crema/components';
import type { ColumnType } from 'antd/es/table';
import styles from '../ImageListBase.module.css';

interface ImageTabProps {
    title: string;
    filterCondition: (item: IntroduceImage) => boolean;
    showStatus?: boolean;
    forcedStatus?: number;
}

export default function ImageTab({ title, filterCondition, showStatus = false, forcedStatus }: ImageTabProps) {
    const { message } = App.useApp();
    const MAX_IMAGE_SIZE_MB = 20;
    const [items, setItems] = useState<IntroduceImage[]>([]);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editingItem, setEditingItem] = useState<IntroduceImage | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [form] = AntForm.useForm();

    const loadImages = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllIntroduceImages();
            setItems(data.filter(filterCondition));
        } catch (error) {
            console.error('Error loading images:', error);
            notifyError('Không thể tải dữ liệu hình ảnh');
        } finally {
            setLoading(false);
        }
    }, [filterCondition]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const handleEdit = (item: IntroduceImage) => {
        setEditingItem(item);
        setImageBase64(null);
        form.setFieldsValue({
            titleVi: item.titleVi || '',
            titleEn: item.titleEn || '',
            descriptionVi: item.descriptionVi || '',
            descriptionEn: item.descriptionEn || '',
            status: item.status ?? '',
            imageUrl: item.imageUrl || '',
        });
        setModalVisible(true);
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageSelect = async (file: File) => {
        const isLt20MB = file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB;
        if (!isLt20MB) {
            message.error(`Kích thước ảnh phải nhỏ hơn ${MAX_IMAGE_SIZE_MB}MB!`);
            return Upload.LIST_IGNORE;
        }

        try {
            setUploading(true);
            const base64String = await convertFileToBase64(file);
            setImageBase64(base64String);

            const previewUrl = URL.createObjectURL(file);
            if (editingItem) {
                setEditingItem({
                    ...editingItem,
                    imageUrl: previewUrl
                });
            }

            form.setFieldsValue({ imageUrl: previewUrl });
            message.success('Đã chọn ảnh thành công');
            return false;
        } catch (error) {
            console.error('Error processing image:', error);
            message.error('Lỗi khi xử lý ảnh');
            return false;
        } finally {
            setUploading(false);
        }
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setEditingItem(null);
        setImageBase64(null);
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

            const payload = buildUpdatePayload(
                editingItem,
                {
                    titleVi: values.titleVi,
                    titleEn: values.titleEn,
                    descriptionVi: values.descriptionVi,
                    descriptionEn: values.descriptionEn,
                    status: forcedStatus ?? values.status,
                },
                imageBase64
            );

            await updateIntroduceImage(editingItem.id, payload);
            notifySuccess('Cập nhật thành công');
            handleModalCancel();
            await loadImages();
        } catch (error) {
            if (error instanceof Error && error.message !== 'Validation failed') {
                console.error('Error updating image:', error);
                notifyError('Cập nhật thất bại');
            }
        } finally {
            setSaving(false);
        }
    };

    const getColumns = (): ColumnType<IntroduceImage>[] => {
        const cols: ColumnType<IntroduceImage>[] = [
            {
                title: 'STT',
                key: 'stt',
                width: 70,
                align: 'center',
                render: (_: unknown, __: unknown, index: number) => index + 1,
            },
        ];

        if (showStatus) {
            cols.push({
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                width: 140,
                align: 'center',
                ellipsis: true,
                render: (status: IntroduceStatus) => {
                    const label = getStatusLabel(status);
                    return label === '-' ? <span style={{ color: '#ccc' }}>-</span> : label;
                },
            });
        }

        cols.push(
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
                    if (!imageUrl) return <span style={{ color: '#999' }}>Không có ảnh</span>;
                    return (
                        <AntImage
                            src={imageUrl}
                            alt="Preview"
                            className={styles.imagePreview}
                            preview={{ mask: 'Xem' }}
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
            }
        );

        return cols;
    };

    const getModalTitle = () => {
        if (!editingItem) return 'Cập nhật hình ảnh';
        return `Cập nhật ${getTypeLabel(editingItem.type, 'vi')} #${editingItem.id}`;
    };

    const statusOptions = [
        { label: 'Không có trạng thái', value: IntroduceStatus.NotForSale },
        { label: getStatusLabel(IntroduceStatus.ForSale, 'vi'), value: IntroduceStatus.ForSale },
        { label: getStatusLabel(IntroduceStatus.Sold, 'vi'), value: IntroduceStatus.Sold },
    ];

    return (
        <div>
            <Spin spinning={loading}>
                <AntTable
                    columns={getColumns()}
                    dataSource={items}
                    rowKey="id"
                    pagination={false}
                    bordered
                />
            </Spin>

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
                            <label style={{ display: 'block', marginBottom: 12, fontWeight: 600, fontSize: 14 }}>
                                Xem trước ảnh
                            </label>
                            {editingItem?.imageUrl ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                                    <AntImage
                                        src={editingItem.imageUrl}
                                        alt="Preview"
                                        style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'contain', borderRadius: 4 }}
                                        preview={{ mask: 'Xem toàn màn hình' }}
                                    />
                                </div>
                            ) : (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c', fontSize: 14, minHeight: 400 }}>
                                    Chưa có ảnh
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col span={14}>
                        <AntForm 
                            form={form} 
                            layout="vertical"
                            initialValues={{
                                titleVi: '',
                                titleEn: '',
                                descriptionVi: '',
                                descriptionEn: '',
                                status: '',
                                imageUrl: '',
                            }}
                        >
                            <AntForm.Item label="Upload Ảnh" extra="Chỉ chấp nhận file ảnh (JPG, PNG, GIF). Tối đa 20MB.">
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
                                            <AntImage src={editingItem.imageUrl} alt="Current" style={{ width: '100%', height: '100%', objectFit: 'cover' }} preview={false} />
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', cursor: 'pointer' }} className="upload-hover-overlay">
                                                <UploadOutlined style={{ fontSize: 24, color: '#fff' }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <UploadOutlined style={{ fontSize: 24 }} />
                                            <div style={{ marginTop: 8 }}>{uploading ? 'Đang upload...' : 'Upload ảnh'}</div>
                                        </div>
                                    )}
                                </Upload>
                            </AntForm.Item>

                            <AntForm.Item name="imageUrl" rules={[{ required: true, message: 'Vui lòng upload ảnh' }]} hidden>
                                <AntInput type="hidden" />
                            </AntForm.Item>

                            {showStatus && (
                                <AntForm.Item
                                    label="Trạng thái"
                                    name="status"
                                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                                >
                                    <AntSelect
                                        options={statusOptions}
                                        placeholder="Chọn trạng thái"
                                    />
                                </AntForm.Item>
                            )}

                            <Row gutter={12}>
                                <Col span={12}>
                                    <AntForm.Item label="Tiêu đề (Tiếng Việt)" name="titleVi" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề tiếng Việt' }, { whitespace: true, message: 'Tiêu đề không được để trống' }]}>
                                        <AntInput placeholder="Nhập tiêu đề tiếng Việt" />
                                    </AntForm.Item>
                                </Col>
                                <Col span={12}>
                                    <AntForm.Item label="Tiêu đề (Tiếng Anh)" name="titleEn" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề tiếng Anh' }, { whitespace: true, message: 'Tiêu đề không được để trống' }]}>
                                        <AntInput placeholder="Nhập tiêu đề tiếng Anh" />
                                    </AntForm.Item>
                                </Col>
                            </Row>

                            <AntForm.Item label="Mô tả (Tiếng Việt)" name="descriptionVi" rules={[{ required: true, message: 'Vui lòng nhập mô tả tiếng Việt' }]}>
                                <AntInput.TextArea rows={3} placeholder="Nhập mô tả tiếng Việt" />
                            </AntForm.Item>

                            <AntForm.Item label="Mô tả (Tiếng Anh)" name="descriptionEn" rules={[{ required: true, message: 'Vui lòng nhập mô tả tiếng Anh' }]} style={{ marginBottom: 0 }}>
                                <AntInput.TextArea rows={3} placeholder="Nhập mô tả tiếng Anh" />
                            </AntForm.Item>
                        </AntForm>
                    </Col>
                </Row>
            </AntModal>
        </div>
    );
}
