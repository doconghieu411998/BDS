import React from 'react';
import { Layout as AntdLayout, LayoutProps } from 'antd';

export const AntLayout = (props: LayoutProps) => {
    return <AntdLayout {...props} />;
};

AntLayout.displayName = 'AntLayout';
AntLayout.Header = AntdLayout.Header;
AntLayout.Footer = AntdLayout.Footer;
AntLayout.Content = AntdLayout.Content;
AntLayout.Sider = AntdLayout.Sider;

export default AntLayout;
