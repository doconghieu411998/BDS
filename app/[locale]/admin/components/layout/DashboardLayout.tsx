'use client';

import React, { useState, useEffect } from 'react';
import {
    AntLayout,
    AntMenu,
    AntDropdown,
    AntAvatar,
    AntButton,
    AntTypography,
    type MenuProps,
} from '@/crema/components';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { MENU_ITEMS } from '@/constants/menu';
import { t } from '@/utils/i18n';
import { ROUTES } from '@/constants/routes';
import type { User } from '@/types/common';
import styles from './DashboardLayout.module.css';
import { authService } from '@/services/authService';
import { authStorage } from '@/utils/auth';

const { Header, Sider, Content } = AntLayout;
const { Text } = AntTypography;

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Lấy thông tin user từ cookie
    const userStr = Cookies.get('user');
    const user: User | null = userStr ? JSON.parse(userStr) : null;

    // Client-only rendering to avoid hydration mismatch
    useEffect(() => {
        // Use setTimeout to avoid setState during render
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Tìm selected key dựa trên pathname
    const getSelectedKeys = () => {
        const findKey = (items: typeof MENU_ITEMS): string[] => {
            for (const item of items) {
                if (item.path === pathname) {
                    return [item.key];
                }
                if (item.children) {
                    const childKey = findKey(item.children);
                    if (childKey.length > 0) return childKey;
                }
            }
            return [];
        };
        return findKey(MENU_ITEMS);
    };

    // Tìm open keys cho submenu
    const getOpenKeys = () => {
        const findParentKey = (items: typeof MENU_ITEMS, targetPath: string): string[] => {
            for (const item of items) {
                if (item.children) {
                    const hasChild = item.children.some((child) => child.path === targetPath);
                    if (hasChild) return [item.key];
                }
            }
            return [];
        };
        return findParentKey(MENU_ITEMS, pathname);
    };

    // Convert menu items cho Ant Design Menu
    const convertMenuItems = (items: typeof MENU_ITEMS): MenuProps['items'] => {
        return items.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            children: item.children ? convertMenuItems(item.children) : undefined,
            onClick: item.path ? () => router.push(item.path!) : undefined,
        }));
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Luôn clear cookies và redirect bất kể API thành công hay thất bại
            authStorage.clearAuth();
            router.push(ROUTES.LOGIN);
        }
    };

    // Dropdown menu cho avatar
    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: 'Cài đặt tài khoản',
            onClick: () => router.push(ROUTES.PROFILE),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout,
            danger: true,
        },
    ];

    // Prevent hydration mismatch by rendering placeholder until mounted
    if (!mounted) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <AntLayout className={styles.layoutContainer}>
            {/* Sidebar */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={styles.sidebar}
                width={240}
            >
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <h1 className={styles.logoText}>{collapsed ? 'A' : 'Admin'}</h1>
                </div>

                {/* Menu */}
                <AntMenu
                    mode="inline"
                    selectedKeys={getSelectedKeys()}
                    defaultOpenKeys={getOpenKeys()}
                    items={convertMenuItems(MENU_ITEMS)}
                    className={styles.menu}
                />
            </Sider>

            <AntLayout>
                {/* Header */}
                <Header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <AntButton
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className={styles.toggleButton}
                        />
                    </div>

                    <AntDropdown menu={{ items: userMenuItems }} placement="bottomRight">
                        <div className={styles.userDropdown} suppressHydrationWarning>
                            <AntAvatar
                                size="default"
                                icon={<UserOutlined />}
                                src={user?.avatar || undefined}
                                className={styles.userAvatar}
                            />
                            <div className={styles.userInfo}>
                                <Text strong className={styles.userName}>
                                    {user?.name || 'Admin'}
                                </Text>
                                <Text type="secondary" className={styles.userRole}>
                                    {user?.role || 'Administrator'}
                                </Text>
                            </div>
                        </div>
                    </AntDropdown>
                </Header>

                {/* Content */}
                <Content className={styles.content}>
                    <div className={styles.contentWrapper}>{children}</div>
                </Content>
            </AntLayout>
        </AntLayout>
    );
}
