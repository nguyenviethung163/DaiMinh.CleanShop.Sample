import { formatVND } from '@/lib/format';
import { PRODUCTS } from '../data';
import type { StoreProduct } from '@/store/components/product-card';

export { formatVND };

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  vol: string;
  price: number;
  qty: number;
  tone: string;
  lowStock?: boolean;
}

export interface ShippingOption {
  id: string;
  title: string;
  sub: string;
  fee: string;
  feeFree?: boolean;
}

export interface PaymentOption {
  id: string;
  icon: string;
  title: string;
  sub: string;
}

export interface DeliveryAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  label: string;
  isDefault: boolean;
}

export type OrderStatus = 'Đang giao' | 'Đã giao' | 'Đã huỷ';

export interface Order {
  id: string;
  status: OrderStatus;
  date: string;
  items: number;
  total: number;
  products: StoreProduct[];
}

export type AccountTabId =
  | 'orders'
  | 'profile'
  | 'favorites'
  | 'addresses'
  | 'vouchers'
  | 'points'
  | 'password'
  | 'support';

export interface AccountNavItem {
  id: AccountTabId;
  icon: string;
  label: string;
  badge?: string;
}

export const CART_ITEMS: CartItem[] = [
  {
    id: 'c1',
    name: 'Dulux Weathershield Powerflexx ngoại thất 18L',
    brand: 'Dulux',
    vol: '18L · Xanh navy',
    price: 4850000,
    qty: 2,
    tone: 'sky',
  },
  {
    id: 'c2',
    name: 'Dulux EasyClean lau chùi nội thất 18L',
    brand: 'Dulux',
    vol: '18L · Trắng kem',
    price: 2680000,
    qty: 1,
    tone: 'cream',
  },
  {
    id: 'c3',
    name: 'Kova CT-11A Gold chống thấm 20kg',
    brand: 'Kova',
    vol: '20kg · Pha xi măng',
    price: 1420000,
    qty: 1,
    tone: 'orange',
    lowStock: true,
  },
  {
    id: 'c4',
    name: 'Bột trét tường nội thất Dulux A540 40kg',
    brand: 'Dulux',
    vol: '40kg',
    price: 295000,
    qty: 3,
    tone: 'warm',
  },
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'express',
    title: 'Giao hàng siêu tốc 2 giờ',
    sub: 'Nội thành HN · Đơn từ 2tr',
    fee: 'Miễn phí',
    feeFree: true,
  },
  {
    id: 'standard',
    title: 'Giao tiêu chuẩn',
    sub: 'Trong 24 giờ · Toàn HN',
    fee: '30.000đ',
  },
  {
    id: 'scheduled',
    title: 'Giao theo lịch hẹn',
    sub: 'Chọn giờ – ngày cụ thể',
    fee: '50.000đ',
  },
  {
    id: 'pickup',
    title: 'Nhận tại showroom',
    sub: '248 Nguyễn Trãi, Thanh Xuân',
    fee: 'Miễn phí',
    feeFree: true,
  },
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'cod', icon: 'tag', title: 'COD – Thanh toán khi nhận', sub: 'Phí thu hộ 0đ' },
  { id: 'bank', icon: 'cart', title: 'Chuyển khoản ngân hàng', sub: 'VietinBank · MB · ACB' },
  { id: 'momo', icon: 'bolt', title: 'Ví MoMo', sub: 'Giảm thêm 50K' },
  { id: 'vnpay', icon: 'bolt', title: 'VNPay QR', sub: 'Quét mã thanh toán' },
  { id: 'installment', icon: 'shield', title: 'Trả góp 0% thẻ tín dụng', sub: 'Đơn từ 3tr' },
  { id: 'b2b', icon: 'phone', title: 'Trả sau – Công trình', sub: 'Khách doanh nghiệp' },
];

export const DEFAULT_ADDRESS: DeliveryAddress = {
  id: 'a1',
  name: 'Nguyễn Văn A',
  phone: '0988 555 999',
  address: 'Số 24, ngõ 142 Lê Trọng Tấn, P. Khương Mai, Q. Thanh Xuân, Hà Nội',
  label: 'NHÀ RIÊNG',
  isDefault: true,
};

export const SAVED_ADDRESSES: DeliveryAddress[] = [
  DEFAULT_ADDRESS,
  {
    id: 'a2',
    name: 'Nguyễn Văn A (Công ty)',
    phone: '0988 333 444',
    address: 'Tòa A2, Tầng 12, Vinhomes Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội',
    label: 'CÔNG TY',
    isDefault: false,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'SDM-2026052801',
    status: 'Đang giao',
    date: '28/05/2026',
    items: 4,
    total: 9600000,
    products: [PRODUCTS[0], PRODUCTS[2], PRODUCTS[4]] as StoreProduct[],
  },
  {
    id: 'SDM-2026051203',
    status: 'Đã giao',
    date: '12/05/2026',
    items: 2,
    total: 5320000,
    products: [PRODUCTS[1], PRODUCTS[3]] as StoreProduct[],
  },
  {
    id: 'SDM-2026042815',
    status: 'Đã giao',
    date: '28/04/2026',
    items: 6,
    total: 14280000,
    products: [PRODUCTS[5], PRODUCTS[6]] as StoreProduct[],
  },
  {
    id: 'SDM-2026031822',
    status: 'Đã huỷ',
    date: '18/03/2026',
    items: 1,
    total: 1120000,
    products: [PRODUCTS[7]] as StoreProduct[],
  },
];

export const ACCOUNT_NAV: AccountNavItem[] = [
  { id: 'profile', icon: 'user', label: 'Thông tin tài khoản' },
  { id: 'orders', icon: 'cart', label: 'Đơn hàng của tôi', badge: '4' },
  { id: 'favorites', icon: 'heart', label: 'Sản phẩm yêu thích', badge: '12' },
  { id: 'addresses', icon: 'location', label: 'Sổ địa chỉ', badge: '3' },
  { id: 'vouchers', icon: 'tag', label: 'Voucher của tôi', badge: '5' },
  { id: 'points', icon: 'award', label: 'Điểm tích lũy' },
  { id: 'password', icon: 'shield', label: 'Đổi mật khẩu' },
  { id: 'support', icon: 'phone', label: 'Hỗ trợ & FAQ' },
];

export const ORDER_FILTERS = ['Tất cả', 'Đang giao', 'Đã giao', 'Đã huỷ'] as const;
export type OrderFilter = (typeof ORDER_FILTERS)[number];

export const CHECKOUT_STEPS = [
  'Giỏ hàng',
  'Thông tin giao hàng',
  'Thanh toán',
  'Hoàn tất',
] as const;

export const VOUCHER_CODE = 'SDM100';
export const VOUCHER_DISCOUNT = 100000;

export function calcCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = VOUCHER_DISCOUNT;
  const total = subtotal - discount;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const points = Math.floor(total / 100000);

  return { subtotal, discount, total, itemCount, points };
}

export function orderStatusClasses(status: OrderStatus): string {
  switch (status) {
    case 'Đang giao':
      return 'bg-[#FFF4D6] text-[#946100]';
    case 'Đã giao':
      return 'bg-[#E1F5EA] text-[#0e6c3f]';
    case 'Đã huỷ':
      return 'bg-[#FBE6E6] text-[#A11717]';
    default:
      return 'bg-muted text-muted-foreground';
  }
}
