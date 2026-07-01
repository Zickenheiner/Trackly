import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/core/utils/cn';
import { Button } from '@/core/components/ui/button';
import type { TransactionEntity } from '../../domain/entities/transaction.entity';

interface Props {
  transaction: TransactionEntity;
  index?: number;
  onEdit?: (transaction: TransactionEntity) => void;
  onDelete?: (transaction: TransactionEntity) => void;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
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

export default function TransactionItem({
  transaction,
  index = 0,
  onEdit,
  onDelete,
}: Props) {
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group flex items-center justify-between gap-4 rounded-lg border bg-card p-4"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
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
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium leading-none">
            {transaction.label}
          </span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{transaction.category.icon}</span>
            <span className="truncate">{transaction.category.name}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(transaction.date)}</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            isIncome ? 'text-success' : 'text-destructive',
          )}
        >
          {formatAmount(transaction.amount, transaction.type)}
        </span>
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
            {onEdit && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Modifier la transaction"
                onClick={() => onEdit(transaction)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                aria-label="Supprimer la transaction"
                onClick={() => onDelete(transaction)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
