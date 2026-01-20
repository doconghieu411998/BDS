import { CarouselUtilityItem, CarouselShowHouseItem, MapPointItem } from '@/models/image-item';
import imagesData from '@/mock-data/images.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all image items
export async function getCarouselUtilities(): Promise<CarouselUtilityItem[]> {
    await delay(300);
    return imagesData.carouselUtilities as CarouselUtilityItem[];
}

export async function getCarouselShowHouses(): Promise<CarouselShowHouseItem[]> {
    await delay(300);
    return imagesData.carouselShowHouses as CarouselShowHouseItem[];
}

export async function getMapPoints(): Promise<MapPointItem[]> {
    await delay(300);
    return imagesData.mapPoints as MapPointItem[];
}

// Unified update function - works for all image types by ID
export async function updateImageItem(
    id: string,
    data: Partial<CarouselUtilityItem | CarouselShowHouseItem | MapPointItem>
): Promise<{ success: boolean }> {
    await delay(500);
    console.log('Mock update image item:', id, data);
    return { success: true };
}
