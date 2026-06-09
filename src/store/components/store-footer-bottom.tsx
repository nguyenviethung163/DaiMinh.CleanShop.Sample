import Link from 'next/link';
import { StoreContainer } from './store-container';

export function StoreFooterBottom() {
  return (
    <div className="border-t border-white/10 py-4">
      <StoreContainer className="flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <div>© 2008–2026 Sơn Đại Minh JSC. MST: 0101xxxxxx · Giấy phép ĐKKD số 0107xxx.</div>
        <Link href="/admin" className="text-primary text-xs font-bold no-underline">
          → Trang quản trị (Admin)
        </Link>
      </StoreContainer>
    </div>
  );
}
