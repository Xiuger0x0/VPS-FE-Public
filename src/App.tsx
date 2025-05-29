import { Routes, Route } from "react-router";
import { lazy } from "react";
import "@/js/i18n";

import { MasterLayout } from "@/pages/layouts/MasterLayout";
import { CallBackPage } from "@/pages/CallBackPage";
import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { LiffPage } from "@/pages/LiffPage";
import { ServicePage } from "@/pages/ServicePage";
import { ItemsLayout } from "@/pages/layouts/ItemsLayout";
import { Page404 } from "@/pages/Page404";
import { ProjectPage } from "@/pages/ProjectPage";
import ThemePlayground from "./pages/ThemePlaygroundPage";
import CustomizerLayout from "./pages/layouts/CustomizerLayout";
import WeaponCustomizer from "./components/R3F/scene/WeaponCustomizer";
import OIIA from "./components/R3F/scene/OIIA";
import { AirsoftManager } from "./pages/AirsoftManager";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { BackendApi } from "./utils/bootstrap";
import { IUser } from "./interface/IUser";
import { useSetRecoilState } from "recoil";
import { userState } from "./recoil/state";
const MotorPage = lazy(() => import("@/pages/ItemPages/MotorPage"));
const CarPage = lazy(() => import("@/pages/ItemPages/CarPage"));

const LINE_CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&state=12345&scope=profile%20openid%20email`;

function App() {
  const isDev = process.env.NODE_ENV === "development";
  const setUser = useSetRecoilState<IUser | null>(userState);

  return (
    <Routes>
      {/* LINE LOGIN callback 跳轉頁面 */}
      <Route path="/callback" element={<CallBackPage />} />

      {/* Liff 入口 (不一定要特別設置入口，可以與一般頁面整合開放額外功能)? */}
      <Route path="/liff" element={<LiffPage />} />

      {/* 基本頁面 */}
      <Route path="/" element={<MasterLayout />}>
        <Route path="/" element={<HomePage />} index />

        {/* 註冊頁面 */}
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="login"
          element={
            <LoginPage
              onLogin={async (data) => {
                try {
                  const res = await BackendApi.post("/members/login", data);

                  const userData: IUser = {
                    userId: res.data.id ?? null,
                    displayName: res.data.displayName ?? null,
                    pictureUrl: res.data.pictureUrl ?? null,
                    userEmail: res.data.email ?? null,
                  };

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(userData));

                  setUser(userData);

                  window.location.href = "/";
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                  alert("登入失敗");
                }
              }}
              onLineLogin={() => {
                // LINE OAuth 登入邏輯
                window.location.href = LOGIN_URL;
              }}
              onRegister={() => {
                // 跳轉到註冊頁面
                window.location.href = "/register";
              }}
            />
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/service" element={<ServicePage />} />

        {/* 物品 */}
        <Route path="/item" element={<ItemsLayout />}>
          {/* 預設導向 motorcycle */}
          <Route index element={<MotorPage />} />
          <Route path="motorcycle" element={<MotorPage />} />
          <Route path="car" element={<CarPage />} />
        </Route>

        {/* 課程專案(網頁資料庫程式設計) */}
        <Route path="airsoft-manager" element={<AirsoftManager />} />
      </Route>

      {/* R3F 3D頁面 */}
      <Route path="/customizer" element={<CustomizerLayout />}>
        <Route index element={<WeaponCustomizer />} />
      </Route>

      {/* 僅開發模式下提供前端路由 */}
      {isDev && <Route path="/playground" element={<ThemePlayground />} />}

      {/* 小彩蛋 OIIA */}
      <Route path="oiia" element={<OIIA />} />

      {/* 其餘頁面導到404 */}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}
export default App;
