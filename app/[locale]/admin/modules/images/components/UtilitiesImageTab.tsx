'use client';

import React from 'react';
import ImageTab from './ImageTab';

export default function UtilitiesImageTab() {
    return <ImageTab title="Tiện ích nổi bật" filterCondition={(item) => item.type === 0} />;
}
