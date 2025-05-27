import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 加入 React 插件
    tsconfigPaths() // 支援 tsconfig 路徑別名
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/', // 代理到本地的 8080 端口(假設後端服務運行在這裡)
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 重寫 API 路徑
      },
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 分割 Chakra UI 和 Emotion 相關依賴
            if (id.includes('@chakra-ui') || id.includes('@emotion')) return 'chakra-ui';

            // 分割 giscus 相關依賴
            if (id.includes('@giscus/react')) return 'giscus';

            // 分割 i18n 相關依賴
            // i18next-http-backend 是 i18next 的一個插件，用於從後端或靜態資源加載翻譯文件
            if (id.includes('react-i18next') || id.includes('i18next') || id.includes('i18next-http-backend')) return 'i18n';

            // 分割 react-three-fiber 相關依賴
            if (id.includes('three') || id.includes('@react-three/drei') || id.includes('@react-three/fiber') || id.includes('@types/three') || id.includes('leva')) return 'r3f';

            if (id.includes('axios')) return 'axios';
            if (id.includes('recoil')) return 'recoil';

            // 其他 node_modules 打包到 vendor
            return 'vendor';
          }
        },
      },
    },
  },
})