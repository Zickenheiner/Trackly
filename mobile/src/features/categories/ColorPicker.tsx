import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';

// Palette de couleurs prédéfinies : garantit une valeur #RRGGBB valide.
const COLOR_OPTIONS = [
  '#ff2056',
  '#fe9a00',
  '#f0b100',
  '#00bc7d',
  '#00b8db',
  '#615fff',
  '#8e51ff',
  '#f6339a',
  '#e7000b',
  '#7ccf00',
  '#009689',
  '#62748e',
];

export function ColorPicker({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
  error?: string;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.grid}>
        {COLOR_OPTIONS.map((color) => {
          const isSelected = value.toLowerCase() === color.toLowerCase();
          return (
            <Pressable
              key={color}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Couleur ${color}`}
              onPress={() => onChange(color)}
              style={[
                styles.swatch,
                { backgroundColor: color },
                isSelected ? styles.swatchSelected : null,
              ]}
            >
              {isSelected ? (
                <Ionicons name="checkmark" size={18} color="#ffffff" />
              ) : null}
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    swatch: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    swatchSelected: {
      borderWidth: 3,
      borderColor: colors.text,
    },
    error: {
      fontSize: 13,
      color: colors.danger,
    },
  });
