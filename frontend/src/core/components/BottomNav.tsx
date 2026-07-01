import { cn } from '@/core/utils/cn';
import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../constants/nav-items';
import ThemeToggle from '@/features/theme/presentation/components/ThemeToggle';

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sidebar-border bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80 md:hidden">
      <ul className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'relative flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'text-sidebar-primary'
                      : 'text-sidebar-foreground/60 hover:text-sidebar-foreground',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="bottomnav-active-indicator"
                        className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-sidebar-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
        <li className="flex-1 flex items-center justify-center">
          <ThemeToggle className="flex-col gap-1 py-2.5 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground px-0 rounded-none w-full justify-center" />
        </li>
      </ul>
    </nav>
  );
}
