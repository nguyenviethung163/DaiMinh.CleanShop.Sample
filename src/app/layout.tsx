import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Toaster, TooltipProvider } from '@/components/ui';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sơn Đại Minh',
  description: 'Cửa hàng sơn & hệ thống quản trị Sơn Đại Minh — Next.js + Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>
        <TooltipProvider>
          {children}
          <Toaster position="bottom-center" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
