import axios from "axios";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const BackendApi = axios.create({
  baseURL: "/api",
});

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

BackendApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // token 過期，強制登出
      logout();
    }
    return Promise.reject(error);
  }
);
