import React from 'react';
import { Upload as AntdUpload, UploadProps } from 'antd';

export const AntUpload = (props: UploadProps) => {
    return <AntdUpload {...props} />;
};

AntUpload.displayName = 'AntUpload';
AntUpload.Dragger = AntdUpload.Dragger;

export default AntUpload;
