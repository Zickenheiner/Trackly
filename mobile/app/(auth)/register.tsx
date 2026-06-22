import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { colors } from '@/core/ui/colors';
import { RegisterForm } from '@/features/auth/RegisterForm';

export default function RegisterScreen() {
  return (
    <Screen scroll>
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>
        Inscrivez-vous pour commencer à suivre votre budget.
      </Text>
      <RegisterForm />
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
});
