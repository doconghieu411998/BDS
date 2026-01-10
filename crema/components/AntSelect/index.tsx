import React from 'react';
import { Select as AntdSelect, SelectProps } from 'antd';

export const AntSelect = <T = unknown,>(props: SelectProps<T>) => {
    return <AntdSelect<T> {...props} />;
};

AntSelect.displayName = 'AntSelect';
AntSelect.Option = AntdSelect.Option;

export default AntSelect;
