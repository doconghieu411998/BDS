export interface MetadataItem {
    id: number;
    keyName: string;
    value: string;
    group: number;
    isUpdate: boolean;
    introduceImageId: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface ContactMetadata {
    email: {
        id: number;
        value: string;
    };
    phone: {
        id: number;
        value: string;
    };
}
