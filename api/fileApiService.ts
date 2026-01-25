import axiosClient from '@/services/axiosClient';

export const fileApiService = {
    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('Image', file);

        try {
            // Use axiosClient to inherit base URL and auth interceptors
            const response = await axiosClient.post('files/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response. Assuming the API returns the URL string directly or inside an object.
            // If response.data is a string, return it.
            if (typeof response.data === 'string') {
                return response.data;
            }
            // If it's an object with a 'url' or 'path' property (common patterns), try to return that.
            // Adjust this based on your actual API response structure if needed.
            if (response.data && typeof response.data === 'object' && 'url' in response.data) {
                return (response.data as any).url;
            }

            // Fallback: return response.data if we can't determine structure, or cast it.
            // For now, assuming direct string return as per "string($binary)" hint often implying raw content or simple value.
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },
};
