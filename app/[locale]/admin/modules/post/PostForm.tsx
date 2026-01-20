'use client';

import React, { useEffect, useState } from 'react';
import { Post, PostFormData, PostStatus, PostCategory } from '@/types/common';
import { t } from '@/utils/i18n';
import { AntForm } from '@/crema/components/AntForm';
import { AntInput } from '@/crema/components/AntInput';
import { AntButton } from '@/crema/components/AntButton';
import { AntSelect } from '@/crema/components/AntSelect';
import { AntUpload } from '@/crema/components/AntUpload';
import RichTextEditor from '@/crema/components/RichTextEditor';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, FormInstance } from 'antd';
import { Tabs } from 'antd';
import styles from './PostForm.module.css';

interface PostFormProps {
  initialData?: Post;
  isEdit?: boolean;
  onSubmit: (data: PostFormData) => Promise<void>;
}

export default function PostForm({ initialData, isEdit = false, onSubmit }: PostFormProps) {
  const [formVi] = AntForm.useForm();
  const [formEn] = AntForm.useForm();
  const [commonForm] = AntForm.useForm();
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(initialData?.thumbnail);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [activeTab, setActiveTab] = useState('vi');

  useEffect(() => {
    if (initialData) {
      // Set common fields
      commonForm.setFieldsValue({
        category: initialData.category,
        status: initialData.status,
      });

      // Set VI fields (giả sử data hiện tại là tiếng Việt)
      formVi.setFieldsValue({
        title: initialData.title,
        content: initialData.content,
        excerpt: initialData.excerpt,
      });

      // Set EN fields (để trống hoặc có thể load từ API)
      formEn.setFieldsValue({
        title: '',
        content: '',
        excerpt: '',
      });

      setThumbnailUrl(initialData.thumbnail);

      // Set fileList để hiển thị ảnh dạng list item khi edit
      if (initialData.thumbnail) {
        setFileList([
          {
            uid: '-1',
            name: 'thumbnail.jpg',
            status: 'done',
            url: initialData.thumbnail,
          },
        ]);
      }
    }
  }, [initialData, formVi, formEn, commonForm]);

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validate all forms
      await Promise.all([
        formVi.validateFields(),
        formEn.validateFields(),
        commonForm.validateFields(),
      ]);

      const viValues = formVi.getFieldsValue();
      const enValues = formEn.getFieldsValue();
      const commonValues = commonForm.getFieldsValue();

      let thumbnailBase64 = thumbnailUrl;

      // Nếu có file mới được upload
      if (fileList.length > 0 && fileList[0].originFileObj) {
        thumbnailBase64 = await handleImageUpload(fileList[0].originFileObj as File);
      }

      const formData: PostFormData = {
        vi: {
          title: viValues.title,
          content: viValues.content,
          excerpt: viValues.excerpt,
        },
        en: {
          title: enValues.title,
          content: enValues.content,
          excerpt: enValues.excerpt,
        },
        thumbnail: thumbnailBase64,
        category: commonValues.category,
        status: commonValues.status,
      };
      console.log('Submitting form data:', formData);

      await onSubmit(formData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { label: t('post.categoryNews'), value: PostCategory.NEWS },
    { label: t('post.categoryGuide'), value: PostCategory.GUIDE },
    { label: t('post.categoryMarket'), value: PostCategory.MARKET },
    { label: t('post.categoryTips'), value: PostCategory.TIPS },
  ];

  const statusOptions = [
    { label: t('post.statusDraft'), value: PostStatus.DRAFT },
    { label: t('post.statusPublished'), value: PostStatus.PUBLISHED },
    { label: t('post.statusArchived'), value: PostStatus.ARCHIVED },
  ];

  const renderLanguageForm = (form: FormInstance) => (
    <div className={styles.formGrid}>
      {/* Tiêu đề */}
      <AntForm.Item
        name="title"
        label={t('post.title')}
        rules={[
          {
            required: true,
            message: t('post.titleRequired'),
          },
        ]}
      >
        <AntInput placeholder={t('post.titlePlaceholder')} size="large" />
      </AntForm.Item>

      {/* Tóm tắt */}
      <AntForm.Item
        name="excerpt"
        label={t('post.excerpt')}
        rules={[
          {
            required: true,
            message: t('post.excerptRequired'),
          },
        ]}
      >
        <AntInput.TextArea placeholder={t('post.excerptPlaceholder')} rows={3} />
      </AntForm.Item>

      {/* Nội dung */}
      <AntForm.Item
        name="content"
        label={t('post.content')}
        rules={[
          {
            required: true,
            message: t('post.contentRequired'),
          },
        ]}
      >
        <RichTextEditor
          value={form.getFieldValue('content')}
          onChange={(value) => form.setFieldValue('content', value)}
        />
      </AntForm.Item>
    </div>
  );

  return (
    <div className={styles.formContainer}>
      {/* Common fields form */}
      <AntForm
        form={commonForm}
        layout="vertical"
        initialValues={{
          status: PostStatus.DRAFT,
          category: PostCategory.NEWS,
        }}
      >
        <div className={styles.formGrid}>
          {/* Danh mục và Trạng thái */}
          <div className={styles.formRow}>
            <AntForm.Item
              name="category"
              label={t('post.category')}
              rules={[
                {
                  required: true,
                  message: t('post.categoryRequired'),
                },
              ]}
            >
              <Select
                mode="tags"
                options={categoryOptions}
                placeholder={t('post.categoryPlaceholder')}
                size="large"
              />
            </AntForm.Item>

            <AntForm.Item
              name="status"
              label={t('post.status')}
              rules={[
                {
                  required: true,
                  message: t('post.statusRequired'),
                },
              ]}
            >
              <AntSelect
                options={statusOptions}
                placeholder={t('post.statusPlaceholder')}
                size="large"
              />
            </AntForm.Item>
          </div>

          {/* Ảnh đại diện */}
          <div className={styles.formItem}>
            <label className={styles.label}>{t('post.thumbnail')}</label>
            <AntUpload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <AntButton icon={<UploadOutlined />}>{t('common.uploadImage')}</AntButton>
            </AntUpload>
          </div>
        </div>
      </AntForm>

      {/* Language tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'vi',
            label: 'VI - Tiếng Việt',
            children: (
              <AntForm form={formVi} layout="vertical">
                {renderLanguageForm(formVi)}
              </AntForm>
            ),
          },
          {
            key: 'en',
            label: 'EN - English',
            children: (
              <AntForm form={formEn} layout="vertical">
                {renderLanguageForm(formEn)}
              </AntForm>
            ),
          },
        ]}
      />

      {/* Actions */}
      <div className={styles.actions}>
        <AntButton type="default" size="large" onClick={() => window.history.back()}>
          {t('common.cancel')}
        </AntButton>
        <AntButton type="primary" size="large" loading={loading} onClick={handleSubmit}>
          {isEdit ? t('common.update') : t('common.create')}
        </AntButton>
      </div>
    </div>
  );
}
