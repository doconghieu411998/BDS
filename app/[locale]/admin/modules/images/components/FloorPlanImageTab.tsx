'use client';

import React from 'react';
import ImageTab from './ImageTab';

export default function FloorPlanImageTab() {
    return <ImageTab title="Chi tiết mặt bằng" filterCondition={(item) => item.type === 2} showStatus={true} />;
}
