import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { Card } from '@/core/ui/Card';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { TransactionForm } from '@/features/transactions/TransactionForm';
import type { TransactionType } from '@/features/transactions/transaction.types';

const TABS: { type: TransactionType; label: string }[] = [
  { type: 'expense', label: 'Dépense' },
  { type: 'income', label: 'Revenu' },
];

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [type, setType] = useState<TransactionType>('expense');

  return (
    <Screen scroll>
      <Text style={styles.title}>Nouvelle transaction</Text>
      <Text style={styles.subtitle}>
        Ajoutez une dépense ou un revenu pour suivre vos finances.
      </Text>

      <View style={styles.segmented}>
        {TABS.map((tab) => {
          const active = type === tab.type;
          return (
            <Pressable
              key={tab.type}
              onPress={() => setType(tab.type)}
              style={[styles.segment, active ? styles.segmentActive : null]}
            >
              <Text
                style={active ? styles.segmentTextActive : styles.segmentText}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Card>
        <TransactionForm key={type} type={type} />
      </Card>
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
    segmented: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      overflow: 'hidden',
    },
    segment: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: colors.surface,
    },
    segmentActive: {
      backgroundColor: colors.primary,
    },
    segmentText: {
      color: colors.text,
      fontWeight: '600',
    },
    segmentTextActive: {
      color: colors.primaryText,
      fontWeight: '600',
    },
  });
