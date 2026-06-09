// @ts-nocheck
// data.ts — Dữ liệu mẫu (mock) cho Admin Portal.
// Tầng dữ liệu giả lập: thay bằng fetch/server-action khi nối backend thật.
// Toàn bộ gom trong một object ADB và export ra.

const today = '30/05/2026';

// ——— Orders ———
const ORDER_STATUS = {
  pending: { label: 'Chờ xác nhận', tone: 'warn' },
  confirmed: { label: 'Đã xác nhận', tone: 'info' },
  packing: { label: 'Đang chuẩn bị', tone: 'purple' },
  shipping: { label: 'Đang giao', tone: 'teal' },
  done: { label: 'Hoàn thành', tone: 'success' },
  cancelled: { label: 'Đã huỷ', tone: 'danger' },
  refund: { label: 'Hoàn tiền', tone: 'danger' },
};

const names = [
  'Nguyễn Văn Hùng',
  'Trần Thu Trang',
  'Lê Quốc Bảo',
  'Phạm Minh Anh',
  'Vũ Đức Thành',
  'Đỗ Thị Lan',
  'Hoàng Văn Nam',
  'Bùi Thanh Hà',
  'Đặng Quốc Việt',
  'Ngô Thị Mai',
  'Lý Hoàng Long',
  'Cao Thị Hương',
  'Dương Văn Khôi',
  'Phan Thị Ngọc',
  'Trịnh Quang Huy',
  'Mai Thị Thu',
];
const channels = ['Website', 'Zalo OA', 'Hotline', 'Showroom HN', 'Showroom HCM', 'Facebook'];
const payMethods = ['COD', 'Chuyển khoản', 'MoMo', 'VNPay', 'Trả góp', 'Công nợ'];
const statusKeys = [
  'pending',
  'confirmed',
  'packing',
  'shipping',
  'done',
  'done',
  'done',
  'cancelled',
];

const ORDERS = Array.from({ length: 24 }, (_, i) => {
  const n = names[i % names.length];
  const items = 1 + ((i * 3) % 6);
  const total = 480000 + ((i * 837123) % 14000000);
  const sk = statusKeys[i % statusKeys.length];
  const d = 30 - (i % 28);
  return {
    id: 'SDM' + (26052800 - i * 7),
    customer: n,
    phone: '09' + (80000000 + i * 1234567).toString().slice(0, 8),
    channel: channels[i % channels.length],
    items,
    total: Math.round(total / 1000) * 1000,
    pay: payMethods[i % payMethods.length],
    status: sk,
    date: String(d).padStart(2, '0') + '/05/2026',
    time: String(8 + (i % 12)).padStart(2, '0') + ':' + String((i * 17) % 60).padStart(2, '0'),
    addr: [
      'Thanh Xuân, Hà Nội',
      'Cầu Giấy, Hà Nội',
      'Tân Bình, TP.HCM',
      'Hà Đông, Hà Nội',
      'Long Biên, Hà Nội',
    ][i % 5],
  };
});

// ——— Products ———
const brands = ['Dulux', 'Jotun', 'Nippon', 'Kova', 'Mykolor', 'Spec'];
const cats = [
  'Sơn nội thất',
  'Sơn ngoại thất',
  'Sơn chống thấm',
  'Sơn lót',
  'Bột trét',
  'Sơn kinh tế',
];
const pnames = [
  'Weathershield Powerflexx ngoại thất 18L',
  'EasyClean lau chùi nội thất 18L',
  'Jotashield Colour Extreme 17L',
  'Majestic True Beauty Sheen 5L',
  'Odour-less All-in-1 nội thất 18L',
  'CT-11A Gold chống thấm 20kg',
  'Vatex sơn kinh tế ngoại thất 18L',
  'Pro-X Allure lót kháng kiềm 18L',
  'Bột trét tường A540 40kg',
  'Aquatech Flex chống thấm 6kg',
  'SuperSheen nội thất bóng 18L',
  'Maxilite Smooth nội thất 18L',
];
const tones = ['sky', 'navy', 'cream', 'sage', 'orange', 'stone', 'warm', 'paint'];
const PRODUCTS = Array.from({ length: 16 }, (_, i) => {
  const stock = [0, 4, 6, 12, 28, 56, 120, 240][i % 8];
  const price = 295000 + ((i * 412345) % 5200000);
  return {
    id: 'SP' + (1024 + i),
    sku: 'DLX-' + (8800 + i * 13),
    name: brands[i % brands.length] + ' ' + pnames[i % pnames.length],
    brand: brands[i % brands.length],
    cat: cats[i % cats.length],
    price: Math.round(price / 1000) * 1000,
    cost: Math.round((price * 0.72) / 1000) * 1000,
    stock,
    sold: 120 + ((i * 271) % 5000),
    rating: (4.5 + (i % 5) * 0.1).toFixed(1),
    status: stock === 0 ? 'out' : stock < 10 ? 'low' : 'active',
    tone: tones[i % tones.length],
    visible: i % 7 !== 3,
  };
});

