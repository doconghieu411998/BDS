import axiosClient from '@/services/axiosClient';
import {
    IntroduceImageResponse,
    IntroduceImage,
    mapIntroduceImageResponse,
    mapIntroduceImageResponses,
    UpdateIntroduceImagePayload,
} from '@/models/introduce-image';

const API_ENDPOINT = 'introduceimage';

/**
 * Get all introduce images
 */
export async function getAllIntroduceImages(): Promise<IntroduceImage[]> {
    const response = await axiosClient.get<IntroduceImageResponse[]>(API_ENDPOINT);
    return mapIntroduceImageResponses(response.data);
}

/**
 * Get introduce image by ID
 */
export async function getIntroduceImageById(id: number): Promise<IntroduceImage> {
    const response = await axiosClient.get<IntroduceImageResponse>(`${API_ENDPOINT}/${id}`);
    return mapIntroduceImageResponse(response.data);
}

/**
 * Update introduce image by ID
 */
export async function updateIntroduceImage(
    id: number,
    payload: UpdateIntroduceImagePayload
): Promise<IntroduceImage> {
    const response = await axiosClient.put<IntroduceImageResponse>(`${API_ENDPOINT}/${id}`, payload);
    return mapIntroduceImageResponse(response.data);
}

/**
 * Filter images by type
 */
export function filterImagesByType(images: IntroduceImage[], type: number): IntroduceImage[] {
    return images.filter(img => img.type === type);
}
