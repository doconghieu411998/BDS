export interface TranslationMessages {
    [key: string]: string;
}

const responseVi = {
    "consultation_title": "Đăng ký nhận tư vấn",
    "consultation_description": "Để lại thông tin liên hệ, nhận tin tức mới nhất của dự án từ chúng tôi",
    "consultation_full_name": "Họ và tên*",
    "consultation_phone": "Số điện thoại*",
    "consultation_email": "Email*",
    "consultation_message": "Lời nhắn",
    "consultation_submit": "GỬI",
    "consultation_privacy": "Bằng việc gửi thông tin cho chúng tôi, Quý khách hàng đã xác nhận đồng ý với Chính sách bảo mật từ dữ liệu cá nhân của Tập đoàn Masterise theo đường",
    "consultation_privacy_link": "đường dẫn này",
    "consultation_success": "Đăng ký thành công! Chúng tôi sẽ liên hệ lại sớm.",
    "consultation_error_full_name_required": "Vui lòng nhập họ và tên",
    "consultation_error_phone_required": "Vui lòng nhập số điện thoại",
    "consultation_error_phone_invalid": "Số điện thoại không hợp lệ",
    "consultation_error_email_required": "Vui lòng nhập email",
    "consultation_error_email_invalid": "Email không hợp lệ"
}


const responseEn = {
    "consultation_title": "Register for Consultation",
    "consultation_description": "Leave your contact information to receive the latest news about the project from us",
    "consultation_full_name": "Full Name*",
    "consultation_phone": "Phone Number*",
    "consultation_email": "Email*",
    "consultation_message": "Message",
    "consultation_submit": "SEND",
    "consultation_privacy": "By submitting your information, you agree to the Personal Data Privacy Policy of Masterise Group via this",
    "consultation_privacy_link": "link",
    "consultation_success": "Registration successful! We will contact you soon.",
    "consultation_error_full_name_required": "Please enter your full name",
    "consultation_error_phone_required": "Please enter your phone number",
    "consultation_error_phone_invalid": "Invalid phone number",
    "consultation_error_email_required": "Please enter your email",
    "consultation_error_email_invalid": "Invalid email address"
}

/**
 * Fetches translations from the API
 * @param locale - The locale to fetch (e.g., 'vi', 'en')
 * @returns Promise resolving to translation messages object
 */
export async function fetchTranslations(locale: string): Promise<TranslationMessages> {
    try {
        return new Promise((resolve, reject) => {
            if (locale === 'vi') {
                resolve(responseVi);
            } else if (locale === 'en') {
                resolve(responseEn);
            } else {
                reject(new Error(`Unsupported locale: ${locale}`));
            }
        });
    } catch (error) {
        console.error(`Failed to fetch translations for locale "${locale}":`, error);

        return await loadFallbackTranslations(locale);
    }
}

/**
 * Fallback function to load translations from local files
 * Transforms nested structure to flat structure to match API format
 */
async function loadFallbackTranslations(locale: string): Promise<TranslationMessages> {
    try {
        console.log(`Loading fallback translations for locale: ${locale}`);
        return await import(`@/messages/${locale}.json`);
    } catch (error) {
        console.error(`Failed to load fallback translations for locale "${locale}":`, error);
        return {};
    }
}