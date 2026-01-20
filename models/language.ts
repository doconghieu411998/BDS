export interface LanguageItem {
    id: number;
    type: 'en' | 'vi';
    key: string;
    value: string;
    createDate: string;
    updateDate: string;
    isEdit: boolean;
}

export interface LanguagePair {
    [key: string]: unknown;
    key: string;
    en: LanguageItem;
    vi: LanguageItem;
    updateDate: string;
}
