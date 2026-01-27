"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ConsultationResponse } from "@/models/consultation";
import { consultationApiService } from "@/api/consultationApiService";
import DataTable from "@/crema/core/DataTable";
import {
  success as notifySuccess,
  error as notifyError,
} from "@/utils/antd-notification";
import ConsultationDetailModal from "./consultationDetailModal";
import { formatDateTime } from "@/utils/format";
import type { ColumnType } from "@/crema/core/DataTable/types";
import styles from "./consultationList.module.css";
import { Button, Flex } from "antd";

export default function ConsultationList() {
  const [consultations, setConsultations] = useState<ConsultationResponse[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [detailConsultation, setDetailConsultation] =
    useState<ConsultationResponse | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const loadConsultations = useCallback(
    async (page: number, search: string) => {
      setLoading(true);
      try {
        const result = await consultationApiService.getList({
          page,
          limit: 10,
          search,
        });
        setConsultations(result.data);
        setTotal(result.total);
      } catch {
        notifyError("Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadConsultations(currentPage, searchText);
  }, [currentPage, searchText, loadConsultations]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetail = async (id: string) => {
    try {
      const consultation = await consultationApiService.getById(id);
      if (consultation) {
        setDetailConsultation(consultation);
        setDetailModalOpen(true);
      }
    } catch {
      notifyError("Đã có lỗi xảy ra");
    }
  };
  const exportExcel = async () => {
    setLoading(true);
    try {
      const result = await consultationApiService.exportExcel();
      const binaryString = result.message;

      const byteArray = new Uint8Array(
        [...binaryString].map((ch) => ch.charCodeAt(0))
      );

      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
      tempLink.setAttribute("download", new Date().toISOString() + ".xlsx");

      if (typeof tempLink.download === "undefined") {
        tempLink.setAttribute("target", "_blank");
      }

      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => {
        window.URL.revokeObjectURL(blobURL);
      }, 100);

      notifySuccess("Tải lại dữ liệu thành công");
    } catch {
      notifyError("Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  const columns: ColumnType<ConsultationResponse>[] = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (value: unknown) => {
        const content = value as string;
        return (
          <div className={styles.contentCell}>
            {content.length > 100 ? `${content.substring(0, 100)}...` : content}
          </div>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (value: unknown) => formatDateTime(value as string),
    },
  ];

  return (
    <div className={styles.container}>
      <Flex gap="middle" vertical>
        <Flex justify="flex-end" gap="middle">
          <Button
            type="primary"
            onClick={() => exportExcel()}
            size="large"
          >
            Xuất Excel
          </Button>
        </Flex>
        <DataTable<ConsultationResponse>
          title="Danh sách khảo sát"
          columns={columns}
          dataSource={consultations}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: total,
            onChange: handlePageChange,
          }}
          searchConfig={{
            placeholder: "Tìm kiếm theo tên, số điện thoại, nội dung...",
            onSearch: handleSearch,
          }}
          onView={(record) => handleViewDetail(record.id)}
          rowKey="id"
        />
      </Flex>

      <ConsultationDetailModal
        consultation={detailConsultation}
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setDetailConsultation(null);
        }}
      />
    </div>
  );
}
