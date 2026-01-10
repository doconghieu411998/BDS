import {
    HomeOutlined,
    ShopOutlined,
    UnorderedListOutlined,
    FileTextOutlined,
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
];