// ——— Inventory movements ———
const INVENTORY = PRODUCTS.map((p, i) => ({
  ...p,
  onHand: p.stock,
  reserved: Math.max(0, (i * 3) % 14),
  incoming: (i % 4) * 50,
  reorder: [12, 20, 10, 24, 30, 18][i % 6],
  location: ['Kho A · Kệ ' + (1 + (i % 8)), 'Kho B · Kệ ' + (1 + (i % 6))][i % 2],
  lastIn: String(28 - (i % 20)).padStart(2, '0') + '/05/2026',
}));

const STOCK_MOVES = Array.from({ length: 10 }, (_, i) => ({
  id: 'PNX' + (5500 - i),
  type: i % 3 === 0 ? 'out' : 'in',
  product: PRODUCTS[i % PRODUCTS.length].name,
  qty: (1 + (i % 6)) * 10,
  by: names[i % names.length],
  note:
    i % 3 === 0
      ? 'Xuất bán đơn SDM' + (26052800 - i * 7)
      : 'Nhập từ NCC ' + brands[i % brands.length],
  date: String(29 - i).padStart(2, '0') + '/05/2026',
}));

// ——— Customers (CRM) ———
const tiers = [
  ['Đồng', 'neutral'],
  ['Bạc', 'info'],
  ['Vàng', 'warn'],
  ['Bạch kim', 'purple'],
];
const CUSTOMERS = Array.from({ length: 16 }, (_, i) => {
  const orders = 1 + ((i * 5) % 38);
  const spent = orders * (1200000 + ((i * 321111) % 4000000));
  const tier = tiers[Math.min(3, Math.floor(orders / 10))];
  return {
    id: 'KH' + (2048 + i),
    name: names[i % names.length],
    phone: '09' + (88000000 + i * 765432).toString().slice(0, 8),
    email: ['hung', 'trang', 'bao', 'anh', 'thanh', 'lan'][i % 6] + i + '@email.com',
    type: i % 4 === 0 ? 'Nhà thầu' : i % 4 === 1 ? 'Doanh nghiệp' : 'Cá nhân',
    orders,
    spent: Math.round(spent / 1000) * 1000,
    tier: tier[0],
    tierTone: tier[1],
    points: Math.round(spent / 100000),
    lastOrder: String(28 - (i % 24)).padStart(2, '0') + '/05/2026',
    city: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Bắc Ninh'][i % 4],
    joined: '0' + (1 + (i % 9)) + '/202' + (2 + (i % 4)),
  };
});

// ——— Vouchers ———
const VOUCHERS = [
  {
    code: 'SDM200',
    name: 'Giảm 200K đơn từ 5tr',
    type: 'Số tiền',
    value: '200.000đ',
    used: 342,
    limit: 1000,
    status: 'active',
    exp: '31/05/2026',
    tone: 'success',
  },
  {
    code: 'FREESHIP',
    name: 'Miễn phí vận chuyển',
    type: 'Vận chuyển',
    value: '0đ ship',
    used: 1289,
    limit: 5000,
    status: 'active',
    exp: '15/06/2026',
    tone: 'success',
  },
  {
    code: 'COMBO10',
    name: 'Giảm 10% combo gia đình',
    type: 'Phần trăm',
    value: '10%',
    used: 156,
    limit: 500,
    status: 'active',
    exp: '30/06/2026',
    tone: 'success',
  },
  {
    code: 'NEWUSER',
    name: 'Khách mới giảm 100K',
    type: 'Số tiền',
    value: '100.000đ',
    used: 894,
    limit: 2000,
    status: 'active',
    exp: '01/07/2026',
    tone: 'success',
  },
  {
    code: 'TET2026',
    name: 'Ưu đãi Tết Bính Ngọ',
    type: 'Phần trăm',
    value: '15%',
    used: 2401,
    limit: 2401,
    status: 'ended',
    exp: '20/02/2026',
    tone: 'neutral',
  },
  {
    code: 'FLASH35',
    name: 'Flash sale giảm 35%',
    type: 'Phần trăm',
    value: '35%',
    used: 78,
    limit: 200,
    status: 'scheduled',
    exp: '05/06/2026',
    tone: 'info',
  },
];

