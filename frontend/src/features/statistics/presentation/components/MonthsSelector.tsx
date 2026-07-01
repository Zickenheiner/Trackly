import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';

type MonthsCount = 6 | 12;

interface Props {
  value: MonthsCount;
  onChange: (value: MonthsCount) => void;
}

const MONTHS_OPTIONS: { value: MonthsCount; label: string }[] = [
  { value: 6, label: '6 derniers mois' },
  { value: 12, label: '12 derniers mois' },
];

export default function MonthsSelector({ value, onChange }: Props) {
  return (
    <Select
      value={String(value)}
      onValueChange={(v) => onChange(Number(v) as MonthsCount)}
    >
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {MONTHS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
