import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { colors } from '@/core/ui/colors';
import { LoginForm } from '@/features/auth/LoginForm';

export default function LoginScreen() {
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

const styles = StyleSheet.create({
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
