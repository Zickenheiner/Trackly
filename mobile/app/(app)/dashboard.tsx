import { useMemo } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { useTheme } from '@/core/theme/theme-context';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import type { Palette } from '@/core/theme/palettes';
import { LogoutButton } from '@/features/auth/LogoutButton';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.text}>
          Écran de démonstration — page d'accueil après authentification.
        </Text>
        <ThemeToggle />
        <Link href="/profile" style={styles.link}>
          Mon profil
        </Link>
      </View>
      <View style={styles.footer}>
        <LogoutButton />
      </View>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    header: {
      gap: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    text: {
      fontSize: 15,
      color: colors.textMuted,
    },
    link: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
    footer: {
      marginTop: 'auto',
    },
  });
