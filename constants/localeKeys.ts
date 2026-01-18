/**
 * Translation key constants for the Consultation Popup component
 * These keys map to the flat structure returned by the translation API
 */
export const CONSULTATION_KEYS = {
    TITLE: 'consultation_title',
    DESCRIPTION: 'consultation_description',
    FULL_NAME: 'consultation_full_name',
    PHONE: 'consultation_phone',
    EMAIL: 'consultation_email',
    MESSAGE: 'consultation_message',
    SUBMIT: 'consultation_submit',
    PRIVACY: 'consultation_privacy',
    PRIVACY_LINK: 'consultation_privacy_link',
    SUCCESS: 'consultation_success',
    // Error message keys
    ERROR_FULL_NAME_REQUIRED: 'consultation_error_full_name_required',
    ERROR_PHONE_REQUIRED: 'consultation_error_phone_required',
    ERROR_PHONE_INVALID: 'consultation_error_phone_invalid',
    ERROR_EMAIL_REQUIRED: 'consultation_error_email_required',
    ERROR_EMAIL_INVALID: 'consultation_error_email_invalid',
} as const;

// Type for consultation keys
export type ConsultationKeyType = typeof CONSULTATION_KEYS[keyof typeof CONSULTATION_KEYS];
