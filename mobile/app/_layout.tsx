import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/core/auth/auth-context';
import { LockProvider } from '@/core/auth/lock-context';
import { BiometricGate } from '@/core/auth/BiometricGate';
import { queryClient } from '@/core/query/query-client';
import { ThemeProvider, useTheme } from '@/core/theme/theme-context';

function ThemedStatusBar() {
  const { theme } = useTheme();
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LockProvider>
              <ThemedStatusBar />
              <Stack screenOptions={{ headerShown: false }} />
              <BiometricGate />
            </LockProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
