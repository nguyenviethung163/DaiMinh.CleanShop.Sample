import type { LucideIcon } from 'lucide-react';
import { Check, ClipboardList, FileText, PackagePlus, Settings, Tag } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '@/components/ui/badge';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  dept: string;
  email: string;
  phone: string;
  status: string;
  last: string;
  tone: string;
};

export type Role = {
  name: string;
  count: number;
  desc: string;
  perms: string;
};

export const STAFF_TABS = [
  { value: 'members', label: 'Nhân viên' },
  { value: 'roles', label: 'Vai trò & Quyền' },
  { value: 'activity', label: 'Nhật ký hoạt động' },
] as const;

export type StaffTab = (typeof STAFF_TABS)[number]['value'];

export const STAFF_DEPARTMENTS = [
  'Ban giám đốc',
  'Kinh doanh',
  'Marketing',
  'Vận hành',
  'Chăm sóc KH',
  'Tài chính',
] as const;

export const PERMISSION_GROUPS = [
  ['Đơn hàng', ['Xem', 'Tạo/Sửa', 'Xoá', 'Xác nhận']],
  ['Sản phẩm & Kho', ['Xem', 'Tạo/Sửa', 'Nhập xuất kho']],
  ['Khách hàng', ['Xem', 'Sửa', 'Xuất dữ liệu']],
  ['Khuyến mãi', ['Xem', 'Tạo/Sửa']],
  ['Báo cáo', ['Xem', 'Xuất']],
  ['Hệ thống', ['Cấu hình', 'Quản lý nhân viên']],
] as const;

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  check: Check,
  document: FileText,
  pkgIn: PackagePlus,
  tag: Tag,
  gear: Settings,
  clipboard: ClipboardList,
};

export const STAFF_ACTIVITY = [
  ['Trần Hoàng Long', 'đã xác nhận đơn', 'SDM26052793', '5 phút trước', 'check'],
  ['Lê Thị Minh Anh', 'đã đăng bài viết', 'Xu hướng màu 2026', '1 giờ trước', 'document'],
  ['Phạm Quốc Bảo', 'đã nhập kho', 'PNX5500 · 120 sản phẩm', '2 giờ trước', 'pkgIn'],
  ['Vũ Thu Hà', 'đã tạo voucher', 'FLASH35', '3 giờ trước', 'tag'],
  ['Nguyễn Đại Minh', 'đã cập nhật cấu hình', 'Phí vận chuyển', 'Hôm qua', 'gear'],
  ['Trần Hoàng Long', 'đã tạo báo giá', 'BG782 · Biệt thự sân vườn', 'Hôm qua', 'clipboard'],
] as const;

export function getActivityIcon(key: string): LucideIcon {
  return ACTIVITY_ICONS[key] ?? Check;
}

export function getStaffStatusMeta(status: string) {
  if (status === 'active') {
    return { variant: 'default' as BadgeVariant, label: 'Hoạt động' };
  }
  return { variant: 'outline' as BadgeVariant, label: 'Tạm khoá' };
}

export function isOnline(last: string) {
  return last === 'Đang online';
}