// ——— Colors / tinting ———
const COLORS = [
  {
    code: '70BB 12/220',
    name: 'Xanh navy',
    hex: '#2B4A7A',
    brand: 'Dulux',
    tone: 'Xanh',
    recipes: 4,
    popular: 1247,
  },
  {
    code: '00YY 83/030',
    name: 'Trắng tinh khôi',
    hex: '#FFFFFF',
    brand: 'Dulux',
    tone: 'Trắng',
    recipes: 2,
    popular: 3201,
  },
  {
    code: '40YY 75/130',
    name: 'Kem nhạt',
    hex: '#F5E9D3',
    brand: 'Jotun',
    tone: 'Kem',
    recipes: 3,
    popular: 2105,
  },
  {
    code: '00NN 49/000',
    name: 'Xám khói',
    hex: '#B7B9BD',
    brand: 'Nippon',
    tone: 'Xám',
    recipes: 2,
    popular: 1840,
  },
  {
    code: '50YY 30/250',
    name: 'Xanh rêu',
    hex: '#7A8B62',
    brand: 'Mykolor',
    tone: 'Xanh',
    recipes: 5,
    popular: 765,
  },
  {
    code: '70YY 45/280',
    name: 'Kem nâu',
    hex: '#C2A37A',
    brand: 'Dulux',
    tone: 'Kem',
    recipes: 3,
    popular: 982,
  },
  {
    code: '30BG 45/200',
    name: 'Xanh ngọc',
    hex: '#7FB8B0',
    brand: 'Jotun',
    tone: 'Xanh',
    recipes: 4,
    popular: 543,
  },
  {
    code: '40YY 28/070',
    name: 'Ghi nâu',
    hex: '#8E867B',
    brand: 'Kova',
    tone: 'Ghi',
    recipes: 2,
    popular: 421,
  },
  {
    code: '10YY 83/044',
    name: 'Trắng ngọc trai',
    hex: '#F2EFE9',
    brand: 'Dulux',
    tone: 'Trắng',
    recipes: 2,
    popular: 1654,
  },
  {
    code: '00NN 27/000',
    name: 'Xám bê tông',
    hex: '#6E737B',
    brand: 'Nippon',
    tone: 'Xám',
    recipes: 3,
    popular: 1120,
  },
  {
    code: '60YY 55/220',
    name: 'Kem cát',
    hex: '#E8D6B3',
    brand: 'Mykolor',
    tone: 'Kem',
    recipes: 2,
    popular: 876,
  },
  {
    code: '70BB 20/180',
    name: 'Xanh thiên thanh',
    hex: '#5878A8',
    brand: 'Jotun',
    tone: 'Xanh',
    recipes: 4,
    popular: 690,
  },
];

const TINT_RECIPE = {
  base: 'Base D (trong suốt)',
  volume: '18L',
  colorants: [
    { code: 'KX', name: 'Đen oxit', amount: '28.4 ml' },
    { code: 'B', name: 'Xanh phthalo', amount: '142.0 ml' },
    { code: 'F', name: 'Đỏ oxit', amount: '6.2 ml' },
    { code: 'W', name: 'Trắng', amount: '0 ml' },
  ],
};

