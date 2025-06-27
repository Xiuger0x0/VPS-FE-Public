import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // 用來發送 HTTP 請求
import { BackendApi } from "@/js/bootstrap";
import { IUser } from "@/interface/IUser";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/state";

// 環境變數：LINE 的 client_id、client_secret 以及重定向 URI
const LINE_CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID;
const LINE_CLIENT_SECRET = import.meta.env.VITE_LINE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const CallBackPage = () => {
  const navigate = useNavigate(); // React Router 導航
  const setUser = useSetRecoilState<IUser | null>(userState);

  const [loading, setLoading] = useState(true);
  const [conflict, setConflict] = useState<{
    email: string;
    idToken: string;
    message: string;
  } | null>(null);

  // 使用 useCallback 確保函式不會在 useEffect 重複執行
  const handleLineLogin = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      console.error("❌ 沒有授權碼");
      return;
    }

    try {
      // 1️⃣ 向 LINE 取得 Access Token
      const tokenRes = await axios.post(
        "https://api.line.me/oauth2/v2.1/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: LINE_CLIENT_ID,
          client_secret: LINE_CLIENT_SECRET,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const { id_token } = tokenRes.data;

      // 2️⃣ 將 idToken 傳給後端
      const res = await BackendApi.post("/users/line/login", {
        idToken: id_token,
      });

      const userData: IUser = {
        userId: res.data.user.id,
        displayName: res.data.user.displayName ?? null,
        pictureUrl: res.data.user.pictureUrl ?? null,
        userEmail: res.data.user.email,
      };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 409) {
        const { email, idToken, message } = err.response.data;
        setConflict({ email, idToken, message });
      } else {
        console.error("❌ 登入失敗:", err);
      }
    }
  }, [navigate, setUser]);

  const handleBind = async () => {
    if (!conflict) return;

    try {
      const res = await BackendApi.post("/users/line/bind", {
        email: conflict.email,
        idToken: conflict.idToken,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (e) {
      console.error("❌ 綁定失敗", e);
    }
  };

  useEffect(() => {
    handleLineLogin().finally(() => setLoading(false));
  }, [handleLineLogin]);

  return (
    <div>
      {loading ? (
        <p>🔄 登入中...</p>
      ) : conflict ? (
        <div>
          <p>⚠️ {conflict.message}</p>
          <button onClick={handleBind}>同意綁定 LINE 帳號</button>
        </div>
      ) : (
        <p>✅ 登入完成，正在導向...</p>
      )}
    </div>
  );
};
