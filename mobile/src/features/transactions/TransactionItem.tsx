import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';
import type { Transaction } from './transaction.types';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
  currency?: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function TransactionItem({
  transaction,
  onPress,
  currency = 'EUR',
}: TransactionItemProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isIncome = transaction.type === 'income';
  const sign = isIncome ? '+' : '-';
  const amountColor = isIncome ? colors.success : colors.danger;

  const content = (
    <>
      <View style={styles.info}>
        <Text style={styles.label} numberOfLines={1}>
          {transaction.label}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.icon}>{transaction.category.icon}</Text>
          <Text style={styles.metaText} numberOfLines={1}>
            {transaction.category.name}
          </Text>
          <Text style={styles.metaText}> · </Text>
          <Text style={styles.metaText}>{formatDate(transaction.date)}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {sign}
        {formatCurrency(Math.abs(transaction.amount), currency)}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={() => onPress(transaction)}
        style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.row}>{content}</View>;
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
    pressed: {
      opacity: 0.6,
    },
    info: {
      flex: 1,
      gap: 4,
    },
    label: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.text,
    },
    meta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      fontSize: 13,
      marginRight: 4,
    },
    metaText: {
      fontSize: 13,
      color: colors.textMuted,
    },
    amount: {
      fontSize: 15,
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
  });
