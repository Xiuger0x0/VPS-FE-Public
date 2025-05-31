import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // 用來發送 HTTP 請求
import { BackendApi } from "@/js/bootstrap";

// 環境變數：LINE 的 client_id、client_secret 以及重定向 URI
const LINE_CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID;
const LINE_CLIENT_SECRET = import.meta.env.VITE_LINE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const CallBackPage = () => {
  const navigate = useNavigate(); // React Router 導航

  // 使用 useCallback 確保函式不會在 useEffect 重複執行
  const getAccessToken = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code"); // 從 URL 取得 LineLogin 授權碼

    if (!code) {
      console.error("❌ No authorization code found!");
      return;
    }

    try {
      // 1️⃣ 取得 LINE Access Token
      const requestData = {
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: LINE_CLIENT_ID,
        client_secret: LINE_CLIENT_SECRET,
      };

      const { data: tokenData } = await axios.post(
        "https://api.line.me/oauth2/v2.1/token",
        new URLSearchParams(requestData).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      await BackendApi.post("/line/login", {
        idToken: tokenData.id_token,
      });

      // 2️⃣ 取得 LINE 使用者資訊
      const { data: profile } = await axios.get(
        "https://api.line.me/v2/profile",
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
      );

      const userData = {
        lineId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        email: profile.email ?? null,
      };

      // 3️⃣ 儲存用戶資料到 localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // 5️⃣ 將 LINE 使用者資訊傳送到後端
      await BackendApi.post("/line/login", userData);

      console.log("✅ LINE User successfully logged in!");

      // 6️⃣ 成功後導向首頁
      navigate("/");
    } catch (error) {
      console.error("❌ LINE 登入失敗:", error);
    }
  }, [navigate]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  return <div>登入中...</div>; // 顯示載入畫面
};
