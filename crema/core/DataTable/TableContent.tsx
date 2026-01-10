import React from 'react';
import { AntTable } from '../../components/AntTable';
import { DataTableColumn } from './types';
import styles from './DataTable.module.css';

interface TableContentProps<T = Record<string, unknown>> {
    data: T[];
    columns: DataTableColumn<T>[];
    loading?: boolean;
    rowKey?: string | ((record: T) => string);
    pagination?: {
        current: number;
        pageSize: number;
        total: number;
        onChange?: (page: number, pageSize: number) => void;
    };
    scroll?: { x?: number | string; y?: number | string };
}

export const TableContent = <T extends Record<string, unknown> = Record<string, unknown>>({
    data,
    columns,
    loading,
    rowKey = 'id',
    pagination,
    scroll,
}: TableContentProps<T>) => {
    return (
        <div className={styles.tableWrapper}>
            <AntTable<T>
                dataSource={data}
                columns={columns}
                loading={loading}
                rowKey={rowKey}
                pagination={
                    pagination
                        ? {
                              current: pagination.current,
                              pageSize: pagination.pageSize,
                              total: pagination.total,
                              onChange: pagination.onChange,
                              showSizeChanger: true,
                              showTotal: (total) => `Tổng ${total} bản ghi`,
                              pageSizeOptions: ['10', '20', '50', '100'],
                          }
                        : false
                }
                scroll={scroll}
            />
        </div>
    );
};
