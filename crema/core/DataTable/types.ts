export interface DataTableColumn<T = Record<string, unknown>> {
    title: string;
    dataIndex?: string;
    key: string;
    width?: number | string;
    render?: (value: unknown, record: T, index: number) => React.ReactNode;
    sorter?: boolean | ((a: T, b: T) => number);
    filters?: Array<{ text: string; value: unknown }>;
    onFilter?: (value: unknown, record: T) => boolean;
    fixed?: 'left' | 'right';
    align?: 'left' | 'center' | 'right';
}

export type ColumnType<T = Record<string, unknown>> = DataTableColumn<T>;

export interface DataTableProps<T = Record<string, unknown>> {
    // Data
    data?: T[];
    dataSource?: T[];
    columns: DataTableColumn<T>[];
    loading?: boolean;
    rowKey?: string | ((record: T) => string);

    // Pagination
    pagination?: {
        current: number;
        pageSize: number;
        total: number;
        onChange?: (page: number, pageSize?: number) => void;
    };

    // Search config
    searchConfig?: {
        placeholder: string;
        onSearch: (value: string) => void;
    };

    // Actions
    onAdd?: () => void;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    onView?: (record: T) => void;

    // Header props
    title?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    addButtonText?: string;
    headerExtra?: React.ReactNode;

    // Table props
    className?: string;
    scroll?: { x?: number | string; y?: number | string };
}
