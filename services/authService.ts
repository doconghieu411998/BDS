import { LoginRequest, LoginResponse, ApiResponse } from "@/types/common";
import axiosClient from "./axiosClient";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosClient.post("/auth/logout");
  },

  async getProfile() {
    const response = await axiosClient.get("/auth/profile");
    return response.data;
  },

  async changePassword(data: { oldPassword: string; newPassword: string }) {
    const response = await axiosClient.post("/auth/changepassword", data);
    return response.data;
  },
};
