import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import type { CategoryEntity } from '../../domain/entities/category.entity';
import EditCategoryDialog from './EditCategoryDialog';
import DeleteCategoryDialog from './DeleteCategoryDialog';

interface Props {
  category: CategoryEntity;
}

export default function CategoryCard({ category }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
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
          {category.isDefault ? (
            <Badge variant="secondary" className="shrink-0">
              Par défaut
            </Badge>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label="Actions sur la catégorie"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setDeleteOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardContent>
      </Card>

      {!category.isDefault && (
        <>
          <EditCategoryDialog
            category={category}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
          <DeleteCategoryDialog
            category={category}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        </>
      )}
    </>
  );
}
