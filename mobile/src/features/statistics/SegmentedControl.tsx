import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';

interface Segment<T extends string | number> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string | number> {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string | number>({
  segments,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.group}>
      {segments.map((segment) => {
        const isActive = segment.value === value;
        return (
          <Pressable
            key={String(segment.value)}
            onPress={() => onChange(segment.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={[styles.item, isActive && styles.itemActive]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {segment.label}
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
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    labelActive: {
      color: colors.primaryText,
    },
  });
