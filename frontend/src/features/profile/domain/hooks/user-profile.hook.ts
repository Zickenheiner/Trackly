import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import UserProfileRepositoryImpl from '../../data/repositories/user-profile.repository.impl';

const repository = new UserProfileRepositoryImpl();

const QUERY_KEYS = {
  me: ['profile', 'me'] as const,
};

export const updateProfileSchema = z.object({
  title: z.enum(['Mr.', 'Mrs.']),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  age: z.coerce
    .number()
    .min(18, 'Vous devez avoir au moins 18 ans')
    .max(120, 'Âge invalide'),
  currency: z.string().min(1, 'La devise est requise'),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export function useProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: () => repository.getMe(),
  });

  return { profile: data, profileIsLoading: isLoading, profileError: error };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data: UpdateProfileFormData) => repository.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me });
    },
  });

  return {
    updateProfile: mutate,
    updateProfileIsPending: isPending,
    updateProfileError: error,
    updateProfileIsSuccess: isSuccess,
  };
}
