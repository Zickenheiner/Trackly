import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/core/ui/Card';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { CategoryPieChart } from './CategoryPieChart';
import { CategoryLegend } from './CategoryLegend';
import { useCategoryStats } from './use-category-stats';
import type { StatsPeriod } from './statistics.types';

interface CategoryStatsSectionProps {
  period: StatsPeriod;
  currency?: string;
}

export function CategoryStatsSection({
  period,
  currency = 'EUR',
}: CategoryStatsSectionProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { data: stats, isLoading, isError } = useCategoryStats(period);

  return (
    <Card>
      <Text style={styles.title}>Dépenses par catégorie</Text>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError ? (
        <Text style={styles.message}>
          Impossible de charger la répartition par catégorie.
        </Text>
      ) : !stats || stats.length === 0 ? (
        <Text style={styles.message}>
          Aucune dépense sur cette période.
        </Text>
      ) : (
        <>
          <CategoryPieChart
            stats={stats}
            currency={currency}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
          <CategoryLegend
            stats={stats}
            currency={currency}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </>
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
