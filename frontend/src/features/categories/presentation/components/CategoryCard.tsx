import { Card, CardContent } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import type { CategoryEntity } from '../../domain/entities/category.entity';

interface Props {
  category: CategoryEntity;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
          style={{ backgroundColor: `${category.color}1a` }}
          aria-hidden
        >
          <span>{category.icon}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate font-medium">{category.name}</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.color}
          </span>
        </div>
        {category.isDefault && (
          <Badge variant="secondary" className="shrink-0">
            Par défaut
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
