import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { ApiError } from '@/core/api/api-error';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useCreateCategory } from './use-create-category';
import { useUpdateCategory } from './use-update-category';
import { categoryFormSchema, type CategoryFormValues } from './category.schema';
import type { Category } from './category.types';

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 409)
      return 'Une catégorie portant ce nom existe déjà.';
    if (error.status === 400)
      return 'Validation échouée. Vérifiez les champs du formulaire.';
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

export function CategoryForm({
  category,
  onSuccess,
}: {
  category?: Category;
  onSuccess: () => void;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isEditing = Boolean(category);

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  // On mutualise l'état d'affichage selon le mode (création / édition).
  const mutation = isEditing ? updateMutation : createMutation;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? '',
      icon: category?.icon ?? '',
      color: category?.color ?? '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    if (category) {
      updateMutation.mutate(
        { id: category.id, payload: values },
        { onSuccess: () => onSuccess() },
      );
    } else {
      createMutation.mutate(values, { onSuccess: () => onSuccess() });
    }
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Nom"
            placeholder="Ex : Restaurant"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={30}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="icon"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Icône"
            placeholder="🍔"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.icon?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Couleur"
            placeholder="#RRGGBB"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            error={errors.color?.message}
          />
        )}
      />

      {mutation.isError ? (
        <Text style={styles.serverError}>{errorMessage(mutation.error)}</Text>
      ) : null}

      <Button
        label={isEditing ? 'Enregistrer' : 'Créer'}
        onPress={onSubmit}
        loading={mutation.isPending}
      />
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    form: {
      gap: 16,
    },
    serverError: {
      fontSize: 14,
      color: colors.danger,
    },
  });
