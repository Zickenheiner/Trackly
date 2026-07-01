import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { ApiError } from '@/core/api/api-error';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { CategoryPicker } from './CategoryPicker';
import { useCreateTransaction } from './use-create-transaction';
import { useUpdateTransaction } from './use-update-transaction';
import {
  parseAmount,
  transactionFormSchema,
  type TransactionFormValues,
} from './transaction.schema';
import type { Transaction, TransactionType } from './transaction.types';

/** Date du jour au format AAAA-MM-JJ (heure locale). */
function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

/** Extrait la partie AAAA-MM-JJ d'une date ISO. */
function toDateInput(iso: string): string {
  return iso.slice(0, 10);
}

const COPY: Record<
  TransactionType,
  {
    labelField: string;
    labelPlaceholder: string;
    submit: string;
    success: string;
  }
> = {
  expense: {
    labelField: 'Libellé',
    labelPlaceholder: 'Ex : Courses du week-end',
    submit: 'Ajouter la dépense',
    success: 'Dépense ajoutée avec succès.',
  },
  income: {
    labelField: 'Source',
    labelPlaceholder: 'Ex : Salaire',
    submit: 'Ajouter le revenu',
    success: 'Revenu ajouté avec succès.',
  },
};

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 404)
      return 'La catégorie sélectionnée est introuvable.';
    if (error.status === 400) {
      return 'Validation échouée. Vérifiez les champs du formulaire.';
    }
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

interface TransactionFormProps {
  type: TransactionType;
  transaction?: Transaction;
  onSuccess?: () => void;
}

export function TransactionForm({
  type,
  transaction,
  onSuccess,
}: TransactionFormProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const copy = COPY[type];
  const isEditing = Boolean(transaction);
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const mutation = isEditing ? updateMutation : createMutation;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: transaction
      ? {
          amount: String(transaction.amount),
          label: transaction.label,
          categoryId: transaction.category.id,
          date: toDateInput(transaction.date),
          note: transaction.note ?? '',
        }
      : {
          amount: '',
          label: '',
          categoryId: '',
          date: todayIso(),
          note: '',
        },
  });

  const onSubmit = handleSubmit((values) => {
    const payload = {
      type,
      amount: parseAmount(values.amount),
      label: values.label,
      categoryId: values.categoryId,
      date: new Date(`${values.date}T00:00:00`).toISOString(),
      note: values.note?.trim() ? values.note.trim() : undefined,
    };

    if (transaction) {
      updateMutation.mutate(
        { id: transaction.id, payload },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        reset({
          amount: '',
          label: '',
          categoryId: '',
          date: todayIso(),
          note: '',
        });
        onSuccess?.();
      },
    });
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="amount"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Montant"
            placeholder="0.00"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="decimal-pad"
            error={errors.amount?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="label"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label={copy.labelField}
            placeholder={copy.labelPlaceholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={60}
            error={errors.label?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { value, onChange } }) => (
          <CategoryPicker
            value={value}
            onChange={onChange}
            error={errors.categoryId?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Date"
            placeholder="AAAA-MM-JJ"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            error={errors.date?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Note (optionnel)"
            placeholder="Ajoutez un détail…"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={3}
            maxLength={255}
            error={errors.note?.message}
          />
        )}
      />

      {mutation.isError ? (
        <Text style={styles.serverError}>{errorMessage(mutation.error)}</Text>
      ) : null}
      {mutation.isSuccess ? (
        <Text style={styles.success}>
          {isEditing ? 'Modifications enregistrées.' : copy.success}
        </Text>
      ) : null}

      <Button
        label={isEditing ? 'Enregistrer les modifications' : copy.submit}
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
    success: {
      fontSize: 14,
      color: colors.success,
    },
  });
