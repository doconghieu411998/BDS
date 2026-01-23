import {
    HomeOutlined,
    UnorderedListOutlined,
    FileTextOutlined,
    FileSearchOutlined,
    GlobalOutlined,
    PictureOutlined,
} from '@ant-design/icons';
import { t } from '@/utils/i18n';
import { ROUTES } from './routes';

export interface MenuItem {
    key: string;
    icon?: React.ReactNode;
    label: string;
    path?: string;
    children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
    {
        key: 'dashboard',
        icon: <HomeOutlined />,
        label: t('menu.dashboard'),
        path: ROUTES.DASHBOARD,
    },
    {
        key: 'post',
        icon: <FileTextOutlined />,
        label: t('menu.post'),
        children: [
            {
                key: 'post-list',
                icon: <UnorderedListOutlined />,
                label: t('menu.postList'),
                path: ROUTES.POST.LIST,
            },
        ],
    },
    {
        key: 'consultation',
        icon: <FileSearchOutlined />,
        label: 'Khảo sát',
        children: [
            {
                key: 'consultation-list',
                icon: <UnorderedListOutlined />,
                label: 'Danh sách khảo sát',
                path: ROUTES.CONSULTATION.LIST,
            },
        ],
    },
    {
        key: 'language',
        icon: <GlobalOutlined />,
        label: 'Quản lý ngôn ngữ',
        path: ROUTES.LANGUAGE,
    },
    {
        key: 'images',
        icon: <PictureOutlined />,
        label: 'Quản lý ảnh',
        path: ROUTES.IMAGES,
    },
];
