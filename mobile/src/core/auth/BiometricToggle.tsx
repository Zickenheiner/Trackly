import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import {
  authenticateBiometric,
  getBiometricLabel,
  isBiometricAvailable,
} from './biometrics';
import {
  getBiometricEnabled,
  setBiometricEnabled,
} from './biometric-preference';

export function BiometricToggle() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [available, setAvailable] = useState(false);
  const [label, setLabel] = useState('la biométrie');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isAvailable = await isBiometricAvailable();
      setAvailable(isAvailable);
      if (isAvailable) {
        setLabel(await getBiometricLabel());
        setEnabled(await getBiometricEnabled());
      }
      setLoading(false);
    })();
  }, []);

  const onToggle = async (next: boolean) => {
    // On exige une authentification réussie avant d'activer le verrouillage.
    if (next) {
      const success = await authenticateBiometric();
      if (!success) return;
    }
    setEnabled(next);
    await setBiometricEnabled(next);
  };

  if (loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.labelBlock}>
          <Ionicons
            name="finger-print"
            size={20}
            color={available ? colors.primary : colors.textMuted}
          />
          <Text style={styles.label}>Déverrouillage biométrique</Text>
        </View>
        {available ? (
          <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        ) : null}
      </View>
      <Text style={styles.hint}>
        {available
          ? `Protégez l'accès à Trackly avec ${label}.`
          : "Aucune biométrie configurée sur cet appareil."}
      </Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      gap: 6,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    hint: {
      fontSize: 13,
      color: colors.textMuted,
    },
  });
