'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/crema/core/DataTable';
import { DialogConfirm } from '@/crema/core/DialogConfirm';
import { Property, PropertyStatus, PropertyType } from '@/types/common';
import { propertyService } from './mockData';
import { DataTableColumn } from '@/crema/core/DataTable/types';
import { error as notifyError, success as notifySuccess } from '@/utils/antd-notification';
import styles from './PropertyList.module.css';

export const PropertyList: React.FC = () => {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    // Modal states
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    // Load data
    const loadData = useCallback(
        async (page = 1, search = '') => {
            setLoading(true);
            try {
                const result = await propertyService.getList({
                    page,
                    limit: pagination.pageSize,
                    search,
                });
                setProperties(result.data);
                setPagination((prev) => ({
                    ...prev,
                    current: page,
                    total: result.total,
                }));
            } catch {
                notifyError('Không thể tải dữ liệu');
            } finally {
                setLoading(false);
            }
        },
        [pagination.pageSize]
    );

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Handlers
    const handleAdd = () => {
        router.push('/dashboard/property/create');
    };

    const handleEdit = (record: Property) => {
        router.push(`/dashboard/property/edit/${record.id}`);
    };

    const handleDelete = (record: Property) => {
        setSelectedProperty(record);
        setIsConfirmOpen(true);
    };

    const handleSearch = (value: string) => {
        loadData(1, value);
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination((prev) => ({ ...prev, pageSize }));
        loadData(page);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProperty) return;

        setFormLoading(true);
        try {
            await propertyService.delete(selectedProperty.id);
            notifySuccess('Xóa bất động sản thành công');
            setIsConfirmOpen(false);
            loadData(pagination.current);
        } catch {
            notifyError('Không thể xóa bất động sản');
        } finally {
            setFormLoading(false);
        }
    };

    // Định nghĩa columns
    const columns: DataTableColumn<Property>[] = [
        {
            title: 'Hình ảnh',
            key: 'thumbnail',
            width: 100,
            render: (_, record) => (
                <Image
                    src={record.thumbnail || '/placeholder.jpg'}
                    alt={record.title}
                    width={64}
                    height={64}
                    className={styles.propertyImage}
                />
            ),
        },
        {
            title: 'Thông tin',
            key: 'info',
            render: (_, record) => (
                <div>
                    <div className={styles.propertyTitle}>{record.title}</div>
                    <div className={styles.propertyAddress}>
                        {record.address}, {record.ward}, {record.district}, {record.city}
                    </div>
                </div>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type: PropertyType) => (
                <span className={styles.propertyType}>
                    {type === PropertyType.APARTMENT && 'Căn hộ'}
                    {type === PropertyType.HOUSE && 'Nhà phố'}
                    {type === PropertyType.VILLA && 'Biệt thự'}
                    {type === PropertyType.LAND && 'Đất nền'}
                    {type === PropertyType.COMMERCIAL && 'Thương mại'}
                </span>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (price: number) => (
                <div>
                    <div className={styles.propertyPrice}>{(price / 1000000000).toFixed(2)} tỷ</div>
                </div>
            ),
        },
        {
            title: 'Diện tích',
            dataIndex: 'area',
            key: 'area',
            width: 100,
            render: (area: number) => <span className={styles.propertyArea}>{area} m²</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: PropertyStatus) => {
                const statusMap = {
                    [PropertyStatus.AVAILABLE]: {
                        text: 'Còn trống',
                        className: styles.statusAvailable,
                    },
                    [PropertyStatus.SOLD]: {
                        text: 'Đã bán',
                        className: styles.statusSold,
                    },
                    [PropertyStatus.RENTED]: {
                        text: 'Đã thuê',
                        className: styles.statusRented,
                    },
                    [PropertyStatus.PENDING]: {
                        text: 'Đang chờ',
                        className: styles.statusPending,
                    },
                };

                const info = statusMap[status];
                return (
                    <span className={`${styles.propertyStatus} ${info.className}`}>
                        {info.text}
                    </span>
                );
            },
        },
    ];

    return (
        <div className={styles.propertyListContainer}>
            <DataTable<Property>
                title="Quản lý Bất động sản"
                data={properties}
                columns={columns}
                loading={loading}
                rowKey="id"
                pagination={{
                    ...pagination,
                    onChange: handlePaginationChange,
                }}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSearch={handleSearch}
                addButtonText="Thêm BĐS mới"
                searchPlaceholder="Tìm theo tên, địa chỉ..."
                scroll={{ x: 1200 }}
            />

            {/* Confirm Delete Modal */}
            <DialogConfirm
                open={isConfirmOpen}
                title="Xác nhận xóa"
                content={
                    <>
                        Bạn có chắc chắn muốn xóa bất động sản{' '}
                        <strong>{selectedProperty?.title}</strong>?
                        <br />
                        Hành động này không thể hoàn tác.
                    </>
                }
                type="danger"
                confirmText="Xóa"
                cancelText="Hủy"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
                loading={formLoading}
            />
        </div>
    );
};

export default PropertyList;
