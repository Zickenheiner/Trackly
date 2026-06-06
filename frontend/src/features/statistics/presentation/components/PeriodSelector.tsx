import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';

type Period = 'week' | 'month' | 'year';

interface Props {
  value: Period;
  onChange: (value: Period) => void;
}

const PERIOD_LABELS: Record<Period, string> = {
  week: 'Cette semaine',
  month: 'Ce mois',
  year: 'Cette année',
};

export default function PeriodSelector({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Period)}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(PERIOD_LABELS) as Period[]).map((period) => (
          <SelectItem key={period} value={period}>
            {PERIOD_LABELS[period]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
