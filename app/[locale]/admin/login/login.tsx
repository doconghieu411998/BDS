'use client';

import React, { useState } from 'react';
import { AntForm, AntInput, AntButton, AntCheckbox } from '@/crema/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { authStorage } from '@/utils/auth';
import { LoginRequest } from '@/types/common';
import { t } from '@/utils/i18n';
import { ROUTES } from '@/constants/routes';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import styles from './login.module.css';

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form] = AntForm.useForm();

    const handleSubmit = async (values: LoginRequest & { remember?: boolean }) => {
        try {
            setLoading(true);

            const { username, password, remember = false } = values;

            // Login và nhận tokens
            const response = await authService.login({ username, password });

            // Lưu authentication data
            authStorage.setAuth(response.accessToken, response.refreshToken, remember);

            // TODO: Uncomment khi backend hỗ trợ /auth/profile
            // const userProfile = await authService.getProfile();
            // authStorage.setUser(userProfile, remember);

            notifySuccess(t('auth.loginSuccess'));

            // Redirect về dashboard
            router.push(ROUTES.DASHBOARD);
        } catch (error: unknown) {
            // Xử lý error message từ API
            let message = t('auth.loginFailed');

            if (error && typeof error === 'object' && 'message' in error) {
                message = (error as { message: string }).message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            notifyError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginWrapper}>
                <div className={styles.loginCard}>
                    {/* Header */}
                    <div className={styles.loginHeader}>
                        <h1 className={styles.loginTitle}>{t('auth.welcome')}</h1>
                        <p className={styles.loginSubtitle}>{t('auth.loginSubtitle')}</p>
                    </div>

                    {/* Form */}
                    <AntForm
                        form={form}
                        name="login"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        size="large"
                        layout="vertical"
                    >
                        <AntForm.Item
                            name="username"
                            label={t('auth.email')}
                            rules={[
                                {
                                    required: true,
                                    message: t('auth.emailRequired'),
                                },
                                {
                                    type: 'email',
                                    message: t('auth.emailInvalid'),
                                },
                            ]}
                        >
                            <AntInput
                                prefix={<UserOutlined className={styles.inputPrefixIcon} />}
                                placeholder={t('auth.email')}
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="password"
                            label={t('auth.password')}
                            rules={[
                                {
                                    required: true,
                                    message: t('auth.passwordRequired'),
                                },
                                {
                                    min: 6,
                                    message: t('auth.passwordMinLength'),
                                },
                            ]}
                        >
                            <AntInput.Password
                                prefix={<LockOutlined className={styles.inputPrefixIcon} />}
                                placeholder={t('auth.password')}
                            />
                        </AntForm.Item>

                        <AntForm.Item>
                            <div className={styles.formFooter}>
                                <AntForm.Item name="remember" valuePropName="checked" noStyle>
                                    <AntCheckbox>{t('auth.rememberMe')}</AntCheckbox>
                                </AntForm.Item>

                                <a
                                    className={styles.forgotPasswordLink}
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {t('auth.forgotPassword')}
                                </a>
                            </div>
                        </AntForm.Item>

                        <AntForm.Item>
                            <AntButton
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className={styles.loginButton}
                            >
                                {t('auth.login')}
                            </AntButton>
                        </AntForm.Item>
                    </AntForm>

                    {/* Footer */}
                    <div className={styles.footerText}>
                        Admin Quản lý Bất động sản © {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    );
}
