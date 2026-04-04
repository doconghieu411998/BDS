'use client';

import React from 'react';
import ImageTab from './ImageTab';

export default function ArchitectureImageTab() {
    return <ImageTab title="Kiến trúc khu vực" filterCondition={(item) => item.type === 1} />;
}
