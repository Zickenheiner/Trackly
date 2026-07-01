import Constants from 'expo-constants';

const API_PORT = 3310;
const FALLBACK_API_URL = `http://localhost:${API_PORT}`;

/**
 * En dev (Expo Go), on récupère l'IP du Mac depuis l'hôte de Metro
 * (ex. "192.168.1.112:8081") pour cibler le backend sur cette même IP.
 * Ainsi, pas de .env à modifier à chaque changement d'IP DHCP.
 */
function deriveDevApiUrl(): string | null {
  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  return host ? `http://${host}:${API_PORT}` : null;
}

// Priorité : variable explicite (builds preview/prod) > IP auto (dev) > localhost.
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? deriveDevApiUrl() ?? FALLBACK_API_URL;
