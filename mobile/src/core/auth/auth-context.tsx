import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { setUnauthorizedHandler } from '../api/client';
import { clearTokens, getAccessToken, setTokens } from './token-storage';
import type { AuthResponse, User } from '@/features/auth/auth.types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  signIn: (response: AuthResponse) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<User | null>(null);

  const signOut = useCallback(async () => {
    await clearTokens();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const signIn = useCallback(async (response: AuthResponse) => {
    await setTokens(response.accessToken, response.refreshToken);
    setUser(response.user);
    setStatus('authenticated');
  }, []);

  useEffect(() => {
    getAccessToken().then((token) => {
      setStatus(token ? 'authenticated' : 'unauthenticated');
    });
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      setStatus('unauthenticated');
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, signIn, signOut, setUser }),
    [status, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
