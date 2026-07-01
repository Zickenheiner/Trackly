import { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useCategories } from '@/features/categories/use-categories';

interface CategoryPickerProps {
  value: string;
  onChange: (categoryId: string) => void;
  error?: string;
}

export function CategoryPicker({ value, onChange, error }: CategoryPickerProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Catégorie</Text>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError || !categories ? (
        <Text style={styles.error}>Impossible de charger les catégories.</Text>
      ) : (
        <View style={styles.chips}>
          {categories.map((category) => {
            const active = value === category.id;
            return (
              <Pressable
                key={category.id}
                onPress={() => onChange(category.id)}
                style={[styles.chip, active ? styles.chipActive : null]}
              >
                <Text style={styles.chipIcon}>{category.icon}</Text>
                <Text
                  style={active ? styles.chipTextActive : styles.chipText}
                  numberOfLines={1}
                >
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

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
    centered: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    chipActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    chipIcon: {
      fontSize: 15,
    },
    chipText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    chipTextActive: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primaryText,
    },
    error: {
      fontSize: 13,
      color: colors.danger,
    },
  });
