import locales from '@/locales';

type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`;
}[keyof ObjectType & (string | number)];

type LocaleKey = NestedKeyOf<typeof locales.vi>;

export function t(key: LocaleKey, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: Record<string, unknown> | string = locales.vi;

    for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
            value = value[k] as Record<string, unknown> | string;
        } else {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }

    if (typeof value !== 'string') {
        return key;
    }

    if (params) {
        return value.replace(/\{(\w+)\}/g, (_, k) => String(params[k] || ''));
    }

    return value;
}
