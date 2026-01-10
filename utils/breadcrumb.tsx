import { HomeOutlined } from '@ant-design/icons';
import React from 'react';

export interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
    icon?: React.ReactNode;
}

// Map các route với breadcrumb name
export const BREADCRUMB_MAP: Record<string, string> = {
    '/admin/dashboard': 'Trang chủ',
    '/admin/dashboard/post': 'Quản lý Bài viết',
    '/admin/dashboard/post/create': 'Thêm Bài viết mới',
    '/admin/dashboard/post/edit': 'Chỉnh sửa Bài viết',
    '/admin/dashboard/user': 'Quản lý Người dùng',
    '/admin/dashboard/user/create': 'Thêm Người dùng mới',
    '/admin/dashboard/user/edit': 'Chỉnh sửa Người dùng',
    '/admin/dashboard/profile': 'Hồ sơ cá nhân',
    '/admin/dashboard/change-password': 'Đổi mật khẩu',
};

/**
 * Tạo breadcrumb items từ pathname
 * @param pathname - Current pathname từ usePathname()
 * @returns Array of breadcrumb items cho Ant Design Breadcrumb
 */
export const generateBreadcrumbs = (pathname: string): BreadcrumbRoute[] => {
    const paths = pathname.split('/').filter((path) => path);
    const breadcrumbs: BreadcrumbRoute[] = [];

    // Luôn thêm Dashboard làm home
    breadcrumbs.push({
        path: '/admin/dashboard',
        breadcrumbName: 'Trang chủ',
        icon: <HomeOutlined />,
    });

    // Xây dựng breadcrumb từ các segments
    let currentPath = '';
    for (let i = 0; i < paths.length; i++) {
        currentPath += `/${paths[i]}`;

        // Skip dashboard vì đã thêm ở trên
        if (currentPath === 'admin/dashboard') continue;

        // Kiểm tra nếu là dynamic route (UUID hoặc số)
        const segment = paths[i];
        const isDynamic =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$|^\d+$/.test(segment);

        if (isDynamic) {
            // Nếu là ID, lấy tên từ segment trước đó + '/edit' hoặc '/detail'
            const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
            const action = paths[i - 1]; // 'edit' hoặc có thể là segment khác

            if (action === 'edit') {
                breadcrumbs.push({
                    path: currentPath,
                    breadcrumbName: BREADCRUMB_MAP[`${parentPath}/edit`] || 'Chi tiết',
                });
            } else {
                breadcrumbs.push({
                    path: currentPath,
                    breadcrumbName: 'Chi tiết',
                });
            }
        } else {
            // Route thông thường
            const breadcrumbName = BREADCRUMB_MAP[currentPath];
            if (breadcrumbName) {
                breadcrumbs.push({
                    path: currentPath,
                    breadcrumbName,
                });
            }
        }
    }

    return breadcrumbs;
};
