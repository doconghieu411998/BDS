'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PostForm from '@admin/modules/post/PostForm';
import { postService } from '@/app/[locale]/admin/modules/post/postApiService';
import { Post, PostFormData } from '@/types/common';
import { ROUTES } from '@/constants/routes';
import { t } from '@/utils/i18n';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import { AntButton } from '@/crema/components/AntButton';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const loadPost = async () => {
        try {
            const data = await postService.getById(id);
            setPost(data);
        } catch {
            notifyError(t('common.error'));
            router.push(ROUTES.POST.LIST);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: PostFormData) => {
        try {
            await postService.update(id, data);
            notifySuccess(t('post.updateSuccess'));
            router.push(ROUTES.POST.LIST);
        } catch {
            notifyError(t('common.error'));
        }
    };

    if (loading) {
        return <div style={{ padding: '24px', textAlign: 'center' }}>{t('common.loading')}...</div>;
    }

    if (!post) {
        return null;
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <AntButton
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push(ROUTES.POST.LIST)}
                    style={{ marginBottom: '16px' }}
                >
                    {t('common.back')}
                </AntButton>
                <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>
                    {t('post.editPost')}
                </h1>
            </div>
            <PostForm initialData={post} isEdit onSubmit={handleSubmit} />
        </div>
    );
}
