'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import dynamic from 'next/dynamic';
import {
    AntForm,
    AntInput,
    AntButton,
    AntUpload,
    AntSelect,
} from '@/crema/components';
import { PropertyType, PropertyStatus, Property, PropertyFormData } from '@/types/common';
import styles from './PropertyForm.module.css';

const RichTextEditor = dynamic(() => import('@/crema/components/RichTextEditor'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đang tải editor...</div>,
});

interface PropertyFormProps {
    initialData?: Property | null;
    isEdit?: boolean;
    onSubmit: (data: PropertyFormData) => Promise<void>;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
    initialData,
    isEdit = false,
    onSubmit,
}) => {
    const router = useRouter();
    const [form] = AntForm.useForm();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState(initialData?.description || '');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                title: initialData.title,
                type: initialData.type,
                status: initialData.status,
                price: initialData.price,
                area: initialData.area,
                bedrooms: initialData.bedrooms,
                bathrooms: initialData.bathrooms,
                address: initialData.address,
                ward: initialData.ward,
                district: initialData.district,
                city: initialData.city,
            });
            setDescription(initialData.description || '');

            // Set file list from images
            if (initialData.images && initialData.images.length > 0) {
                setFileList(
                    initialData.images.map((url, index) => ({
                        uid: `-${index}`,
                        name: `image-${index}.jpg`,
                        status: 'done',
                        url: url,
                    }))
                );
            }
        }
    }, [initialData, form]);

    const handleSubmit = async (values: PropertyFormData) => {
        setLoading(true);
        try {
            const formData: PropertyFormData = {
                ...values,
                description: description,
                images: fileList
                    .map((file) => file.url || file.response?.url || file.thumbUrl)
                    .filter((url): url is string => !!url),
            };

            await onSubmit(formData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
    };

    const handleBack = () => {
        router.back();
    };

    // Select options with i18n labels
    const typeOptions = [
        { label: 'Căn hộ', value: PropertyType.APARTMENT },
        { label: 'Nhà phố', value: PropertyType.HOUSE },
        { label: 'Biệt thự', value: PropertyType.VILLA },
        { label: 'Đất nền', value: PropertyType.LAND },
        { label: 'Thương mại', value: PropertyType.COMMERCIAL },
    ];

    const statusOptions = [
        { label: 'Còn trống', value: PropertyStatus.AVAILABLE },
        { label: 'Đã bán', value: PropertyStatus.SOLD },
        { label: 'Đã cho thuê', value: PropertyStatus.RENTED },
        { label: 'Đang chờ', value: PropertyStatus.PENDING },
    ];

    return (
        <div className={styles.formContainer}>
            <AntForm form={form} layout="vertical" onFinish={handleSubmit}>
                <div className={styles.formGrid}>
                    {/* Title */}
                    <AntForm.Item
                        name="title"
                        label={'Tiêu đề'}
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <AntInput placeholder={'Nhập tiêu đề bất động sản'} size="large" />
                    </AntForm.Item>

                    {/* Address */}
                    <AntForm.Item
                        name="address"
                        label={'Địa chỉ'}
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <AntInput placeholder={'Nhập địa chỉ'} size="large" />
                    </AntForm.Item>

                    {/* Type - Status - Price */}
                    <div className={styles.formRow3}>
                        <AntForm.Item
                            name="type"
                            label={'Loại Bất động sản'}
                            rules={[{ required: true, message: 'Vui lòng chọn loại BĐS!' }]}
                        >
                            <AntSelect
                                options={typeOptions}
                                placeholder={'Chọn loại BĐS'}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="status"
                            label={'Trạng thái'}
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        >
                            <AntSelect
                                options={statusOptions}
                                placeholder={'Chọn trạng thái'}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="price"
                            label={'Giá (VNĐ)'}
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                        >
                            <AntInput
                                type="number"
                                placeholder={'Nhập giá'}
                                size="large"
                            />
                        </AntForm.Item>
                    </div>

                    {/* Area - Bedrooms - Bathrooms */}
                    <div className={styles.formRow3}>
                        <AntForm.Item
                            name="area"
                            label={'Diện tích (m²)'}
                            rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
                        >
                            <AntInput
                                type="number"
                                placeholder={'Nhập diện tích'}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item name="bedrooms" label={'Số phòng ngủ'}>
                            <AntInput
                                type="number"
                                placeholder={'Số phòng ngủ'}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item name="bathrooms" label={'Số phòng tắm'}>
                            <AntInput
                                type="number"
                                placeholder={'Số phòng tắm'}
                                size="large"
                            />
                        </AntForm.Item>
                    </div>

                    {/* Ward - District - City */}
                    <div className={styles.formRow3}>
                        <AntForm.Item
                            name="ward"
                            label={'Phường/Xã'}
                            rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
                        >
                            <AntInput placeholder={'Nhập phường/xã'} size="large" />
                        </AntForm.Item>

                        <AntForm.Item
                            name="district"
                            label={'Quận/Huyện'}
                            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                        >
                            <AntInput
                                placeholder={'Nhập quận/huyện'}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="city"
                            label={'Tỉnh/Thành phố'}
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
                        >
                            <AntInput placeholder={'Nhập tỉnh/thành phố'} size="large" />
                        </AntForm.Item>
                    </div>

                    {/* Description */}
                    <AntForm.Item
                        label={'Mô tả'}
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
                            placeholder={'Nhập mô tả chi tiết về bất động sản...'}
                        />
                    </AntForm.Item>

                    {/* Images */}
                    <div className={styles.formItem}>
                        <label className={styles.label}>{'Hình ảnh'}</label>
                        <AntUpload.Dragger
                            multiple
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false}
                            className={styles.uploadDragger}
                        >
                            <div className={styles.uploadInner}>
                                <UploadOutlined className={styles.uploadIcon} />
                                <div className={styles.uploadTitle}>{'Nhấp hoặc kéo thả file vào đây'}</div>
                                <div className={styles.uploadSub}>
                                    {'Hỗ trợ định dạng JPG, PNG (tối đa 5MB mỗi ảnh)'}
                                </div>
                            </div>
                        </AntUpload.Dragger>
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <AntButton size="large" onClick={handleBack} disabled={loading}>
                        {'Hủy'}
                    </AntButton>
                    <AntButton
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        {isEdit ? 'Cập nhật' : 'Tạo mới'}
                    </AntButton>
                </div>
            </AntForm>
        </div>
    );
};

export default PropertyForm;
