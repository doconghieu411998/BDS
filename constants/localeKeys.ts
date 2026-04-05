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
    HEADER_MENU_CURATED_ANEMITIES: 'header_menu_curated_anemities',
    HEADER_MENU_LOGO_ALT: 'header_menu_logo_alt',
    HEADER_ARIA_OPEN_MENU: 'header_aria_open_menu',
    HEADER_ARIA_CLOSE_MENU: 'header_aria_close_menu',
    HEADER_MENU_ARIA_LABEL: 'header_menu_aria_label',
    HEADER_MENU_TEXT: 'header_menu_text',
    HEADER_MENU_ARCHITECTURE: 'header_menu_architecture',
    HEADER_MENU_DESIGN_COLLECTIONS: 'header_menu_design_collections',
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
    HEADER_BTN_SUBSCRIBE_LABEL: 'header_btn_subscribe_label',
} as const;

export const INFRASTRUCTURE_KEYS = {
    TITLE: 'infrastructure_title',
    SUBTITLE: 'infrastructure_subtitle',
    DESCRIPTION: 'infrastructure_description',
    // Carousel items
    ITEM_1_TIME: 'infrastructure_item_1_time',
    ITEM_1_TITLE: 'infrastructure_item_1_title',
    ITEM_2_TIME: 'infrastructure_item_2_time',
    ITEM_2_TITLE: 'infrastructure_item_2_title',
    ITEM_3_TIME: 'infrastructure_item_3_time',
    ITEM_3_TITLE: 'infrastructure_item_3_title',
    ITEM_4_TIME: 'infrastructure_item_4_time',
    ITEM_4_TITLE: 'infrastructure_item_4_title',
    ITEM_5_TIME: 'infrastructure_item_5_time',
    ITEM_5_TITLE: 'infrastructure_item_5_title',
    UNIT_PHUT: 'infrastructure_unit_phut',
} as const;

// Type for consultation keys
export type ConsultationKeyType = typeof CONSULTATION_KEYS[keyof typeof CONSULTATION_KEYS];
