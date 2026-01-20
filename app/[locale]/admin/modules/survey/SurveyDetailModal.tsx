'use client';

import React from 'react';
import { Survey } from '@/types/common';
import { t } from '@/utils/i18n';
import { AntModal } from '@/crema/components/AntModal';
import { formatDateTime } from '@/utils/format';
import styles from './SurveyList.module.css';

interface SurveyDetailModalProps {
  survey: Survey | null;
  open: boolean;
  onClose: () => void;
}

export default function SurveyDetailModal({ survey, open, onClose }: SurveyDetailModalProps) {
  if (!survey) return null;

  return (
    <AntModal
      title={t('survey.detailTitle')}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <div className={styles.detailContainer}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>{t('survey.name')}:</span>
          <span className={styles.detailValue}>{survey.name}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>{t('survey.phone')}:</span>
          <span className={styles.detailValue}>{survey.phone}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>{t('survey.createdAt')}:</span>
          <span className={styles.detailValue}>{formatDateTime(survey.createdAt)}</span>
        </div>

        <div className={styles.detailRowVertical}>
          <span className={styles.detailLabel}>{t('survey.content')}:</span>
          <div className={styles.detailContent}>{survey.content}</div>
        </div>
      </div>
    </AntModal>
  );
}
