import { MetadataItem, ContactMetadata } from '@/models/metadata';
import axiosClient from "@/services/axiosClient";

const BASE_URL = 'metadata';

export const metadataApiService = {
    /**
     * Get contact metadata (group = 2)
     * Returns email and phone information
     */
    async getContactMetadata(): Promise<ContactMetadata | null> {
        try {
            // Fetch all metadata with group = 2 (contact info)
            const response = await axiosClient.get<MetadataItem[]>(`${BASE_URL}?group=2`);
            const data = response.data;

            if (!Array.isArray(data) || data.length === 0) {
                console.warn('No contact metadata found');
                return null;
            }

            // Find email and phone items by keyName (actual database column names)
            const emailItem = data.find(item =>
                item.keyName === 'user_email' ||
                item.keyName.toLowerCase().includes('email')
            );
            const phoneItem = data.find(item =>
                item.keyName === 'user_phone_num' ||
                item.keyName.toLowerCase().includes('phone')
            );

            if (!emailItem || !phoneItem) {
                console.warn('Email or phone metadata not found', { emailItem, phoneItem, data });
                return null;
            }

            return {
                email: {
                    id: emailItem.id,
                    value: emailItem.value,
                },
                phone: {
                    id: phoneItem.id,
                    value: phoneItem.value,
                },
            };
        } catch (error) {
            console.error("Failed to fetch contact metadata", error);
            return null;
        }
    },

    /**
     * Update metadata item by ID
     */
    async updateMetadata(id: number, value: string): Promise<{ success: boolean }> {
        try {
            await axiosClient.put(BASE_URL, {
                id,
                value,
            });
            return { success: true };
        } catch (error) {
            console.error("Failed to update metadata", error);
            return { success: false };
        }
    },

    /**
     * Update contact metadata (email and phone)
     */
    async updateContactMetadata(
        emailId: number,
        emailValue: string,
        phoneId: number,
        phoneValue: string
    ): Promise<{ success: boolean }> {
        try {
            const promises = [
                axiosClient.put(BASE_URL, { id: emailId, value: emailValue }),
                axiosClient.put(BASE_URL, { id: phoneId, value: phoneValue }),
            ];

            await Promise.all(promises);
            return { success: true };
        } catch (error) {
            console.error("Failed to update contact metadata", error);
            return { success: false };
        }
    },
};
