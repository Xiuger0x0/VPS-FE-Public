/**
 * API 配置文件
 * 統一管理不同環境下的 API 配置
 */

// 環境檢測
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// API 基礎配置
export const API_CONFIG = {
  // 開發環境配置
  development: {
    baseURL: '/api',
    timeout: 10000,
    withCredentials: false,
  },

  // 生產環境配置
  production: {
    baseURL: '/api',
    timeout: 15000,
    withCredentials: false,
  },

  // 獲取當前環境配置
  current: isDevelopment
    ? {
      baseURL: '/api',
      timeout: 10000,
      withCredentials: false,
    }
    : {
      baseURL: '/api',
      timeout: 15000,
      withCredentials: false,
    }
};

// API 端點配置
export const API_ENDPOINTS = {
  // 用戶相關
  users: {
    register: '/users/register',
    login: '/users/login',
    lineLogin: '/users/line/login',
    lineBind: '/users/line/bind',
    profile: (id: number) => `/users/${id}`,
    update: (id: number) => `/users/${id}`,
    list: '/users',
  },

  // 槍枝相關
  guns: {
    list: '/guns/getAll',
    byUser: (userId: string) => `/guns/by-user/${userId}`,
    detail: (id: number) => `/guns/${id}`,
    create: '/guns',
    update: (id: number) => `/guns/${id}`,
    delete: (id: number) => `/guns/${id}`,
  },

  // 測試相關
  test: {
    ping: '/test/ping',
    version: '/test/version',
  },

  // 健康檢查
  health: {
    status: '/actuator/health',
    info: '/actuator/info',
  }
};

// 環境資訊
export const ENV_INFO = {
  isDevelopment,
  isProduction,
  mode: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
};

// 調試用的日誌函數
export const apiLog = (message: string, data?: unknown) => {
  if (isDevelopment) {
    console.log(`[API] ${message}`, data);
  }
};

// 錯誤處理配置
export const ERROR_MESSAGES = {
  network: '網路連線錯誤，請檢查您的網路連線',
  timeout: '請求超時，請稍後再試',
  unauthorized: '登入已過期，請重新登入',
  forbidden: '您沒有權限執行此操作',
  notFound: '請求的資源不存在',
  serverError: '伺服器錯誤，請稍後再試',
  unknown: '發生未知錯誤，請稍後再試',
};
