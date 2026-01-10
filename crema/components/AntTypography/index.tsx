import React from 'react';
import { Typography as AntdTypography } from 'antd';

// Wrapper component (optional usage as container)
export const AntTypography = (props: React.ComponentProps<typeof AntdTypography>) => {
    return <AntdTypography {...props} />;
};

AntTypography.displayName = 'AntTypography';
// Re-expose static components
AntTypography.Title = AntdTypography.Title;
AntTypography.Text = AntdTypography.Text;
AntTypography.Paragraph = AntdTypography.Paragraph;
AntTypography.Link = AntdTypography.Link;

export default AntTypography;
