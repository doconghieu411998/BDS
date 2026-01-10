import React from 'react';
import { Input as AntdInput, InputProps, InputRef } from 'antd';

export const AntInput: React.FC<InputProps> & {
    Password: typeof AntdInput.Password;
    TextArea: typeof AntdInput.TextArea;
    Search: typeof AntdInput.Search;
} = Object.assign(
    React.forwardRef<InputRef, InputProps>(function AntInputComponent(props, ref) {
        return <AntdInput ref={ref} {...props} />;
    }),
    {
        Password: AntdInput.Password,
        TextArea: AntdInput.TextArea,
        Search: AntdInput.Search,
    }
);

AntInput.displayName = 'AntInput';

export default AntInput;