// ——— CMS posts ———
const POSTS = [
  {
    id: 'BV301',
    title: '10 xu hướng màu sơn nhà đẹp 2026 – sắc trầm lên ngôi',
    cat: 'Xu hướng',
    status: 'published',
    author: 'Minh Anh',
    views: 12480,
    date: '14/05/2026',
    tone: 'orange',
  },
  {
    id: 'BV300',
    title: 'Cách chọn màu sơn theo mệnh trong phong thủy',
    cat: 'Phong thủy',
    status: 'published',
    author: 'Quốc Bảo',
    views: 8920,
    date: '08/05/2026',
    tone: 'warm',
  },
  {
    id: 'BV299',
    title: 'Kinh nghiệm chống thấm sân thượng – tránh 5 sai lầm',
    cat: 'Kinh nghiệm',
    status: 'published',
    author: 'Thu Trang',
    views: 15640,
    date: '02/05/2026',
    tone: 'sky',
  },
  {
    id: 'BV298',
    title: 'Tư vấn phối màu nội thất căn hộ 2PN < 70m²',
    cat: 'Phối màu',
    status: 'draft',
    author: 'Minh Anh',
    views: 0,
    date: '28/04/2026',
    tone: 'sage',
  },
  {
    id: 'BV297',
    title: 'Sơn epoxy là gì? Khi nào nên dùng cho nhà ở',
    cat: 'Kinh nghiệm',
    status: 'review',
    author: 'Quốc Bảo',
    views: 0,
    date: '22/04/2026',
    tone: 'stone',
  },
  {
    id: 'BV296',
    title: 'Quy trình thi công sơn nhà chuẩn 7 bước Dulux',
    cat: 'Kinh nghiệm',
    status: 'published',
    author: 'Thu Trang',
    views: 9870,
    date: '18/04/2026',
    tone: 'paint',
  },
  {
    id: 'BV295',
    title: 'Top 10 màu sơn phòng ngủ giúp ngủ ngon hơn',
    cat: 'Phối màu',
    status: 'scheduled',
    author: 'Minh Anh',
    views: 0,
    date: '02/06/2026',
    tone: 'cream',
  },
];

// ——— Staff & roles ———
const STAFF = [
  {
    id: 'NV01',
    name: 'Nguyễn Đại Minh',
    role: 'Quản trị viên',
    dept: 'Ban giám đốc',
    email: 'minh@sondaiminh.vn',
    phone: '0988 555 999',
    status: 'active',
    last: 'Đang online',
    tone: '#0B2A5B',
  },
  {
    id: 'NV02',
    name: 'Trần Hoàng Long',
    role: 'Quản lý bán hàng',
    dept: 'Kinh doanh',
    email: 'long@sondaiminh.vn',
    phone: '0912 333 444',
    status: 'active',
    last: '5 phút trước',
    tone: '#1763c9',
  },
  {
    id: 'NV03',
    name: 'Lê Thị Minh Anh',
    role: 'Biên tập viên',
    dept: 'Marketing',
    email: 'anh@sondaiminh.vn',
    phone: '0934 222 111',
    status: 'active',
    last: '1 giờ trước',
    tone: '#6b4ea0',
  },
  {
    id: 'NV04',
    name: 'Phạm Quốc Bảo',
    role: 'Nhân viên kho',
    dept: 'Vận hành',
    email: 'bao@sondaiminh.vn',
    phone: '0967 888 777',
    status: 'active',
    last: 'Hôm qua',
    tone: '#0f8a8a',
  },
  {
    id: 'NV05',
    name: 'Vũ Thu Hà',
    role: 'CSKH',
    dept: 'Chăm sóc KH',
    email: 'ha@sondaiminh.vn',
    phone: '0945 666 555',
    status: 'active',
    last: '3 giờ trước',
    tone: '#E85D04',
  },
  {
    id: 'NV06',
    name: 'Đỗ Văn Khôi',
    role: 'Nhân viên bán hàng',
    dept: 'Kinh doanh',
    email: 'khoi@sondaiminh.vn',
    phone: '0978 444 333',
    status: 'inactive',
    last: '2 ngày trước',
    tone: '#1f8a5b',
  },
  {
    id: 'NV07',
    name: 'Ngô Thị Hương',
    role: 'Kế toán',
    dept: 'Tài chính',
    email: 'huong@sondaiminh.vn',
    phone: '0923 111 222',
    status: 'active',
    last: '30 phút trước',
    tone: '#9a6a00',
  },
];

