export type ThemeName = 'light' | 'dark';

export interface Palette {
  background: string;
  card: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  accent: string;
  accentText: string;
  danger: string;
  success: string;
  warning: string;
}

export const lightColors: Palette = {
  background: '#f8fafc',
  card: '#ffffff',
  surface: '#f1f5f9',
  text: '#0f172b',
  textMuted: '#62748e',
  border: '#e2e8f0',
  primary: '#615fff',
  primaryText: '#ffffff',
  accent: '#eef2ff',
  accentText: '#432dd7',
  danger: '#ff2056',
  success: '#00bc7d',
  warning: '#fe9a00',
};

export const darkColors: Palette = {
  background: '#0f172b',
  card: '#1d293d',
  surface: '#1d293d',
  text: '#f1f5f9',
  textMuted: '#90a1b9',
  border: '#314158',
  primary: '#615fff',
  primaryText: '#ffffff',
  accent: '#314158',
  accentText: '#f1f5f9',
  danger: '#ff2056',
  success: '#00bc7d',
  warning: '#fe9a00',
};

export const palettes: Record<ThemeName, Palette> = {
  light: lightColors,
  dark: darkColors,
};
