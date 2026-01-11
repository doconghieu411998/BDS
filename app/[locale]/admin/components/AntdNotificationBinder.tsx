'use client';

import { useEffect } from 'react';
import { App } from 'antd';
import { bindNotificationApi } from '@/utils/antd-notification';

export default function AntdNotificationBinder() {
    const { notification } = App.useApp();

    useEffect(() => {
        bindNotificationApi(notification);
    }, [notification]);

    return null;
}
