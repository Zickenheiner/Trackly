import CreateTransactionDialog from '../components/CreateTransactionDialog';

export default function TransactionListPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            Suivez vos dépenses et ajoutez-en de nouvelles.
          </p>
        </div>
        <CreateTransactionDialog />
      </div>
    </div>
  );
}
