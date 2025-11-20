import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { BackendApi } from "@/js/bootstrap";
import { IUser } from "@/interface/IUser";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/state";

// 環境變數：重定向 URI
const REDIRECT_URI = import.meta.env.VITE_GV_REDIRECT_URI;

export const CallBackPage = () => {
  const navigate = useNavigate(); // React Router 導航
  const setUser = useSetRecoilState<IUser | null>(userState);

  const [loading, setLoading] = useState(true);
  const [conflict, setConflict] = useState<{
    email: string;
    code: string;
    redirectUri: string;
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
      // 直接將 authorization code 傳給後端處理
      const res = await BackendApi.post("/users/line/login", {
        code,
        redirectUri: REDIRECT_URI,
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
        const { email, message } = err.response.data;
        setConflict({ email, code, redirectUri: REDIRECT_URI, message });
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
        code: conflict.code,
        redirectUri: conflict.redirectUri,
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
