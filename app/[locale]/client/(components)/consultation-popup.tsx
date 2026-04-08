"use client"

import { useState, useRef, useEffect } from "react"
import { Modal, Form, Input, Button, Checkbox, message, type InputRef } from "antd"
import { UserOutlined, PhoneOutlined, MailOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons"
import { useTranslations } from "next-intl"
import { CONSULTATION_KEYS } from "@/constants/localeKeys"
import styles from "./consultation-popup.module.css"
import { ConsultationRequest } from "@/models/consultation"
import { consultationApiService } from "@/api/consultationApiService"
import { withBasePath } from "@/services/commonService"

interface ConsultationPopupProps {
    isOpen: boolean
    onClose: () => void
}

interface FormValues {
    fullName: string
    phone: string
    email: string
    message?: string
    consent?: boolean
}

const ConsultationPopup = ({ isOpen, onClose }: ConsultationPopupProps) => {
    const t = useTranslations()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const fullNameRef = useRef<InputRef>(null)

    // Watch the consent field to enable/disable submit button
    const isConsentChecked = Form.useWatch('consent', form);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        if (isOpen) {
            timeoutId = setTimeout(() => {
                fullNameRef.current?.focus()
            }, 100)
        }
        return () => clearTimeout(timeoutId)
    }, [isOpen])

    const formatDateToDatetime2 = (date: Date): string => {
        const pad = (num: number, size: number = 2) => String(num).padStart(size, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const milliseconds = pad(date.getMilliseconds(), 3);

        // datetime2 format: YYYY-MM-DD HH:mm:ss.SSSSSSS
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}0000`;
    };

    const handleSubmit = async (values: FormValues) => {
        setLoading(true)
        try {
            const payload: ConsultationRequest = {
                name: values.fullName,
                phoneNumber: values.phone,
                email: values.email,
                content: values.message || "",
                createdAt: formatDateToDatetime2(new Date()),
            }

            await consultationApiService.submit(payload);

            message.success(t(CONSULTATION_KEYS.HOME_CONSULTATION_SUCCESS) || "Submit success!");
            form.resetFields();
            onClose();
        } catch (error) {
            console.error(t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_SUBMIT) || "Submission failed:", error)
            message.error(t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_SUBMIT_DETAIL) || "Submission failed, please try again later.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={900}
            className={styles.modalCustom}
            destroyOnHidden
            centered
            closeIcon={null}
        >
            <div className={styles.container}>
                {/* LEFT: Project Image */}
                <div className={styles.leftSection}>
                    <div
                        className={styles.bgImage}
                        style={{ backgroundImage: `url(${withBasePath("images/image-bg-form.png")})` }}
                    />
                </div>

                {/* RIGHT: Registration Form */}
                <div className={styles.rightSection}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <h2 className={styles.title}>{t(CONSULTATION_KEYS.HOME_CONSULTATION_TITLE)}</h2>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={false}
                        size="large"
                        initialValues={{ consent: false }}
                    >
                        <Form.Item
                            name="fullName"
                            rules={[{ required: true, message: t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_FULL_NAME_REQUIRED) }]}
                            className={styles.formItem}
                        >
                            <div className={styles.inputWrapper}>
                                <UserOutlined className={styles.inputIcon} />
                                <div className={styles.divider} />
                                <Input
                                    ref={fullNameRef}
                                    placeholder={t(CONSULTATION_KEYS.HOME_CONSULTATION_FULL_NAME)}
                                    variant="borderless"
                                    className={styles.customInput}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_PHONE_REQUIRED) },
                                { pattern: /^[0-9]{10,11}$/, message: t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_PHONE_INVALID) }
                            ]}
                            className={styles.formItem}
                        >
                            <div className={styles.inputWrapper}>
                                <PhoneOutlined className={styles.inputIcon} />
                                <div className={styles.divider} />
                                <Input
                                    placeholder={t(CONSULTATION_KEYS.HOME_CONSULTATION_PHONE)}
                                    variant="borderless"
                                    className={styles.customInput}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_EMAIL_REQUIRED) },
                                { type: "email", message: t(CONSULTATION_KEYS.HOME_CONSULTATION_ERROR_EMAIL_INVALID) }
                            ]}
                            className={styles.formItem}
                        >
                            <div className={styles.inputWrapper}>
                                <MailOutlined className={styles.inputIcon} />
                                <div className={styles.divider} />
                                <Input
                                    placeholder={t(CONSULTATION_KEYS.HOME_CONSULTATION_EMAIL)}
                                    variant="borderless"
                                    className={styles.customInput}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="message"
                            className={styles.formItem}
                        >
                            <div className={styles.inputWrapper}>
                                <MessageOutlined className={styles.inputIcon} />
                                <div className={styles.divider} />
                                <Input.TextArea
                                    placeholder={t(CONSULTATION_KEYS.HOME_CONSULTATION_MESSAGE)}
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    variant="borderless"
                                    className={styles.customInput}
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 20 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                disabled={!isConsentChecked}
                                className={styles.submitBtn}
                                icon={<SendOutlined />}
                            >
                                {t(CONSULTATION_KEYS.HOME_CONSULTATION_BTN_SUBMIT_LABEL)}
                            </Button>
                        </Form.Item>

                        <Form.Item name="consent" valuePropName="checked" className={styles.consentItem}>
                            <Checkbox className={styles.checkbox}>
                                <span className={styles.privacyText}>
                                    {t(CONSULTATION_KEYS.HOME_CONSULTATION_PRIVACY)}

                                </span>
                            </Checkbox>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default ConsultationPopup
