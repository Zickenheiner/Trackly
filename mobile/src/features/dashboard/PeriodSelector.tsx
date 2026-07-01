import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import type { DashboardPeriod } from './dashboard.types';

interface PeriodSelectorProps {
  value: DashboardPeriod;
  onChange: (value: DashboardPeriod) => void;
}

const PERIODS: { value: DashboardPeriod; label: string }[] = [
  { value: 'week', label: 'Semaine' },
  { value: 'month', label: 'Mois' },
  { value: 'year', label: 'Année' },
];

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.group}>
      {PERIODS.map((period) => {
        const isActive = period.value === value;
        return (
          <Pressable
            key={period.value}
            onPress={() => onChange(period.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={[styles.item, isActive && styles.itemActive]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {period.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    group: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 4,
      gap: 4,
    },
    item: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 7,
      alignItems: 'center',
    },
    itemActive: {
      backgroundColor: colors.primary,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
    labelActive: {
      color: colors.primaryText,
    },
  });
