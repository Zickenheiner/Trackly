import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/core/ui/Card';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { MonthlyBarChart } from './MonthlyBarChart';
import { SegmentedControl } from './SegmentedControl';
import { useMonthlyStats } from './use-monthly-stats';
import type { MonthlyStatsType } from './statistics.types';

interface MonthlyStatsSectionProps {
  currency?: string;
}

const TYPE_SEGMENTS: { value: MonthlyStatsType; label: string }[] = [
  { value: 'both', label: 'Les deux' },
  { value: 'income', label: 'Revenus' },
  { value: 'expense', label: 'Dépenses' },
];

const MONTHS_SEGMENTS: { value: number; label: string }[] = [
  { value: 6, label: '6 mois' },
  { value: 12, label: '12 mois' },
];

export function MonthlyStatsSection({
  currency = 'EUR',
}: MonthlyStatsSectionProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [type, setType] = useState<MonthlyStatsType>('both');
  const [months, setMonths] = useState<number>(6);

  const { data: stats, isLoading, isError } = useMonthlyStats(months, type);

  return (
    <Card>
      <Text style={styles.title}>Évolution mensuelle</Text>

      <SegmentedControl segments={TYPE_SEGMENTS} value={type} onChange={setType} />
      <SegmentedControl
        segments={MONTHS_SEGMENTS}
        value={months}
        onChange={setMonths}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError ? (
        <Text style={styles.message}>
          Impossible de charger l'évolution mensuelle.
        </Text>
      ) : !stats || stats.length === 0 ? (
        <Text style={styles.message}>Aucune donnée sur cette période.</Text>
      ) : (
        <MonthlyBarChart stats={stats} type={type} currency={currency} />
      )}
    </Card>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    centered: {
      paddingVertical: 40,
      alignItems: 'center',
    },
    message: {
      fontSize: 14,
      color: colors.textMuted,
      paddingVertical: 16,
      textAlign: 'center',
    },
  });
