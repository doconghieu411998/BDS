'use client';

import React from 'react';
import ImageTab from './ImageTab';
import { Typography, Divider } from 'antd';
import { IntroduceStatus } from '@/models/introduce-image';

const { Title } = Typography;

export default function VillaImageTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 32 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                    Villa Song Lập
                </Title>
                <ImageTab
                    title="Villa Song Lập"
                    filterCondition={(item) => item.type === 3 && item.status === IntroduceStatus.DUPLEX}
                    showStatus={false}
                    forcedStatus={IntroduceStatus.DUPLEX}
                />
            </div>

            <Divider style={{ margin: '24px 0' }} />

            <div>
                <Title level={4} style={{ marginBottom: 16 }}>
                    Villa Đơn Lập
                </Title>
                <ImageTab
                    title="Villa Đơn Lập"
                    filterCondition={(item) => item.type === 3 && item.status === IntroduceStatus.SINGLE}
                    showStatus={false}
                    forcedStatus={IntroduceStatus.SINGLE}
                />
            </div>
        </div>
    );
}
