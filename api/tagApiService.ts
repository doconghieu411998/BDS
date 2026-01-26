import axiosClient from '@/services/axiosClient';
import { Tag } from '@/types/common';

export const TagApiService = {
    getTags: async (): Promise<Tag[]> => {
        const response = await axiosClient.get<Tag[]>('tag');
        return response.data;
    },
};
