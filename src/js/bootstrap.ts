import axios from "axios";
import { API_CONFIG, apiLog, ERROR_MESSAGES } from "@/config/api";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const BackendApi = axios.create({
  ...API_CONFIG.current,
});

BackendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 開發環境下記錄請求
    apiLog(`Request: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data
    });

    return config;
  },
  (error) => {
    apiLog('Request Error:', error);
    return Promise.reject(error);
  }
);

BackendApi.interceptors.response.use(
  response => {
    // 開發環境下記錄響應
    apiLog(`Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  error => {
    // 記錄錯誤
    apiLog('Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });

    if (error.response?.status === 401) {
      // token 過期，強制登出
      logout();
    }
    return Promise.reject(error);
  }
);
