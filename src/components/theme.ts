import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // 主色 (primary) 
        primary: {
          DEFAULT: { value: "#FF6700" },
          50: { value: "#ffe6d5" },
          100: { value: "#ffcca9" },
          200: { value: "#ffb27a" },
          300: { value: "#ff984a" },
          400: { value: "#ff7e1a" },
          500: { value: "#FF6700" },
          600: { value: "#cc5200" },
          700: { value: "#993d00" },
          800: { value: "#662800" },
          900: { value: "#331400" },
        },
        // 副色 (secondary) 
        secondary: {
          DEFAULT: { value: "#15A24E" },
          50: { value: "#e0f6e8" },
          100: { value: "#b3e9c5" },
          200: { value: "#80dba0" },
          300: { value: "#4dcd7a" },
          400: { value: "#26bf5e" },
          500: { value: "#15A24E" },
          600: { value: "#11853e" },
          700: { value: "#0d672e" },
          800: { value: "#094a1e" },
          900: { value: "#052d0e" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // 背景色設定
        bg: {
          DEFAULT: {
            // 淺色模式使用白色背景，深色模式使用較深的色調
            value: { _light: "#F0F7EE", _dark: "#474847" },
          },
        },
        // 主色 semantic tokens，針對 light 與 dark 模式做出差異設定
        primary: {
          solid: {
            value: { _light: "{colors.primary.500}", _dark: "{colors.primary.500}" },
          },
          contrast: {
            value: { _light: "{colors.primary.100}", _dark: "{colors.primary.900}" },
          },
          focusRing: {
            value: { _light: "{colors.primary.500}", _dark: "{colors.primary.600}" },
          },
        },
        secondary: {
          solid: {
            value: { _light: "{colors.secondary.500}", _dark: "{colors.secondary.500}" },
          },
          contrast: {
            value: { _light: "{colors.secondary.100}", _dark: "{colors.secondary.900}" },
          },
          focusRing: {
            value: { _light: "{colors.secondary.500}", _dark: "{colors.secondary.600}" },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
