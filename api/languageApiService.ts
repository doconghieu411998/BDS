import { LanguageItem } from '@/models/language';
import axiosClient from "@/services/axiosClient";

const BASE_URL = 'metadata';

export const getLanguageList = async (): Promise<LanguageItem[]> => {
    try {
        // Fetch all metadata via Proxy
        const response = await axiosClient.get<any[]>(BASE_URL);
        const data = response.data;

        if (!Array.isArray(data)) return [];

        // App requirements: Only show items where isUpdate == 0 AND introduceImageId is null
        const filtered = data.filter(item =>
            item.isUpdate &&
            !item.introduceImageId
        );

        // Map to frontend model
        return filtered.map(item => ({
            id: item.id,
            key: item.keyName,
            value: item.value,
            type: item.group === 0 ? 'vi' : 'en',
            createDate: item.createdAt,
            updateDate: item.updatedAt,
            isEdit: true
        }));
    } catch (error) {
        console.error("Failed to fetch language list", error);
        return [];
    }
};

export const updateLanguageByKey = async (
    key: string,
    enValue: string,
    viValue: string,
    enId?: number,
    viId?: number
): Promise<{ success: boolean }> => {
    try {
        const promises = [];

        if (enId) {
            promises.push(axiosClient.put(BASE_URL, {
                id: enId,
                value: enValue,
            }));
        }

        if (viId) {
            promises.push(axiosClient.put(BASE_URL, {
                id: viId,
                value: viValue,
            }));
        }

        if (promises.length > 0) {
            await Promise.all(promises);
            return { success: true };
        }

        return { success: false };
    } catch (error) {
        console.error("Failed to update language", error);
        return { success: false };
    }
};
