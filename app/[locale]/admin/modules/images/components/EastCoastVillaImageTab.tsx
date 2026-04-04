'use client';

import React from 'react';
import ImageTab from './ImageTab';

export default function EastCoastVillaImageTab() {
    return <ImageTab title="Villa bờ đông" filterCondition={(item) => item.type === 5} />;
}
