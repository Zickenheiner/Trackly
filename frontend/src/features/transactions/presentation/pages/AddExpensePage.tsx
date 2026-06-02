import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { ApiError } from '@/core/errors/api.error';
import routes from '@/core/constants/routes';
import ExpenseForm from '../components/ExpenseForm';
import { useCreateTransaction } from '../../domain/hooks/transaction.hook';
import type { CreateExpenseFormData } from '../../domain/schemas/transaction.schema';

export default function AddExpensePage() {
  const navigate = useNavigate();
  const { createTransactionAsync, createTransactionIsLoading } =
    useCreateTransaction();

  const goBack = () => navigate(routes.home);

  const handleSubmit = async (data: CreateExpenseFormData) => {
    try {
      await createTransactionAsync({
        type: 'expense',
        amount: data.amount,
        label: data.label,
        categoryId: data.categoryId,
        date: new Date(data.date).toISOString(),
        note: data.note?.trim() ? data.note.trim() : undefined,
      });
      toast.success('Dépense ajoutée avec succès.');
      navigate(routes.home);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        toast.error('La catégorie sélectionnée est introuvable.');
        return;
      }
      if (error instanceof ApiError && error.status === 400) {
        toast.error('Validation échouée. Vérifiez les champs du formulaire.');
        return;
      }
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Nouvelle dépense</CardTitle>
            <CardDescription>
              Renseignez le montant, la catégorie et la date pour suivre vos
              sorties d'argent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseForm
              onSubmit={handleSubmit}
              onCancel={goBack}
              isSubmitting={createTransactionIsLoading}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
