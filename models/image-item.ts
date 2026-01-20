export interface ImageItem {
    key: string;
    titleVi: string;
    titleEn: string;
    descriptionVi: string;
    descriptionEn: string;
    imageBanner: string;
    [key: string]: unknown;
}

export interface CarouselUtilityItem extends ImageItem {
    // Stored in carousel_utilities table
}

export interface CarouselShowHouseItem extends ImageItem {
    // Stored in carousel_show_houses table
}

export interface MapPointItem extends ImageItem {
    // Stored in map_points table
}
