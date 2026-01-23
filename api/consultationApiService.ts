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
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (search) {
            queryParams.append('search', search);
        }

        // Backend trả về array trực tiếp, không có pagination wrapper
        const response = await axiosClient.get<ConsultationResponse[]>(
            `${BASE_URL}?${queryParams.toString()}`
        );

        // Wrap response vào pagination format cho frontend
        return {
            data: response.data,
            total: response.data.length, // Backend không trả total, dùng length tạm
            page,
            limit,
            totalPages: Math.ceil(response.data.length / limit),
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
};