import { useMemo } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { RegisterForm } from '@/features/auth/RegisterForm';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Screen scroll>
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>
        Inscrivez-vous pour commencer à suivre votre budget.
      </Text>
      <RegisterForm />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Déjà un compte ?</Text>
        <Link href="/login" style={styles.link}>
          Se connecter
        </Link>
      </View>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 15,
      color: colors.textMuted,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      marginTop: 8,
    },
    footerText: {
      color: colors.textMuted,
    },
    link: {
      color: colors.primary,
      fontWeight: '600',
    },
  });
