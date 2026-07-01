import { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextField } from '@/core/ui/TextField';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useCategories } from '@/features/categories/use-categories';
import type {
  TransactionFilters as TransactionFiltersValue,
  TransactionType,
} from './transaction.types';

interface TransactionFiltersProps {
  filters: TransactionFiltersValue;
  onChange: (filters: TransactionFiltersValue) => void;
}

const TYPE_SEGMENTS: { value: TransactionType | undefined; label: string }[] = [
  { value: undefined, label: 'Tous' },
  { value: 'expense', label: 'Dépenses' },
  { value: 'income', label: 'Revenus' },
];

/** Fusionne les nouveaux filtres, remet la page à 1 et retire les clés vides. */
function mergeFilters(
  current: TransactionFiltersValue,
  patch: Partial<TransactionFiltersValue>,
): TransactionFiltersValue {
  const merged: TransactionFiltersValue = { ...current, ...patch, page: 1 };
  (Object.keys(merged) as (keyof TransactionFiltersValue)[]).forEach((key) => {
    const value = merged[key];
    if (value === undefined || value === '') {
      delete merged[key];
    }
  });
  return merged;
}

export function TransactionFilters({
  filters,
  onChange,
}: TransactionFiltersProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <View style={styles.container}>
      {/* Type */}
      <View style={styles.group}>
        {TYPE_SEGMENTS.map((segment) => {
          const active = filters.type === segment.value;
          return (
            <Pressable
              key={segment.label}
              onPress={() =>
                onChange(mergeFilters(filters, { type: segment.value }))
              }
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={[styles.segment, active ? styles.segmentActive : null]}
            >
              <Text
                style={[
                  styles.segmentLabel,
                  active ? styles.segmentLabelActive : null,
                ]}
              >
                {segment.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Catégorie */}
      <View style={styles.section}>
        <Text style={styles.label}>Catégorie</Text>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : isError || !categories ? (
          <Text style={styles.error}>
            Impossible de charger les catégories.
          </Text>
        ) : (
          <View style={styles.chips}>
            <Pressable
              onPress={() =>
                onChange(mergeFilters(filters, { categoryId: undefined }))
              }
              style={[
                styles.chip,
                !filters.categoryId ? styles.chipActive : null,
              ]}
            >
              <Text
                style={
                  !filters.categoryId ? styles.chipTextActive : styles.chipText
                }
              >
                Toutes
              </Text>
            </Pressable>
            {categories.map((category) => {
              const active = filters.categoryId === category.id;
              return (
                <Pressable
                  key={category.id}
                  onPress={() =>
                    onChange(mergeFilters(filters, { categoryId: category.id }))
                  }
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
      </View>

      {/* Plage de dates */}
      <View style={styles.dates}>
        <View style={styles.dateField}>
          <TextField
            label="Du"
            placeholder="AAAA-MM-JJ"
            value={filters.startDate ?? ''}
            onChangeText={(value) =>
              onChange(mergeFilters(filters, { startDate: value }))
            }
            autoCapitalize="none"
          />
        </View>
        <View style={styles.dateField}>
          <TextField
            label="Au"
            placeholder="AAAA-MM-JJ"
            value={filters.endDate ?? ''}
            onChangeText={(value) =>
              onChange(mergeFilters(filters, { endDate: value }))
            }
            autoCapitalize="none"
          />
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    group: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 4,
      gap: 4,
    },
    segment: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 7,
      alignItems: 'center',
    },
    segmentActive: {
      backgroundColor: colors.primary,
    },
    segmentLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
    segmentLabelActive: {
      color: colors.primaryText,
    },
    section: {
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
    dates: {
      flexDirection: 'row',
      gap: 12,
    },
    dateField: {
      flex: 1,
    },
    error: {
      fontSize: 13,
      color: colors.danger,
    },
  });
