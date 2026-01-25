export interface Translation {
    id: number;
    group: number;
    keyName: string;
    value: string;
    isUpdate: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TranslationResponse = Translation[];

export interface TranslationMessages {
    [key: string]: string;
}
