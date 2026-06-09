import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Award,
  Banknote,
  Check,
  ChevronDown,
  Clock,
  CloudRain,
  CreditCard,
  Droplet,
  Filter,
  Flame,
  Grid2x2,
  Heart,
  Home,
  LayoutGrid,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Tag,
  Target,
  Truck,
  User,
  X,
  Zap,
} from 'lucide-react';

/**
 * Icon registry — tra cứu lucide component theo tên (cho icon lấy từ data).
 * Với icon tĩnh, import trực tiếp từ 'lucide-react'. Đây là bảng dữ liệu, không phải component.
 */
export const STORE_ICONS: Record<string, LucideIcon> = {
  search: Search,
  cart: ShoppingCart,
  user: User,
  phone: Phone,
  chevron: ChevronDown,
  arrow: ArrowRight,
  star: Star,
  check: Check,
  truck: Truck,
  shield: ShieldCheck,
  palette: Palette,
  heart: Heart,
  mail: Mail,
  clock: Clock,
  tag: Tag,
  bolt: Zap,
  fire: Flame,
  location: MapPin,
  home: Home,
  menu: Menu,
  close: X,
  filter: Filter,
  grid: LayoutGrid,
  logout: LogOut,
  award: Award,
  plus: Plus,
  sparkle: Sparkles,
  sun: Sun,
  rain: CloudRain,
  droplet: Droplet,
  target: Target,
  qr: QrCode,
  cash: Banknote,
  card: CreditCard,
};

export type StoreIconName = keyof typeof STORE_ICONS;

/** Fallback khi tên icon không khớp registry. */
export const StoreIconFallback = Grid2x2;

/** Lấy lucide component theo tên (data-driven), fallback Grid2x2. */
export function getStoreIcon(name: string): LucideIcon {
  return STORE_ICONS[name] ?? Grid2x2;
}
