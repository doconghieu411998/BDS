import { ConsultationRequest, ConsultationResponse } from "@/models/consultation";
import { PaginationParams, PaginationResponse } from "@/types/common";
import axiosClient from "@/services/axiosClient";

const BASE_URL = 'contactinfo';

export const consultationApiService = {
    /**
     * Get paginated list of contact info submissions
     */
    async getList(params: PaginationParams & { search?: string }): Promise<PaginationResponse<ConsultationResponse>> {
        const { page, limit, search } = params;

        const response = await axiosClient.post(`${BASE_URL}/paged`, {
            page,
            pageSize: limit,
        });

        const result = response.data?.value || response.data;

        return {
            data: result.items || [],
            total: result.totalItems || 0,
            page: result.page || page,
            limit: result.pageSize || limit,
            totalPages: result.totalPages || 0,
        };
    },

    /**
     * Get contact info by ID
     */
    async getById(id: string): Promise<ConsultationResponse> {
        const response = await axiosClient.get<ConsultationResponse>(`${BASE_URL}/${id}`);
        return response.data;
    },

    /**
     * Submit new contact info request
     */
    async submit(data: ConsultationRequest): Promise<{ success: boolean }> {
        const response = await axiosClient.post(BASE_URL, data);
        return response.data;
    },

    async exportExcel(): Promise<{ success: boolean , message: string}> {
        const response = await axiosClient.post(`${BASE_URL}/exportexcel`, {});

        return response.data;
    }
};