const ROLES = [
  { name: 'Quản trị viên', count: 1, desc: 'Toàn quyền truy cập hệ thống', perms: 'Tất cả' },
  {
    name: 'Quản lý bán hàng',
    count: 2,
    desc: 'Quản lý đơn, sản phẩm, khách hàng, báo cáo',
    perms: '18 / 24 quyền',
  },
  { name: 'Nhân viên kho', count: 1, desc: 'Quản lý kho, nhập xuất tồn', perms: '6 / 24 quyền' },
  { name: 'Biên tập viên', count: 1, desc: 'Quản lý tin tức, bảng màu', perms: '5 / 24 quyền' },
  { name: 'CSKH', count: 2, desc: 'Xem đơn, khách hàng, voucher', perms: '9 / 24 quyền' },
  { name: 'Kế toán', count: 1, desc: 'Báo cáo tài chính, công nợ', perms: '7 / 24 quyền' },
];

// ——— Construction quotes ———
const QUOTE_STATUS = {
  new: { label: 'Mới', tone: 'warn' },
  surveying: { label: 'Đang khảo sát', tone: 'info' },
  quoted: { label: 'Đã báo giá', tone: 'purple' },
  won: { label: 'Chốt đơn', tone: 'success' },
  lost: { label: 'Không thành', tone: 'danger' },
};
const QUOTES = Array.from({ length: 12 }, (_, i) => {
  const area = 80 + ((i * 137) % 1800);
  const val = area * (180000 + ((i * 11111) % 90000));
  const sk = ['new', 'surveying', 'quoted', 'quoted', 'won', 'won', 'lost'][i % 7];
  return {
    id: 'BG' + (782 - i),
    customer: names[(i + 3) % names.length],
    phone: '09' + (33000000 + i * 998877).toString().slice(0, 8),
    project: [
      'Nhà phố 4 tầng',
      'Biệt thự sân vườn',
      'Căn hộ chung cư',
      'Nhà xưởng KCN',
      'Văn phòng cho thuê',
      'Khách sạn mini',
    ][i % 6],
    area,
    value: Math.round(val / 1000) * 1000,
    status: sk,
    assignee: STAFF[(i % 5) + 1].name,
    date: String(28 - (i % 26)).padStart(2, '0') + '/05/2026',
    city: ['Hà Nội', 'TP.HCM', 'Bắc Ninh', 'Hưng Yên'][i % 4],
  };
});

// ——— Dashboard KPIs & chart series ———
const KPI = {
  revenueToday: 48_720_000,
  revenueMonth: 1_284_500_000,
  orders: 342,
  ordersToday: 28,
  customers: 8247,
  newCustomers: 124,
  aov: 3_754_000,
  conversion: 3.8,
  pendingOrders: 14,
  lowStock: 6,
  openQuotes: 7,
  refunds: 2,
};

const REV_30 = [
  42, 38, 45, 51, 48, 55, 62, 58, 49, 53, 61, 67, 72, 64, 58, 69, 75, 71, 66, 73, 81, 77, 69, 74,
  83, 79, 72, 78, 86, 82,
].map((v) => v * 600000);
const REV_LABELS = [
  '1/5',
  '',
  '',
  '',
  '5/5',
  '',
  '',
  '',
  '',
  '10/5',
  '',
  '',
  '',
  '',
  '15/5',
  '',
  '',
  '',
  '',
  '20/5',
  '',
  '',
  '',
  '',
  '25/5',
  '',
  '',
  '',
  '',
  '30/5',
];
const ORDERS_7 = [38, 45, 41, 52, 48, 61, 56];
const ORDERS_7_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const CHANNEL_SPLIT = [
  { label: 'Website', value: 48, color: '#0B2A5B' },
  { label: 'Showroom', value: 24, color: '#E85D04' },
  { label: 'Zalo / FB', value: 18, color: '#0f8a8a' },
  { label: 'Hotline', value: 10, color: '#9a6a00' },
];
const CAT_REVENUE = [
  { label: 'Sơn ngoại thất', value: 486000000, color: '#0B2A5B' },
  { label: 'Sơn nội thất', value: 398000000, color: '#1763c9' },
  { label: 'Sơn chống thấm', value: 214000000, color: '#0f8a8a' },
  { label: 'Bột trét & lót', value: 112000000, color: '#E85D04' },
  { label: 'Sơn kinh tế', value: 74500000, color: '#9a6a00' },
];
const BRAND_BARS = {
  labels: ['Dulux', 'Jotun', 'Nippon', 'Kova', 'Mykolor', 'Spec'],
  revenue: [520, 410, 280, 190, 130, 84].map((v) => v * 1000000),
};

