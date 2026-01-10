'use client';

import React from 'react';
import { Tabs } from 'antd';
import {
    AntCard,
    AntTypography,
    AntForm,
    AntInput,
    AntButton,
    AntAvatar,
    AntUpload,
} from '@/crema/components';
import { UserOutlined, UploadOutlined, LockOutlined } from '@ant-design/icons';
import { t } from '@/utils/i18n';
import { success as notifySuccess } from '@/utils/antd-notification';
import styles from './page.module.css';

const { Title } = AntTypography;

export default function ProfilePage() {
    const [profileForm] = AntForm.useForm();
    const [passwordForm] = AntForm.useForm();

    const handleProfileSubmit = (values: { name: string; email: string; phone: string }) => {
        console.log('Profile values:', values);
        notifySuccess('Cập nhật thông tin thành công!');
    };

    const handlePasswordSubmit = (values: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        console.log('Change password values:', values);
        notifySuccess('Đổi mật khẩu thành công!');
        passwordForm.resetFields();
    };

    const tabItems = [
        {
            key: 'profile',
            label: t('auth.profile'),
            children: (
                <div className={styles.tabContent}>
                    <div className={styles.avatarSection}>
                        <AntAvatar
                            size={100}
                            icon={<UserOutlined />}
                            className={styles.profileAvatar}
                        />
                    </div>

                    <AntForm
                        form={profileForm}
                        layout="vertical"
                        onFinish={handleProfileSubmit}
                        initialValues={{
                            name: 'Admin User',
                            email: 'admin@example.com',
                            phone: '0123456789',
                        }}
                        className={styles.form}
                    >
                        <AntForm.Item
                            name="name"
                            label={t('user.name')}
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.required'),
                                },
                            ]}
                        >
                            <AntInput size="large" />
                        </AntForm.Item>

                        <AntForm.Item
                            name="email"
                            label={t('user.email')}
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.required'),
                                },
                                {
                                    type: 'email',
                                    message: t('validation.emailInvalid'),
                                },
                            ]}
                        >
                            <AntInput size="large" />
                        </AntForm.Item>

                        <AntForm.Item name="phone" label={t('user.phone')}>
                            <AntInput size="large" />
                        </AntForm.Item>

                        <AntForm.Item>
                            <AntUpload>
                                <AntButton icon={<UploadOutlined />}>Tải ảnh đại diện</AntButton>
                            </AntUpload>
                        </AntForm.Item>

                        <AntForm.Item>
                            <AntButton
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className={styles.submitButton}
                            >
                                {t('common.save')}
                            </AntButton>
                        </AntForm.Item>
                    </AntForm>
                </div>
            ),
        },
        {
            key: 'change-password',
            label: t('auth.changePassword'),
            children: (
                <div className={styles.tabContent}>
                    <AntForm
                        form={passwordForm}
                        layout="vertical"
                        onFinish={handlePasswordSubmit}
                        className={styles.form}
                    >
                        <AntForm.Item
                            name="oldPassword"
                            label={t('auth.oldPassword')}
                            rules={[
                                {
                                    required: true,
                                    message: t('auth.passwordRequired'),
                                },
                            ]}
                        >
                            <AntInput.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder={t('auth.oldPassword')}
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="newPassword"
                            label={t('auth.newPassword')}
                            rules={[
                                {
                                    required: true,
                                    message: t('auth.passwordRequired'),
                                },
                                { min: 6, message: t('auth.passwordMinLength') },
                            ]}
                        >
                            <AntInput.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder={t('auth.newPassword')}
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="confirmPassword"
                            label={t('auth.confirmPassword')}
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: t('auth.confirmPasswordRequired'),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(t('auth.passwordNotMatch'))
                                        );
                                    },
                                }),
                            ]}
                        >
                            <AntInput.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder={t('auth.confirmPassword')}
                            />
                        </AntForm.Item>

                        <AntForm.Item>
                            <AntButton
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className={styles.submitButton}
                            >
                                {t('common.save')}
                            </AntButton>
                        </AntForm.Item>
                    </AntForm>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.profileContainer}>
            <Title level={2} className={styles.profileTitle}>
                Cài đặt tài khoản
            </Title>
            <AntCard className={styles.profileCard}>
                <Tabs defaultActiveKey="profile" items={tabItems} size="large" />
            </AntCard>
        </div>
    );
}
