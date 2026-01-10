import React from 'react';
import { Table as AntdTable, TableProps } from 'antd';

export const AntTable = <T extends Record<string, unknown> = Record<string, unknown>>(
    props: TableProps<T>
) => {
    return <AntdTable<T> {...props} />;
};

AntTable.displayName = 'AntTable';

export default AntTable;
