import { motion } from 'motion/react';
import { AlertCircle, Inbox } from 'lucide-react';
import { useCategoryList } from '../../domain/hooks/category.hook';
import CategoryCard from '../components/CategoryCard';
import CreateCategoryDialog from '../components/CreateCategoryDialog';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';

function CategoryListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function CategoryListError() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-6">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground">
        Impossible de charger les catégories.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Réessayer
      </Button>
    </div>
  );
}

function CategoryListEmpty() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-6">
      <Inbox className="h-12 w-12 text-muted-foreground" />
      <p className="text-muted-foreground">Aucune catégorie disponible.</p>
      <CreateCategoryDialog />
    </div>
  );
}

function CategoryListHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Catégories</h1>
        <p className="text-sm text-muted-foreground">
          Catégories par défaut et personnalisées pour classer vos transactions.
        </p>
      </div>
      <CreateCategoryDialog />
    </div>
  );
}

export default function CategoryListPage() {
  const { categories, categoriesIsLoading, categoriesError } =
    useCategoryList();

  if (categoriesIsLoading) return <CategoryListSkeleton />;
  if (categoriesError) return <CategoryListError />;
  if (!categories?.length) return <CategoryListEmpty />;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <CategoryListHeader />
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
