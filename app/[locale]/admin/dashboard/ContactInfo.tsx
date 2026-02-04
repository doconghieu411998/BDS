'use client';

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { metadataApiService } from '@/api/metadataApiService';
import { ContactMetadata } from '@/models/metadata';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import {
    AntForm,
    AntInput,
    AntButton,
} from '@/crema/components';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './ContactInfo.module.css';

export default function ContactInfo() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [contactData, setContactData] = useState<ContactMetadata | null>(null);
    const [form] = AntForm.useForm();

    const loadContactData = async () => {
        setLoading(true);
        try {
            const data = await metadataApiService.getContactMetadata();
            if (data) {
                setContactData(data);
                form.setFieldsValue({
                    email: data.email.value,
                    phone: data.phone.value,
                });
            }
        } catch {
            notifyError('Không thể tải thông tin liên hệ');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContactData();
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        // Reset form to original values
        if (contactData) {
            form.setFieldsValue({
                email: contactData.email.value,
                phone: contactData.phone.value,
            });
        }
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            if (!contactData) {
                notifyError('Không có dữ liệu để cập nhật');
                return;
            }

            setSaving(true);

            const result = await metadataApiService.updateContactMetadata(
                contactData.email.id,
                values.email,
                contactData.phone.id,
                values.phone
            );

            if (result.success) {
                notifySuccess('Cập nhật thông tin liên hệ thành công');
                await loadContactData();
                setEditMode(false);
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

    return (
        <div className={styles.container}>
            <Spin spinning={loading}>
                <div className={styles.formWrapper}>
                    <AntForm
                        form={form}
                        layout="vertical"
                        className={styles.form}
                    >
                        <AntForm.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' },
                            ]}
                        >
                            <AntInput
                                placeholder="Nhập email liên hệ"
                                disabled={!editMode}
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại' },
                                { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ (10-11 chữ số)' },
                            ]}
                        >
                            <AntInput
                                placeholder="Nhập số điện thoại"
                                disabled={!editMode}
                                size="large"
                            />
                        </AntForm.Item>

                        <div className={styles.actions}>
                            {!editMode ? (
                                <AntButton
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={handleEdit}
                                    size="large"
                                >
                                    Chỉnh sửa
                                </AntButton>
                            ) : (
                                <div className={styles.editActions}>
                                    <AntButton
                                        onClick={handleCancel}
                                        size="large"
                                        icon={<CloseOutlined />}
                                    >
                                        Hủy
                                    </AntButton>
                                    <AntButton
                                        type="primary"
                                        loading={saving}
                                        onClick={handleSave}
                                        size="large"
                                        icon={<SaveOutlined />}
                                    >
                                        Lưu thay đổi
                                    </AntButton>
                                </div>
                            )}
                        </div>
                    </AntForm>
                </div>
            </Spin>
        </div>
    );
}
