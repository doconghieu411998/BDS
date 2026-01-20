'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { LanguageItem, LanguagePair } from '@/models/language';
import { getLanguageList, updateLanguageByKey } from '@/api/languageApiService';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import {
    AntTable,
    AntButton,
    AntModal,
    AntForm,
    AntInput,
} from '@/crema/components';
import type { ColumnType } from 'antd/es/table';
import styles from './LanguageList.module.css';

interface UpdateModalData {
    key: string;
    enValue: string;
    viValue: string;
}

export default function LanguageList() {
    const [languagePairs, setLanguagePairs] = useState<LanguagePair[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedPair, setSelectedPair] = useState<UpdateModalData | null>(null);
    const [form] = AntForm.useForm();

    const loadLanguages = useCallback(async () => {
        setLoading(true);
        try {
            const items = await getLanguageList();

            // Group by key to create pairs
            const pairsMap = new Map<string, LanguagePair>();

            items.forEach((item) => {
                if (!pairsMap.has(item.key)) {
                    pairsMap.set(item.key, {
                        key: item.key,
                        en: {} as LanguageItem,
                        vi: {} as LanguageItem,
                        updateDate: item.updateDate,
                    });
                }

                const pair = pairsMap.get(item.key)!;
                if (item.type === 'en') {
                    pair.en = item;
                } else if (item.type === 'vi') {
                    pair.vi = item;
                }

                // Use the latest updateDate
                if (new Date(item.updateDate) > new Date(pair.updateDate)) {
                    pair.updateDate = item.updateDate;
                }
            });

            setLanguagePairs(Array.from(pairsMap.values()));
        } catch {
            notifyError('Failed to load language data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadLanguages();
    }, [loadLanguages]);

    const handleUpdate = (pair: LanguagePair) => {
        setSelectedPair({
            key: pair.key,
            enValue: pair.en?.value || '',
            viValue: pair.vi?.value || '',
        });
        form.setFieldsValue({
            enValue: pair.en?.value || '',
            viValue: pair.vi?.value || '',
        });
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedPair(null);
        form.resetFields();
    };

    const handleModalSave = async () => {
        try {
            const values = await form.validateFields();

            if (!selectedPair) return;

            setSaving(true);

            const result = await updateLanguageByKey(
                selectedPair.key,
                values.enValue,
                values.viValue
            );

            if (result.success) {
                notifySuccess('Language updated successfully');
                handleModalCancel();
                await loadLanguages();
            } else {
                notifyError('Failed to update language');
            }
        } catch (error) {
            if (error instanceof Error && error.message !== 'Validation failed') {
                notifyError('Failed to update language');
            }
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const columns: ColumnType<LanguagePair>[] = [
        {
            title: 'STT',
            key: 'index',
            width: 70,
            align: 'center',
            render: (_: unknown, __: LanguagePair, index: number) => index + 1,
        },
        {
            title: 'Khóa',
            dataIndex: 'key',
            key: 'key',
            width: 200,
        },
        {
            title: 'Tiếng Anh',
            key: 'en',
            render: (_: unknown, record: LanguagePair) => record.en?.value || '-',
        },
        {
            title: 'Tiếng Việt',
            key: 'vi',
            render: (_: unknown, record: LanguagePair) => record.vi?.value || '-',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updateDate',
            key: 'updateDate',
            width: 180,
            className: styles.noWrap,
            render: (_: unknown, record: LanguagePair) => formatDate(record.updateDate),
        },
        {
            title: 'Ngày tạo',
            key: 'createDate',
            width: 180,
            className: styles.noWrap,
            render: (_: unknown, record: LanguagePair) =>
                formatDate(record.en?.createDate || record.vi?.createDate),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 100,
            align: 'center',
            render: (_: unknown, record: LanguagePair) => (
                <AntButton
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleUpdate(record)}
                />
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <Spin spinning={loading}>
                <div style={{ marginBottom: 16 }}>
                    <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>
                        Quản lý ngôn ngữ
                    </h1>
                </div>

                <AntTable
                    columns={columns}
                    dataSource={languagePairs}
                    rowKey="key"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                    bordered
                />
            </Spin>

            <AntModal
                title="Cập nhật ngôn ngữ"
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={[
                    <AntButton key="cancel" onClick={handleModalCancel}>
                        Hủy
                    </AntButton>,
                    <AntButton
                        key="save"
                        type="primary"
                        loading={saving}
                        onClick={handleModalSave}
                    >
                        Lưu
                    </AntButton>,
                ]}
                width={600}
            >
                <AntForm
                    form={form}
                    layout="vertical"
                    style={{ marginTop: 20 }}
                >
                    <AntForm.Item
                        label="Khóa"
                        style={{ marginBottom: 16 }}
                    >
                        <AntInput value={selectedPair?.key} disabled />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Giá trị tiếng Anh"
                        name="enValue"
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị tiếng Anh' },
                            { whitespace: true, message: 'Giá trị không được để trống' },
                        ]}
                        style={{ marginBottom: 16 }}
                    >
                        <AntInput placeholder="Nhập bản dịch tiếng Anh" />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Giá trị tiếng Việt"
                        name="viValue"
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị tiếng Việt' },
                            { whitespace: true, message: 'Giá trị không được để trống' },
                        ]}
                        style={{ marginBottom: 0 }}
                    >
                        <AntInput placeholder="Nhập bản dịch tiếng Việt" />
                    </AntForm.Item>
                </AntForm>
            </AntModal>
        </div>
    );
}
