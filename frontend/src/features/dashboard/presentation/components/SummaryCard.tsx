import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { cn } from '@/core/utils/cn';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  amount: number;
  currency?: string;
  icon: LucideIcon;
  variant: 'default' | 'income' | 'expense';
  index?: number;
}

const variantStyles = {
  default: 'text-foreground',
  income: 'text-success',
  expense: 'text-destructive',
};

const iconBgStyles = {
  default: 'bg-primary/10 text-primary',
  income: 'bg-success/10 text-success',
  expense: 'bg-destructive/10 text-destructive',
};

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function SummaryCard({
  title,
  amount,
  currency = 'EUR',
  icon: Icon,
  variant,
  index = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg',
              iconBgStyles[variant],
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              'text-2xl font-semibold tabular-nums',
              variantStyles[variant],
            )}
          >
            {formatAmount(amount, currency)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
