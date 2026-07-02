import { BiometricLockScreen } from './BiometricLockScreen';
import { useLock } from './lock-context';

// Superpose l'écran de verrouillage au-dessus de l'app quand elle est verrouillée.
export function BiometricGate() {
  const { isLocked } = useLock();
  if (!isLocked) return null;
  return <BiometricLockScreen />;
}
