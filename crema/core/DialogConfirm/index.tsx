import React from 'react';
import { AntModal } from '../../components/AntModal';
import { AntButton } from '../../components/AntButton';
import styles from './DialogConfirm.module.css';

export type ConfirmType = 'warning' | 'danger' | 'info';

export interface DialogConfirmProps {
    open: boolean;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
    title?: string;
    content?: string | React.ReactNode;
    type?: ConfirmType;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}

export const DialogConfirm: React.FC<DialogConfirmProps> = ({
    open,
    onConfirm,
    onCancel,
    title = 'Xác nhận',
    content = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    type = 'warning',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    loading = false,
}) => {
    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <AntModal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closable
            className={styles.confirmModal}
            width={520}
        >
            <div className={styles.confirmContent}>
                <h3 className={styles.confirmTitle}>{title}</h3>
                <div className={styles.confirmDescription}>{content}</div>

                <div className={styles.confirmFooter}>
                    <AntButton
                        onClick={onCancel}
                        disabled={loading}
                        className={styles.cancelButton}
                    >
                        {cancelText}
                    </AntButton>
                    <AntButton
                        type="primary"
                        danger={type === 'danger'}
                        onClick={handleConfirm}
                        loading={loading}
                        className={styles.confirmButton}
                    >
                        {confirmText}
                    </AntButton>
                </div>
            </div>
        </AntModal>
    );
};

export default DialogConfirm;
