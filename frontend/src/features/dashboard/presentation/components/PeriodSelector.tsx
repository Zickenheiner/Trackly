import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/core/components/ui/toggle-group';

type Period = 'week' | 'month' | 'year';

interface Props {
  value: Period;
  onChange: (value: Period) => void;
}

const PERIOD_LABELS: Record<Period, string> = {
  week: 'Semaine',
  month: 'Mois',
  year: 'Année',
};

export default function PeriodSelector({ value, onChange }: Props) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) onChange(v as Period);
      }}
      className="h-9"
    >
      {(Object.keys(PERIOD_LABELS) as Period[]).map((period) => (
        <ToggleGroupItem key={period} value={period} className="text-sm px-3">
          {PERIOD_LABELS[period]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
