import { ConsultationRequest } from "@/models/consultation";
import axiosClient from "@/services/axiosClient";

export async function submitConsultationRequest(data: ConsultationRequest): Promise<{ success: boolean }> {
    const url = 'contactinfo'; // baseURL đã là /api rồi

    const response = await axiosClient.post(url, data);

    return response.data;
}