export interface MegaMenuQuickLink {
  label: string;
  href: string;
  icon: string;
}

export const MEGA_MENU_QUICK_LINKS: MegaMenuQuickLink[] = [
  { label: 'Tất cả sản phẩm', href: '/san-pham', icon: 'grid' },
  { label: 'Sản phẩm bán chạy', href: '/san-pham', icon: 'fire' },
  { label: 'Bảng màu 2.000+ mã', href: '/bang-mau', icon: 'palette' },
  { label: 'Khuyến mãi tháng 5', href: '/khuyen-mai', icon: 'tag' },
];
