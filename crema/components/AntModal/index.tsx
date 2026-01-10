import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';

export const AntModal: React.FC<ModalProps> = (props) => {
    return <AntdModal {...props} />;
};

AntModal.displayName = 'AntModal';

export default AntModal;
