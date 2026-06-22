import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { colors } from '@/core/ui/colors';
import { LogoutButton } from '@/features/auth/LogoutButton';

export default function DashboardScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.text}>
          Écran de démonstration — page d'accueil après authentification.
        </Text>
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

const styles = StyleSheet.create({
  header: {
    gap: 8,
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
    marginTop: 8,
  },
  footer: {
    marginTop: 'auto',
  },
});
