import { Platform } from "react-native";

const brandOrange = "#C83803";
const darkBackground = "#151718";
const lightBorder = "#ECEDEE";
const mutedText = "#687076";

export const Theme = {
  colors: {
    // Brand Identity
    primary: "#C83803",
    secondary: "#0a7ea4",
    accent: "#FFB000",
    black: "#000",

    // Neutral Scale
    background: "#FFFFFF",
    surface: "#F5F7F9",
    border: "#ECEDEE",

    // Text
    text: "#151718",
    textMuted: "#687076",
    textOnPrimary: "#FFFFFF",

    // Feedback
    success: "#2E7D32",
    error: "#D32F2F",
    info: "#0288D1",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },

  typography: {
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 28,
    },
    weight: {
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
      heavy: "900" as const,
    },
  },

  shadows: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
  },
};

export const Colors = {
  light: {
    text: brandOrange,
    background: "#fff",
    tint: brandOrange,
    icon: mutedText,
    tabIconDefault: mutedText,
    tabIconSelected: brandOrange,
    border: lightBorder,
  },
  dark: {
    text: "#ECEDEE",
    background: darkBackground,
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
    border: "#242729",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "System",
    serif: "Georgia",
    rounded: "Arial Rounded MT Bold",
    mono: "Courier",
  },
  default: {
    sans: "sans-serif",
    serif: "serif",
    rounded: "sans-serif",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