// ——— Leads (tiềm năng) ———
const LEAD_STATUS = {
  new: { label: 'Mới', tone: 'warn' },
  contacted: { label: 'Đã liên hệ', tone: 'info' },
  qualified: { label: 'Tiềm năng', tone: 'purple' },
  proposal: { label: 'Đã gửi đề xuất', tone: 'teal' },
  won: { label: 'Chuyển đổi', tone: 'success' },
  lost: { label: 'Thất bại', tone: 'danger' },
};
const LEAD_SOURCES = [
  'Website',
  'Facebook Ads',
  'Google Ads',
  'Zalo OA',
  'Giới thiệu',
  'Hotline',
  'Triển lãm',
  'Showroom',
];
const leadNeeds = [
  'Sơn nhà phố mới xây',
  'Sơn lại biệt thự',
  'Chống thấm sân thượng',
  'Sơn nội thất căn hộ',
  'Sơn nhà xưởng',
  'Sơn văn phòng',
  'Tư vấn phối màu',
  'Báo giá công trình lớn',
];
const LEADS = Array.from({ length: 18 }, (_, i) => {
  const sk = ['new', 'new', 'contacted', 'contacted', 'qualified', 'proposal', 'won', 'lost'][
    i % 8
  ];
  const score = [92, 45, 78, 63, 85, 71, 96, 28][i % 8];
  const val = 8000000 + ((i * 7351111) % 220000000);
  return {
    id: 'LD' + (3400 - i),
    name: names[(i + 5) % names.length],
    phone: '09' + (62000000 + i * 818181).toString().slice(0, 8),
    source: LEAD_SOURCES[i % LEAD_SOURCES.length],
    need: leadNeeds[i % leadNeeds.length],
    value: Math.round(val / 1000) * 1000,
    status: sk,
    score,
    assignee: STAFF[(i % 5) + 1].name,
    city: ['Hà Nội', 'TP.HCM', 'Bắc Ninh', 'Hưng Yên', 'Hải Phòng'][i % 5],
    created: String(28 - (i % 26)).padStart(2, '0') + '/05/2026',
    lastTouch: ['Hôm nay', 'Hôm qua', '2 ngày trước', '3 ngày trước', '1 tuần trước'][i % 5],
    tone: ['sky', 'navy', 'cream', 'sage', 'orange', 'stone', 'warm', 'paint'][i % 8],
  };
});

// ——— POS (bán hàng tại quầy) ———
const POS_CATEGORIES = ['Tất cả', ...cats];
const POS_PRODUCTS = PRODUCTS.map((p) => ({ ...p, posPrice: p.price }));
const POS_QUICK_CUSTOMERS = CUSTOMERS.slice(0, 6);
const POS_SHIFT = {
  cashier: 'Vũ Thu Hà',
  register: 'Quầy 01 · Showroom Hà Nội',
  opened: '07:30 · 31/05/2026',
  orders: 23,
  cash: 18_450_000,
  transfer: 24_200_000,
  card: 9_800_000,
};

export const ADB = {
  today,
  ORDER_STATUS,
  ORDERS,
  PRODUCTS,
  INVENTORY,
  STOCK_MOVES,
  CUSTOMERS,
  VOUCHERS,
  COLORS,
  TINT_RECIPE,
  POSTS,
  STAFF,
  ROLES,
  QUOTE_STATUS,
  QUOTES,
  KPI,
  REV_30,
  REV_LABELS,
  ORDERS_7,
  ORDERS_7_LABELS,
  CHANNEL_SPLIT,
  CAT_REVENUE,
  BRAND_BARS,
  brands,
  cats,
  channels,
  payMethods,
  LEAD_STATUS,
  LEAD_SOURCES,
  LEADS,
  POS_CATEGORIES,
  POS_PRODUCTS,
  POS_QUICK_CUSTOMERS,
  POS_SHIFT,
};
