// @ts-nocheck
// store/data.js — Dữ liệu storefront Sơn Đại Minh (ES module).
import { formatVND } from '../lib/format';
export { formatVND };

export const NAV = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Giới thiệu', to: '/gioi-thieu' },
  { label: 'Sản phẩm', to: '/san-pham', mega: true },
  { label: 'Bảng màu', to: '/bang-mau' },
  { label: 'Khuyến mãi', to: '/khuyen-mai' },
  { label: 'Tin tức', to: '/tin-tuc' },
  { label: 'Liên hệ', to: '/lien-he' },
];

export const CATEGORIES = [
  { icon: 'home', name: 'Sơn nội thất', count: '120+' },
  { icon: 'sun', name: 'Sơn ngoại thất', count: '85+' },
  { icon: 'rain', name: 'Sơn chống thấm', count: '46+' },
  { icon: 'droplet', name: 'Sơn lót & kháng kiềm', count: '32+' },
  { icon: 'palette', name: 'Bột trét tường', count: '18+' },
  { icon: 'tag', name: 'Sơn kinh tế', count: '54+' },
  { icon: 'sparkle', name: 'Sơn hiệu ứng', count: '28+' },
  { icon: 'shield', name: 'Sơn epoxy sàn', count: '22+' },
  { icon: 'truck', name: 'Dụng cụ thi công', count: '90+' },
];

export const BRANDS = [
  { name: 'Dulux', tag: 'Premium', line: 'AkzoNobel · Hà Lan' },
  { name: 'Jotun', tag: 'Cao cấp', line: 'Na Uy · Bền màu vượt trội' },
  { name: 'Nippon', tag: 'Phổ thông', line: 'Nhật Bản · Bền bỉ' },
  { name: 'Kova', tag: 'Việt Nam', line: 'Chống thấm chuyên dụng' },
  { name: 'Mykolor', tag: 'Thẩm mỹ cao', line: '4 Oranges · Đa sắc' },
  { name: 'Spec', tag: 'Kinh tế', line: 'Giá tốt · Công trình' },
];

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Dulux Weathershield Powerflexx ngoại thất 18L',
    brand: 'Dulux',
    cat: 'Sơn ngoại thất',
    price: 4850000,
    old: 5320000,
    rating: 4.9,
    sold: 1247,
    tone: 'sky',
    tags: ['Chống thấm', '15 năm'],
    badge: 'BÁN CHẠY',
  },
  {
    id: 'p2',
    name: 'Jotun Jotashield Colour Extreme ngoại thất 17L',
    brand: 'Jotun',
    cat: 'Sơn ngoại thất',
    price: 5290000,
    old: 5890000,
    rating: 4.8,
    sold: 982,
    tone: 'navy',
    tags: ['Bền màu', 'Kháng kiềm'],
    badge: 'GIẢM 10%',
  },
  {
    id: 'p3',
    name: 'Dulux EasyClean lau chùi hiệu quả nội thất 18L',
    brand: 'Dulux',
    cat: 'Sơn nội thất',
    price: 2680000,
    old: 2980000,
    rating: 4.9,
    sold: 2105,
    tone: 'cream',
    tags: ['Kháng khuẩn', 'Lau chùi'],
    badge: 'HOT',
  },
  {
    id: 'p4',
    name: 'Nippon Odour-less All-in-1 nội thất 18L',
    brand: 'Nippon',
    cat: 'Sơn nội thất',
    price: 1850000,
    old: 2120000,
    rating: 4.7,
    sold: 3208,
    tone: 'sage',
    tags: ['Không mùi', 'An toàn'],
    badge: '-13%',
  },
  {
    id: 'p5',
    name: 'Kova CT-11A Gold chống thấm pha xi măng 20kg',
    brand: 'Kova',
    cat: 'Sơn chống thấm',
    price: 1420000,
    old: 1580000,
    rating: 4.8,
    sold: 1840,
    tone: 'orange',
    tags: ['Chống thấm', 'Sàn mái'],
    badge: 'TỐT NHẤT',
  },
  {
    id: 'p6',
    name: 'Jotun Majestic True Beauty Sheen nội thất 5L',
    brand: 'Jotun',
    cat: 'Sơn nội thất',
    price: 1980000,
    old: 2180000,
    rating: 4.9,
    sold: 765,
    tone: 'stone',
    tags: ['Cao cấp', 'Mờ mịn'],
    badge: 'MỚI',
  },
  {
    id: 'p7',
    name: 'Bột trét tường nội thất Dulux A540 40kg',
    brand: 'Dulux',
    cat: 'Bột trét',
    price: 295000,
    old: 340000,
    rating: 4.7,
    sold: 5612,
    tone: 'warm',
    tags: ['Phẳng mịn', 'Bám dính'],
    badge: '-13%',
  },
  {
    id: 'p8',
    name: 'Nippon Vatex sơn kinh tế ngoại thất 18L',
    brand: 'Nippon',
    cat: 'Sơn kinh tế',
    price: 1120000,
    old: 1290000,
    rating: 4.6,
    sold: 4120,
    tone: 'paint',
    tags: ['Giá tốt', 'Công trình'],
    badge: 'GIÁ SỐC',
  },
];

