"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { STORAGE_KEYS, USER_ROLES } from "../lib/constants";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  UPDATE_USER: "UPDATE_USER",
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth data on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = Cookies.get(STORAGE_KEYS.AUTH_TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { user, token },
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    initAuth();
  }, []);

  // Mock Login function (temporary - replace with real API later)
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock login validation
      if (credentials.username === "admin" && credentials.password === "admin123") {
        const mockUser = {
          id: 1,
          username: "admin",
          email: "admin@pos.com",
          role: "admin",
          createdAt: new Date().toISOString(),
        };
        const mockToken = "mock_admin_token_" + Date.now();

        // Store mock data
        Cookies.set(STORAGE_KEYS.AUTH_TOKEN, mockToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: mockUser, token: mockToken },
        });

        return { success: true, data: { user: mockUser, token: mockToken } };
      } else if (credentials.username === "cashier" && credentials.password === "cashier123") {
        const mockUser = {
          id: 2,
          username: "cashier",
          email: "cashier@pos.com",
          role: "cashier",
          createdAt: new Date().toISOString(),
        };
        const mockToken = "mock_cashier_token_" + Date.now();

        Cookies.set(STORAGE_KEYS.AUTH_TOKEN, mockToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: mockUser, token: mockToken },
        });

        return { success: true, data: { user: mockUser, token: mockToken } };
      } else {
        throw new Error("Username atau password salah");
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  // Mock Register function (temporary - replace with real API later)
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if username already exists (simple mock validation)
      const existingUsers = ["admin", "cashier"];
      if (existingUsers.includes(userData.username.toLowerCase())) {
        throw new Error("Username sudah digunakan");
      }

      // Mock successful registration
      const mockUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        role: "cashier", // Default role untuk user baru
        createdAt: new Date().toISOString(),
      };

      const mockToken = "mock_jwt_token_" + Date.now();

      // Store mock data (auto-login after registration)
      Cookies.set(STORAGE_KEYS.AUTH_TOKEN, mockToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: mockUser,
          token: mockToken,
        },
      });

      return { success: true, data: { user: mockUser, token: mockToken } };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear storage
    Cookies.remove(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.CART_ITEMS);

    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Mock Reset password function (temporary)
  const resetPassword = async (email) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success response
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return {
        success: true,
        message: "Link reset password telah dikirim ke email Anda",
      };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateUser = (userData) => {
    // Update localStorage
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));

    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData,
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole(USER_ROLES.ADMIN);
  };

  // Check if user is cashier
  const isCashier = () => {
    return hasRole(USER_ROLES.CASHIER);
  };

  // Context value
  const value = {
    // State
    ...state,

    // Actions
    login,
    register,
    logout,
    resetPassword,
    updateUser,
    clearError,

    // Utilities
    hasRole,
    isAdmin,
    isCashier,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
