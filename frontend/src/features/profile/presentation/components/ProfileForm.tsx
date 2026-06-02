import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  updateProfileSchema,
  type UpdateProfileFormData,
  useUpdateProfile,
} from '../../domain/hooks/user-profile.hook';
import type { UserProfileEntity } from '../../domain/entities/user-profile.entity';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { Button } from '@/core/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';

interface Props {
  profile: UserProfileEntity;
}

const CURRENCIES = [
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'USD', label: 'USD — Dollar américain' },
  { value: 'GBP', label: 'GBP — Livre sterling' },
  { value: 'CHF', label: 'CHF — Franc suisse' },
  { value: 'CAD', label: 'CAD — Dollar canadien' },
  { value: 'JPY', label: 'JPY — Yen japonais' },
];

export default function ProfileForm({ profile }: Props) {
  const { updateProfile, updateProfileIsPending, updateProfileError, updateProfileIsSuccess } =
    useUpdateProfile();

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      title: profile.title,
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: profile.age,
      currency: profile.currency,
    },
  });

  useEffect(() => {
    if (updateProfileIsSuccess) {
      toast.success('Profil mis à jour avec succès');
    }
  }, [updateProfileIsSuccess]);

  useEffect(() => {
    if (updateProfileError) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  }, [updateProfileError]);

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{profile.email}</p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Civilité</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre civilité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mr.">M.</SelectItem>
                  <SelectItem value="Mrs.">Mme.</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge</FormLabel>
              <FormControl>
                <Input type="number" min={18} placeholder="25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Devise</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une devise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full" disabled={updateProfileIsPending}>
            {updateProfileIsPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement…
              </>
            ) : (
              'Enregistrer les modifications'
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
