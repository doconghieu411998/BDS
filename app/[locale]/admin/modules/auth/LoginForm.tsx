'use client';

import React, { useState } from 'react';
import { AntForm, AntInput, AntButton, AntCheckbox } from '@/crema/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { authStorage } from '@/utils/auth';
import { LoginRequest } from '@/types/common';
import { ROUTES } from '@/constants/routes';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import styles from './LoginForm.module.css';

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

            notifySuccess('Đăng nhập thành công!');

            // Redirect về dashboard
            router.push(ROUTES.DASHBOARD);
        } catch (error: unknown) {
            // Xử lý error message từ API
            let message = 'Đăng nhập thất bại!';

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
                        <h1 className={styles.loginTitle}>Chào mừng trở lại</h1>
                        <p className={styles.loginSubtitle}>Vui lòng đăng nhập để tiếp tục</p>
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
                            label={'Email'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <AntInput
                                prefix={<UserOutlined className={styles.inputPrefixIcon} />}
                                placeholder={'Email'}
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            name="password"
                            label={'Mật khẩu'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    min: 6,
                                    message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                                },
                            ]}
                        >
                            <AntInput.Password
                                prefix={<LockOutlined className={styles.inputPrefixIcon} />}
                                placeholder={'Mật khẩu'}
                            />
                        </AntForm.Item>

                        <AntForm.Item>
                            <div className={styles.formFooter}>
                                <AntForm.Item name="remember" valuePropName="checked" noStyle>
                                    <AntCheckbox>Ghi nhớ đăng nhập</AntCheckbox>
                                </AntForm.Item>

                                <a
                                    className={styles.forgotPasswordLink}
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Quên mật khẩu?
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
                                Đăng nhập
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
