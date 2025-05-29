import { IUser } from "@/interface/IUser";
import liff from "@line/liff";
import { useState, useEffect } from "react";
import { Box, Spinner, Image, Text, Heading } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

const LIFF_ID = "2006347958-x0PM2Vp1"; //  LIFF ID

export const LiffPage = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  const [user, setUser] = useState<IUser | null>(null);
  const [isLineApp, setIsLineApp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初始化 LIFF
    alert("📢 開始初始化 LIFF...");
    liff
      .init({ liffId: LIFF_ID })
      .then(() => {
        alert("✅ LIFF 初始化成功！");
        setIsLineApp(liff.isInClient()); // 檢查是否在 LINE 內部開啟

        if (liff.isLoggedIn()) {
          alert("🔵 已登入，獲取用戶資料...");
          getUserProfile();
        } else {
          alert("🔴 未登入，將進行登入...");
          liff.login(); // 若未登入則引導登入
        }
      })
      .catch((err) => alert("❌ LIFF 初始化失敗：" + err.message));
  }, []);

  // 取得用戶資料
  const getUserProfile = async () => {
    try {
      alert("📢 等待 LIFF SDK 就緒...");
      await liff.ready; // 確保 LIFF SDK 已完全初始化
      alert("✅ LIFF SDK 已就緒，開始獲取用戶資料...");

      const profile = await liff.getProfile();
      alert(`🎉 取得用戶資料成功！\n👤 名稱：${profile.displayName}`);

      setUser({
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl || "", // 確保有值
        userId: profile.userId,
        userEmail: "", // 預設為空字串
      });
    } catch (err) {
      alert("❌ 取得用戶資料失敗：" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{appName} | LIFF</title>
      </Helmet>
      <Box textAlign="center" mt="20px">
        {isLineApp ? (
          loading ? (
            <Spinner size="xl" />
          ) : user ? (
            <>
              <Heading as="h2">你好, {user.displayName} 👋</Heading>
              <Image
                src={user.pictureUrl || ""}
                alt="User Avatar"
                boxSize="100px"
                borderRadius="full"
                mt="10px"
              />
            </>
          ) : (
            <Text>無法獲取用戶資料</Text>
          )
        ) : (
          <Text>請使用 LINE 開啟此頁面</Text>
        )}
      </Box>
    </>
  );
};
