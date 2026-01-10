import React from 'react';
import { Statistic as AntdStatistic, StatisticProps } from 'antd';

export const AntStatistic = (props: StatisticProps) => {
    return <AntdStatistic {...props} />;
};

AntStatistic.displayName = 'AntStatistic';
AntStatistic.Countdown = AntdStatistic.Countdown;

export default AntStatistic;
