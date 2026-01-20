import { CarouselUtilityItem, CarouselShowHouseItem, MapPointItem } from '@/models/image-item';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// ==================== CAROUSEL UTILITIES ====================

export async function getCarouselUtilities(): Promise<CarouselUtilityItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-utilities`);
    if (!response.ok) {
        throw new Error('Failed to fetch carousel utilities');
    }
    return response.json();
}

export async function createCarouselUtility(data: Omit<CarouselUtilityItem, 'key'>): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-utilities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create carousel utility');
    }
    return response.json();
}

export async function updateCarouselUtility(key: string, data: Partial<CarouselUtilityItem>): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-utilities/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update carousel utility');
    }
    return response.json();
}

export async function deleteCarouselUtility(key: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-utilities/${key}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete carousel utility');
    }
    return response.json();
}

// ==================== CAROUSEL SHOW HOUSES ====================

export async function getCarouselShowHouses(): Promise<CarouselShowHouseItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-show-houses`);
    if (!response.ok) {
        throw new Error('Failed to fetch carousel show houses');
    }
    return response.json();
}

export async function createCarouselShowHouse(data: Omit<CarouselShowHouseItem, 'key'>): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-show-houses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create carousel show house');
    }
    return response.json();
}

export async function updateCarouselShowHouse(key: string, data: Partial<CarouselShowHouseItem>): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-show-houses/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update carousel show house');
    }
    return response.json();
}

export async function deleteCarouselShowHouse(key: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/carousel-show-houses/${key}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete carousel show house');
    }
    return response.json();
}

// ==================== MAP POINTS ====================

export async function getMapPoints(): Promise<MapPointItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/map-points`);
    if (!response.ok) {
        throw new Error('Failed to fetch map points');
    }
    return response.json();
}

export async function createMapPoint(data: Omit<MapPointItem, 'key'>): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/map-points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create map point');
    }
    return response.json();
}

export async function updateMapPoint(key: string, data: Partial<MapPointItem>): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/map-points/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update map point');
    }
    return response.json();
}

export async function deleteMapPoint(key: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/map-points/${key}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete map point');
    }
    return response.json();
}
