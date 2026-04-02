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

export const HEADER_KEYS = {
    HEADER_MENU_HOME: 'header_menu_home',
    HEADER_MENU_ABOUT: 'header_menu_about',
    HEADER_MENU_OVERVIEW: 'header_menu_overview',
    HEADER_MENU_LOCATION: 'header_menu_location',
    HEADER_MENU_DESIGN_INSPIRATION: 'header_menu_design_inspiration',
    HEADER_MENU_FLOOR_PLAN: 'header_menu_floor_plan',
    HEADER_MENU_NEWS: 'header_menu_news',
    HEADER_MENU_CONTACT: 'header_menu_contact',
    HEADER_MENU_LOGO_ALT: 'header_menu_logo_alt',
    HEADER_ARIA_OPEN_MENU: 'header_aria_open_menu',
    HEADER_ARIA_CLOSE_MENU: 'header_aria_close_menu',
    HEADER_MENU_ARIA_LABEL: 'header_menu_aria_label',
    HEADER_MENU_TEXT: 'header_menu_text'
} as const;

export const HOME_KEYS = {
    HOME_TITLE: 'home_title',
    HOME_DESCRIPTION: 'home_description',
    HOME_OVERVIEW_TITLE: 'home_overview_title',
    HOME_OVERVIEW_NAME: 'home_overview_name',
    HOME_OVERVIEW_LOCATION: 'home_overview_location',
    HOME_OVERVIEW_DEVELOPER: 'home_overview_developer',
    HOME_OVERVIEW_OPERATOR: 'home_overview_operator',
    HOME_OVERVIEW_SCALE: 'home_overview_scale',
    HOME_OVERVIEW_INVENTORY: 'home_overview_inventory',
    HOME_OVERVIEW_AMENITIES_COUNT: 'home_overview_amenities_count',
    HOME_OVERVIEW_HIGHLIGHTS: 'home_overview_highlights',
    HOME_OVERVIEW_NAME_VALUE: 'home_overview_name_value',
    HOME_OVERVIEW_LOCATION_VALUE: 'home_overview_location_value',
    HOME_OVERVIEW_DEVELOPER_VALUE: 'home_overview_developer_value',
    HOME_OVERVIEW_OPERATOR_VALUE: 'home_overview_operator_value',
    HOME_OVERVIEW_SCALE_VALUE: 'home_overview_scale_value',
    HOME_OVERVIEW_INVENTORY_VALUE: 'home_overview_inventory_value',
    HOME_OVERVIEW_AMENITIES_COUNT_VALUE: 'home_overview_amenities_count_value',
    HOME_OVERVIEW_HIGHLIGHTS_VALUE: 'home_overview_highlights_value',
} as const;

// Type for consultation keys
export type ConsultationKeyType = typeof CONSULTATION_KEYS[keyof typeof CONSULTATION_KEYS];
