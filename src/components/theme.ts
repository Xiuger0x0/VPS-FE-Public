import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // 主色 (primary) - 橙色系
        primary: {
          DEFAULT: { value: "#FF6700" },
          50: { value: "#fff4e6" },
          100: { value: "#ffe6cc" },
          200: { value: "#ffcc99" },
          300: { value: "#ffb366" },
          400: { value: "#ff9933" },
          500: { value: "#FF6700" },
          600: { value: "#e65a00" },
          700: { value: "#cc4d00" },
          800: { value: "#b34000" },
          900: { value: "#993300" },
          950: { value: "#662200" },
        },
        // 副色 (secondary) - 綠色系
        secondary: {
          DEFAULT: { value: "#15A24E" },
          50: { value: "#f0fdf4" },
          100: { value: "#dcfce7" },
          200: { value: "#bbf7d0" },
          300: { value: "#86efac" },
          400: { value: "#4ade80" },
          500: { value: "#15A24E" },
          600: { value: "#16a34a" },
          700: { value: "#15803d" },
          800: { value: "#166534" },
          900: { value: "#14532d" },
          950: { value: "#052e16" },
        },
        // 中性色系 - 灰色
        neutral: {
          50: { value: "#fafafa" },
          100: { value: "#f5f5f5" },
          200: { value: "#e5e5e5" },
          300: { value: "#d4d4d4" },
          400: { value: "#a3a3a3" },
          500: { value: "#737373" },
          600: { value: "#525252" },
          700: { value: "#404040" },
          800: { value: "#262626" },
          900: { value: "#171717" },
          950: { value: "#0a0a0a" },
        },
        // 狀態色系
        success: {
          50: { value: "#f0fdf4" },
          500: { value: "#22c55e" },
          600: { value: "#16a34a" },
        },
        warning: {
          50: { value: "#fffbeb" },
          500: { value: "#f59e0b" },
          600: { value: "#d97706" },
        },
        error: {
          50: { value: "#fef2f2" },
          500: { value: "#ef4444" },
          600: { value: "#dc2626" },
        },
        info: {
          50: { value: "#eff6ff" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // 背景色系統
        bg: {
          DEFAULT: {
            value: { _light: "#ffffff", _dark: "#0a0a0a" },
          },
          subtle: {
            value: { _light: "#fafafa", _dark: "#171717" },
          },
          muted: {
            value: { _light: "#f5f5f5", _dark: "#262626" },
          },
          emphasized: {
            value: { _light: "#e5e5e5", _dark: "#404040" },
          },
          canvas: {
            value: { _light: "#F0F7EE", _dark: "#1a1a1a" },
          },
        },
        // 文字色系統
        fg: {
          DEFAULT: {
            value: { _light: "#171717", _dark: "#fafafa" },
          },
          muted: {
            value: { _light: "#737373", _dark: "#a3a3a3" },
          },
          subtle: {
            value: { _light: "#a3a3a3", _dark: "#737373" },
          },
          disabled: {
            value: { _light: "#d4d4d4", _dark: "#525252" },
          },
        },
        // 邊框色系統
        border: {
          DEFAULT: {
            value: { _light: "#e5e5e5", _dark: "#404040" },
          },
          muted: {
            value: { _light: "#f5f5f5", _dark: "#262626" },
          },
          subtle: {
            value: { _light: "#fafafa", _dark: "#171717" },
          },
          emphasized: {
            value: { _light: "#d4d4d4", _dark: "#525252" },
          },
        },
        // 主色語義化 tokens
        primary: {
          DEFAULT: {
            value: { _light: "{colors.primary.500}", _dark: "{colors.primary.500}" },
          },
          emphasized: {
            value: { _light: "{colors.primary.600}", _dark: "{colors.primary.300}" },
          },
          muted: {
            value: { _light: "{colors.primary.100}", _dark: "{colors.primary.800}" },
          },
          ghost: {
            value: { _light: "{colors.primary.50}", _dark: "{colors.primary.900}" },
          },
          subtle: {
            value: { _light: "{colors.primary.50}", _dark: "{colors.primary.900}" },
          },
          fg: {
            value: { _light: "white", _dark: "white" },
          },
        },
        // 副色語義化 tokens
        secondary: {
          DEFAULT: {
            value: { _light: "{colors.secondary.500}", _dark: "{colors.secondary.500}" },
          },
          emphasized: {
            value: { _light: "{colors.secondary.600}", _dark: "{colors.secondary.300}" },
          },
          muted: {
            value: { _light: "{colors.secondary.100}", _dark: "{colors.secondary.800}" },
          },
          subtle: {
            value: { _light: "{colors.secondary.50}", _dark: "{colors.secondary.900}" },
          },
          fg: {
            value: { _light: "white", _dark: "white" },
          },
        },
        // 狀態色語義化 tokens
        success: {
          DEFAULT: {
            value: { _light: "{colors.success.500}", _dark: "{colors.success.400}" },
          },
          muted: {
            value: { _light: "{colors.success.50}", _dark: "{colors.success.900}" },
          },
        },
        warning: {
          DEFAULT: {
            value: { _light: "{colors.warning.500}", _dark: "{colors.warning.400}" },
          },
          muted: {
            value: { _light: "{colors.warning.50}", _dark: "{colors.warning.900}" },
          },
        },
        error: {
          DEFAULT: {
            value: { _light: "{colors.error.500}", _dark: "{colors.error.400}" },
          },
          muted: {
            value: { _light: "{colors.error.50}", _dark: "{colors.error.900}" },
          },
        },
        info: {
          DEFAULT: {
            value: { _light: "{colors.info.500}", _dark: "{colors.info.400}" },
          },
          muted: {
            value: { _light: "{colors.info.50}", _dark: "{colors.info.900}" },
          },
        },
      },
    },
    // 定義 colorScheme 映射
    recipes: {
      button: {
        base: {
          fontWeight: "medium",
          borderRadius: "md",
          transition: "all 0.2s",
        },
        variants: {
          colorPalette: {
            primary: {
              bg: "primary",
              color: "primary.fg",
              _hover: {
                bg: "primary.emphasized",
              },
              _active: {
                bg: "primary.emphasized",
              },
            },
            secondary: {
              bg: "secondary",
              color: "secondary.fg",
              _hover: {
                bg: "secondary.emphasized",
              },
              _active: {
                bg: "secondary.emphasized",
              },
            },
            neutral: {
              bg: "neutral.200",
              color: "neutral.800",
              _hover: {
                bg: "neutral.300",
              },
              _active: {
                bg: "neutral.400",
              },
              _dark: {
                bg: "neutral.700",
                color: "neutral.200",
                _hover: {
                  bg: "neutral.600",
                },
                _active: {
                  bg: "neutral.500",
                },
              },
            },
            success: {
              bg: "success",
              color: "white",
              _hover: {
                bg: "success.600",
              },
              _active: {
                bg: "success.600",
              },
            },
            warning: {
              bg: "warning",
              color: "white",
              _hover: {
                bg: "warning.600",
              },
              _active: {
                bg: "warning.600",
              },
            },
            error: {
              bg: "error",
              color: "white",
              _hover: {
                bg: "error.600",
              },
              _active: {
                bg: "error.600",
              },
            },
            info: {
              bg: "info",
              color: "white",
              _hover: {
                bg: "info.600",
              },
              _active: {
                bg: "info.600",
              },
            },
          },
        },
      },
      badge: {
        base: {
          fontWeight: "medium",
          borderRadius: "md",
          px: 2,
          py: 1,
          fontSize: "xs",
        },
        variants: {
          colorPalette: {
            primary: {
              bg: "primary.muted",
              color: "primary",
            },
            secondary: {
              bg: "secondary.muted",
              color: "secondary",
            },
            neutral: {
              bg: "neutral.100",
              color: "neutral.700",
              _dark: {
                bg: "neutral.800",
                color: "neutral.300",
              },
            },
            success: {
              bg: "success.muted",
              color: "success",
            },
            warning: {
              bg: "warning.muted",
              color: "warning",
            },
            error: {
              bg: "error.muted",
              color: "error",
            },
            info: {
              bg: "info.muted",
              color: "info",
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
