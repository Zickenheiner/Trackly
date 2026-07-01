import { useMemo } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';

export function Card({ style, ...props }: ViewProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return <View style={[styles.card, style]} {...props} />;
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 20,
      gap: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
  });
