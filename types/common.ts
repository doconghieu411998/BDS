export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginationResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

// Property Types
export enum PropertyStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    RENTED = 'rented',
    PENDING = 'pending',
}

export enum PropertyType {
    APARTMENT = 'apartment',
    HOUSE = 'house',
    VILLA = 'villa',
    LAND = 'land',
    COMMERCIAL = 'commercial',
}

export interface Property extends Record<string, unknown> {
    id: string;
    title: string;
    description: string;
    price: number;
    area: number;
    address: string;
    city: string;
    district: string;
    ward: string;
    type: PropertyType;
    status: PropertyStatus;
    bedrooms?: number;
    bathrooms?: number;
    images: string[];
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export interface PropertyFormData extends Record<string, unknown> {
    title: string;
    description: string;
    price: number;
    area: number;
    address: string;
    city: string;
    district: string;
    ward: string;
    type: PropertyType;
    status: PropertyStatus;
    bedrooms?: number;
    bathrooms?: number;
    images?: string[];
}

// Post Types
export enum PostStatus {
    DRAFT = 0,
    PUBLISHED = 1,
    ARCHIVED = 2,
}

export enum PostCategory {
    NEWS = 'news',
    GUIDE = 'guide',
    MARKET = 'market',
    TIPS = 'tips',
}

export interface PostMedia {
    id: number;
    url: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Post extends Record<string, unknown> {
    id: number;
    title: string;
    description: string;
    content: string;
    viewCount: number;
    status: PostStatus;
    media: PostMedia;
    tags: string[]; // Backend expects: [ "string" ]
    createDate?: string; // Matching news model if needed, or stick to swagger which doesn't explicitly show date in example but likely has it
    createdAt?: string; // Fallback
    updatedAt?: string;
}

export interface PostFormData {
    title: string;
    description: string;
    content: string;
    status: PostStatus;
    media: {
        image: string; // Sending base64 as 'image' field in media object? Or sending media object? 
        // Swagger request body has "media": { "image": "string", ... }
        // We will construct this object.
    };
    tags: string[];
    viewCount?: number;
    id?: number;
}

// Survey Types
export interface Survey {
    [key: string]: unknown;
    id: string;
    name: string;
    phone: string;
    content: string;
    createdAt: string;
}