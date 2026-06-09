import { NEWS } from '@/store/data';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  cat: string;
  date: string;
  read: string;
  tone: string;
  href?: string;
}

export interface NewsCategory {
  name: string;
  count: number;
}

export interface ArticleAuthor {
  initials: string;
  name: string;
  role: string;
}

export interface ArticleColorSwatch {
  name: string;
  hex: string;
}

const EXTENDED_ARTICLES: NewsArticle[] = [
  {
    id: 'epoxy',
    title: 'Sơn epoxy là gì? Khi nào nên dùng cho nhà ở',
    excerpt:
      'Sơn epoxy thường dùng trong công nghiệp nhưng ngày càng phổ biến cho gara, ban công, sàn nhà tắm…',
    cat: 'Kinh nghiệm',
    date: '22/04/2026',
    read: '9 phút đọc',
    tone: 'stone',
  },
  {
    id: 'diy-mistakes',
    title: '5 lỗi thường gặp khi sơn nhà tự làm – cách khắc phục',
    excerpt: 'Tự sơn nhà giúp tiết kiệm chi phí nhưng dễ mắc lỗi rộp, bong, không đều màu…',
    cat: 'Kinh nghiệm',
    date: '18/04/2026',
    read: '6 phút đọc',
    tone: 'warm',
  },
  {
    id: 'interior-exterior',
    title: 'Phân biệt sơn nội thất và ngoại thất – khác nhau ở đâu?',
    excerpt: 'Bài viết phân tích thành phần, công dụng và giá thành của hai dòng sơn này…',
    cat: 'Phối màu',
    date: '12/04/2026',
    read: '5 phút đọc',
    tone: 'cream',
  },
  {
    id: 'paint-storage',
    title: 'Cách bảo quản sơn thừa đúng cách – dùng được sau 2 năm',
    excerpt: 'Sơn thừa sau thi công có thể dùng cho sửa chữa nhỏ nếu bảo quản đúng quy trình…',
    cat: 'Kinh nghiệm',
    date: '08/04/2026',
    read: '4 phút đọc',
    tone: 'sage',
  },
  {
    id: 'bedroom-colors',
    title: 'Top 10 màu sơn phòng ngủ giúp ngủ ngon hơn',
    excerpt: 'Màu sắc ảnh hưởng tới chất lượng giấc ngủ. Khám phá những tông màu lý tưởng…',
    cat: 'Phối màu',
    date: '02/04/2026',
    read: '7 phút đọc',
    tone: 'sky',
  },
];

const BASE_ARTICLES: NewsArticle[] = NEWS.map((item, index) => ({
  id: `news-${index + 1}`,
  ...item,
}));

export const NEWS_ARTICLES: NewsArticle[] = [...BASE_ARTICLES, ...EXTENDED_ARTICLES];

export const NEWS_CATEGORIES: NewsCategory[] = [
  { name: 'Tất cả', count: 142 },
  { name: 'Xu hướng', count: 28 },
  { name: 'Phối màu', count: 36 },
  { name: 'Kinh nghiệm', count: 48 },
  { name: 'Phong thủy', count: 18 },
  { name: 'Sản phẩm mới', count: 12 },
];

export type NewsCategoryName = (typeof NEWS_CATEGORIES)[number]['name'];

export const NEWS_POPULAR = NEWS_ARTICLES.slice(0, 5);

export const ARTICLE_FEATURED = NEWS_ARTICLES[0];

export const ARTICLE_AUTHOR: ArticleAuthor = {
  initials: 'MA',
  name: 'Minh Anh',
  role: 'Chuyên viên thiết kế nội thất',
};

export const ARTICLE_CATEGORY = 'Xu hướng';

export const ARTICLE_TITLE = '10 xu hướng màu sơn nhà đẹp 2026 – sắc trầm lên ngôi';

export const ARTICLE_DEK =
  'Năm 2026 đánh dấu sự trở lại của các tông màu trầm ấm, mộc mạc kết hợp cùng những điểm nhấn xanh navy – cam đất đặc trưng, mang đến không gian sống vừa hiện đại vừa gần gũi với thiên nhiên.';

export const ARTICLE_DATE = '14/05/2026';
export const ARTICLE_READ_TIME = '6 phút đọc';

export const ARTICLE_COVER_CAPTION =
  'Phòng khách tông xanh navy phối kem nâu và cam đất – xu hướng nổi bật 2026.';

export const ARTICLE_TOC = [
  '1. Xu hướng màu trầm ấm trở lại',
  '2. Xanh navy & sắc cam đất',
  '3. Tông trắng – kem trung tính',
  '4. Phối màu cho phòng khách',
  '5. Phối màu cho phòng ngủ',
  '6. Phối màu cho ngoại thất',
] as const;

export const ARTICLE_RELATED_COLORS: ArticleColorSwatch[] = [
  { name: 'Xanh navy', hex: '#2B4A7A' },
  { name: 'Cam đất', hex: '#C77E4A' },
  { name: 'Kem nâu', hex: '#C2A37A' },
  { name: 'Trắng ngọc', hex: '#F2EFE9' },
  { name: 'Xanh rêu', hex: '#7A8B62' },
  { name: 'Ghi đá', hex: '#A8A39A' },
];

export const ARTICLE_TAGS = ['Xu hướng 2026', 'Phối màu', 'Nội thất', 'Dulux', 'Jotun'] as const;

export const ARTICLE_RELATED_ARTICLES = BASE_ARTICLES.slice(1);

export const NEWS_PAGINATION_PAGES: (number | string)[] = [1, 2, 3, 4, '…', 12];

export const ARTICLE_SHARE_ICONS = ['mail', 'phone', 'heart'] as const;
