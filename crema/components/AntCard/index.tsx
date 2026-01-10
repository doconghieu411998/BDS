import React from 'react';
import { Card as AntdCard, CardProps } from 'antd';

export const AntCard = (props: CardProps) => {
    return <AntdCard {...props} />;
};

AntCard.displayName = 'AntCard';
// Re-expose subcomponents
AntCard.Meta = AntdCard.Meta;
AntCard.Grid = AntdCard.Grid;

export default AntCard;
