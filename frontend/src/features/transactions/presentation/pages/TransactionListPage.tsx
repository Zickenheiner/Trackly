import { TrendingDown, TrendingUp } from 'lucide-react';
import CreateTransactionDialog from '../components/CreateTransactionDialog';
import CreateIncomeDialog from '../components/CreateIncomeDialog';

export default function TransactionListPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            Suivez vos dépenses et vos revenus, et ajoutez-en de nouveaux.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <CreateIncomeDialog />
          <CreateTransactionDialog />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-success" />
          Revenus
        </span>
        <span className="inline-flex items-center gap-1.5">
          <TrendingDown className="h-4 w-4 text-destructive" />
          Dépenses
        </span>
      </div>
    </div>
  );
}
