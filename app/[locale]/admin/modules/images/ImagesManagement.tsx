'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Spin, Image as AntImage, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { CarouselUtilityItem, CarouselShowHouseItem, MapPointItem } from '@/models/image-item';
import {
    getCarouselUtilities,
    getCarouselShowHouses,
    getMapPoints,
    updateImageItem,
} from '@/api/mockImageApiService';
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

type ImageItem = CarouselUtilityItem | CarouselShowHouseItem | MapPointItem;
type ImageType = 'utilities' | 'showhouses' | 'mappoints';

export default function ImagesManagement() {
    // Carousel Utilities State
    const [utilitiesItems, setUtilitiesItems] = useState<CarouselUtilityItem[]>([]);
    const [utilitiesLoading, setUtilitiesLoading] = useState(false);

    // Carousel Show Houses State
    const [showHousesItems, setShowHousesItems] = useState<CarouselShowHouseItem[]>([]);
    const [showHousesLoading, setShowHousesLoading] = useState(false);

    // Map Points State
    const [mapPointsItems, setMapPointsItems] = useState<MapPointItem[]>([]);
    const [mapPointsLoading, setMapPointsLoading] = useState(false);

    // Shared Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingItem, setEditingItem] = useState<ImageItem | null>(null);
    const [editingType, setEditingType] = useState<ImageType>('utilities');
    const [form] = AntForm.useForm();

    // Load Carousel Utilities
    const loadUtilities = useCallback(async () => {
        setUtilitiesLoading(true);
        try {
            const data = await getCarouselUtilities();
            setUtilitiesItems(data);
        } catch {
            notifyError('Không thể tải dữ liệu carousel tiện ích');
        } finally {
            setUtilitiesLoading(false);
        }
    }, []);

    // Load Carousel Show Houses
    const loadShowHouses = useCallback(async () => {
        setShowHousesLoading(true);
        try {
            const data = await getCarouselShowHouses();
            setShowHousesItems(data);
        } catch {
            notifyError('Không thể tải dữ liệu carousel nhà mẫu');
        } finally {
            setShowHousesLoading(false);
        }
    }, []);

    // Load Map Points
    const loadMapPoints = useCallback(async () => {
        setMapPointsLoading(true);
        try {
            const data = await getMapPoints();
            setMapPointsItems(data);
        } catch {
            notifyError('Không thể tải dữ liệu map points');
        } finally {
            setMapPointsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUtilities();
        loadShowHouses();
        loadMapPoints();
    }, [loadUtilities, loadShowHouses, loadMapPoints]);

    const handleEdit = (item: ImageItem, type: ImageType) => {
        setEditingItem(item);
        setEditingType(type);
        form.setFieldsValue(item);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setEditingItem(null);
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

            const result = await updateImageItem(editingItem.key, values);

            if (result.success) {
                notifySuccess('Cập nhật thành công');
                handleModalCancel();
                if (editingType === 'utilities') await loadUtilities();
                else if (editingType === 'showhouses') await loadShowHouses();
                else await loadMapPoints();
            } else {
                notifyError('Cập nhật thất bại');
            }
        } catch (error) {
            if (error instanceof Error && error.message !== 'Validation failed') {
                notifyError('Cập nhật thất bại');
            }
        } finally {
            setSaving(false);
        }
    };

    // Common columns generator
    const getColumns = <T extends ImageItem>(type: ImageType): ColumnType<T>[] => [
        {
            title: 'STT',
            key: 'index',
            width: 70,
            align: 'center',
            render: (_: unknown, __: T, index: number) => index + 1,
        },
        {
            title: 'Khóa',
            dataIndex: 'key',
            key: 'key',
            width: 150,
        },
        {
            title: 'Tiêu đề (VI)',
            dataIndex: 'titleVi',
            key: 'titleVi',
            width: 200,
        },
        {
            title: 'Tiêu đề (EN)',
            dataIndex: 'titleEn',
            key: 'titleEn',
            width: 200,
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
            dataIndex: 'imageBanner',
            key: 'imageBanner',
            width: 100,
            align: 'center',
            render: (imageBanner: string) => (
                <AntImage
                    src={imageBanner}
                    alt="Preview"
                    className={styles.imagePreview}
                    preview={{
                        mask: 'Xem',
                    }}
                />
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 80,
            align: 'center',
            render: (_: unknown, record: T) => (
                <AntButton
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record, type)}
                />
            ),
        },
    ];

    const getModalTitle = () => {
        const typeNames = {
            utilities: 'Carousel - Tiện ích',
            showhouses: 'Carousel - Nhà mẫu',
            mappoints: 'Map Point'
        };
        return `Cập nhật ${typeNames[editingType]}`;
    };

    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
                Quản lý Hình ảnh
            </h1>

            {/* Carousel - Tiện ích */}
            <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                    Carousel - Tiện ích
                </h2>
                <Spin spinning={utilitiesLoading}>
                    <AntTable
                        columns={getColumns<CarouselUtilityItem>('utilities')}
                        dataSource={utilitiesItems}
                        rowKey="key"
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
                <Spin spinning={showHousesLoading}>
                    <AntTable
                        columns={getColumns<CarouselShowHouseItem>('showhouses')}
                        dataSource={showHousesItems}
                        rowKey="key"
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
                <Spin spinning={mapPointsLoading}>
                    <AntTable
                        columns={getColumns<MapPointItem>('mappoints')}
                        dataSource={mapPointsItems}
                        rowKey="key"
                        pagination={false}
                        bordered
                    />
                </Spin>
            </div>

            {/* Create/Edit Modal */}
            <AntModal
                title={getModalTitle()}
                open={modalVisible}
                onCancel={handleModalCancel}
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
                            {editingItem?.imageBanner ? (
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: 400
                                }}>
                                    <AntImage
                                        src={editingItem.imageBanner}
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
                        >
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
                            >
                                <AntInput.TextArea rows={3} placeholder="Nhập mô tả tiếng Anh" />
                            </AntForm.Item>

                            <AntForm.Item
                                label="URL Ảnh Banner"
                                name="imageBanner"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập URL ảnh' },
                                    { type: 'url', message: 'URL không hợp lệ' },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <AntInput placeholder="https://example.com/image.jpg" />
                            </AntForm.Item>
                        </AntForm>
                    </Col>
                </Row>
            </AntModal>
        </div>
    );
}
