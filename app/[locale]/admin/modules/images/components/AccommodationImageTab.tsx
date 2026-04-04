'use client';

import React from 'react';
import ImageTab from './ImageTab';

export default function AccommodationImageTab() {
    return <ImageTab title="Nhà lưu trú" filterCondition={(item) => item.type === 4} />;
}
