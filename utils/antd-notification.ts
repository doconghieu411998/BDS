'use client';

import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';

let notificationApi: NotificationInstance | null = null;

export const bindNotificationApi = (api: NotificationInstance) => {
    notificationApi = api;
};

const toArgs = (args: ArgsProps | string): ArgsProps =>
    typeof args === 'string' ? { message: args } : args;

const warnIfNotBound = () => {
    if (!notificationApi) {
        console.log(
            'Notification API'
        );
    }
};

export const notificationHelper = {
    success: (args: ArgsProps | string) => {
        warnIfNotBound();
        return notificationApi?.success(toArgs(args));
    },
    error: (args: ArgsProps | string) => {
        warnIfNotBound();
        return notificationApi?.error(toArgs(args));
    },
    warning: (args: ArgsProps | string) => {
        warnIfNotBound();
        return notificationApi?.warning(toArgs(args));
    },
    info: (args: ArgsProps | string) => {
        warnIfNotBound();
        return notificationApi?.info(toArgs(args));
    },
    open: (args: ArgsProps) => {
        warnIfNotBound();
        return notificationApi?.open(args);
    },
    destroy: () => notificationApi?.destroy(),
};

export const { success, error, warning, info, open, destroy } = notificationHelper;
