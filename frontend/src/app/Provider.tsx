import { queryClient } from '@/core/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, type ReactNode } from 'react';
import { Toaster } from '@/core/components/ui/sonner';
import { useThemeStore } from '@/features/theme/domain/stores/theme.store';

interface Props {
  children: ReactNode;
}

function ThemeInitializer() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme');
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    document.documentElement.classList.toggle('dark', theme === 'dark');
    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [theme, setTheme]);

  return null;
}

export default function Provider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer />
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
