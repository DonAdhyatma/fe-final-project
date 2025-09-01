import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";
import { STORAGE_KEYS } from "./constants";

// API Client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token
  getToken() {
    return Cookies.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Default headers
  getHeaders(customHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.headers),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error("API Request Error:", error);
      return { success: false, error: error.message };
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: "GET",
    });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // Upload file
  async upload(endpoint, formData) {
    const token = this.getToken();
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: "POST",
      headers,
      body: formData,
    });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Authentication APIs
export const authAPI = {
  login: (credentials) => apiClient.post("/auth/login", credentials),
  register: (userData) => apiClient.post("/auth/register", userData),
  logout: () => apiClient.post("/auth/logout"),
  refreshToken: () => apiClient.post("/auth/refresh"),
  resetPassword: (email) => apiClient.post("/auth/reset-password", { email }),
  changePassword: (passwords) => apiClient.post("/auth/change-password", passwords),
  getProfile: () => apiClient.get("/auth/profile"),
  updateProfile: (userData) => apiClient.put("/auth/profile", userData),
};

// Menu APIs
export const menuAPI = {
  getAll: (params) => apiClient.get("/menu", params),
  getById: (id) => apiClient.get(`/menu/${id}`),
  create: (menuData) => apiClient.post("/menu", menuData),
  update: (id, menuData) => apiClient.put(`/menu/${id}`, menuData),
  delete: (id) => apiClient.delete(`/menu/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/menu/${id}/status`, { status }),
  getByCategory: (category) => apiClient.get(`/menu/category/${category}`),
  search: (query) => apiClient.get("/menu/search", { q: query }),
};

// Order APIs
export const orderAPI = {
  getAll: (params) => apiClient.get("/orders", params),
  getById: (id) => apiClient.get(`/orders/${id}`),
  create: (orderData) => apiClient.post("/orders", orderData),
  update: (id, orderData) => apiClient.put(`/orders/${id}`, orderData),
  updateStatus: (id, status) => apiClient.patch(`/orders/${id}/status`, { status }),
  cancel: (id) => apiClient.patch(`/orders/${id}/cancel`),
  getActive: () => apiClient.get("/orders/active"),
  getHistory: (params) => apiClient.get("/orders/history", params),
  getByOrderNumber: (orderNumber) => apiClient.get(`/orders/number/${orderNumber}`),
};

// Payment APIs
export const paymentAPI = {
  process: (paymentData) => apiClient.post("/payments", paymentData),
  getByOrderId: (orderId) => apiClient.get(`/payments/order/${orderId}`),
  refund: (paymentId, amount) => apiClient.post(`/payments/${paymentId}/refund`, { amount }),
};

// Reports APIs
export const reportAPI = {
  getSalesOverview: (params) => apiClient.get("/reports/sales-overview", params),
  getSalesByCategory: (params) => apiClient.get("/reports/sales-by-category", params),
  getSalesByPeriod: (params) => apiClient.get("/reports/sales-by-period", params),
  getTopMenuItems: (params) => apiClient.get("/reports/top-menu-items", params),
  exportSales: (format, params) => apiClient.get(`/reports/export/${format}`, params),
  getDashboardStats: () => apiClient.get("/reports/dashboard-stats"),
};

// User Management APIs (Admin only)
export const userAPI = {
  getAll: (params) => apiClient.get("/users", params),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (userData) => apiClient.post("/users", userData),
  update: (id, userData) => apiClient.put(`/users/${id}`, userData),
  delete: (id) => apiClient.delete(`/users/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/users/${id}/status`, { status }),
  changeRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    if (error.includes("token") || error.includes("unauthorized")) {
      // Token expired or invalid - redirect to login
      Cookies.remove(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      window.location.href = "/login";
      return;
    }

    // Return user-friendly error message
    const errorMessages = {
      "Network error": "Koneksi bermasalah. Periksa internet Anda.",
      "Server error": "Server bermasalah. Coba lagi nanti.",
      "Validation error": "Data yang dimasukkan tidak valid.",
      "Not found": "Data tidak ditemukan.",
      Forbidden: "Anda tidak memiliki akses.",
    };

    return errorMessages[error] || error;
  },

  // Format API response for UI
  formatResponse: (response) => {
    if (!response.success) {
      return {
        success: false,
        error: apiUtils.handleError(response.error),
      };
    }

    return {
      success: true,
      data: response.data,
    };
  },

  // Check if response has pagination
  hasPagination: (data) => {
    return data && typeof data === "object" && "pagination" in data;
  },

  // Extract pagination info
  getPagination: (data) => {
    return data?.pagination || null;
  },
};

export default apiClient;
