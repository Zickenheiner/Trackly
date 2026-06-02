import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import {
  registerSchema,
  type RegisterFormData,
  useRegister,
} from '../../domain/hooks/auth.hook';
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
import { ApiError } from '@/core/errors/api.error';
import routes from '@/core/constants/routes';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, registerIsPending, registerError, registerIsSuccess } =
    useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      title: 'Mr.',
      firstName: '',
      lastName: '',
      age: 18,
      email: '',
      password: '',
      confirmPassword: '',
      currency: 'EUR',
    },
  });

  const onSubmit = ({ confirmPassword: _, ...data }: RegisterFormData) => {
    register(data, {
      onSuccess: () => {
        navigate(routes.home);
      },
    });
  };

  const getErrorMessage = () => {
    if (!registerError) return null;
    if (registerError instanceof ApiError && registerError.status === 409) {
      return 'Cet email est déjà utilisé.';
    }
    return 'Une erreur est survenue. Veuillez réessayer.';
  };

  const errorMessage = getErrorMessage();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Civilité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jean.dupont@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive text-center"
          >
            {errorMessage}
          </motion.p>
        )}

        {registerIsSuccess && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-success text-center"
          >
            Inscription réussie ! Redirection en cours…
          </motion.p>
        )}

        <Button type="submit" className="w-full" disabled={registerIsPending}>
          {registerIsPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription en cours…
            </>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </Form>
  );
}
