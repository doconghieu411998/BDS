'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { metadataApiService } from '@/api/metadataApiService';
import { ContactMetadata } from '@/models/metadata';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import {
    AntForm,
    AntInput,
    AntButton,
} from '@/crema/components';
import styles from './ContactSettings.module.css';

export default function ContactSettings() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [contactData, setContactData] = useState<ContactMetadata | null>(null);
    const [form] = AntForm.useForm();

    const loadContactData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await metadataApiService.getContactMetadata();
            if (data) {
                setContactData(data);
                form.setFieldsValue({
                    email: data.email.value,
                    phone: data.phone.value,
                });
            } else {
                notifyError('Không tìm thấy thông tin liên hệ');
            }
        } catch {
            notifyError('Không thể tải thông tin liên hệ');
        } finally {
            setLoading(false);
        }
    }, [form]);

    useEffect(() => {
        loadContactData();
    }, [loadContactData]);

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
                <div className={styles.header}>
                    <h1 className={styles.title}>Quản lý thông tin liên hệ</h1>
                    <p className={styles.description}>
                        Cập nhật email và số điện thoại liên hệ hiển thị trên trang web
                    </p>
                </div>

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
                                { whitespace: true, message: 'Email không được để trống' },
                            ]}
                        >
                            <AntInput
                                placeholder="Nhập email liên hệ"
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại' },
                                { whitespace: true, message: 'Số điện thoại không được để trống' },
                            ]}
                        >
                            <AntInput
                                placeholder="Nhập số điện thoại"
                                size="large"
                            />
                        </AntForm.Item>

                        <AntForm.Item className={styles.submitButton}>
                            <AntButton
                                type="primary"
                                size="large"
                                loading={saving}
                                onClick={handleSave}
                            >
                                Lưu thay đổi
                            </AntButton>
                        </AntForm.Item>
                    </AntForm>
                </div>
            </Spin>
        </div>
    );
}
