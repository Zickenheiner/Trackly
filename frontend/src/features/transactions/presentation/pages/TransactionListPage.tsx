import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
  SearchX,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/core/components/ui/button';
import { Skeleton } from '@/core/components/ui/skeleton';
import CreateTransactionDialog from '../components/CreateTransactionDialog';
import EditTransactionDialog from '../components/EditTransactionDialog';
import DeleteTransactionDialog from '../components/DeleteTransactionDialog';
import TransactionFilters from '../components/TransactionFilters';
import TransactionItem from '../components/TransactionItem';
import { useTransactionList } from '../../domain/hooks/transaction.hook';
import type {
  TransactionEntity,
  TransactionFilters as TransactionFiltersValue,
} from '../../domain/entities/transaction.entity';

const DEFAULT_LIMIT = 20;

const INITIAL_FILTERS: TransactionFiltersValue = {
  page: 1,
  limit: DEFAULT_LIMIT,
};

export default function TransactionListPage() {
  const [filters, setFilters] =
    useState<TransactionFiltersValue>(INITIAL_FILTERS);
  const [editing, setEditing] = useState<TransactionEntity | null>(null);
  const [deleting, setDeleting] = useState<TransactionEntity | null>(null);

  const {
    transactions,
    transactionsTotal,
    transactionsPage,
    transactionsLimit,
    transactionsIsLoading,
    transactionsIsFetching,
    transactionsError,
  } = useTransactionList(filters);

  const hasActiveFilters = Boolean(
    filters.type || filters.categoryId || filters.startDate || filters.endDate,
  );

  const currentPage = transactionsPage ?? filters.page ?? 1;
  const currentLimit = transactionsLimit ?? filters.limit ?? DEFAULT_LIMIT;
  const totalPages = useMemo(() => {
    if (!transactionsTotal) return 1;
    return Math.max(1, Math.ceil(transactionsTotal / currentLimit));
  }, [transactionsTotal, currentLimit]);

  const handleFiltersChange = (next: TransactionFiltersValue) => {
    setFilters({ ...next, limit: currentLimit });
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  const goToPage = (page: number) => {
    setFilters((previous) => ({ ...previous, page }));
  };

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
          <CreateTransactionDialog />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-success" />
          Revenus
        </span>
        <span className="inline-flex items-center gap-1.5">
          <TrendingDown className="h-4 w-4 text-destructive" />
          Dépenses
        </span>
      </div>

      <div className="space-y-6">
        <TransactionFilters
          filters={filters}
          onChange={handleFiltersChange}
          onReset={handleReset}
        />

        {transactionsIsLoading ? (
          <TransactionListSkeleton />
        ) : transactionsError ? (
          <TransactionListError />
        ) : !transactions?.length ? (
          <TransactionListEmpty hasActiveFilters={hasActiveFilters} />
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.03 } },
              }}
              className="flex flex-col gap-3"
              style={{ opacity: transactionsIsFetching ? 0.6 : 1 }}
            >
              {transactions.map((transaction, index) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  index={index}
                  onEdit={setEditing}
                  onDelete={setDeleting}
                />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} sur {totalPages}
                  {typeof transactionsTotal === 'number' && (
                    <>
                      {' '}
                      · {transactionsTotal} transaction
                      {transactionsTotal > 1 ? 's' : ''}
                    </>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1 || transactionsIsFetching}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Précédent
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={
                      currentPage >= totalPages || transactionsIsFetching
                    }
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Suivant
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <EditTransactionDialog
        transaction={editing}
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      />
      <DeleteTransactionDialog
        transaction={deleting}
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      />
    </div>
  );
}

function TransactionListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

function TransactionListError() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground">
        Impossible de charger vos transactions pour le moment.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Réessayer
      </Button>
    </div>
  );
}

function TransactionListEmpty({
  hasActiveFilters,
}: {
  hasActiveFilters: boolean;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center">
      {hasActiveFilters ? (
        <>
          <SearchX className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            Aucune transaction ne correspond à ces filtres.
          </p>
        </>
      ) : (
        <>
          <Inbox className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            Vous n'avez pas encore de transaction. Ajoutez votre première
            dépense ou votre premier revenu.
          </p>
        </>
      )}
    </div>
  );
}
