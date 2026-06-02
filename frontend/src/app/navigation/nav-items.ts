import {
  LayoutDashboard,
  ArrowLeftRight,
  Tag,
  Target,
  type LucideIcon,
} from 'lucide-react';
import routes from '@/core/constants/routes';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: routes.dashboard, icon: LayoutDashboard },
  { label: 'Transactions', to: routes.transactions, icon: ArrowLeftRight },
  { label: 'Catégories', to: routes.categories, icon: Tag },
  { label: 'Objectifs', to: routes.goals, icon: Target },
];
