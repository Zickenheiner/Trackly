import * as LocalAuthentication from 'expo-local-authentication';

// Indique si l'appareil dispose d'un capteur biométrique configuré.
export async function isBiometricAvailable(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return false;
  return LocalAuthentication.isEnrolledAsync();
}

// Libellé lisible du type de biométrie disponible (Face ID / Touch ID).
export async function getBiometricLabel(): Promise<string> {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  if (
    types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
  ) {
    return 'Face ID';
  }
  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return 'Touch ID';
  }
  return 'la biométrie';
}

// Déclenche l'invite biométrique. Retourne true si l'authentification réussit.
export async function authenticateBiometric(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Déverrouiller Trackly',
    cancelLabel: 'Annuler',
    // Autorise le code de l'appareil en secours si la biométrie échoue.
    disableDeviceFallback: false,
  });
  return result.success;
}
