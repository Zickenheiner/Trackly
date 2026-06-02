import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import {
  loginSchema,
  type LoginFormData,
  useLogin,
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
import { ApiError } from '@/core/errors/api.error';
import routes from '@/core/constants/routes';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, loginIsPending, loginError } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        navigate(routes.home);
      },
    });
  };

  const getErrorMessage = () => {
    if (!loginError) return null;
    if (loginError instanceof ApiError && loginError.status === 401) {
      return 'Email ou mot de passe incorrect.';
    }
    if (loginError instanceof ApiError && loginError.status === 400) {
      return 'Veuillez vérifier les informations saisies.';
    }
    return 'Une erreur est survenue. Veuillez réessayer.';
  };

  const errorMessage = getErrorMessage();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive text-center"
          >
            {errorMessage}
          </motion.p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loginIsPending}
        >
          {loginIsPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours…
            </>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>
    </Form>
  );
}
