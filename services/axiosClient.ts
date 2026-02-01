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

    // 2. Server-side

    // If NEXT_PUBLIC_API_URL is fully qualified (absolute), use directly
    if (process.env.NEXT_PUBLIC_API_URL && /^https?:\/\//.test(process.env.NEXT_PUBLIC_API_URL)) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // Otherwise (if relative or undefined), in Standalone mode/SSR, 
    // it's safer to call the backend directly to avoid localhost loopback issues (port mismatch, etc.)

    // Default matching route.ts
    const REMOTE_SERVER_URL = process.env.REMOTE_SERVER_URL || 'http://103.82.23.181:5000';

    // Ensure we append /api if the backend expects it (matching route.ts proxy logic)
    // route.ts proxies /api/path -> REMOTE/api/path
    return `${REMOTE_SERVER_URL}/api`;
};

// Debug log for server-side
if (typeof window === 'undefined') {
    // console.log('Server-side axios baseURL:', getBaseUrl());
}

// Flag & Queue to handle multiple 401s
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

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
            // Không xử lý 401 cho endpoint login hoặc refreshtoken vì đó là lỗi sai credentials hoặc expired refresh token
            if (status === 401 && !requestUrl.includes('/auth/login') && !requestUrl.includes('/auth/refreshtoken')) {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                if (!originalRequest._retry) {
                    if (isRefreshing) {
                        return new Promise(function (resolve, reject) {
                            failedQueue.push({ resolve, reject });
                        }).then(token => {
                            if (originalRequest.headers) {
                                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                            }
                            return axiosClient(originalRequest);
                        }).catch(err => {
                            return Promise.reject(err);
                        });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    const refreshToken = authStorage.getRefreshToken();

                    if (refreshToken) {
                        return new Promise((resolve, reject) => {
                            // Use a clean axios instance to avoid infinite loops if this call 401s
                            axios.post(getBaseUrl() + '/auth/refreshtoken', { refreshToken })
                                .then(({ data }: { data: { accessToken: string, refreshToken?: string } }) => {
                                    // Normally response data structure might be wrapped.
                                    // Based on authService, response is LoginResponse.
                                    // Assuming direct data return or checking structure.
                                    // Our axiosClient typically unwraps, but here we use raw axios.
                                    // Raw axios returns { data: ... }.
                                    // If backend returns ApiResponse wrapper, we need to handle it.
                                    // Let's assume standard format matching LoginResponse.

                                    const newAccessToken = data.accessToken || (data as any).data?.accessToken;
                                    const newRefreshToken = data.refreshToken || (data as any).data?.refreshToken;

                                    if (newAccessToken) {
                                        authStorage.setAuth(newAccessToken, newRefreshToken || refreshToken); // Keep old refresh token if not rotated
                                        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                                        if (originalRequest.headers) {
                                            originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                                        }
                                        processQueue(null, newAccessToken);
                                        resolve(axiosClient(originalRequest));
                                    } else {
                                        // Failed to get token
                                        processQueue(new Error('No access token returned'), null);
                                        authStorage.clearAuth();
                                        if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
                                            window.location.href = '/admin'; // Redirect to login
                                        }
                                        reject(error);
                                    }
                                })
                                .catch((err) => {
                                    processQueue(err, null);
                                    authStorage.clearAuth();
                                    if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
                                        window.location.href = '/admin';
                                    }
                                    reject(err);
                                })
                                .finally(() => {
                                    isRefreshing = false;
                                });
                        });
                    }
                }

                // If no refresh token or retry failed, clear auth and redirect
                authStorage.clearAuth();
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
