'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@admin/modules/post/PostForm';
import { postService } from '@/app/[locale]/admin/modules/post/postApiService';
import { PostFormData } from '@/types/common';
import { ROUTES } from '@/constants/routes';
import { AntButton, AntBreadcrumb } from '@/crema/components';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { generateBreadcrumbs } from '@/utils/breadcrumb';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

export default function CreatePostPage() {
    const router = useRouter();
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    const handleSubmit = async (data: PostFormData) => {
        try {
            console.log('Submitting data:', data);
            await postService.create(data);
            notifySuccess('Tạo bài viết thành công!');
            router.push(ROUTES.POST.LIST);
        } catch {
            notifyError('Lỗi');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <AntBreadcrumb
                items={breadcrumbs.map((item) => ({
                    title: item.breadcrumbName,
                    href: item.path,
                }))}
                style={{ marginBottom: 16 }}
            />

            <div className={styles.headerContainer}>
                <AntButton
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push(ROUTES.POST.LIST)}
                    className={styles.backButton}
                >
                    Quay lại
                </AntButton>
                <h1 className={styles.pageTitle}>Thêm bài viết</h1>
            </div>

            <PostForm onSubmit={handleSubmit} />
        </div>
    );
}
