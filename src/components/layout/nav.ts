// nav.ts — Cấu hình điều hướng sidebar (nhóm + item). Thêm màn = thêm route src/app/admin/<id>/page.tsx.
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  badgeTone?: 'danger';
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'TỔNG QUAN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'reports', label: 'Báo cáo & thống kê', icon: 'chartbar' },
    ],
  },
  {
    label: 'BÁN HÀNG',
    items: [
      { id: 'pos', label: 'Bán hàng tại quầy (POS)', icon: 'pos' },
      { id: 'orders', label: 'Đơn hàng', icon: 'cart', badge: 14 },
      { id: 'leads', label: 'Lead / Khách tiềm năng', icon: 'funnel', badge: 18 },
      { id: 'quotes', label: 'Báo giá công trình', icon: 'clipboard', badge: 7 },
      { id: 'customers', label: 'Khách hàng', icon: 'users' },
      { id: 'promotions', label: 'Khuyến mãi & Voucher', icon: 'tag' },
    ],
  },
  {
    label: 'SẢN PHẨM & KHO',
    items: [
      { id: 'products', label: 'Sản phẩm', icon: 'box' },
      { id: 'inventory', label: 'Quản lý kho', icon: 'warehouse', badge: 6, badgeTone: 'danger' },
      { id: 'colors', label: 'Bảng màu & Pha màu', icon: 'palette' },
    ],
  },
  {
    label: 'NỘI DUNG & HỆ THỐNG',
    items: [
      { id: 'cms', label: 'Tin tức / Blog', icon: 'document' },
      { id: 'staff', label: 'Nhân viên & Phân quyền', icon: 'shield' },
      { id: 'settings', label: 'Cấu hình', icon: 'gear' },
    ],
  },
];

export const ALL_NAV: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);
export const findNav = (id: string) => ALL_NAV.find((x) => x.id === id);
