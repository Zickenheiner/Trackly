import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useThemeStore } from '../../domain/stores/theme.store';
import { cn } from '@/core/utils/cn';

interface Props {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className, showLabel = false }: Props) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
        className,
      )}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="h-5 w-5 shrink-0"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.div>
      {showLabel && <span>{isDark ? 'Mode clair' : 'Mode sombre'}</span>}
    </button>
  );
}
