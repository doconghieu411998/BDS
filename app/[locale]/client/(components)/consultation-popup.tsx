"use client"

import { useState, useRef, useEffect } from "react"
import { Modal, Form, Input, Button, message, type InputRef } from "antd"
import { useTranslations } from "next-intl"
import styles from "./consultation-popup.module.css"

interface ConsultationPopupProps {
    isOpen: boolean
    onClose: () => void
}

interface FormValues {
    fullName: string
    phone: string
    email: string
    message?: string
}

const ConsultationPopup = ({ isOpen, onClose }: ConsultationPopupProps) => {
    const t = useTranslations("Consultation")
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const fullNameRef = useRef<InputRef>(null)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        if (isOpen) {
            timeoutId = setTimeout(() => {
                fullNameRef.current?.focus()
            }, 100)
        }
        return () => clearTimeout(timeoutId)
    }, [isOpen])

    const handleSubmit = async (values: FormValues) => {
        setLoading(true)
        console.log("Form Values:", values)

        setTimeout(() => {
            setLoading(false)
            message.success(t("success"))
            form.resetFields()
            onClose()
        }, 1000)
    }

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
            className={styles.modalCustom}
            destroyOnHidden
            centered
        >
            <div className={styles.container}>
                <h2 className={styles.title}>{t("title")}</h2>
                <p className={styles.description}>
                    {t("description")}
                </p>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                    size="large"
                >
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: t("errors.fullNameRequired") }]}
                        className={styles.formItem}
                    >
                        <Input
                            ref={fullNameRef}
                            placeholder={t("fullName")}
                            variant="borderless"
                            style={{ borderBottom: '1px solid #ddd', borderRadius: 0, paddingLeft: 0 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: t("errors.phoneRequired") },
                            { pattern: /^[0-9]{10,11}$/, message: t("errors.phoneInvalid") }
                        ]}
                        className={styles.formItem}
                    >
                        <Input placeholder={t("phone")} variant="borderless" style={{ borderBottom: '1px solid #ddd', borderRadius: 0, paddingLeft: 0 }} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: t("errors.emailRequired") },
                            { type: "email", message: t("errors.emailInvalid") }
                        ]}
                        className={styles.formItem}
                    >
                        <Input placeholder={t("email")} variant="borderless" style={{ borderBottom: '1px solid #ddd', borderRadius: 0, paddingLeft: 0 }} />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        className={styles.formItem}
                    >
                        <Input.TextArea
                            placeholder={t("message")}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            variant="borderless"
                            style={{ borderBottom: '1px solid #ddd', borderRadius: 0, paddingLeft: 0, resize: 'none' }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className={styles.submitBtn}
                        >
                            {t("submit")}
                        </Button>
                    </Form.Item>
                </Form>

                <div className={styles.privacyText}>
                    {t("privacy")} <a href="#" className={styles.privacyLink}>{t("privacyLink")}</a>
                </div>
            </div>
        </Modal>
    )
}

export default ConsultationPopup
