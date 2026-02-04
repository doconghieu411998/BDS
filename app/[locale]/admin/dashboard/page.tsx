'use client';

import React from 'react';
import { AntCard, AntRow, AntCol, AntStatistic } from '@/crema/components';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
import { t } from '@/utils/i18n';
import ContactInfo from './ContactInfo';
import styles from './page.module.css';

export default function DashboardPage() {
    return (
        <div>
            <h1 className={styles.dashboardTitle}>Trang chủ</h1>

            <AntRow gutter={[16, 16]} className={styles.statsGrid}>

                <AntCol xs={24} sm={12} lg={6}>
                    <AntCard className={styles.statCard}>
                        <AntStatistic
                            title="Người dùng"
                            value={45}
                            prefix={<UserOutlined />}
                            styles={{ content: { color: '#1890ff' } }}
                        />
                    </AntCard>
                </AntCol>

                <AntCol xs={24} sm={12} lg={6}>
                    <AntCard className={styles.statCard}>
                        <AntStatistic
                            title="Lượt xem"
                            value={3542}
                            prefix={<EyeOutlined />}
                            styles={{ content: { color: '#722ed1' } }}
                        />
                    </AntCard>
                </AntCol>
            </AntRow>

            <AntRow gutter={[16, 16]} className={styles.statsGrid}>
                <AntCol span={24}>
                    <AntCard title="Thông tin liên hệ" className={styles.activityCard}>
                        <ContactInfo />
                    </AntCard>
                </AntCol>
            </AntRow>
        </div>
    );
}
