import React, { useMemo } from 'react';
import { TableHeader } from './TableHeader';
import { TableContent } from './TableContent';
import { ActionColumn } from './ActionColumn';
import { DataTableProps, DataTableColumn } from './types';

export const DataTable = <T extends Record<string, unknown> = Record<string, unknown>>({
    data,
    dataSource,
    columns,
    loading,
    rowKey = 'id',
    pagination,
    searchConfig,
    onAdd,
    onEdit,
    onDelete,
    onView,
    title,
    showSearch = true,
    searchPlaceholder,
    onSearch,
    addButtonText,
    headerExtra,
    className,
    scroll,
}: DataTableProps<T>) => {
    // Support both data and dataSource props
    const tableData = dataSource || data || [];

    // Support both searchConfig and legacy onSearch props
    const searchHandler = searchConfig?.onSearch || onSearch;
    const searchPlaceholderText = searchConfig?.placeholder || searchPlaceholder;

    const pageSize = pagination?.pageSize || 10;
    const current = pagination?.current || 1;

    // Tự động thêm cột STT và Actions
    const enhancedColumns = useMemo<DataTableColumn<T>[]>(() => {
        const hasActions = onEdit || onDelete || onView;

        // Cột STT ở đầu bảng
        const sttColumn: DataTableColumn<T> = {
            title: 'STT',
            key: 'stt',
            width: 60,
            fixed: 'left',
            align: 'center',
            render: (_: unknown, __: T, index: number) => {
                return (current - 1) * pageSize + index + 1;
            },
        };

        // Cột Actions ở cuối bảng (nếu có)
        const actionsColumn: DataTableColumn<T> = {
            title: 'Thao tác',
            key: 'actions',
            width: 120,
            fixed: 'right',
            align: 'center',
            render: (_: unknown, record: T) => (
                <ActionColumn record={record} onEdit={onEdit} onDelete={onDelete} onView={onView} />
            ),
        };

        if (!hasActions) {
            return [sttColumn, ...columns];
        }

        return [sttColumn, ...columns, actionsColumn];
    }, [columns, onEdit, onDelete, onView, current, pageSize]);

    return (
        <div className={className}>
            <TableHeader
                title={title}
                showSearch={showSearch}
                searchPlaceholder={searchPlaceholderText}
                onSearch={searchHandler}
                onAdd={onAdd}
                addButtonText={addButtonText}
                headerExtra={headerExtra}
            />
            <TableContent<T>
                data={tableData}
                columns={enhancedColumns}
                loading={loading}
                rowKey={rowKey}
                pagination={pagination}
                scroll={scroll || { x: 'max-content' }}
            />
        </div>
    );
};

export default DataTable;
