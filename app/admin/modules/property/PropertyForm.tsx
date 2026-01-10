'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { t } from '@/utils/i18n';
import {
    AntForm,
    AntInput,
    AntButton,
    AntUpload,
    AntSelect,
    RichTextEditor,
} from '@/crema/components';
import { PropertyType, PropertyStatus, Property, PropertyFormData } from '@/types/common';
import styles from './PropertyForm.module.css';

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
    const [fileList, setFileList] = useState<
        Array<{
            uid: string;
            name: string;
            status: string;
            url: string;
        }>
    >([]);

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
                images: fileList.map((file) => file.url || file.response?.url || file.thumbUrl),
            };

            await onSubmit(formData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUploadChange = ({
        fileList: newFileList,
    }: {
        fileList: Array<{
            uid: string;
            name: string;
            status: string;
            url?: string;
            response?: { url: string };
            thumbUrl?: string;
            originFileObj?: File;
        }>;
    }) => {
        setFileList(newFileList);
    };

    const handleBack = () => {
        router.back();
    };

    // Select options with i18n labels
    const typeOptions = [
        { label: t('property.typeApartment'), value: PropertyType.APARTMENT },
        { label: t('property.typeHouse'), value: PropertyType.HOUSE },
        { label: t('property.typeVilla'), value: PropertyType.VILLA },
        { label: t('property.typeLand'), value: PropertyType.LAND },
        { label: t('property.typeCommercial'), value: PropertyType.COMMERCIAL },
    ];

    const statusOptions = [
        { label: t('property.statusAvailable'), value: PropertyStatus.AVAILABLE },
        { label: t('property.statusSold'), value: PropertyStatus.SOLD },
        { label: t('property.statusRented'), value: PropertyStatus.RENTED },
        { label: t('property.statusPending'), value: PropertyStatus.PENDING },
    ];

    return (
        <div className={styles.formContainer}>
            <AntForm form={form} layout="vertical" onFinish={handleSubmit}>
                <div className={styles.formGrid}>
                    {/* Title */}
                    <AntForm.Item
                        name="title"
                        label={t('property.title')}
                        rules={[{ required: true, message: t('property.titleRequired') }]}
                    >
                        <AntInput placeholder={t('property.titlePlaceholder')} size="large" />
                    </AntForm.Item>

                    {/* Address */}
                    <AntForm.Item
                        name="address"
                        label={t('property.address')}
                        rules={[{ required: true, message: t('property.addressRequired') }]}
                    >
                        <AntInput placeholder={t('property.addressPlaceholder')} size="large" />
                    </AntForm.Item>

                    {/* Type - Status - Price */}
                    <div className={styles.formRow3}>
                        <AntForm.Item
                            name="type"
                            label={t('property.type')}
                            rules={[{ required: true, message: t('property.typeRequired') }]}
                        >
                            <AntSelect
                                options={typeOptions}
                                placeholder={t('property.typePlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="status"
                            label={t('property.status')}
                            rules={[{ required: true, message: t('property.statusRequired') }]}
                        >
                            <AntSelect
                                options={statusOptions}
                                placeholder={t('property.statusPlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="price"
                            label={t('property.price')}
                            rules={[{ required: true, message: t('property.priceRequired') }]}
                        >
                            <AntInput
                                type="number"
                                placeholder={t('property.pricePlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>
                    </div>

                    {/* Area - Bedrooms - Bathrooms */}
                    <div className={styles.formRow3}>
                        <AntForm.Item
                            name="area"
                            label={t('property.area')}
                            rules={[{ required: true, message: t('property.areaRequired') }]}
                        >
                            <AntInput
                                type="number"
                                placeholder={t('property.areaPlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item name="bedrooms" label={t('property.bedrooms')}>
                            <AntInput
                                type="number"
                                placeholder={t('property.bedroomsPlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item name="bathrooms" label={t('property.bathrooms')}>
                            <AntInput
                                type="number"
                                placeholder={t('property.bathroomsPlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>
                    </div>

                    {/* Ward - District - City */}
                    <div className={styles.formRow3}>
                        <AntForm.Item
                            name="ward"
                            label={t('property.ward')}
                            rules={[{ required: true, message: t('property.wardRequired') }]}
                        >
                            <AntInput placeholder={t('property.wardPlaceholder')} size="large" />
                        </AntForm.Item>

                        <AntForm.Item
                            name="district"
                            label={t('property.district')}
                            rules={[{ required: true, message: t('property.districtRequired') }]}
                        >
                            <AntInput
                                placeholder={t('property.districtPlaceholder')}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="city"
                            label={t('property.city')}
                            rules={[{ required: true, message: t('property.cityRequired') }]}
                        >
                            <AntInput placeholder={t('property.cityPlaceholder')} size="large" />
                        </AntForm.Item>
                    </div>

                    {/* Description */}
                    <AntForm.Item
                        label={t('property.description')}
                        rules={[{ required: true, message: t('property.descriptionRequired') }]}
                    >
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
                            placeholder={t('property.descriptionPlaceholder')}
                        />
                    </AntForm.Item>

                    {/* Images */}
                    <div className={styles.formItem}>
                        <label className={styles.label}>{t('property.images')}</label>
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
                                <div className={styles.uploadTitle}>{t('property.uploadHint')}</div>
                                <div className={styles.uploadSub}>
                                    {t('property.uploadSupported')}
                                </div>
                            </div>
                        </AntUpload.Dragger>
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <AntButton size="large" onClick={handleBack} disabled={loading}>
                        {t('common.cancel')}
                    </AntButton>
                    <AntButton
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        {isEdit ? t('common.update') : t('common.create')}
                    </AntButton>
                </div>
            </AntForm>
        </div>
    );
};

export default PropertyForm;
