import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';
import type { CategoryStat } from './statistics.types';

interface CategoryPieChartProps {
  stats: CategoryStat[];
  currency?: string;
  activeIndex: number | null;
  onSelect: (index: number | null) => void;
}

const SIZE = 200;
const STROKE = 28;
const RADIUS = (SIZE - STROKE) / 2;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CategoryPieChart({
  stats,
  currency = 'EUR',
  activeIndex,
  onSelect,
}: CategoryPieChartProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const total = stats.reduce((sum, stat) => sum + stat.total, 0);
  const active = activeIndex !== null ? stats[activeIndex] : null;

  let startAngle = 0;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {stats.map((stat, index) => {
          const dash = (stat.percentage / 100) * CIRCUMFERENCE;
          const rotation = startAngle - 90;
          startAngle += (stat.percentage / 100) * 360;
          const isActive = activeIndex === index;

          return (
            <Circle
              key={stat.category.id}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={stat.category.color}
              strokeWidth={isActive ? STROKE + 8 : STROKE}
              strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
              strokeLinecap="butt"
              opacity={activeIndex === null || isActive ? 1 : 0.4}
              transform={`rotate(${rotation} ${CENTER} ${CENTER})`}
              onPress={() => onSelect(isActive ? null : index)}
            />
          );
        })}
      </Svg>

      <View style={styles.center} pointerEvents="none">
        {active ? (
          <>
            <Text style={styles.centerLabel} numberOfLines={1}>
              {active.category.icon} {active.category.name}
            </Text>
            <Text style={styles.centerValue}>
              {formatCurrency(active.total, currency)}
            </Text>
            <Text style={styles.centerPercent}>
              {active.percentage.toFixed(1)}%
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.centerLabel}>Total dépenses</Text>
            <Text style={styles.centerValue}>
              {formatCurrency(total, currency)}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: SIZE,
      height: SIZE,
      alignSelf: 'center',
    },
    center: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      gap: 2,
    },
    centerLabel: {
      fontSize: 13,
      color: colors.textMuted,
      textAlign: 'center',
    },
    centerValue: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    centerPercent: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
  });
