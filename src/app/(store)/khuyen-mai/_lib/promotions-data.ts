export interface PromoCampaign {
  id: string;
  tone: string;
  sup: string;
  title: string;
  sub: string;
  ends: [string, string, string, string];
  cta: string;
  tag?: string;
  href?: string;
}

export interface PromoVoucher {
  code: string;
  name: string;
  cond: string;
  type: string;
  exp: string;
}

export const PROMO_CAMPAIGNS: PromoCampaign[] = [
  {
    id: 'flash',
    tone: 'orange',
    sup: 'FLASH SALE',
    title: 'Sale chớp nhoáng – Giảm tới 35%',
    sub: 'Dulux EasyClean, Jotun Jotashield, Nippon Odour-less và 28 sản phẩm khác',
    ends: ['00', '11', '42', '08'],
    cta: 'Xem sản phẩm sale',
    tag: 'KẾT THÚC SAU',
  },
  {
    id: 'combo',
    tone: 'paint',
    sup: 'COMBO GIA ĐÌNH',
    title: 'Trọn bộ sơn nhà tiết kiệm 1.500.000đ',
    sub: 'Sơn lót + nội thất + ngoại thất + chống thấm + bột trét',
    ends: ['02', '11', '42', '08'],
    cta: 'Xem combo',
  },
  {
    id: 'thanh',
    tone: 'warm',
    sup: 'CÔNG TRÌNH',
    title: 'Chiết khấu 12% cho đơn từ 50tr',
    sub: 'Áp dụng cho nhà thầu, có công nợ linh hoạt 30–60 ngày',
    ends: ['12', '00', '00', '00'],
    cta: 'Báo giá công trình',
  },
  {
    id: 'gift',
    tone: 'sage',
    sup: 'QUÀ TẶNG',
    title: 'Mua sơn 18L tặng rulo + cọ + băng dính',
    sub: 'Áp dụng tất cả thương hiệu, không giới hạn số lượng',
    ends: ['05', '22', '00', '00'],
    cta: 'Mua ngay nhận quà',
  },
  {
    id: 'firstorder',
    tone: 'sky',
    sup: 'KHÁCH MỚI',
    title: 'Voucher 200K cho đơn đầu tiên',
    sub: 'Đăng ký tài khoản và nhận ngay voucher 200.000đ',
    ends: ['NHẬN', 'NGAY', '', ''],
    cta: 'Đăng ký tài khoản',
    href: '/tai-khoan',
  },
  {
    id: 'refer',
    tone: 'stone',
    sup: 'GIỚI THIỆU',
    title: 'Giới thiệu bạn – Nhận 5% giá trị đơn',
    sub: 'Bạn được giảm 5% lần đầu mua, bạn của bạn nhận voucher 100K',
    ends: ['LIÊN', 'TỤC', '', ''],
    cta: 'Lấy mã giới thiệu',
  },
];

export const PROMO_VOUCHERS: PromoVoucher[] = [
  {
    code: 'SDM200',
    name: 'Giảm 200.000đ',
    cond: 'Đơn từ 5.000.000đ',
    type: 'Toàn shop',
    exp: '31/05/2026',
  },
  {
    code: 'FREESHIP',
    name: 'Miễn phí giao hàng',
    cond: 'Đơn từ 2.000.000đ',
    type: 'Vận chuyển',
    exp: '15/06/2026',
  },
  {
    code: 'COMBO10',
    name: 'Giảm 10% combo',
    cond: 'Áp dụng combo gia đình',
    type: 'Combo',
    exp: '30/06/2026',
  },
  {
    code: 'NEWUSER',
    name: 'Voucher khách mới 100K',
    cond: 'Tài khoản mới',
    type: 'Khách mới',
    exp: '01/07/2026',
  },
];

export const PROMO_STATUS_TABS = [
  'Tất cả (14)',
  'Đang diễn ra (8)',
  'Sắp diễn ra (3)',
  'Đã kết thúc (3)',
] as const;

export const PROMO_TYPE_FILTERS = ['Flash sale', 'Combo', 'Quà tặng', 'Voucher'] as const;

export type PromoStatusTab = (typeof PROMO_STATUS_TABS)[number];
export type PromoTypeFilter = (typeof PROMO_TYPE_FILTERS)[number];

export const COUNTDOWN_LABELS = ['NGÀY', 'GIỜ', 'PHÚT', 'GIÂY'] as const;
