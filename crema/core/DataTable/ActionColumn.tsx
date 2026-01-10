import React from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { AntButton } from '../../components/AntButton';
import styles from './DataTable.module.css';

interface ActionColumnProps<T = Record<string, unknown>> {
    record: T;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    onView?: (record: T) => void;
}

export const ActionColumn = <T,>({ record, onEdit, onDelete, onView }: ActionColumnProps<T>) => {
    return (
        <div className={styles.actionButtons}>
            {onView && (
                <AntButton
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => onView(record)}
                    className={`${styles.actionButton} ${styles.viewButton}`}
                />
            )}
            {onEdit && (
                <AntButton
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                    className={`${styles.actionButton} ${styles.editButton}`}
                />
            )}
            {onDelete && (
                <AntButton
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(record)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                />
            )}
        </div>
    );
};
