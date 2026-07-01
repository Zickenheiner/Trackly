import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';
import type { MonthlyStat, MonthlyStatsType } from './statistics.types';

interface MonthlyBarChartProps {
  stats: MonthlyStat[];
  type: MonthlyStatsType;
  currency?: string;
}

const CHART_HEIGHT = 160;

function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  try {
    return new Date(Number(year), Number(m) - 1, 1)
      .toLocaleDateString('fr-FR', { month: 'short' })
      .replace('.', '');
  } catch {
    return month;
  }
}

export function MonthlyBarChart({
  stats,
  type,
  currency = 'EUR',
}: MonthlyBarChartProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showIncome = type === 'income' || type === 'both';
  const showExpense = type === 'expense' || type === 'both';

  const maxValue = useMemo(() => {
    const values = stats.flatMap((s) => [
      showIncome ? s.income : 0,
      showExpense ? s.expenses : 0,
    ]);
    return Math.max(1, ...values);
  }, [stats, showIncome, showExpense]);

  const barHeight = (value: number) =>
    value <= 0 ? 0 : Math.max(3, (value / maxValue) * CHART_HEIGHT);

  const active = activeIndex !== null ? stats[activeIndex] : null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.tooltip}>
        {active ? (
          <>
            <Text style={styles.tooltipMonth}>{formatMonth(active.month)}</Text>
            {showIncome && (
              <Text style={[styles.tooltipValue, { color: colors.success }]}>
                +{formatCurrency(active.income, currency)}
              </Text>
            )}
            {showExpense && (
              <Text style={[styles.tooltipValue, { color: colors.danger }]}>
                -{formatCurrency(active.expenses, currency)}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.tooltipHint}>
            Touchez une barre pour voir le détail
          </Text>
        )}
      </View>

      <View style={styles.chart}>
        {stats.map((stat, index) => {
          const isActive = activeIndex === index;
          return (
            <Pressable
              key={stat.month}
              style={styles.column}
              onPress={() => setActiveIndex(isActive ? null : index)}
            >
              <View style={styles.bars}>
                {showIncome && (
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight(stat.income),
                        backgroundColor: colors.success,
                        opacity: activeIndex === null || isActive ? 1 : 0.4,
                      },
                    ]}
                  />
                )}
                {showExpense && (
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight(stat.expenses),
                        backgroundColor: colors.danger,
                        opacity: activeIndex === null || isActive ? 1 : 0.4,
                      },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[styles.monthLabel, isActive && styles.monthLabelActive]}
                numberOfLines={1}
              >
                {formatMonth(stat.month)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.legend}>
        {showIncome && (
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <Text style={styles.legendLabel}>Revenus</Text>
          </View>
        )}
        {showExpense && (
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
            <Text style={styles.legendLabel}>Dépenses</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    wrapper: {
      gap: 12,
    },
    tooltip: {
      minHeight: 40,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    },
    tooltipMonth: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
      textTransform: 'capitalize',
    },
    tooltipValue: {
      fontSize: 15,
      fontWeight: '700',
    },
    tooltipHint: {
      fontSize: 13,
      color: colors.textMuted,
    },
    chart: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: CHART_HEIGHT + 24,
      gap: 4,
    },
    column: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 6,
    },
    bars: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: 2,
      height: CHART_HEIGHT,
    },
    bar: {
      width: 10,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    monthLabel: {
      fontSize: 11,
      color: colors.textMuted,
      textTransform: 'capitalize',
    },
    monthLabelActive: {
      color: colors.text,
      fontWeight: '700',
    },
    legend: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    legendLabel: {
      fontSize: 13,
      color: colors.textMuted,
    },
  });
