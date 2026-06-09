export interface AboutStat {
  value: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  since: string;
  tone: string;
}

export interface Showroom {
  city: string;
  addr: string;
  tel: string;
  hour: string;
  email: string;
  tone: string;
  flagship?: boolean;
}

export interface ContactChannel {
  ic: string;
  name: string;
  val: string;
  sub: string;
}

export const ABOUT_STATS: AboutStat[] = [
  { value: '18+', label: 'năm phân phối sơn' },
  { value: '15.000+', label: 'công trình đã thi công' },
  { value: '2.000+', label: 'mã màu chính hãng' },
  { value: '18', label: 'thương hiệu hợp tác' },
  { value: '3', label: 'showroom toàn quốc' },
  { value: '4.9/5', label: 'điểm hài lòng' },
];

export const ABOUT_TIMELINE: TimelineItem[] = [
  {
    year: '2008',
    title: 'Thành lập cửa hàng đầu tiên',
    desc: 'Khai trương tại 248 Nguyễn Trãi, Thanh Xuân, Hà Nội với 4 thương hiệu sơn ban đầu.',
  },
  {
    year: '2012',
    title: 'Trở thành đại lý cấp 1 Dulux',
    desc: 'Trở thành đại lý cấp 1 chính thức của AkzoNobel tại miền Bắc.',
  },
  {
    year: '2016',
    title: 'Mở rộng showroom TP.HCM',
    desc: 'Khai trương showroom thứ hai tại 87 Cộng Hòa, Tân Bình.',
  },
  {
    year: '2019',
    title: 'Vượt mốc 10.000 công trình',
    desc: 'Cán mốc 10.000 công trình – từ nhà ở dân dụng đến dự án quy mô lớn.',
  },
  {
    year: '2022',
    title: 'Showroom Đà Nẵng & tư vấn 24/7',
    desc: 'Khai trương showroom Đà Nẵng và dịch vụ tư vấn phối màu trực tuyến 24/7.',
  },
  {
    year: '2026',
    title: 'Ra mắt website thương mại điện tử',
    desc: 'Hệ thống đặt hàng online 2.000+ mã màu, giao 2 giờ nội thành.',
  },
];

export const ABOUT_VALUES: ValueItem[] = [
  {
    icon: 'shield',
    title: 'Chính hãng tuyệt đối',
    desc: 'Cam kết 100% nguồn gốc rõ ràng, tem chống giả. Hoàn tiền 200% nếu phát hiện hàng giả.',
  },
  {
    icon: 'heart',
    title: 'Tâm huyết với từng công trình',
    desc: 'Mỗi khách hàng được tư vấn riêng – chúng tôi đồng hành cùng bạn xây dựng tổ ấm.',
  },
  {
    icon: 'palette',
    title: 'Đầu tư vào thẩm mỹ',
    desc: 'Đội ngũ chuyên viên cập nhật xu hướng phối màu mới nhất từ các hãng hàng đầu.',
  },
  {
    icon: 'sparkle',
    title: 'Đổi mới liên tục',
    desc: 'Cải tiến dịch vụ – giao 2 giờ, tư vấn 3D, app đặt hàng, voucher tự động.',
  },
];

export const ABOUT_TEAM: TeamMember[] = [
  { name: 'Nguyễn Đại Minh', role: 'Sáng lập & CEO', since: '2008', tone: 'paint' },
  { name: 'Trần Hoàng Long', role: 'Giám đốc kinh doanh', since: '2014', tone: 'sky' },
  { name: 'Lê Thị Minh Anh', role: 'Trưởng phòng thiết kế', since: '2016', tone: 'cream' },
  { name: 'Phạm Quốc Bảo', role: 'Trưởng phòng kỹ thuật', since: '2018', tone: 'stone' },
];

export const SHOWROOMS: Showroom[] = [
  {
    city: 'Hà Nội',
    addr: '248 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    tel: '024.3xxx.xxxx',
    hour: '7:30 – 21:00',
    email: 'hn@sondaiminh.vn',
    tone: 'navy',
    flagship: true,
  },
  {
    city: 'TP. Hồ Chí Minh',
    addr: '87 Cộng Hòa, Tân Bình, TP.HCM',
    tel: '028.3xxx.xxxx',
    hour: '7:30 – 21:00',
    email: 'hcm@sondaiminh.vn',
    tone: 'orange',
  },
  {
    city: 'Đà Nẵng',
    addr: '142 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    tel: '0236.3xxx.xxx',
    hour: '8:00 – 20:30',
    email: 'dn@sondaiminh.vn',
    tone: 'cream',
  },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  { ic: 'phone', name: 'Hotline 24/7', val: '1900 6868', sub: 'Miễn phí cuộc gọi từ máy bàn' },
  { ic: 'phone', name: 'Zalo OA', val: 'zalo.me/sondaiminh', sub: 'Phản hồi trong 5 phút' },
  { ic: 'mail', name: 'Email CSKH', val: 'cskh@sondaiminh.vn', sub: 'Phản hồi trong 4 giờ' },
  { ic: 'mail', name: 'Fanpage Facebook', val: 'fb.com/sondaiminh', sub: '52.000 người theo dõi' },
];

export interface ContactResponseTime {
  channel: string;
  time: string;
}

export const CONTACT_REQUEST_TYPES = [
  'Tư vấn phối màu',
  'Báo giá công trình',
  'Đặt hàng',
  'Khiếu nại',
  'Hợp tác',
] as const;

export type ContactRequestTypeName = (typeof CONTACT_REQUEST_TYPES)[number];

export const CONTACT_RESPONSE_TIMES: ContactResponseTime[] = [
  { channel: 'Hotline 24/7', time: 'Ngay lập tức' },
  { channel: 'Zalo OA', time: '< 5 phút' },
  { channel: 'Form online', time: '< 15 phút' },
  { channel: 'Email CSKH', time: '< 4 giờ làm việc' },
];

export const CONTACT_SHOWROOM_OPTIONS = ['Hà Nội', 'TP.HCM', 'Đà Nẵng'] as const;

export const CONTACT_MAP_DEFAULT = {
  label: 'Google Maps · Showroom Hà Nội (248 Nguyễn Trãi)',
  tone: 'navy',
} as const;

export const CONTACT_FAQS: [string, string][] = [
  [
    'Sơn Đại Minh có giao hàng ngoài Hà Nội & TP.HCM không?',
    'Có. Chúng tôi giao hàng toàn quốc với phí ship tùy theo tỉnh thành. Đơn từ 5.000.000đ được miễn phí giao hàng cho hầu hết tỉnh thành lân cận.',
  ],
  [
    'Tôi có thể đặt sơn pha màu theo mã của hãng không?',
    'Có. Showroom có máy pha màu chuẩn theo mã hãng, pha tại chỗ trong 10 phút.',
  ],
  [
    'Sơn Đại Minh có hỗ trợ trả góp 0% không?',
    'Có, áp dụng cho đơn từ 3.000.000đ qua thẻ tín dụng các ngân hàng liên kết.',
  ],
  [
    'Làm sao để được chiết khấu cho công trình lớn?',
    'Liên hệ bộ phận báo giá công trình – chiết khấu tới 12% cho đơn từ 50.000.000đ.',
  ],
];
