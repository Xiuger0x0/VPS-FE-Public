import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend'; // 可讀取 JSON 檔案

i18n
  .use(Backend) // i18next-http-backend
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "zh", // 設定預設語言
    fallbackLng: 'en', // 如果當前語言的翻譯不存在，則使用 fallbackLng 的語言
    ns: ["common", "motorPage", "carPage", "aboutPage", 'projectPage'], // 告訴 i18next 使用的命名空間
    defaultNS: 'common', // 設定預設命名空間
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 自動依語言與命名空間載入對應檔案
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;