export const FEATURES = [
  {
    icon: 'shield',
    title: 'Hàng chính hãng 100%',
    desc: 'Cam kết nguồn gốc – tem chống giả – hoàn tiền 200% nếu phát hiện hàng giả.',
  },
  {
    icon: 'tag',
    title: 'Giá cạnh tranh nhất',
    desc: 'Báo giá tốt cho công trình. So sánh giá – chênh lệch chúng tôi bù phần chênh.',
  },
  {
    icon: 'truck',
    title: 'Giao hàng nhanh 2 giờ',
    desc: 'Nội thành Hà Nội & TP.HCM giao trong 2 giờ. Tỉnh thành lân cận trong 24 giờ.',
  },
  {
    icon: 'palette',
    title: 'Tư vấn phối màu miễn phí',
    desc: 'Đội ngũ chuyên viên thiết kế hỗ trợ phối màu cho từng không gian sống.',
  },
  {
    icon: 'award',
    title: 'Hỗ trợ công trình lớn',
    desc: 'Báo giá theo công trình, đặt cọc linh hoạt, công nợ cho khách thân thiết.',
  },
];

export { PALETTE, PALETTE_GROUPS } from '@/store/lib/palette-data';

export const TESTIMONIALS = [
  {
    name: 'Anh Nguyễn Văn Hùng',
    role: 'Chủ nhà phố Long Biên, Hà Nội',
    rating: 5,
    tone: 'sky',
    quote:
      'Sơn Đại Minh tư vấn phối màu rất tâm huyết, giao hàng đúng hẹn cho công trình 4 tầng của gia đình. Giá tốt hơn cửa hàng gần nhà tới 8%.',
    project: 'Sơn lại 220m² ngoại thất – Dulux Weathershield',
  },
  {
    name: 'Chị Trần Thu Trang',
    role: 'KTS – Studio nội thất Mộc',
    rating: 5,
    tone: 'cream',
    quote:
      'Đặt hàng số lượng lớn cho nhiều dự án, đội ngũ hỗ trợ rất nhanh, có nhân viên kỹ thuật xuống tận công trình kiểm tra trước khi sơn.',
    project: 'Căn hộ 95m² Vinhomes Ocean Park – Jotun Majestic',
  },
  {
    name: 'Anh Lê Quốc Bảo',
    role: 'Nhà thầu sơn – Bắc Ninh',
    rating: 5,
    tone: 'stone',
    quote:
      'Mình lấy sỉ Kova và Nippon cho các công trình nhà xưởng, công nợ rất linh hoạt, có tem chính hãng đầy đủ nên chủ đầu tư yên tâm.',
    project: 'Nhà xưởng 1.800m² KCN Quế Võ – Kova CT-11A',
  },
];

export const NEWS = [
  {
    title: '10 xu hướng màu sơn nhà đẹp 2026 – sắc trầm lên ngôi',
    excerpt:
      'Năm 2026 đánh dấu sự trở lại của các tông màu trầm ấm, mộc mạc kết hợp cùng các điểm nhấn xanh navy – cam đất đặc trưng…',
    cat: 'Xu hướng',
    date: '14/05/2026',
    read: '6 phút đọc',
    tone: 'orange',
  },
  {
    title: 'Cách chọn màu sơn theo mệnh trong phong thủy nhà ở',
    excerpt:
      'Phối màu sơn theo mệnh không chỉ là tín ngưỡng, mà còn là gợi ý hữu ích để gia chủ có không gian sống hài hòa…',
    cat: 'Phong thủy',
    date: '08/05/2026',
    read: '8 phút đọc',
    tone: 'warm',
  },
  {
    title: 'Kinh nghiệm chống thấm sân thượng – tránh 5 sai lầm phổ biến',
    excerpt:
      'Sân thượng là khu vực chịu nắng mưa khắc nghiệt nhất. Quy trình chống thấm 6 bước dưới đây giúp công trình bền 10+ năm…',
    cat: 'Kinh nghiệm',
    date: '02/05/2026',
    read: '10 phút đọc',
    tone: 'sky',
  },
  {
    title: 'Tư vấn phối màu nội thất cho căn hộ 2 phòng ngủ < 70m²',
    excerpt:
      'Không gian nhỏ đòi hỏi chiến lược phối màu thông minh. Bộ ba sắc kem – xanh xám – be hồng đang rất được ưa chuộng…',
    cat: 'Phối màu',
    date: '28/04/2026',
    read: '7 phút đọc',
    tone: 'sage',
  },
];
