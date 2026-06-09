import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  ClipboardList,
  FileText,
  Filter,
  LayoutDashboard,
  Monitor,
  Package,
  Palette,
  Receipt,
  Settings,
  Shield,
  ShoppingCart,
  Tag,
  Users,
  Warehouse,
} from 'lucide-react';

export const NAV_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  chartbar: BarChart3,
  pos: Monitor,
  cart: ShoppingCart,
  funnel: Filter,
  clipboard: ClipboardList,
  users: Users,
  tag: Tag,
  receipt: Receipt,
  box: Package,
  warehouse: Warehouse,
  palette: Palette,
  document: FileText,
  shield: Shield,
  gear: Settings,
};

export function getNavIcon(name: string): LucideIcon {
  return NAV_ICONS[name] ?? LayoutDashboard;
}
