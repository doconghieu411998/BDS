import React from 'react';
import { Col as AntdCol, ColProps } from 'antd';

export const AntCol = (props: ColProps) => {
    return <AntdCol {...props} />;
};

AntCol.displayName = 'AntCol';

export default AntCol;
