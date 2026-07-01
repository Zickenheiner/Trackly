import { motion } from 'motion/react';
import type { CategoryStatEntity } from '../../domain/entities/category-stats.entity';

interface Props {
  stats: CategoryStatEntity[];
}

export default function CategoryLegend({ stats }: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="flex flex-col gap-2"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.category.id}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 },
          }}
          className="flex items-center justify-between gap-3 py-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: stat.category.color }}
            />
            <span className="text-sm truncate">
              {stat.category.icon} {stat.category.name}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-medium tabular-nums">
              {stat.total.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
              {stat.percentage.toFixed(1)} %
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
