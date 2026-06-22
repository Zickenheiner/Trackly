export type ThemeName = 'light' | 'dark';

export interface Palette {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  danger: string;
}

export const lightColors: Palette = {
  background: '#ffffff',
  surface: '#f4f4f5',
  text: '#18181b',
  textMuted: '#71717a',
  border: '#e4e4e7',
  primary: '#6366f1',
  primaryText: '#ffffff',
  danger: '#dc2626',
};

export const darkColors: Palette = {
  background: '#09090b',
  surface: '#1c1c1f',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  border: '#27272a',
  primary: '#818cf8',
  primaryText: '#09090b',
  danger: '#f87171',
};

export const palettes: Record<ThemeName, Palette> = {
  light: lightColors,
  dark: darkColors,
};
