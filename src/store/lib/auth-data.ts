export interface AuthBenefit {
  icon: string;
  title: string;
  desc: string;
}

export const AUTH_BENEFITS: AuthBenefit[] = [
  {
    icon: 'tag',
    title: 'Voucher 200K khách mới',
    desc: 'Nhận ngay khi đăng ký tài khoản lần đầu.',
  },
  {
    icon: 'cart',
    title: 'Theo dõi đơn hàng',
    desc: 'Xem lịch sử mua, trạng thái giao và hoá đơn điện tử.',
  },
  {
    icon: 'palette',
    title: 'Lưu màu & địa chỉ',
    desc: 'Đồng bộ bảng màu yêu thích và sổ địa chỉ giao hàng.',
  },
];

export const AUTH_SOCIAL_PROVIDERS = [
  { id: 'google', label: 'Google' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'zalo', label: 'Zalo' },
] as const;
