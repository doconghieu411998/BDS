// Enum for IntroduceImage Type
export enum IntroduceImageType {
    CAROUSEL_UTILITY = 0,
    CAROUSEL_SHOWHOUSE = 1,
    MAP_POINT = 2,
    VILLA = 3,
    ACCOMMODATION = 4,
    EAST_COAST_VILLA = 5,
}

export enum IntroduceStatus {
    NotForSale = 0,
    ForSale = 1,
    Sold = 2,
}

// API Response Types
export interface IntroduceImageMetadata {
    id: number;
    group: number; // 0 = Vietnamese, 1 = English
    keyName: string;
    value: string;
    isUpdate: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IntroduceImageMedia {
    id: number;
    url: string | null;
    imageBase64: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IntroduceImageResponse {
    id: number;
    type: IntroduceImageType;
    status?: IntroduceStatus;
    createdAt: string;
    updatedAt: string;
    metadatas: IntroduceImageMetadata[];
    media: IntroduceImageMedia;
}

// Frontend Model (mapped from API response)
export interface IntroduceImage {
    [key: string]: unknown; // Index signature for Ant Design Table compatibility
    id: number;
    type: IntroduceImageType;
    status: IntroduceStatus;
    titleVi: string;
    titleEn: string;
    descriptionVi: string;
    descriptionEn: string;
    imageUrl: string | null;
    mediaId: number; // Media ID for updates
    metadatas: IntroduceImageMetadata[]; // Store original metadata array for flexible updates
    createdAt: string;
    updatedAt: string;
}

// Helper function to get metadata value by keyName and group
function getMetadataValue(metadatas: IntroduceImageMetadata[], keyName: string, group: number): string {
    const metadata = metadatas.find(m => m.keyName === keyName && m.group === group);
    return metadata?.value || '';
}


function getTitleDescKeys(metadatas: IntroduceImageMetadata[]): { titleKey: string; descKey: string | null } | null {
    // Dynamically find keys that contain title
    const titleMeta = metadatas.find(m => m.keyName.toLowerCase().includes('_title'));
    if (!titleMeta) return null;

    const titleKey = titleMeta.keyName;

    // Find description key (can be "_description" or "_desc")
    const descMeta = metadatas.find(m =>
        m.keyName.toLowerCase().includes('_description') ||
        m.keyName.toLowerCase().includes('_desc')
    );

    const descKey = descMeta ? descMeta.keyName : null;

    return { titleKey, descKey };
}

// Map API response to frontend model
export function mapIntroduceImageResponse(response: IntroduceImageResponse): IntroduceImage {
    const keys = getTitleDescKeys(response.metadatas);

    let titleVi = '';
    let titleEn = '';
    let descriptionVi = '';
    let descriptionEn = '';

    if (keys) {
        titleVi = getMetadataValue(response.metadatas, keys.titleKey, 0);
        titleEn = getMetadataValue(response.metadatas, keys.titleKey, 1);
        if (keys.descKey) {
            descriptionVi = getMetadataValue(response.metadatas, keys.descKey, 0);
            descriptionEn = getMetadataValue(response.metadatas, keys.descKey, 1);
        }
    }

    // Build metadata IDs map
    const metadataIds: { [key: string]: number } = {};
    response.metadatas.forEach(meta => {
        const key = `${meta.keyName}_${meta.group}`;
        metadataIds[key] = meta.id;
    });

    return {
        id: response.id,
        type: response.type,
        status: response.status ?? IntroduceStatus.NotForSale,
        titleVi,
        titleEn,
        descriptionVi,
        descriptionEn,
        imageUrl: response.media?.url || null,
        mediaId: response.media?.id || 0,
        metadatas: response.metadatas,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
    };
}

export function getStatusLabel(status: IntroduceStatus | number, language: 'vi' | 'en' = 'vi'): string {
    if (language === 'vi') {
        switch (status) {
            case IntroduceStatus.NotForSale:
                return '-';
            case IntroduceStatus.ForSale:
                return 'Chưa bán';
            case IntroduceStatus.Sold:
                return 'Mở bán';
            default:
                return '';
        }
    }

    switch (status) {
        case IntroduceStatus.NotForSale:
            return '-';
        case IntroduceStatus.ForSale:
            return 'Not for sale';
        case IntroduceStatus.Sold:
            return 'For sale';
        default:
            return '';
    }
}

// Map multiple responses
export function mapIntroduceImageResponses(responses: IntroduceImageResponse[]): IntroduceImage[] {
    return responses.map(mapIntroduceImageResponse);
}

// Helper to get type label in Vietnamese
export function getTypeLabel(type: IntroduceImageType | number, language: 'vi' | 'en' = 'vi'): string {
    if (language === 'vi') {
        switch (type) {
            case IntroduceImageType.CAROUSEL_UTILITY:
                return 'Tiện ích nổi bật';
            case IntroduceImageType.CAROUSEL_SHOWHOUSE:
                return 'Kiến trúc khu vực';
            case IntroduceImageType.MAP_POINT:
                return 'Chi tiết mặt bằng';
            case IntroduceImageType.VILLA:
                return 'Villa';
            case IntroduceImageType.ACCOMMODATION:
                return 'Villa lưu trú';
            case IntroduceImageType.EAST_COAST_VILLA:
                return 'Villa bờ đông';
            default:
                return 'Hình ảnh khác';
        }
    } else {
        switch (type) {
            case IntroduceImageType.CAROUSEL_UTILITY:
                return 'Outstanding Utilities';
            case IntroduceImageType.CAROUSEL_SHOWHOUSE:
                return 'Regional Architecture';
            case IntroduceImageType.MAP_POINT:
                return 'Floor Plan Details';
            case IntroduceImageType.VILLA:
                return 'Villa';
            case IntroduceImageType.ACCOMMODATION:
                return 'Accommodation';
            case IntroduceImageType.EAST_COAST_VILLA:
                return 'East Coast Villa';
            default:
                return 'Other Images';
        }
    }
}

// Update request payload
export interface UpdateIntroduceImagePayload {
    id?: number;
    type?: number;
    status?: number;
    metadatas?: {
        id?: number;
        group: number;
        keyName: string;
        value: string;
        isUpdate?: boolean;
        createdAt?: string;
        updatedAt?: string;
    }[];
    media?: {
        id?: number;
        url?: string | null;
        imageBase64?: string | null;
        createdAt?: string;
        updatedAt?: string;
    };
}

// Helper to build update payload from form values
export function buildUpdatePayload(
    item: IntroduceImage,
    formValues: {
        titleVi: string;
        titleEn: string;
        descriptionVi: string;
        descriptionEn: string;
        status: IntroduceStatus;
    },
    imageBase64?: string | null
): UpdateIntroduceImagePayload {
    const updatedMetadatas = item.metadatas.map(meta => {
        const keyName = meta.keyName.toLowerCase();
        let newValue = meta.value;

        // Logic to identify which field to update from form values
        if (keyName.includes('_title')) {
            newValue = meta.group === 0 ? formValues.titleVi : formValues.titleEn;
        } else if (keyName.includes('_desc') || keyName.includes('_description')) {
            newValue = meta.group === 0 ? formValues.descriptionVi : formValues.descriptionEn;
        }

        return {
            ...meta,
            value: newValue,
            isUpdate: true
        };
    });

    const payload: UpdateIntroduceImagePayload = {
        id: item.id,
        type: item.type,
        status: formValues.status,
        metadatas: updatedMetadatas
    };

    // Always include media object with existing id and url
    payload.media = {
        id: item.mediaId,
        url: item.imageUrl
    };

    // Add imageBase64 if new image is provided
    if (imageBase64) {
        payload.media.imageBase64 = imageBase64;
    }

    return payload;
}
