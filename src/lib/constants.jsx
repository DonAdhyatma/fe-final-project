// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  CASHIER: "cashier",
};

// Order Types
export const ORDER_TYPES = {
  DINE_IN: "dine_in",
  TAKE_AWAY: "take_away",
};

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  REFUNDED: "refunded",
};

// Menu Categories
export const MENU_CATEGORIES = {
  ALL: "all",
  FOODS: "foods",
  BEVERAGES: "beverages",
  DESSERTS: "desserts",
};

// Menu Category Labels
export const CATEGORY_LABELS = {
  [MENU_CATEGORIES.ALL]: "All Menu",
  [MENU_CATEGORIES.FOODS]: "Foods",
  [MENU_CATEGORIES.BEVERAGES]: "Beverages",
  [MENU_CATEGORIES.DESSERTS]: "Desserts",
};

// Payment Nominal Options (in IDR)
export const PAYMENT_NOMINALS = [50000, 75000, 100000, 150000, 200000];

// Tax Rate (10%)
export const TAX_RATE = 0.1;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "pos_auth_token",
  USER_DATA: "pos_user_data",
  CART_ITEMS: "pos_cart_items",
  ORDER_TYPE: "pos_order_type",
  THEME: "pos_theme",
  LANGUAGE: "pos_language",
};

// Default Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_SEARCH: "",
};

// Theme Options
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

// Language Options
export const LANGUAGES = {
  ID: "id",
  EN: "en",
};

// Font Size Options
export const FONT_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

// Zoom Display Options
export const ZOOM_LEVELS = {
  SMALL: "90%",
  MEDIUM: "100%",
  LARGE: "110%",
  EXTRA_LARGE: "125%",
};

// Status Colors
export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
  [ORDER_STATUS.PROCESSING]: "bg-blue-100 text-blue-800",
  [ORDER_STATUS.COMPLETED]: "bg-green-100 text-green-800",
  [ORDER_STATUS.CANCELLED]: "bg-red-100 text-red-800",
};

// Menu Item Status
export const MENU_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  OUT_OF_STOCK: "out_of_stock",
};

// Export File Types
export const EXPORT_TYPES = {
  EXCEL: "excel",
  PDF: "pdf",
};

// Date Format Options
export const DATE_FORMATS = {
  SHORT: "DD/MM/YYYY",
  LONG: "DD MMMM YYYY",
  WITH_TIME: "DD/MM/YYYY HH:mm",
  TIME_ONLY: "HH:mm",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  ACCESS_DENIED: "Access denied. You do not have permission.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input data.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  LOGOUT_SUCCESS: "Successfully logged out!",
  ORDER_SUCCESS: "Order placed successfully!",
  PAYMENT_SUCCESS: "Payment processed successfully!",
  MENU_CREATED: "Menu item created successfully!",
  MENU_UPDATED: "Menu item updated successfully!",
  MENU_DELETED: "Menu item deleted successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+62|62|0)[0-9]{8,12}$/,
};

// Image Upload Constraints
export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  MAX_WIDTH: 1024,
  MAX_HEIGHT: 1024,
};
