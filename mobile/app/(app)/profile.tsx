import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { Card } from '@/core/ui/Card';
import { Loading } from '@/core/ui/Loading';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import { ProfileForm } from '@/features/profile/ProfileForm';
import { useProfile } from '@/features/profile/use-profile';
import { LogoutButton } from '@/features/auth/LogoutButton';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { data: profile, isLoading, isError, error } = useProfile();

  if (isLoading) return <Loading />;

  if (isError || !profile) {
    return (
      <Screen>
        <Text style={styles.title}>Mon profil</Text>
        <Text style={styles.error}>
          {error?.message ?? 'Impossible de charger le profil.'}
        </Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>Mon profil</Text>
      <Card>
        <View style={styles.emailBlock}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        <ProfileForm profile={profile} />
      </Card>

      <Card>
        <ThemeToggle />
      </Card>

      <View style={styles.footer}>
        <LogoutButton />
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
    emailBlock: {
      gap: 6,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    email: {
      fontSize: 16,
      color: colors.textMuted,
    },
    error: {
      fontSize: 15,
      color: colors.danger,
    },
    footer: {
      marginTop: 'auto',
    },
  });
