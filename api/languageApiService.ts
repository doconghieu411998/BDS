import { LanguageItem } from '@/models/language';
import languageData from '../services/mockData/language.json';

export const getLanguageList = async (): Promise<LanguageItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(languageData as LanguageItem[]);
        }, 500);
    });
};

export const updateLanguageByKey = async (
    key: string,
    enValue: string,
    viValue: string
): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Find items with the matching key
            const items = (languageData as LanguageItem[]).filter(item => item.key === key);

            if (items.length === 0) {
                resolve({ success: false });
                return;
            }

            // Update values in memory (this is fake, so changes won't persist)
            items.forEach(item => {
                if (item.type === 'en') {
                    item.value = enValue;
                } else if (item.type === 'vi') {
                    item.value = viValue;
                }
                item.updateDate = new Date().toISOString();
                item.isEdit = false;
            });

            resolve({ success: true });
        }, 500);
    });
};
