import { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from './theme-context';
import type { Palette } from './palettes';

export function ThemeToggle() {
  const { theme, colors, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isDark = theme === 'dark';

  return (
    <Pressable
      onPress={toggleTheme}
      style={styles.container}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      accessibilityLabel="Basculer le thème sombre"
    >
      <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
      <Text style={styles.label}>
        {isDark ? 'Mode sombre' : 'Mode clair'}
      </Text>
    </Pressable>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      alignSelf: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    icon: {
      fontSize: 16,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
  });
