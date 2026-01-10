import React from 'react';
import { Avatar as AntdAvatar, AvatarProps } from 'antd';

export const AntAvatar = (props: AvatarProps) => {
    return <AntdAvatar {...props} />;
};

AntAvatar.displayName = 'AntAvatar';
AntAvatar.Group = AntdAvatar.Group;

export default AntAvatar;
