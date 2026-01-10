import React from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AntButton } from '../../components/AntButton';
import { AntInput } from '../../components/AntInput';
import styles from './DataTable.module.css';

interface TableHeaderProps {
    title?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    onAdd?: () => void;
    addButtonText?: string;
    headerExtra?: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
    title,
    showSearch = true,
    searchPlaceholder = 'Tìm kiếm...',
    onSearch,
    onAdd,
    addButtonText = 'Thêm mới',
    headerExtra,
}) => {
    return (
        <div className={styles.tableHeaderContainer}>
            {title && (
                <div className={styles.tableHeaderTop}>
                    <h2 className={styles.headerTitle}>{title}</h2>
                </div>
            )}

            <div className={styles.tableHeaderSearch}>
                {showSearch && (
                    <AntInput.Search
                        placeholder={searchPlaceholder}
                        allowClear
                        onSearch={onSearch}
                        className={styles.searchInput}
                        prefix={<SearchOutlined />}
                        size="large"
                    />
                )}
                <div className={styles.headerRight}>
                    {headerExtra}
                    {onAdd && (
                        <AntButton
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={onAdd}
                            className={styles.addButton}
                        >
                            {addButtonText}
                        </AntButton>
                    )}
                </div>
            </div>
        </div>
    );
};
