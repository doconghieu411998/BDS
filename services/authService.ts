import { LoginRequest, LoginResponse } from '@/types/common';

export const authService = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        // ===== MOCK DATA - Comment lại khi Backend sẵn sàng =====
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Hardcode credentials cho demo
                if (data.email === 'admin@demo.com' && data.password === '123456') {
                    resolve({
                        token: 'fake-jwt-token-xyz-' + Date.now(),
                        user: {
                            id: '1',
                            email: 'admin@demo.com',
                            name: 'Admin User',
                            avatar: 'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            role: 'admin',
                        },
                    });
                } else {
                    reject({
                        message: 'Email hoặc mật khẩu không đúng',
                    });
                }
            }, 1000); // Giả lập độ trễ mạng 1 giây
        });

        // ===== CODE GỌI API THẬT - Uncomment khi Backend sẵn sàng =====
        // const response = await axiosClient.post<ApiResponse<LoginResponse>>(
        //     '/auth/login',
        //     data
        // );
        // return response.data.data;
    },

    async logout(): Promise<void> {
        // ===== MOCK DATA =====
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });

        // ===== CODE GỌI API THẬT =====
        // await axiosClient.post('/auth/logout');
    },

    async getProfile() {
        // ===== MOCK DATA =====
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: '1',
                    email: 'admin@demo.com',
                    name: 'Admin User',
                    avatar: 'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    role: 'admin',
                });
            }, 500);
        });

        // ===== CODE GỌI API THẬT =====
        // const response = await axiosClient.get<ApiResponse>('/auth/profile');
        // return response.data.data;
    },
};
