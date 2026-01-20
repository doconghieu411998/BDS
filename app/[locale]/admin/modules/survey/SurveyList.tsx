'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Survey } from '@/types/common';
import { surveyService } from './mockData';
import { t } from '@/utils/i18n';
import DataTable from '@/crema/core/DataTable';
import { success as notifySuccess, error as notifyError } from '@/utils/antd-notification';
import SurveyDetailModal from './SurveyDetailModal';
import { formatDateTime } from '@/utils/format';
import type { ColumnType } from '@/crema/core/DataTable/types';
import styles from './SurveyList.module.css';

export default function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [detailSurvey, setDetailSurvey] = useState<Survey | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const loadSurveys = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const result = await surveyService.getList({
        page,
        limit: 10,
        search,
      });
      setSurveys(result.data);
      setTotal(result.total);
    } catch {
      notifyError(t('common.error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSurveys(currentPage, searchText);
  }, [currentPage, searchText, loadSurveys]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetail = async (id: string) => {
    try {
      const survey = await surveyService.getById(id);
      if (survey) {
        setDetailSurvey(survey);
        setDetailModalOpen(true);
      }
    } catch {
      notifyError(t('common.error'));
    }
  };

  const columns: ColumnType<Survey>[] = [
    {
      title: t('survey.name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t('survey.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: t('survey.content'),
      dataIndex: 'content',
      key: 'content',
      render: (value: unknown) => {
        const content = value as string;
        return (
          <div className={styles.contentCell}>
            {content.length > 100 ? `${content.substring(0, 100)}...` : content}
          </div>
        );
      },
    },
    {
      title: t('survey.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (value: unknown) => formatDateTime(value as string),
    },
  ];

  return (
    <div className={styles.container}>
      <DataTable<Survey>
        title={t('survey.title')}
        columns={columns}
        dataSource={surveys}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: total,
          onChange: handlePageChange,
        }}
        searchConfig={{
          placeholder: t('survey.searchPlaceholder'),
          onSearch: handleSearch,
        }}
        onView={(record) => handleViewDetail(record.id)}
        rowKey="id"
      />

      <SurveyDetailModal
        survey={detailSurvey}
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setDetailSurvey(null);
        }}
      />
    </div>
  );
}
