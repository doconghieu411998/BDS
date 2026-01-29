import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import { authStorage } from '@/utils/auth';
import { ApiResponse } from '@/types/common';
import { error as notifyError } from '@/utils/antd-notification';

const getBaseUrl = () => {
    // 1. Client-side: can be relative
    if (typeof window !== 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL || '/api';
    }

    // 2. Server-side: MUST be absolute
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    // Check if it's explicitly strictly relative (starts with /)
    if (url.startsWith('/')) {
        // Prepend localhost if relative
        // Try to get dynamic port if available, else default to 3000
        const port = process.env.PORT || 3000;
        return `http://localhost:${port}${url}`;
    }

    return url;
};

// Debug log for server-side
if (typeof window === 'undefined') {
    console.log('Server-side axios baseURL:', getBaseUrl());
}

const axiosClient: AxiosInstance = axios.create({
    baseURL: getBaseUrl(),
    // remainder of file...
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

// Request Interceptor - Tự động đính kèm token
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = authStorage.getAccessToken();

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
            const requestUrl = error.config?.url || '';

            // Xử lý lỗi 401 - Unauthorized (Token hết hạn hoặc không hợp lệ)
            // Không xử lý 401 cho endpoint login vì đó là lỗi sai credentials
            if (status === 401 && !requestUrl.includes('/auth/login')) {
                // Clear toàn bộ auth data
                authStorage.clearAuth();

                // Chỉ redirect về trang login nếu đang ở admin area
                if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
                    window.location.href = '/admin';
                }
            }

            // Xử lý lỗi 403 - Forbidden
            if (status === 403) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Không có quyền truy cập',
                        description: data?.message || 'Bạn không có quyền truy cập chức năng này!',
                    });
                }
            }

            // Xử lý lỗi 400 - Bad Request
            if (status === 400) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Yêu cầu không hợp lệ',
                        description: data?.message || 'Dữ liệu gửi lên không hợp lệ!',
                    });
                }
            }

            // Xử lý lỗi 404 - Not Found
            if (status === 404) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Không tìm thấy',
                        description: data?.message || 'Dữ liệu không tồn tại hoặc đã bị xóa!',
                    });
                }
            }

            // Xử lý lỗi 409 - Conflict
            if (status === 409) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Xung đột dữ liệu',
                        description: data?.message || 'Dữ liệu đã tồn tại hoặc bị xung đột!',
                    });
                }
            }

            // Xử lý lỗi 422 - Unprocessable Entity
            if (status === 422) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Dữ liệu không hợp lệ',
                        description: data?.message || 'Vui lòng kiểm tra lại thông tin đã nhập!',
                    });
                }
            }

            // Xử lý lỗi 500 - Internal Server Error
            if (status === 500) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Lỗi máy chủ',
                        description: data?.message || 'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.',
                    });
                }
            }

            // Xử lý lỗi 502 - Bad Gateway
            if (status === 502) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Lỗi kết nối máy chủ',
                        description: 'Máy chủ tạm thời không phản hồi. Vui lòng thử lại sau!',
                    });
                }
            }

            // Xử lý lỗi 503 - Service Unavailable
            if (status === 503) {
                if (typeof window !== 'undefined') {
                    notifyError({
                        message: 'Dịch vụ không khả dụng',
                        description: 'Hệ thống đang bảo trì. Vui lòng thử lại sau!',
                    });
                }
            }

            return Promise.reject(data || error);
        }

        // Lỗi network hoặc timeout
        if (typeof window !== 'undefined') {
            notifyError({
                message: 'Lỗi kết nối',
                description: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!',
            });
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
