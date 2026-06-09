import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Link,
  Mail,
  Phone,
  Shield,
  Store,
  Truck,
  Warehouse,
  Zap,
} from 'lucide-react';

export const SETTINGS_NAV = [
  { id: 'general', label: 'Thông tin cửa hàng', icon: Store },
  { id: 'shipping', label: 'Vận chuyển', icon: Truck },
  { id: 'payment', label: 'Thanh toán', icon: CreditCard },
  { id: 'notification', label: 'Thông báo', icon: Bell },
  { id: 'integration', label: 'Tích hợp', icon: Link },
  { id: 'security', label: 'Bảo mật', icon: Shield },
] as const;

export type SettingsTab = (typeof SETTINGS_NAV)[number]['id'];

export const SHIPPING_METHODS = [
  {
    label: 'Giao hàng siêu tốc 2 giờ',
    hint: 'Nội thành HN & HCM · Miễn phí đơn từ 2tr',
    defaultOn: true,
  },
  { label: 'Giao tiêu chuẩn 24 giờ', hint: 'Toàn thành phố · Phí 30.000đ', defaultOn: true },
  { label: 'Giao theo lịch hẹn', hint: 'Khách chọn khung giờ · Phí 50.000đ', defaultOn: true },
  { label: 'Nhận tại showroom', hint: 'Miễn phí · 3 showroom', defaultOn: true },
  {
    label: 'Giao tỉnh (đối tác GHN/GHTK)',
    hint: 'Toàn quốc · Phí theo cân nặng',
    defaultOn: false,
  },
] as const;

export const PAYMENT_METHODS = [
  {
    icon: CreditCard,
    label: 'COD – Thanh toán khi nhận hàng',
    hint: 'Áp dụng toàn quốc',
    defaultOn: true,
  },
  {
    icon: CreditCard,
    label: 'Chuyển khoản ngân hàng',
    hint: 'VietinBank · MB · ACB',
    defaultOn: true,
  },
  { icon: Zap, label: 'Ví MoMo', hint: 'Đã kết nối · API v3', defaultOn: true },
  { icon: Zap, label: 'VNPay QR', hint: 'Đã kết nối', defaultOn: true },
  { icon: Shield, label: 'Trả góp 0% (thẻ tín dụng)', hint: 'Đơn từ 3.000.000đ', defaultOn: true },
  { icon: FileText, label: 'Công nợ doanh nghiệp', hint: 'Khách B2B đã duyệt', defaultOn: false },
] as const;

export const ADMIN_NOTIFICATIONS = [
  { label: 'Đơn hàng mới', hint: 'Email + thông báo trong app', defaultOn: true },
  { label: 'Sản phẩm sắp hết hàng', hint: 'Khi tồn dưới ngưỡng', defaultOn: true },
  { label: 'Báo giá mới', hint: 'Khi có yêu cầu báo giá', defaultOn: true },
  { label: 'Đánh giá mới', hint: 'Khi khách đánh giá sản phẩm', defaultOn: false },
  { label: 'Báo cáo doanh thu hàng ngày', hint: 'Gửi 8:00 sáng mỗi ngày', defaultOn: true },
] as const;

export const CUSTOMER_NOTIFICATIONS = [
  { label: 'Xác nhận đơn hàng (SMS)', hint: '', defaultOn: true },
  { label: 'Cập nhật trạng thái giao hàng', hint: '', defaultOn: true },
  { label: 'Email marketing', hint: 'Khuyến mãi, sản phẩm mới', defaultOn: true },
  { label: 'Nhắc nhở giỏ hàng', hint: 'Khi khách bỏ quên giỏ hàng', defaultOn: false },
] as const;

export const INTEGRATIONS: {
  name: string;
  status: string;
  connected: boolean;
  icon: LucideIcon;
}[] = [
  { name: 'Zalo Official Account', status: 'Đã kết nối', connected: true, icon: Phone },
  { name: 'Facebook Messenger', status: 'Đã kết nối', connected: true, icon: Mail },
  { name: 'Google Analytics', status: 'Đã kết nối · GA4', connected: true, icon: BarChart3 },
  { name: 'Giao Hàng Nhanh (GHN)', status: 'Chưa kết nối', connected: false, icon: Truck },
  { name: 'Hoá đơn điện tử (Viettel)', status: 'Đã kết nối', connected: true, icon: FileText },
  { name: 'KiotViet (đồng bộ kho)', status: 'Chưa kết nối', connected: false, icon: Warehouse },
];

export const SECURITY_TOGGLES = [
  { label: 'Xác thực 2 lớp (2FA)', hint: 'Yêu cầu mã OTP khi đăng nhập', defaultOn: true },
  { label: 'Tự động đăng xuất', hint: 'Sau 30 phút không hoạt động', defaultOn: true },
  { label: 'Giới hạn IP đăng nhập', hint: 'Chỉ cho phép IP công ty', defaultOn: false },
  { label: 'Đổi mật khẩu định kỳ', hint: 'Yêu cầu đổi mỗi 90 ngày', defaultOn: false },
] as const;

export const LOGIN_SESSIONS = [
  { device: 'Chrome · Windows', location: 'Hà Nội · Hiện tại', current: true },
  { device: 'Safari · iPhone', location: 'Hà Nội · 2 giờ trước', current: false },
  { device: 'Chrome · MacOS', location: 'TP.HCM · Hôm qua', current: false },
] as const;
