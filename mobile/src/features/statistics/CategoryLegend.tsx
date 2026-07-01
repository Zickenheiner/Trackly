import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';
import type { CategoryStat } from './statistics.types';

interface CategoryLegendProps {
  stats: CategoryStat[];
  currency?: string;
  activeIndex: number | null;
  onSelect: (index: number | null) => void;
}

export function CategoryLegend({
  stats,
  currency = 'EUR',
  activeIndex,
  onSelect,
}: CategoryLegendProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.list}>
      {stats.map((stat, index) => {
        const isActive = activeIndex === index;
        return (
          <Pressable
            key={stat.category.id}
            onPress={() => onSelect(isActive ? null : index)}
            style={[styles.row, isActive && styles.rowActive]}
          >
            <View style={[styles.dot, { backgroundColor: stat.category.color }]} />
            <Text style={styles.name} numberOfLines={1}>
              {stat.category.icon} {stat.category.name}
            </Text>
            <Text style={styles.percent}>{stat.percentage.toFixed(1)}%</Text>
            <Text style={styles.amount}>
              {formatCurrency(stat.total, currency)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    list: {
      gap: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 8,
    },
    rowActive: {
      backgroundColor: colors.surface,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    name: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
    },
    percent: {
      fontSize: 13,
      color: colors.textMuted,
      width: 52,
      textAlign: 'right',
    },
    amount: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      minWidth: 72,
      textAlign: 'right',
      fontVariant: ['tabular-nums'],
    },
  });
