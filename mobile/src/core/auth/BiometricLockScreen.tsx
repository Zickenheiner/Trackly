import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { Button } from '@/core/ui/Button';
import { getBiometricLabel } from './biometrics';
import { useLock } from './lock-context';

export function BiometricLockScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { unlock } = useLock();
  const [label, setLabel] = useState('la biométrie');
  const [authenticating, setAuthenticating] = useState(false);
  const [failed, setFailed] = useState(false);

  const attempt = async () => {
    if (authenticating) return;
    setAuthenticating(true);
    setFailed(false);
    const success = await unlock();
    if (!success) setFailed(true);
    setAuthenticating(false);
  };

  // Déclenche automatiquement l'invite biométrique à l'affichage.
  const hasPrompted = useRef(false);
  useEffect(() => {
    getBiometricLabel().then(setLabel);
    if (!hasPrompted.current) {
      hasPrompted.current = true;
      attempt();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={40} color={colors.primary} />
        </View>
        <Text style={styles.title}>Trackly est verrouillé</Text>
        <Text style={styles.subtitle}>
          Authentifiez-vous avec {label} pour accéder à vos données.
        </Text>
        {failed ? (
          <Text style={styles.error}>
            Échec de l'authentification. Réessayez.
          </Text>
        ) : null}
      </View>
      <Button
        label={`Déverrouiller avec ${label}`}
        onPress={attempt}
        loading={authenticating}
      />
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingBottom: 48,
      justifyContent: 'center',
      gap: 48,
    },
    content: {
      alignItems: 'center',
      gap: 12,
    },
    iconCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
      marginBottom: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      color: colors.textMuted,
      textAlign: 'center',
    },
    error: {
      fontSize: 14,
      color: colors.danger,
      textAlign: 'center',
      marginTop: 4,
    },
  });
