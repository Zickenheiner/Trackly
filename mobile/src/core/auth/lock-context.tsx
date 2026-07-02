import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AppState } from 'react-native';
import { useAuth } from './auth-context';
import { getBiometricEnabled } from './biometric-preference';
import { authenticateBiometric } from './biometrics';

interface LockContextValue {
  isLocked: boolean;
  unlock: () => Promise<boolean>;
}

const LockContext = createContext<LockContextValue | null>(null);

export function LockProvider({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const [isLocked, setIsLocked] = useState(false);
  // Vrai uniquement si l'app est réellement passée en arrière-plan.
  // L'invite Face ID met l'app en `inactive` (pas `background`) : on l'ignore
  // pour ne pas re-verrouiller juste après un déverrouillage réussi.
  const wasBackgrounded = useRef(false);

  // Verrouille si l'utilisateur est connecté et que la biométrie est activée.
  const lock = useCallback(async () => {
    const enabled = await getBiometricEnabled();
    if (enabled) setIsLocked(true);
  }, []);

  // Au démarrage : verrouille dès que la session est authentifiée.
  useEffect(() => {
    if (status === 'authenticated') {
      lock();
    } else {
      setIsLocked(false);
    }
  }, [status, lock]);

  // Reverrouille au retour de l'app au premier plan (après un vrai arrière-plan).
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (next) => {
      if (next === 'background') {
        wasBackgrounded.current = true;
      } else if (next === 'active') {
        if (wasBackgrounded.current && status === 'authenticated') {
          lock();
        }
        wasBackgrounded.current = false;
      }
    });
    return () => subscription.remove();
  }, [lock, status]);

  const unlock = useCallback(async () => {
    const success = await authenticateBiometric();
    if (success) setIsLocked(false);
    return success;
  }, []);

  const value = useMemo<LockContextValue>(
    () => ({ isLocked, unlock }),
    [isLocked, unlock],
  );

  return <LockContext.Provider value={value}>{children}</LockContext.Provider>;
}

export function useLock(): LockContextValue {
  const context = useContext(LockContext);
  if (!context) {
    throw new Error('useLock must be used within a LockProvider');
  }
  return context;
}
