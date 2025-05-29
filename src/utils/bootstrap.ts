import axios from "axios";

export const BackendApi = axios.create({
  baseURL: '/api'
});

// 加上 request interceptor：自動在每次請求加上 token
BackendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);