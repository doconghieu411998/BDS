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

export const getIdFromSlug = (slug: string): string | null => {
    // Match post IDs: -123.html (no prefix)
    const match = slug.match(/-(\d+)\.html$/);
    return match ? match[1] : null;
}

export const getTagFromSlug = (slug: string): string | null => {
    // Match tag IDs with 't' prefix: -t6.html
    const match = slug.match(/-t(\d+)\.html$/);
    return match ? match[1] : null;
};

export const getTagNameFromSlug = (slug: string): string | null => {
    // Extract tag name from slug format: tag-name-t6.html -> "Tag Name"
    const match = slug.match(/^(.+)-t\d+\.html$/);
    if (match) {
        // Decode slug to readable text and capitalize
        return match[1]
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return null;
};