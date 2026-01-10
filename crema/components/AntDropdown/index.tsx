import React from 'react';
import { Dropdown as AntdDropdown, DropdownProps } from 'antd';

export const AntDropdown = (props: DropdownProps) => {
    return <AntdDropdown {...props} />;
};

AntDropdown.displayName = 'AntDropdown';
AntDropdown.Button = AntdDropdown.Button;

export default AntDropdown;
