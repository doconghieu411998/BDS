import React from 'react';
import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps } from 'antd';

export const AntBreadcrumb = (props: BreadcrumbProps) => {
    return <AntdBreadcrumb {...props} />;
};

AntBreadcrumb.displayName = 'AntBreadcrumb';
AntBreadcrumb.Item = AntdBreadcrumb.Item;

export default AntBreadcrumb;
