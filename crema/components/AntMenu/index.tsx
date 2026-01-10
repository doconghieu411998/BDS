import React from 'react';
import { Menu as AntdMenu, MenuProps } from 'antd';

export const AntMenu = (props: MenuProps) => {
    return <AntdMenu {...props} />;
};

AntMenu.displayName = 'AntMenu';
AntMenu.Item = AntdMenu.Item;
AntMenu.SubMenu = AntdMenu.SubMenu;
AntMenu.Divider = AntdMenu.Divider;
AntMenu.ItemGroup = AntdMenu.ItemGroup;

export type { MenuProps };

export default AntMenu;
