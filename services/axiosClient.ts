import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types/common';

const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

// Request Interceptor - Tự động đính kèm token
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Xử lý lỗi global
axiosClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        return response;
    },
    (error: AxiosError<ApiResponse>) => {
        if (error.response) {
            const { status, data } = error.response;

            // Xử lý lỗi 401 - Unauthorized (Token hết hạn hoặc không hợp lệ)
            if (status === 401) {
                Cookies.remove('token');
                Cookies.remove('user');

                // Chỉ redirect về trang login nếu đang ở admin area
                if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
                    window.location.href = '/admin';
                }
            }

            // Xử lý lỗi 403 - Forbidden
            if (status === 403) {
                if (typeof window !== 'undefined') {
                    alert('Bạn không có quyền truy cập chức năng này!');
                }
            }

            // Xử lý lỗi 500 - Internal Server Error
            if (status === 500) {
                if (typeof window !== 'undefined') {
                    alert('Lỗi hệ thống! Vui lòng thử lại sau.');
                }
            }

            return Promise.reject(data || error);
        }

        // Lỗi network hoặc timeout
        if (typeof window !== 'undefined') {
            alert(
                'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!'
            );
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
