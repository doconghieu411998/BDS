'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import AntdNotificationBinder from './AntdNotificationBinder';
import viVN from 'antd/locale/vi_VN';

const theme = {
    token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
        fontSize: 14,
    },
};

export default function AntdConfigProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider locale={viVN} theme={theme}>
            <App>
                <AntdNotificationBinder />
                {children}
            </App>
        </ConfigProvider>
    );
}
