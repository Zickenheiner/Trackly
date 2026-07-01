import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';
import type { DashboardTransaction } from './dashboard.types';

interface RecentTransactionItemProps {
  transaction: DashboardTransaction;
  currency?: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
    });
  } catch {
    return iso;
  }
}

export function RecentTransactionItem({
  transaction,
  currency = 'EUR',
}: RecentTransactionItemProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isIncome = transaction.type === 'income';
  const sign = isIncome ? '+' : '-';
  const amountColor = isIncome ? colors.success : colors.danger;

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.label} numberOfLines={1}>
          {transaction.label}
        </Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {sign}
        {formatCurrency(Math.abs(transaction.amount), currency)}
      </Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      gap: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    info: {
      flex: 1,
      gap: 2,
    },
    label: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.text,
    },
    date: {
      fontSize: 13,
      color: colors.textMuted,
    },
    amount: {
      fontSize: 15,
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
  });
