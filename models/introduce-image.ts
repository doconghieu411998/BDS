// Enum for IntroduceImage Type
export enum IntroduceImageType {
    CAROUSEL_UTILITY = 0,
    CAROUSEL_SHOWHOUSE = 1,
    MAP_POINT = 2,
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
    titleVi: string;
    titleEn: string;
    descriptionVi: string;
    descriptionEn: string;
    imageUrl: string | null;
    mediaId: number; // Media ID for updates
    metadataIds: { [key: string]: number }; // Map of keyName+group to metadata ID
    createdAt: string;
    updatedAt: string;
}

// Helper function to get metadata value by keyName and group
function getMetadataValue(metadatas: IntroduceImageMetadata[], keyName: string, group: number): string {
    const metadata = metadatas.find(m => m.keyName === keyName && m.group === group);
    return metadata?.value || '';
}

// Helper function to extract type-specific key prefix
function getTypePrefixByType(type: IntroduceImageType): string {
    switch (type) {
        case IntroduceImageType.CAROUSEL_UTILITY:
            return 'carousel_utility';
        case IntroduceImageType.CAROUSEL_SHOWHOUSE:
            return 'carousel_showhouse';
        case IntroduceImageType.MAP_POINT:
            return 'map_point';
        default:
            return '';
    }
}

// Helper function to get title and description keys
function getTitleDescKeys(metadatas: IntroduceImageMetadata[]): { titleKey: string; descKey: string } | null {
    // Find the first metadata that contains "_title" in keyName
    const titleMeta = metadatas.find(m => m.keyName.includes('_title'));
    if (!titleMeta) return null;

    // Extract the prefix (e.g., "carousel_utility_1" from "carousel_utility_1_title")
    const titleKey = titleMeta.keyName;
    const prefix = titleKey.replace('_title', '');
    const descKey = `${prefix}_desc`;

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
        descriptionVi = getMetadataValue(response.metadatas, keys.descKey, 0);
        descriptionEn = getMetadataValue(response.metadatas, keys.descKey, 1);
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
        titleVi,
        titleEn,
        descriptionVi,
        descriptionEn,
        imageUrl: response.media?.url || null,
        mediaId: response.media?.id || 0,
        metadataIds,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
    };
}

// Map multiple responses
export function mapIntroduceImageResponses(responses: IntroduceImageResponse[]): IntroduceImage[] {
    return responses.map(mapIntroduceImageResponse);
}

// Helper to get type label in Vietnamese
export function getTypeLabel(type: IntroduceImageType, language: 'vi' | 'en' = 'vi'): string {
    if (language === 'vi') {
        switch (type) {
            case IntroduceImageType.CAROUSEL_UTILITY:
                return 'Carousel - Tiện ích';
            case IntroduceImageType.CAROUSEL_SHOWHOUSE:
                return 'Carousel - Nhà mẫu';
            case IntroduceImageType.MAP_POINT:
                return 'Map Point';
            default:
                return 'Không xác định';
        }
    } else {
        switch (type) {
            case IntroduceImageType.CAROUSEL_UTILITY:
                return 'Carousel - Utilities';
            case IntroduceImageType.CAROUSEL_SHOWHOUSE:
                return 'Carousel - Show Houses';
            case IntroduceImageType.MAP_POINT:
                return 'Map Point';
            default:
                return 'Unknown';
        }
    }
}

// Update request payload
export interface UpdateIntroduceImagePayload {
    id?: number;
    type?: number;
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
    },
    imageBase64?: string | null
): UpdateIntroduceImagePayload {
    // Extract prefix from existing metadata keys
    const typePrefix = getTypePrefixByType(item.type);

    // We need to find the numeric suffix (e.g., "1" from "carousel_utility_1_title")
    // For simplicity, we'll use the item's id as the suffix
    const suffix = item.id;
    const titleKey = `${typePrefix}_${suffix}_title`;
    const descKey = `${typePrefix}_${suffix}_desc`;

    const payload: UpdateIntroduceImagePayload = {
        id: item.id,
        type: item.type,
        metadatas: [
            {
                id: item.metadataIds[`${titleKey}_0`] || 0,
                group: 0,
                keyName: titleKey,
                value: formValues.titleVi,
                isUpdate: true
            },
            {
                id: item.metadataIds[`${titleKey}_1`] || 0,
                group: 1,
                keyName: titleKey,
                value: formValues.titleEn,
                isUpdate: true
            },
            {
                id: item.metadataIds[`${descKey}_0`] || 0,
                group: 0,
                keyName: descKey,
                value: formValues.descriptionVi,
                isUpdate: true
            },
            {
                id: item.metadataIds[`${descKey}_1`] || 0,
                group: 1,
                keyName: descKey,
                value: formValues.descriptionEn,
                isUpdate: true
            }
        ]
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
