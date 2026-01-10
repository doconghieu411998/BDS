import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';

export const AntCheckbox = (props: CheckboxProps) => {
    return <Checkbox {...props} />;
};

AntCheckbox.displayName = 'AntCheckbox';
AntCheckbox.Group = Checkbox.Group;

export default AntCheckbox;
