import { Redirect } from 'expo-router';
import { useAuth } from '@/core/auth/auth-context';
import { Loading } from '@/core/ui/Loading';

export default function Index() {
  const { status } = useAuth();

  if (status === 'loading') return <Loading />;
  if (status === 'authenticated') return <Redirect href="/dashboard" />;
  return <Redirect href="/register" />;
}
