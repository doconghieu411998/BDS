"use client";

import React from "react";
import { Tabs } from "antd";
import {
  AntCard,
  AntTypography,
  AntForm,
  AntInput,
  AntButton,
  AntAvatar,
  AntUpload,
} from "@/crema/components";
import { UserOutlined, UploadOutlined, LockOutlined } from "@ant-design/icons";
import { t } from "@/utils/i18n";
import { success as notifySuccess } from "@/utils/antd-notification";
import styles from "./page.module.css";
import { authService } from "@/services/authService";

const { Title } = AntTypography;

export default function ProfilePage() {
  const [passwordForm] = AntForm.useForm();

  const handlePasswordSubmit = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await authService.changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    console.log("Change password values:", values);
    if (response) {
      notifySuccess("Đổi mật khẩu thành công!");
      passwordForm.resetFields();
    }
  };

  const tabItems = [
    {
      key: "change-password",
      label: t("auth.changePassword"),
      children: (
        <div className={styles.tabContent}>
          <AntForm
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
            className={styles.form}
          >
            <AntForm.Item
              name="oldPassword"
              label={t("auth.oldPassword")}
              rules={[
                {
                  required: true,
                  message: t("auth.passwordRequired"),
                },
              ]}
            >
              <AntInput.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder={t("auth.oldPassword")}
              />
            </AntForm.Item>

            <AntForm.Item
              name="newPassword"
              label={t("auth.newPassword")}
              rules={[
                {
                  required: true,
                  message: t("auth.passwordRequired"),
                },
                { min: 6, message: t("auth.passwordMinLength") },
              ]}
            >
              <AntInput.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder={t("auth.newPassword")}
              />
            </AntForm.Item>

            <AntForm.Item
              name="confirmPassword"
              label={t("auth.confirmPassword")}
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: t("auth.confirmPasswordRequired"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("auth.passwordNotMatch"))
                    );
                  },
                }),
              ]}
            >
              <AntInput.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder={t("auth.confirmPassword")}
              />
            </AntForm.Item>

            <AntForm.Item>
              <AntButton
                type="primary"
                htmlType="submit"
                size="large"
                className={styles.submitButton}
              >
                {t("common.save")}
              </AntButton>
            </AntForm.Item>
          </AntForm>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <Title level={2} className={styles.profileTitle}>
        Cài đặt tài khoản
      </Title>
      <AntCard className={styles.profileCard}>
        <Tabs defaultActiveKey="profile" items={tabItems} size="large" />
      </AntCard>
    </div>
  );
}
