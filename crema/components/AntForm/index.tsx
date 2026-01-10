import React from 'react';
import { Form, FormProps, FormInstance, FormItemProps } from 'antd';

export const AntForm = <T extends Record<string, unknown> = Record<string, unknown>>(
    props: FormProps<T>
) => {
    return <Form<T> {...props} />;
};

AntForm.displayName = 'AntForm';
AntForm.Item = Form.Item;
AntForm.List = Form.List;
AntForm.ErrorList = Form.ErrorList;
AntForm.useForm = Form.useForm;
AntForm.useFormInstance = Form.useFormInstance;
AntForm.useWatch = Form.useWatch;
AntForm.Provider = Form.Provider;

export type { FormInstance, FormItemProps };

export default AntForm;
