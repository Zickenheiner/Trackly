import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useProfile } from '@/features/profile/use-profile';
import { PeriodSelector } from '@/features/dashboard/PeriodSelector';
import { MonthlyStatsSection } from '@/features/statistics/MonthlyStatsSection';
import { CategoryStatsSection } from '@/features/statistics/CategoryStatsSection';
import type { StatsPeriod } from '@/features/statistics/statistics.types';

export default function StatisticsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { data: profile } = useProfile();
  const currency = profile?.currency ?? 'EUR';

  const [period, setPeriod] = useState<StatsPeriod>('month');

  return (
    <Screen scroll>
      <Text style={styles.title}>Statistiques</Text>

      <MonthlyStatsSection currency={currency} />

      <View style={styles.categoryBlock}>
        <Text style={styles.sectionLabel}>Répartition des dépenses</Text>
        <PeriodSelector value={period} onChange={setPeriod} />
        <CategoryStatsSection period={period} currency={currency} />
      </View>
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
    categoryBlock: {
      gap: 12,
    },
    sectionLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });
