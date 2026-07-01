import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyStatEntity } from '../../domain/entities/monthly-stats.entity';

interface Props {
  stats: MonthlyStatEntity[];
  type: 'income' | 'expense' | 'both';
}

function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  const date = new Date(Number(year), Number(m) - 1, 1);
  return date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
}

function formatCurrency(value: number): string {
  return value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export default function MonthlyBarChart({ stats, type }: Props) {
  const data = stats.map((stat) => ({
    name: formatMonth(stat.month),
    ...(type === 'income' || type === 'both' ? { Revenus: stat.income } : {}),
    ...(type === 'expense' || type === 'both'
      ? { Dépenses: stat.expenses }
      : {}),
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          className="fill-muted-foreground"
        />
        <YAxis
          tickFormatter={(v: number) =>
            v.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' €'
          }
          tick={{ fontSize: 12 }}
          className="fill-muted-foreground"
          width={72}
        />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          labelClassName="font-medium"
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid hsl(var(--border))',
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
          }}
        />
        <Legend />
        {(type === 'income' || type === 'both') && (
          <Bar
            dataKey="Revenus"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        )}
        {(type === 'expense' || type === 'both') && (
          <Bar
            dataKey="Dépenses"
            fill="var(--color-chart-1)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
