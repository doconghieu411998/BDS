import { Property, PropertyStatus, PropertyType } from '@/types/common';

// Mock data cho danh sách bất động sản
export const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Căn hộ cao cấp Vinhomes Central Park',
        description:
            'Căn hộ 3 phòng ngủ, view sông Saigon tuyệt đẹp, nội thất cao cấp, đầy đủ tiện nghi.',
        price: 5500000000,
        area: 120,
        address: '208 Nguyễn Hữu Cảnh',
        city: 'Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Phường 22',
        type: PropertyType.APARTMENT,
        status: PropertyStatus.AVAILABLE,
        bedrooms: 3,
        bathrooms: 2,
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        createdBy: '1',
    },
    {
        id: '2',
        title: 'Biệt thự đơn lập Saigon Pearl',
        description: 'Biệt thự sang trọng 5 phòng ngủ, sân vườn rộng, hồ bơi riêng, an ninh 24/7.',
        price: 25000000000,
        area: 350,
        address: '92 Nguyễn Hữu Cảnh',
        city: 'Hồ Chí Minh',
        district: 'Bình Thạnh',
        ward: 'Phường 22',
        type: PropertyType.VILLA,
        status: PropertyStatus.AVAILABLE,
        bedrooms: 5,
        bathrooms: 4,
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
        thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
        createdAt: '2024-01-14T09:00:00Z',
        updatedAt: '2024-01-14T09:00:00Z',
        createdBy: '1',
    },
    {
        id: '3',
        title: 'Nhà phố mặt tiền Quận 1',
        description: 'Nhà phố 4 tầng, mặt tiền đường lớn, thích hợp kinh doanh hoặc ở.',
        price: 18000000000,
        area: 85,
        address: '123 Lê Lợi',
        city: 'Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        type: PropertyType.HOUSE,
        status: PropertyStatus.SOLD,
        bedrooms: 4,
        bathrooms: 3,
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
        thumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
        createdAt: '2024-01-10T14:20:00Z',
        updatedAt: '2024-01-16T08:15:00Z',
        createdBy: '1',
    },
    {
        id: '4',
        title: 'Đất nền khu dân cư Phú Mỹ Hưng',
        description: 'Lô đất góc 2 mặt tiền, đường 20m, sổ hồng riêng, khu vực phát triển.',
        price: 8500000000,
        area: 200,
        address: 'Đường Nguyễn Lương Bằng',
        city: 'Hồ Chí Minh',
        district: 'Quận 7',
        ward: 'Phường Tân Phú',
        type: PropertyType.LAND,
        status: PropertyStatus.AVAILABLE,
        images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
        thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
        createdAt: '2024-01-12T11:00:00Z',
        updatedAt: '2024-01-12T11:00:00Z',
        createdBy: '1',
    },
    {
        id: '5',
        title: 'Shophouse Masteri An Phú',
        description: 'Shophouse 1 trệt 3 lầu, vị trí đẹp, phù hợp kinh doanh mọi ngành nghề.',
        price: 15000000000,
        area: 140,
        address: '179 Xa Lộ Hà Nội',
        city: 'Hồ Chí Minh',
        district: 'Quận 2',
        ward: 'Phường An Phú',
        type: PropertyType.COMMERCIAL,
        status: PropertyStatus.PENDING,
        bedrooms: 3,
        bathrooms: 4,
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
        createdAt: '2024-01-13T16:45:00Z',
        updatedAt: '2024-01-17T10:30:00Z',
        createdBy: '1',
    },
    {
        id: '6',
        title: 'Căn hộ The Sun Avenue',
        description: 'Căn hộ 2 phòng ngủ, tầng cao, view thành phố, đầy đủ nội thất.',
        price: 3200000000,
        area: 75,
        address: '28 Mai Chí Thọ',
        city: 'Hồ Chí Minh',
        district: 'Quận 2',
        ward: 'Phường An Phú',
        type: PropertyType.APARTMENT,
        status: PropertyStatus.RENTED,
        bedrooms: 2,
        bathrooms: 2,
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        createdAt: '2024-01-11T13:15:00Z',
        updatedAt: '2024-01-18T09:00:00Z',
        createdBy: '1',
    },
];

// Hàm giả lập API call
export const propertyService = {
    // Lấy danh sách bất động sản
    async getList(params?: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{ data: Property[]; total: number }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filtered = [...mockProperties];

                // Filter by search
                if (params?.search) {
                    const searchLower = params.search.toLowerCase();
                    filtered = filtered.filter(
                        (p) =>
                            p.title.toLowerCase().includes(searchLower) ||
                            p.address.toLowerCase().includes(searchLower) ||
                            p.city.toLowerCase().includes(searchLower)
                    );
                }

                // Pagination
                const page = params?.page || 1;
                const limit = params?.limit || 10;
                const start = (page - 1) * limit;
                const end = start + limit;

                resolve({
                    data: filtered.slice(start, end),
                    total: filtered.length,
                });
            }, 800);
        });
    },

    // Lấy chi tiết bất động sản theo ID
    async getById(id: string): Promise<Property> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const property = mockProperties.find((p) => p.id === id);
                if (!property) {
                    reject(new Error('Không tìm thấy bất động sản'));
                    return;
                }
                resolve(property);
            }, 500);
        });
    },

    // Thêm mới bất động sản
    async create(data: Partial<Property>): Promise<Property> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newProperty: Property = {
                    id: String(Date.now()),
                    title: data.title || '',
                    description: data.description || '',
                    price: data.price || 0,
                    area: data.area || 0,
                    address: data.address || '',
                    city: data.city || '',
                    district: data.district || '',
                    ward: data.ward || '',
                    type: data.type || PropertyType.APARTMENT,
                    status: data.status || PropertyStatus.AVAILABLE,
                    bedrooms: data.bedrooms,
                    bathrooms: data.bathrooms,
                    images: data.images || [],
                    thumbnail: data.images?.[0],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    createdBy: '1',
                };
                mockProperties.unshift(newProperty);
                resolve(newProperty);
            }, 1000);
        });
    },

    // Cập nhật bất động sản
    async update(id: string, data: Partial<Property>): Promise<Property> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockProperties.findIndex((p) => p.id === id);
                if (index === -1) {
                    reject(new Error('Không tìm thấy bất động sản'));
                    return;
                }

                mockProperties[index] = {
                    ...mockProperties[index],
                    ...data,
                    updatedAt: new Date().toISOString(),
                };

                resolve(mockProperties[index]);
            }, 1000);
        });
    },

    // Xóa bất động sản
    async delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockProperties.findIndex((p) => p.id === id);
                if (index === -1) {
                    reject(new Error('Không tìm thấy bất động sản'));
                    return;
                }

                mockProperties.splice(index, 1);
                resolve();
            }, 800);
        });
    },
};
