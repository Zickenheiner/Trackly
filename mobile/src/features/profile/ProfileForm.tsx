import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { colors } from '@/core/ui/colors';
import type { Civility } from '@/features/auth/auth.types';
import { useUpdateProfile } from './use-update-profile';
import { profileSchema, type ProfileFormValues } from './profile.schema';
import type { UserProfile } from './profile.types';

const CIVILITIES: Civility[] = ['Mr.', 'Mrs.'];

export function ProfileForm({ profile }: { profile: UserProfile }) {
  const updateMutation = useUpdateProfile();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      title: profile.title,
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: String(profile.age),
      currency: profile.currency,
    },
  });

  const onSubmit = handleSubmit((values) => {
    updateMutation.mutate({ ...values, age: Number(values.age) });
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <View style={styles.civility}>
            <Text style={styles.label}>Civilité</Text>
            <View style={styles.segmented}>
              {CIVILITIES.map((option) => {
                const active = value === option;
                return (
                  <Pressable
                    key={option}
                    onPress={() => onChange(option)}
                    style={[styles.segment, active ? styles.segmentActive : null]}
                  >
                    <Text
                      style={active ? styles.segmentTextActive : styles.segmentText}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Prénom"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="words"
            error={errors.firstName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Nom"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="words"
            error={errors.lastName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Âge"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="number-pad"
            error={errors.age?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="currency"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Devise"
            value={value}
            onChangeText={(text) => onChange(text.toUpperCase())}
            onBlur={onBlur}
            autoCapitalize="characters"
            maxLength={3}
            error={errors.currency?.message}
          />
        )}
      />

      {updateMutation.isError ? (
        <Text style={styles.serverError}>{updateMutation.error.message}</Text>
      ) : null}
      {updateMutation.isSuccess ? (
        <Text style={styles.success}>Profil mis à jour avec succès.</Text>
      ) : null}

      <Button
        label="Enregistrer"
        onPress={onSubmit}
        loading={updateMutation.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  civility: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  segmented: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    color: colors.text,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: colors.primaryText,
    fontWeight: '600',
  },
  serverError: {
    color: colors.danger,
    fontSize: 14,
  },
  success: {
    color: colors.primary,
    fontSize: 14,
  },
});
