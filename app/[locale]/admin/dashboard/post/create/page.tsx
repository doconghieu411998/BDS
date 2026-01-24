'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@admin/modules/post/PostForm';
import { postService } from '@/app/[locale]/admin/modules/post/postApiService';
import { PostFormData } from '@/types/common';
import { ROUTES } from '@/constants/routes';
import { t } from '@/utils/i18n';
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
            await postService.create(data);
            notifySuccess(t('post.createSuccess'));
            router.push(ROUTES.POST.LIST);
        } catch {
            notifyError(t('common.error'));
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
                    {t('common.back')}
                </AntButton>
                <h1 className={styles.pageTitle}>{t('menu.postCreate')}</h1>
            </div>

            <PostForm onSubmit={handleSubmit} />
        </div>
    );
}
