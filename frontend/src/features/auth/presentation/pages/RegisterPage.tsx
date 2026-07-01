import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import routes from '@/core/constants/routes';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">
              Créer un compte
            </CardTitle>
            <CardDescription>
              Inscrivez-vous pour commencer à suivre vos finances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ?{' '}
              <Link
                to={routes.login}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
