import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/core/ui/Screen';
import { FormModal } from '@/core/ui/FormModal';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useCategories } from '@/features/categories/use-categories';
import { useDeleteCategory } from '@/features/categories/use-delete-category';
import { CategoryCard } from '@/features/categories/CategoryCard';
import { CategoryForm } from '@/features/categories/CategoryForm';
import type { Category } from '@/features/categories/category.types';

export default function CategoriesScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { data: categories, isLoading, isError, refetch } = useCategories();
  const deleteMutation = useDeleteCategory();

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const closeModal = () => {
    setCreating(false);
    setEditing(null);
  };

  const confirmDelete = (category: Category) => {
    Alert.alert(
      'Supprimer la catégorie',
      `Voulez-vous vraiment supprimer « ${category.name} » ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(category.id),
        },
      ],
    );
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Catégories</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => setCreating(true)}
          hitSlop={8}
        >
          <Ionicons name="add" size={22} color={colors.primaryText} />
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError || !categories ? (
        <Pressable style={styles.centered} onPress={() => refetch()}>
          <Text style={styles.error}>
            Impossible de charger les catégories. Touchez pour réessayer.
          </Text>
        </Pressable>
      ) : categories.length === 0 ? (
        <Text style={styles.empty}>
          Aucune catégorie pour le moment. Ajoutez-en une avec le bouton +.
        </Text>
      ) : (
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={setEditing}
            onDelete={confirmDelete}
          />
        ))
      )}

      <FormModal
        visible={creating || editing !== null}
        onClose={closeModal}
        title={editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      >
        <CategoryForm category={editing ?? undefined} onSuccess={closeModal} />
      </FormModal>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    centered: {
      paddingVertical: 40,
      alignItems: 'center',
    },
    error: {
      fontSize: 15,
      color: colors.danger,
      textAlign: 'center',
    },
    empty: {
      fontSize: 14,
      color: colors.textMuted,
      paddingVertical: 24,
      textAlign: 'center',
    },
  });
