'use client';

import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';

let notificationApi: NotificationInstance | null = null;

export const bindNotificationApi = (api: NotificationInstance) => {
    notificationApi = api;
};

const toArgs = (args: ArgsProps | string): ArgsProps => {
    if (typeof args === 'string') {
        // AntD v5.13+ / v6 deprecates 'message' in favor of 'title'.
        // We must NOT pass 'message' to avoid the warning.
        // We cast to any to bypass type checks if the type definition still requires message (though optional usually).
        return { title: args } as any;
    }
    // For object args, if 'message' is present, map it to 'title' to avoid warning
    const newArgs = { ...args } as any;

    if (newArgs.message) {
        if (!newArgs.title) {
            newArgs.title = newArgs.message;
        }
        // STRICTLY delete message
        delete newArgs.message;
    }
    return newArgs;
};

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
