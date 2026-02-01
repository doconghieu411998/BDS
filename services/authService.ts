import { LoginRequest, LoginResponse, ApiResponse } from "@/types/common";
import axiosClient from "./axiosClient";

import { authStorage } from "@/utils/auth";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async logout(): Promise<void> {
    const refreshToken = authStorage.getRefreshToken();
    // Some backends require refreshToken in body to invalidate it
    await axiosClient.post("/auth/logout", { refreshToken });
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>("/auth/refreshtoken", { refreshToken });
    return response.data;
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
