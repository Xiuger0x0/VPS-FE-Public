import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { BackendApi } from "@/js/bootstrap";
import { IUser } from "@/interface/IUser";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/state";
import {
  Box,
  VStack,
  Spinner,
  Text,
  Button,
  Container,
  Heading,
  Card,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

// 環境變數：重定向 URI
const REDIRECT_URI = import.meta.env.VITE_GV_REDIRECT_URI;

export const CallBackPage = () => {
  const navigate = useNavigate(); // React Router 導航
  const setUser = useSetRecoilState<IUser | null>(userState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      const errorMsg = "未偵測到授權碼，請重新登入";
      console.error(`❌ ${errorMsg}`);
      setError(errorMsg);
      setLoading(false);
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

      toaster.create({
        title: "登入成功",
        description: `歡迎回來，${userData.displayName || "使用者"}`,
        type: "success",
      });

      // 延遲跳轉以讓使用者看到成功訊息
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 409) {
        const { email, message } = err.response.data;
        setConflict({ email, code, redirectUri: REDIRECT_URI, message });
      } else {
        const errorMsg = err.response?.data?.message || "登入過程中發生錯誤，請稍後再試";
        console.error("❌ 登入失敗:", err);
        setError(errorMsg);
        toaster.create({
          title: "登入失敗",
          description: errorMsg,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, setUser]);

  const handleBind = async () => {
    if (!conflict) return;
    setLoading(true);

    try {
      const res = await BackendApi.post("/users/line/bind", {
        email: conflict.email,
        code: conflict.code,
        redirectUri: conflict.redirectUri,
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

      toaster.create({
        title: "綁定成功",
        description: "帳號已成功綁定並登入",
        type: "success",
      });

      navigate("/");
    } catch (e: any) {
      const errorMsg = e.response?.data?.message || "綁定失敗，請稍後再試";
      console.error("❌ 綁定失敗", e);
      toaster.create({
        title: "綁定失敗",
        description: errorMsg,
        type: "error",
      });
      setError(errorMsg);
      setConflict(null); // 清除衝突狀態，顯示錯誤
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLineLogin();
  }, [handleLineLogin]);

  return (
    <Container maxW="md" py={20}>
      <Card.Root variant="elevated" p={6}>
        <Card.Body>
          <VStack gap={6} align="center" textAlign="center">
            {loading ? (
              <>
                <Spinner size="xl" color="primary.500" css={{ "--spinner-track-color": "colors.gray.200" }} />
                <VStack gap={2}>
                  <Heading size="md">正在處理登入請求...</Heading>
                  <Text color="fg.muted">請稍候，我們正在驗證您的身份</Text>
                </VStack>
              </>
            ) : conflict ? (
              <>
                <Box color="warning.500" fontSize="4xl">⚠️</Box>
                <VStack gap={2}>
                  <Heading size="md">帳號衝突</Heading>
                  <Text color="fg.muted">{conflict.message}</Text>
                  <Text fontSize="sm" color="fg.subtle">
                    檢測到此 Email 已註冊，是否將 LINE 帳號綁定到現有帳戶？
                  </Text>
                </VStack>
                <VStack gap={3} w="full">
                  <Button colorPalette="primary" w="full" onClick={handleBind}>
                    確認綁定並登入
                  </Button>
                  <Button variant="ghost" w="full" onClick={() => navigate("/login")}>
                    取消並返回登入頁
                  </Button>
                </VStack>
              </>
            ) : error ? (
              <>
                <Box color="error.500" fontSize="4xl">❌</Box>
                <VStack gap={2}>
                  <Heading size="md">登入失敗</Heading>
                  <Text color="fg.error">{error}</Text>
                </VStack>
                <Button variant="outline" w="full" onClick={() => navigate("/login")}>
                  返回登入頁面
                </Button>
              </>
            ) : (
              <>
                <Box color="success.500" fontSize="4xl">✅</Box>
                <VStack gap={2}>
                  <Heading size="md">登入成功</Heading>
                  <Text color="fg.muted">正在為您跳轉至首頁...</Text>
                </VStack>
              </>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
};
