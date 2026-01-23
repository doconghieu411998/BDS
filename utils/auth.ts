import Cookies from 'js-cookie';
import { User } from '@/types/common';

// Cookie configuration
const COOKIE_CONFIG = {
    // Thời gian mặc định: 7 ngày
    DEFAULT_EXPIRES: 7,
    // Thời gian ngắn hạn: 1 ngày (khi không chọn "Remember me")
    SHORT_EXPIRES: 1,
    // Cookie names
    KEYS: {
        ACCESS_TOKEN: 'accessToken',
        REFRESH_TOKEN: 'refreshToken',
        USER: 'user',
    },
} as const;

/**
 * Auth Storage - Quản lý authentication state trong cookies
 */
export const authStorage = {
    /**
     * Lưu authentication data sau khi login thành công
     */
    setAuth(accessToken: string, refreshToken: string, remember: boolean = false) {
        const expires = remember ? COOKIE_CONFIG.DEFAULT_EXPIRES : COOKIE_CONFIG.SHORT_EXPIRES;
        const options = { expires };

        Cookies.set(COOKIE_CONFIG.KEYS.ACCESS_TOKEN, accessToken, options);
        Cookies.set(COOKIE_CONFIG.KEYS.REFRESH_TOKEN, refreshToken, options);
    },

    /**
     * Lưu thông tin user
     */
    setUser(user: User, remember: boolean = false) {
        const expires = remember ? COOKIE_CONFIG.DEFAULT_EXPIRES : COOKIE_CONFIG.SHORT_EXPIRES;
        Cookies.set(COOKIE_CONFIG.KEYS.USER, JSON.stringify(user), { expires });
    },

    /**
     * Lấy access token
     */
    getAccessToken(): string | undefined {
        return Cookies.get(COOKIE_CONFIG.KEYS.ACCESS_TOKEN);
    },

    /**
     * Lấy refresh token
     */
    getRefreshToken(): string | undefined {
        return Cookies.get(COOKIE_CONFIG.KEYS.REFRESH_TOKEN);
    },

    /**
     * Lấy thông tin user
     */
    getUser(): User | null {
        const userStr = Cookies.get(COOKIE_CONFIG.KEYS.USER);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr) as User;
        } catch {
            return null;
        }
    },

    /**
     * Kiểm tra user đã đăng nhập chưa
     */
    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    },

    /**
     * Xóa toàn bộ authentication data (logout)
     */
    clearAuth() {
        Cookies.remove(COOKIE_CONFIG.KEYS.ACCESS_TOKEN);
        Cookies.remove(COOKIE_CONFIG.KEYS.REFRESH_TOKEN);
        Cookies.remove(COOKIE_CONFIG.KEYS.USER);
    },

    /**
     * Cập nhật access token mới (dùng cho refresh token flow)
     */
    updateAccessToken(accessToken: string) {
        // Giữ nguyên thời gian expire của token cũ
        const user = this.getUser();
        const expires = user ? COOKIE_CONFIG.DEFAULT_EXPIRES : COOKIE_CONFIG.SHORT_EXPIRES;
        Cookies.set(COOKIE_CONFIG.KEYS.ACCESS_TOKEN, accessToken, { expires });
    },
};
