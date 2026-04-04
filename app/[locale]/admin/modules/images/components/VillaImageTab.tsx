'use client';

import React from 'react';
import ImageTab from './ImageTab';

export default function VillaImageTab() {
    return <ImageTab title="Villa" filterCondition={(item) => item.type === 3} />;
}
