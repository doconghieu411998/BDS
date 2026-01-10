import React from 'react';
import { Row as AntdRow, RowProps } from 'antd';

export const AntRow = (props: RowProps) => {
    return <AntdRow {...props} />;
};

AntRow.displayName = 'AntRow';

export default AntRow;
