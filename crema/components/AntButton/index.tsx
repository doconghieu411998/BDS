import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';

export const AntButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        return <AntdButton ref={ref} {...props} />;
    }
);

AntButton.displayName = 'AntButton';

export default AntButton;
