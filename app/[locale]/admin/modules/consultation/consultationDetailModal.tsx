'use client';

import React from 'react';
import { ConsultationResponse } from '@/models/consultation';
import { AntModal } from '@/crema/components/AntModal';
import { formatDateTime } from '@/utils/format';
import styles from './consultationList.module.css';

interface ConsultationDetailModalProps {
  consultation: ConsultationResponse | null;
  open: boolean;
  onClose: () => void;
}

export default function ConsultationDetailModal({ consultation, open, onClose }: ConsultationDetailModalProps) {
  if (!consultation) return null;

  return (
    <AntModal
      title="Chi tiết khảo sát"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <div className={styles.detailContainer}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Họ tên:</span>
          <span className={styles.detailValue}>{consultation.name}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Số điện thoại:</span>
          <span className={styles.detailValue}>{consultation.phoneNumber}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Ngày tạo:</span>
          <span className={styles.detailValue}>{formatDateTime(consultation.createdAt)}</span>
        </div>

        <div className={styles.detailRowVertical}>
          <span className={styles.detailLabel}>Nội dung:</span>
          <div className={styles.detailContent}>{consultation.content}</div>
        </div>
      </div>
    </AntModal>
  );
}
