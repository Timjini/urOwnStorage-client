import { Platform } from 'react-native';

const brandOrange = '#C83803';
const darkBackground = '#151718';
const lightBorder = '#ECEDEE';
const mutedText = '#687076';

export const Colors = {
  light: {
    text: brandOrange,
    background: '#fff',
    tint: brandOrange, 
    icon: mutedText,
    tabIconDefault: mutedText,
    tabIconSelected: brandOrange,
    border: lightBorder,
  },
  dark: {
    text: '#ECEDEE', 
    background: darkBackground,
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    border: '#242729',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'Arial Rounded MT Bold',
    mono: 'Courier',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});