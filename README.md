# 🎨 VPS 前端專案

基於 React 18 + TypeScript + Vite 的現代化前端應用，支援 3D 圖形、國際化和響應式設計。

## 🛠️ 技術棧

- **框架**: React 18 + TypeScript
- **建置工具**: Vite
- **UI 框架**: Chakra UI
- **狀態管理**: Recoil
- **路由**: React Router v7
- **國際化**: i18next
- **表單處理**: React Hook Form + Zod
- **HTTP 客戶端**: Axios
- **代碼檢查**: ESLint + TypeScript

## 🚀 快速開始

### 前置需求

- Node.js 20+
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發環境

```bash
npm run dev
```

應用將在 `http://localhost:5173` 啟動

### 建置生產版本

```bash
npm run build
```

建置文件將輸出到 `dist/` 目錄

## 📋 可用腳本

```bash
# 開發伺服器
npm run dev

# 建置生產版本
npm run build

# 代碼檢查
npm run lint

# 自動修正 lint 問題
npm run lint:fix

# 預覽建置結果
npm run preview

# 推送前檢查 (lint + build)
npm run check

# 預提交檢查
npm run pre-commit
```

## 🔧 開發配置

### API 代理

開發環境下，API 請求會自動代理到後端：

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
      secure: false
    },
  }
}
```

### 環境變數

創建 `.env.local` 文件：

```env
VITE_APP_NAME=VPS Project
VITE_LINE_CLIENT_ID=your_line_client_id
VITE_LINE_CLIENT_SECRET=your_line_client_secret
VITE_REDIRECT_URI=http://localhost:5173/callback
```

## 📁 專案結構

```
src/
├── components/          # 可重用組件
│   ├── ui/             # UI 基礎組件
├── pages/              # 頁面組件
│   ├── layouts/        # 布局組件
│   └── Airsoft/        # 功能頁面
├── config/             # 配置文件
├── js/                 # 工具函數
├── recoil/             # 狀態管理
├── interface/          # TypeScript 接口
└── utils/              # 工具函數
```

## 🎯 主要功能

### 用戶認證

- LINE OAuth 登入
- JWT Token 管理
- 自動登出機制

### 國際化

- 多語言支援
- 動態語言切換
- 本地化資源管理

### 響應式設計

- 移動端適配
- 深色/淺色主題
- 彈性布局系統

## 🔍 代碼品質

### ESLint 配置

專案使用嚴格的 ESLint 規則：

```javascript
// eslint.config.js
rules: {
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],
  'react-hooks/exhaustive-deps': 'warn',
}
```

### TypeScript 配置

嚴格的 TypeScript 設定確保類型安全：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 🚀 部署

### 自動部署

推送到 `main`/`master` 分支會觸發 GitHub Actions 自動部署：

1. 安裝依賴
2. 執行 ESLint 檢查
3. 建置專案
4. 上傳到伺服器
5. 重啟 Nginx

### 手動部署

```bash
# 建置專案
npm run build

# 上傳 dist 目錄到伺服器
scp -r dist/ user@server:/path/to/frontend/

# 重啟 Nginx
docker compose restart nginx
```

## 🔧 故障排除

### 常見問題

1. **ESLint 錯誤**

   ```bash
   npm run lint:fix
   ```

2. **建置失敗**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **API 連接問題**
   - 檢查後端服務是否啟動
   - 確認 API 端點配置正確

### 開發工具

- **React Developer Tools**: 瀏覽器擴展
- **Recoil DevTools**: 狀態管理調試
- **Vite DevTools**: 建置工具調試

## 📚 相關文檔

- [Vite 官方文檔](https://vitejs.dev/)
- [React 官方文檔](https://react.dev/)
- [Chakra UI 文檔](https://chakra-ui.com/)

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交變更
4. 推送到分支
5. 創建 Pull Request

確保所有提交都通過 ESLint 檢查和建置測試。
