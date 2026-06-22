import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { colors } from '@/core/ui/colors';

export default function DashboardScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>
        Écran de démonstration — page d'accueil après authentification.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  text: {
    fontSize: 15,
    color: colors.textMuted,
  },
});
