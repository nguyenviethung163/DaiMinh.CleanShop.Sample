import Link from 'next/link';

export interface ArticleBreadcrumbProps {
  category: string;
}

export function ArticleBreadcrumb({ category }: ArticleBreadcrumbProps) {
  return (
    <nav className="text-muted-foreground mb-3 text-sm" aria-label="Breadcrumb">
      <Link href="/" className="text-inherit no-underline">
        Trang chủ
      </Link>
      {' / '}
      <Link href="/tin-tuc" className="text-inherit no-underline">
        Tin tức
      </Link>
      {' / '}
      {category}
    </nav>
  );
}
