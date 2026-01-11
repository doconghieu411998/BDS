import { BASE_PATH } from "@/constants/help";
import slugify from "slugify";

export const withBasePath = (path: string): string => {
    if (!path.startsWith('/')) {
        return `${BASE_PATH}/${path}`;
    }
    return `${BASE_PATH}${path}`;
}

export const convertSlugUrl = (value: string, locale: string): string => {
    if (!value) return "";
    value = slugify(value, { lower: true, locale: locale || 'vi' });

    return value;
}