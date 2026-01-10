'use client';

import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';

let notificationApi: NotificationInstance | null = null;

export const bindNotificationApi = (api: NotificationInstance) => {
    notificationApi = api;
};

const toArgs = (args: ArgsProps | string): ArgsProps =>
    typeof args === 'string' ? { message: args } : args;

export const notificationHelper = {
    success: (args: ArgsProps | string) => notificationApi?.success(toArgs(args)),
    error: (args: ArgsProps | string) => notificationApi?.error(toArgs(args)),
    warning: (args: ArgsProps | string) => notificationApi?.warning(toArgs(args)),
    info: (args: ArgsProps | string) => notificationApi?.info(toArgs(args)),
    open: (args: ArgsProps) => notificationApi?.open(args),
    destroy: () => notificationApi?.destroy(),
};

export const { success, error, warning, info, open, destroy } = notificationHelper;
