import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from '@/core/ui/Card';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';

type Variant = 'default' | 'income' | 'expense';

interface SummaryCardProps {
  title: string;
  amount: number;
  currency?: string;
  variant?: Variant;
}

export function SummaryCard({
  title,
  amount,
  currency = 'EUR',
  variant = 'default',
}: SummaryCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const amountColor =
    variant === 'income'
      ? colors.success
      : variant === 'expense'
        ? colors.danger
        : colors.text;

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.amount, { color: amountColor }]}>
        {formatCurrency(amount, currency)}
      </Text>
    </Card>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    card: {
      flex: 1,
      gap: 8,
      padding: 16,
    },
    title: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    amount: {
      fontSize: 20,
      fontWeight: '700',
    },
  });
