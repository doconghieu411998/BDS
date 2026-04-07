import { Tabs } from 'antd';
import styles from './ImageListBase.module.css';

// Import the wrapper components
import UtilitiesImageTab from './components/UtilitiesImageTab';
import ArchitectureImageTab from './components/ArchitectureImageTab';
import FloorPlanImageTab from './components/FloorPlanImageTab';
import VillaImageTab from './components/VillaImageTab';
import AccommodationImageTab from './components/AccommodationImageTab';
import EastCoastVillaImageTab from './components/EastCoastVillaImageTab';

export default function ImagesManagement() {
    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
                Quản Lý Hình Ảnh
            </h1>

            <Tabs
                defaultActiveKey="1"
                size="large"
                type="card"
                items={[
                    {
                        key: '1',
                        label: 'Tiện ích nổi bật',
                        children: <UtilitiesImageTab />
                    },
                    {
                        key: '2',
                        label: 'Kiến trúc khu vực',
                        children: <ArchitectureImageTab />
                    },
                    {
                        key: '3',
                        label: 'Chi tiết mặt bằng',
                        children: <FloorPlanImageTab />
                    },
                    {
                        key: '4',
                        label: 'Villa',
                        children: <VillaImageTab />
                    },
                    {
                        key: '5',
                        label: 'Villa lưu trú',
                        children: <AccommodationImageTab />
                    },
                    {
                        key: '6',
                        label: 'Villa bờ đông',
                        children: <EastCoastVillaImageTab />
                    }
                ]}
            />
        </div>
    );
}
