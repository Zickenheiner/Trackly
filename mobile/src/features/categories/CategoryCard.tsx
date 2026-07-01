import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/core/ui/Card';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import type { Category } from './category.types';

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        {/* La pastille et l'icône utilisent la couleur renvoyée par l'API. */}
        <View style={[styles.dot, { backgroundColor: category.color }]}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <View style={styles.texts}>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.color}>{category.color}</Text>
        </View>
      </View>

      {category.isDefault ? (
        // Les catégories par défaut ne sont ni modifiables ni supprimables.
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>Par défaut</Text>
        </View>
      ) : (
        <View style={styles.actions}>
          <Pressable
            style={styles.action}
            onPress={() => onEdit(category)}
            hitSlop={8}
          >
            <Ionicons name="create-outline" size={20} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.action}
            onPress={() => onDelete(category)}
            hitSlop={8}
          >
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </View>
      )}
    </Card>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      gap: 12,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flexShrink: 1,
    },
    dot: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 18,
    },
    texts: {
      flexShrink: 1,
      gap: 2,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    color: {
      fontSize: 13,
      color: colors.textMuted,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: colors.surface,
    },
    badgeLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textMuted,
    },
    actions: {
      flexDirection: 'row',
      gap: 8,
    },
    action: {
      padding: 6,
    },
  });
