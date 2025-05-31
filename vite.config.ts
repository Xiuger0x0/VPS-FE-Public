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
        target: 'http://127.0.0.1:8080/',
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Chakra UI
            if (id.includes('@chakra-ui') || id.includes('@emotion')) return 'chakra-ui';

            // Giscus
            if (id.includes('@giscus/react')) return 'giscus';

            // i18n
            if (id.includes('react-i18next') || id.includes('i18next') || id.includes('i18next-http-backend')) return 'i18n';

            // --- R3F 更細的拆法 ---
            if (id.includes('three')) return 'r3f-three';
            if (id.includes('@react-three/fiber')) return 'r3f-fiber';
            if (id.includes('@react-three/drei')) return 'r3f-drei';
            if (id.includes('leva')) return 'r3f-leva';

            // axios
            if (id.includes('axios')) return 'axios';

            // recoil
            if (id.includes('recoil')) return 'recoil';

            // 其他 node_modules 統一為 vendor
            return 'vendor';
          }
        }

      },
    },
  },
})