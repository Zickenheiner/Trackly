import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/core/auth/auth-context';
import { Loading } from '@/core/ui/Loading';

export default function AppLayout() {
  const { status } = useAuth();

  if (status === 'loading') return <Loading />;
  if (status === 'unauthenticated') return <Redirect href="/login" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
