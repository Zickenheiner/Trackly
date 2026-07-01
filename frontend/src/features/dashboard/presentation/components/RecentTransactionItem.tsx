import { cn } from '@/core/utils/cn';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { TransactionEntity } from '../../domain/entities/dashboard-summary.entity';

interface Props {
  transaction: TransactionEntity;
  index?: number;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

function formatAmount(amount: number, type: 'income' | 'expense'): string {
  const prefix = type === 'income' ? '+' : '-';
  return `${prefix}${new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(Math.abs(amount))}`;
}

export default function RecentTransactionItem({
  transaction,
  index = 0,
}: Props) {
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="flex items-center justify-between py-3"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            isIncome
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive',
          )}
        >
          {isIncome ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownLeft className="h-4 w-4" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">
            {transaction.label}
          </span>
          {transaction.categoryName && (
            <span className="mt-0.5 text-xs text-muted-foreground">
              {transaction.categoryName}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            isIncome ? 'text-success' : 'text-destructive',
          )}
        >
          {formatAmount(transaction.amount, transaction.type)}
        </span>
        <span className="mt-0.5 text-xs text-muted-foreground">
          {formatDate(transaction.date)}
        </span>
      </div>
    </motion.div>
  );
}
