import { useMemo } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { LoginForm } from '@/features/auth/LoginForm';

export default function LoginScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Screen scroll>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Content de vous revoir sur Trackly.</Text>
      <LoginForm />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Pas encore de compte ?</Text>
        <Link href="/register" style={styles.link}>
          Créer un compte
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
