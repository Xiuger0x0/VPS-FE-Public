import axios from "axios";

/**
 * 建立 Axios 實例，設置 baseURL 為 /api/ 以便與後端進行通信
 */
const nginxApi = axios.create({
  baseURL: "/api/", // 基本 URL，與 Laravel 後端 API 通訊
  withCredentials: true, // 允許攜帶 cookie（必要）
});

/**
 * 取得 CSRF Token 並設置 headers
 */
const getCsrfToken = async () => {
  try {
    await nginxApi.get("/csrf-token"); // Laravel 會設置 XSRF-TOKEN Cookie
    const csrfToken = getCookie("XSRF-TOKEN"); // 從 cookie 讀取 CSRF token
    if (csrfToken) {
      nginxApi.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
    }
  } catch (error) {
    console.error("🚨 無法取得 CSRF Token:", error);
  }
};

/**
 * 從 Cookie 讀取特定名稱的值
 */
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

// 回應攔截器（處理 HTTP 錯誤）
nginxApi.interceptors.response.use(
  (response) => response, // 成功時返回 response
  (error) => {
    if (!error.response) {
      console.error("🚨 無法連接到伺服器");
    } else {
      const { status } = error.response;
      console.error(`❌ Error ${status} - 發生錯誤`);
    }
    return Promise.reject(error);
  }
);

export { nginxApi, getCsrfToken };
